function matchChar(l, r) {
  if (l !== r) {
    throw Error('error');
  }
}

class Parser {
  constructor(s) {
    this.s = s;
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

  matchSpareChar() {
    while (true) {
      const c = this.s.glanceChar();
      if (c !== ' ' && c !== '\n') {
        this.s.nextIndex();
        break;
      }
    }
    this.s.nextIndex();
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
        obj[n] = this.parseList();
        break;
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
        this.matchStringEndWith('\n');
        break;
    }
  }

  parseSingleList(obj) {
    this.matchComment();
    this.parseArray(obj);
    try {
      this.matchOneChar('\n');
    } catch (e) {
    }
  }

  parseSingleValue(obj) {
    this.matchComment();
    this.parseValue(obj);
    this.matchOneChar('\n');
    this.matchOneChar('\n');
  }

  parseList() {
    const ans = [];
    try {
      while (this.s.glanceChar() !== '\n') {
        ans.push(this.parseItem());
      }
    } catch (e) {
    }
    return ans;
  }

  parseItem() {
    this.matchOneCharMultiply(' ', 2);
    this.matchOneChar('-');
    this.matchOneChar(' ');
    const item = this.parseStringEndWith('\n');
    this.matchOneChar('\n');
    return item;
  }

  parse() {
    const ans = {};
    try {
      this.parseSingleValue(ans);
      this.parseSingleValue(ans);
      this.parseSingleValue(ans);
      this.parseSingleList(ans);
      this.parseSingleList(ans);
    } catch (e) {
      console.log('e', e);
      const [l, p] = this.s.getPosition();
      console.error('l: ' + l + ', ' + 'p: ' + p);
    }
    return ans;
  }
}

export default Parser;
