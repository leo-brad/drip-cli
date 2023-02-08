import chalk from 'chalk';

export default function OptionTip(simple, complex, tip) {
  return '  | -' + chalk.bold(simple) + ', --' + chalk.bold(complex) + '  ' + tip;
}
