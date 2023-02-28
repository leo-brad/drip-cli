import chalk from 'chalk';
import parsePackage from '~/lib/util/parsePackage';

function showView(lines, l, p) {
  console.log('');
  console.log(chalk.gray(l - 1) + ' ' + chalk.gray.bgWhite(getLines(lines, l - 2)));
  console.log(chalk.gray(l) + ' ' +  chalk.black.bgWhite(getLines(lines, l - 1)));
  console.log(chalk.gray(String(l).replace(/[0-9]+/, ' ')) + ' '.padEnd(p - 3, ' '), chalk.bold.red('~^~'));
  console.log(chalk.gray(l + 1) + ' ' + chalk.gray.bgWhite(getLines(lines, l)));
}

function showTip(message) {
  console.log(chalk.bold('Tip') + ': ' + message);
}

function matchChar(l, r) {
  if (l !== r) {
    const e = Error('format parsing exception.');
    e.c = r;
    throw e;
  }
}

function getLines(lines, n) {
  let l = lines[n];
  const e = '';
  if (typeof l === 'string') {
    if (Number.isNaN(l.charCodeAt(0))) {
      l = e;
    }
  } else {
    l = e;
  }
  return l.padEnd(75);
}

class Parser {
  constructor(s, cp) {
    this.s = s;
    this.cp = cp;
  }

  removeCommentAndEnter() {
    let ans = true;
    const char = this.s.glanceChar();
    switch (char) {
      case '"':
        this.matchComment();
        break;
      case "\n":
        this.matchOneChar('\n');
        break;
      default:
        ans = false;
        break;
    }
    return ans;
  }


  matchOneChar(c) {
    matchChar(this.s.nextChar(), c);
  }

  matchOneCharMultiply(c, t) {
    for (let i = 0; i < t; i += 1) {
      this.matchOneChar(c);
    }
  }

  matchSeriesLine(s, time) {
    let t = 0;
    while (true) {
      const c = this.s.nextChar();
      if (c === s) {
        t += 1;
      } else if (c === '\n') {
        if (t >= time) {
          break;
        }
      }
    }
  }

  matchStringEndWith(end) {
    const array = [];
    let name;
    while (true) {
      const char = this.s.glanceChar();
      if (char !== end) {
        this.s.nextIndex();
      } else {
        break;
      }
    }
  }

  matchComment() {
    try {
      this.matchOneChar('"');
      this.matchOneChar(' ');
      this.matchStringEndWith('\n');
      this.matchOneChar('\n');
    } catch(e) {
      throw Error("comment parsing exception.");
    }
  }

  parseName() {
    const array = [];
    let name;
    while (true) {
      const char = this.s.glanceChar();
      if (char >= 'A' && char <= 'z') {
        array.push(char);
        this.s.nextIndex();
      } else {
        name = array.join('');
        break;
      }
    }
    return name;
  }

  parseNames() {
    const names = [];
    while (true) {
      const n = this.parseName();
      if (n.length === 0) {
        throw Error('name parsing exception.');
      }
      if (names.length === 0) {
        names.push(n);
      } else {
        const a = n.split('');
        a[0] = a[0].toUpperCase();
        names.push(a.join(''));
      }
      const c = this.s.glanceChar();
      if (c !== '-') {
        break;
      } else {
        this.s.nextIndex();
      }
    }
    return names.join('');
  }

  parseInt() {
    const array = [];
    let int;
    while (true) {
      const char = this.s.glanceChar();
      if (char >= '0' && char <= '9') {
        array.push(char);
        this.s.nextIndex();
      } else {
        int = array.join('');
        break;
      }
    }
    return parseInt(int);
  }

  parseStringEndWith(end) {
    const array = [];
    let name;
    while (true) {
      const char = this.s.glanceChar();
      if (char !== end) {
        array.push(char);
        this.s.nextIndex();
      } else {
        name = array.join('');
        break;
      }
    }
    return name;
  }

  parseList(parse) {
    const ans = [];
    while (true) {
      const c =  this.s.glanceChar();
      if (c === '' || c === '\n') {
        break;
      }
      ans.push(this.parseItem(parse));
      this.matchOneChar('\n');
    }
    return ans;
  }

  parseItem(parse) {
    this.matchOneCharMultiply(' ', 2);
    this.matchOneChar('-');
    this.matchOneChar(' ');
    let item = this.parseStringEndWith('\n');
    if (typeof parse === 'function') {
      item = parse(item);
    }
    return item;
  }

  parseValue(obj) {
    const n = this.parseNames();
    if (n.charAt(n.length - 1) === 's') {
      this.matchOneChar(':');
      this.matchOneChar('\n')
      switch (n) {
        case 'packages':
          obj[n] = this.parseList(parsePackage);
          break;
        default:
          obj[n] = this.parseList();
          break;
      }
    } else {
      this.matchOneChar(':');
      this.matchOneChar(' ')
      switch (n) {
        case 'packageFileServer':
        case 'staticFileServer':
          obj[n] = this.parseStringEndWith('\n');
          break;
        default:
          obj[n] = this.parseInt();
          break;
      }
      if (Number.isNaN(obj[n])) {
        throw Error('integer parsing exception.');
      }
      this.matchStringEndWith('\n');
    }
  }

  parse() {
    const ans = {};
    try {
      while (true) {
        while (true) {
          if (this.removeCommentAndEnter() === false) {
            break;
          }
        }
        if (this.s.glanceChar() === '') {
          break;
        } else {
          this.parseValue(ans);
        }
      }
    } catch (e) {
      this.showError(e);
      process.exit(0);
    }
    return ans;
  }

  showError(e) {
    const lines = this.s.s.split('\n');
    const [l, p] = this.s.getPosition();
    const { cp, } = this;
    showView(lines, l, p);
    switch (e.message) {
      case 'comment parsing exception.':
        showTip(chalk.bold('comment correct format is ' + chalk.gray('" comment')));
        break;
      case 'format parsing exception.':
        showTip(chalk.bold('the current location can be a char "' + chalk.red(e.c) + '".'));
        break;
      case 'name parsing exception.':
        showTip(chalk.bold('name correct format is (' + chalk.green('name1-name2') + ').'));
        break;
      case 'integer parsing exception.':
        showTip(chalk.bold('integer correct format is (' + chalk.green('number') + ').'));
        break;
      case 'package formate type two parse error.':
        showTip(chalk.bold('package correct format is [' + chalk.green('alias') +  '](' + chalk.red('address') + ')') + '.');
        break;
    }
    console.error(chalk.bold(
      cp + ' parsing error in line ' + l + ',' + 'poistion ' + p + ';'
    ));
    console.log(e);
    console.log('');
  }
}

export default Parser;
