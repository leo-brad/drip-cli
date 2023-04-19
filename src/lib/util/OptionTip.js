import chalk from 'chalk';

export default function optionTip(simple, complex, tip, direct) {
  let prefix = '';
  if (direct) {
    prefix = '-';
  } else {
    prefix = '| -'
  }
  return prefix + chalk.bold(simple) + ', --' + chalk.bold(complex) + '  ' + tip;
}
