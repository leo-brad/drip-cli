import chalk from 'chalk';

import chalk from 'chalk';

export default function help(...param) {
  console.log([
    '[' + chalk.bold('drip server') + chalk.bold('] command line tip') + ':',
    '',
    '-' + chalk.bold('p') + ', --' + chalk.bold('port') + '  Appoint drip client connect concrete socket port.',
  ].join('\n'));
}
