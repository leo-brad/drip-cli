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
    '  - init  Initial current project as a drip project.',
    '    | -' + chalk.bold('y') + ' --' + chalk.bold('yes') + ' Skip initial question and answer.',
    '',
    '  - start Start drip main program.',
    '  - client Start drip client program.',
    '  - server Start drip server program.',
    '',
    'Use `' + chalk.bold('drip commmand --help') + '` get each command more detail information.',
    'Website [' + chalk.bold('drip doc') + '](' + chalk.bold('https://driptool.com/doc') + ') provide related document. ',
    '',
  ].join('\n'));
}
