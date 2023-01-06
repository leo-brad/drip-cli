import chalk from 'chalk';
import '~/lib/util/checkVersion';

export default function help(...param) {
  console.log([
    '                                ',
    '                                ',
    '  ██████╗░██████╗░██╗██████╗░   ',
    '  ██╔══██╗██╔══██╗██║██╔══██╗   ',
    '  ██║░░██║██████╔╝██║██████╔╝   ',
    '  ██║░░██║██╔══██╗██║██╔═══╝░   ',
    '  ██████╔╝██║░░██║██║██║░░░░░   ',
    '  ╚═════╝░╚═╝░░╚═╝╚═╝╚═╝░░░░░   ',
    '                                ',
    '  ' + chalk.bold('Command line prompt') + ':',
    '                                ',
    '  - init                        ',
    '  - start                       ',
    '  - client                      ',
    '  - server                      ',
    '                                ',
    'Use `' + chalk.bold('drip commmand --help') + '` get each command more detail information.',
    'Website [' + chalk.bold('drip doc') + '](' + chalk.bold('https://driptool.com/doc') + ') provide related document. ',
    '',
  ].join('\n'));
}
