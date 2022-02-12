class Scaner {
  constructor(s) {
    this.s = s;
    this.i = 0;
  }

  nextIndex() {
    this.i += 1;
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
