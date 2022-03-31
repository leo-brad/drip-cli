class Scaner {
  constructor(s) {
    this.s = s;
    this.i = -1;
    this.l = 1;
    this.p = 1;
  }

  nextIndex() {
    const { i, } = this;
    const c = this.s.charAt(i);
    switch (c) {
      case '\n':
        this.l += 1;
        this.p = 1;
        break;
      default:
        this.p += 1;
        break;
    }
    this.i += 1;
  }

  getPosition() {
    const { l, p, } = this;
    return [l, p];
  }

  glanceChar() {
    const { i, } = this;
    return this.s.charAt(i + 1);
  }

  currentChar() {
    const { i, } = this;
    return this.s.charAt(i);
  }

  nextChar() {
    this.nextIndex();
    const { i, } = this;
    return this.s.charAt(i);
  }
}

export default Scaner;
