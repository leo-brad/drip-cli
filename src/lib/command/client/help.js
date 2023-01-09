import chalk from 'chalk';

export default function help(...param) {
  console.log([
    '[' + chalk.bold('drip server') + '] command line tip:',
    '',
    '-' + chalk.bold('p') + ', --' + chalk.bold('port') + '  Appoint drip sever run concrete socket port.',
  ].join('\n'));
}
