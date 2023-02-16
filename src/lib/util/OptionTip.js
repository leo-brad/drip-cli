import chalk from 'chalk';

export default function optionTip(simple, complex, tip) {
  return '| -' + chalk.bold(simple) + ', --' + chalk.bold(complex) + '  ' + tip;
}
