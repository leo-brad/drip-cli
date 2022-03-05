class Parser {
  constructor(s) {
    this.s = s;
  }

  matchChar(l, r) {
    if (l !== r) {
      throw Error('error');
    }
  }

  matchOneChar(c) {
    this.matchChar(this.s.nextChar(), c);
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

  matchLine() {
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

  parseBold() {
    this.matchOneCharMultiply('*', 2);
    const string = this.parseStringEndWith('*');
    this.matchOneCharMultiply('*', 2);
    return string;
  }

  parseList() {
    const ans = [];
    while (this.s.glanceChar() !== '\n') {
      ans.push(this.parseItem());
    }
    return ans;
  }

  parseItem() {
    this.matchOneCharMultiply(' ', 2);
    this.matchOneChar('-');
    this.matchOneChar(' ');
    const item = this.parseStringEndWith('\n');
    this.matchLine();
    return item;
  }

  parseFirstHead() {
    this.matchChar(this.s.currentChar(), '^');
    this.matchOneChar('(');
    const name = this.parseName();
    this.matchOneChar(')');
    this.matchSeriesLine('-', 3);
    this.matchLine();
    return name;
  }

  parseSecondHead() {
    const name = this.parseName();
    this.matchSeriesLine('=', 3);
    return name;
  }

  parseSecondContentMultiply(obj) {
    while (this.s.glanceChar() !== '\n') {
      this.parseSecondContent(obj);
      try {
        this.matchLine();
      } catch (e) {
        break;
      }
    }
    return obj;
  }

  parseSecondContent(obj) {
    const key = this.parseSecondHead();
    this.matchLine();
    switch (key) {
      case 'interval':
      case 'minMem':
      case 'adjustCore':
        obj[key] = this.parseBold();
        break;
      case 'ignores':
      case 'packages':
        obj[key] = this.parseList();
        break;
    }
    this.matchLine();
    this.matchSeriesLine('-', 3);
  }

  parse() {
    const ans = {};
    const key = this.parseFirstHead().toLowerCase();
    ans[key] = {};
    this.parseSecondContentMultiply(ans[key]);
    return ans;
  }
}

export default Parser;
