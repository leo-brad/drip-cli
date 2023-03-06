import chalk from 'chalk';

export default function yamlTemplate(e) {
  const { type, elem, } = e;
  switch (type) {
    case ':':
      return chalk.gray(':');
    case ' ':
      return ' ';
    case 'key':
      return chalk.blue(elem);
    case 'value':
      return chalk.black(elem);
    case '-':
      return chalk.red('-');
  }
}
