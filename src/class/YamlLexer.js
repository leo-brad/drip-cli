import Lexer from '~/class/Lexer';

class YamlLexer extends Lexer {
  constructor(...param) {
    super(...param);
  }

  scan(char) {
    switch (this.status) {
      case 0: {
        this.start = char;
        if (char === ' ') {
          return this.quit();
        }
        const code = char.charCodeAt(0);
        if ((
          (code >= 97 && code <= 122) ||
          (code >= 65 && code <= 90) ||
          (code >= 59 && code <= 64) ||
          (code >= 33 && code <= 47) ||
          (code >= 123 && code <= 153)
        ) && char !== '"' && char !== '-' && char !== '('
        ) {
          this.elem = [];
          this.elem.push(char);
          this.status = 1;
          return;
        }
        switch (char) {
          case '"':
            this.elem = [];
            this.status = 2;
            break;
          case '-':
            this.ans.push(this.makeLexer('-'));
            return this.quit();
          case '(':
            this.elem = [];
            this.status = 3;
            break;
          default:
            return this.quit();
        }
        break;
      }
      case 1:
        if (char === ':') {
          this.ans.push(this.makeLexer('key', this.elem.join('')));
          this.ans.push(this.makeLexer(':'));
          return this.quit();
        } else {
          if (char === ' ' || char === '\n' || char === 'EOF') {
            this.ans.push(this.makeLexer('value', this.elem.join('')));
            return this.quit();
          } else {
            this.elem.push(char);
          }
        }
        break;
      case 2:
        if (this.elem.length === 0) {
          if (char === ' ') {
            this.elem.push(char);
          } else {
            return this.quit();
          }
        } else if (this.elem.length >= 1) {
          if (char === '\n') {
            this.ans.push(this.makeLexer('"'));
            this.ans.push(this.makeLexer('comment', this.elem.join('')));
            return this.quit();
          } else {
            this.elem.push(char);
          }
        }
        break;
      case 3: {
        if (char === ')') {
          this.ans.push(this.makeLexer('('));
          this.ans.push(this.makeLexer('unit', this.elem.join('')));
          this.ans.push(this.makeLexer(')'));
          return this.quit();
        } else {
          this.elem.push(char);
        }
        break;
      }
      default:
        return this.quit();
    }
  }
}

export default YamlLexer;
