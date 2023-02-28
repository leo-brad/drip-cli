export default function parsePackage(string) {
  let status;
  const ans = {};
  for (let i = 0; i <= string.length; i += 1) {
    let char = string.charAt(i);
    if (i === string.length) {
      char = 'EOF';
    }
    switch (status) {
      case 0:
        if (char !== ']') {
          ans.pkg.push(char);
        } else {
          ans.pkg = ans.pkg.join('');
          status = 1;
        }
        break;
      case 1:
        if (char === '(') {
          ans.location = [];
          status = 2;
        } else {
          throw Error('package formate type two parse error.');
        }
        break;
      case 2:
        if (char !== ')') {
          ans.location.push(char);
        } else {
          ans.location = ans.location.join('');
          return ans;
        }
        break;
      case 3:
        if (char === ' ') {
          status = 4;
          ans.version = [];
          ans.pkg = ans.pkg.join('');
        } else if (char === 'EOF') {
          ans.pkg = ans.pkg.join('');
          return ans;
        } else {
          ans.pkg.push(char);
        }
        break;
      case 4:
        if (char !== 'EOF') {
          ans.version.push(char);
        } else {
          ans.version = ans.version.join('');
          return ans;
        }
        break;
      default: {
        if (char === '[') {
          ans.pkg = [];
          status = 0;
        } else {
          ans.pkg = [];
          ans.pkg.push(char);
          status = 3;
        }
        break;
      }
    }
  }
}
