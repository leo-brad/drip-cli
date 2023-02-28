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
          ans.package.push(char);
        } else {
          ans.package = ans.package.join('');
          status = 1;
        }
        break;
      case 1:
        if (char === '(') {
          ans.location = [];
          status = 2;
        } else {
          throw Error('package formate No.2 parse error.');
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
          ans.package = ans.package.join('');
        } else if (char === 'EOF') {
          ans.package = ans.package.join('');
          return ans;
        } else {
          ans.package.push(char);
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
          ans.package = [];
          status = 0;
        } else {
          ans.package = [];
          ans.package.push(char);
          status = 3;
        }
        break;
      }
    }
  }
}
