import chalk from 'chalk';

function matchChar(l, r) {
  if (l !== r) {
    throw Error('format parsing exception;');
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
  return l.padEnd(78);
}

class Parser {
  constructor(s, cp) {
    this.s = s;
    this.cp = cp;
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
    this.matchOneChar('"');
    this.matchOneChar(' ');
    this.matchStringEndWith('\n');
    this.matchOneChar('\n');
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
        throw Error('name parsing exception;');
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

  parseArray(obj) {
    const n = this.parseNames();
    this.matchOneChar(':');
    this.matchOneChar('\n')
    switch (n) {
      case 'ignores':
      case 'packages':
        obj[n] = this.parseList();
        break;
    }
  }

  parseValue(obj) {
    const n = this.parseNames();
    this.matchOneChar(':');
    this.matchOneChar(' ')
    switch (n) {
      case 'interval':
      case 'minMem':
      case 'adjustCore':
        obj[n] = this.parseInt();
        if (Number.isNaN(obj[n])) {
          throw Error('integer parsing exception.');
        }
        this.matchStringEndWith('\n');
        break;
    }
  }

  parseSingleList(obj, isLast) {
    this.matchComment();
    this.parseArray(obj, isLast);
    if (isLast === true) {
      try {
        this.matchOneChar('\n');
      } catch (e) {
      }
    } else {
      this.matchOneChar('\n');
    }
  }

  parseSingleValue(obj) {
    this.matchComment();
    this.parseValue(obj);
    this.matchOneChar('\n');
    this.matchOneChar('\n');
  }

  parseList(isLast) {
    const ans = [];
    while (true) {
      const c =  this.s.glanceChar();
      if (c.length === 0 || c === '\n') {
        break;
      }
      ans.push(this.parseItem(isLast));
    }
    return ans;
  }

  parseItem(isLast) {
    this.matchOneCharMultiply(' ', 2);
    this.matchOneChar('-');
    this.matchOneChar(' ');
    const item = this.parseStringEndWith('\n');
    if (isLast === true) {
      try {
        this.matchOneChar('\n');
      } catch (e) {
      }
    } else {
      this.matchOneChar('\n');
    }
    return item;
  }

  parse() {
    const ans = {};
    try {
      this.parseSingleValue(ans);
      this.parseSingleValue(ans);
      this.parseSingleValue(ans);
      this.parseSingleList(ans);
      this.parseSingleList(ans, true);
    } catch (e) {
      this.showError(e);
    }
    return ans;
  }

  showView(lines, l, p) {
    console.log(chalk.gray(l - 2) + ' ' + chalk.gray.bgWhite(getLines(lines, l - 2)));
    console.log(chalk.gray(l - 1) + ' ' +  chalk.black.bgWhite(getLines(lines, l - 1)));
    console.log(chalk.gray(String(l - 1).replace(/[0-9]+/, ' ')) + ' '.padEnd(p - 1, ' '), chalk.bold.red('~^~'));
    console.log(chalk.gray(l) + ' ' + chalk.gray.bgWhite(getLines(lines, l)));
  }

  showError(e) {
    const lines = this.s.s.split('\n');
    const [l, p] = this.s.getPosition();
    const { cp, } = this;
    this.showView(lines, l, p);
    console.error(chalk.bold(
      cp + ' parsing error occurs in line: ' + l + ', ' + 'poistion: ' + p + ';'
    ));
    console.log(e);
  }
}

export default Parser;
