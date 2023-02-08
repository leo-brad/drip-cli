import chalk from 'chalk';
import '~/lib/util/checkVersion';
import OptionTip from '~/lib/util/OptionTip';

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
    OptionTip('y', 'yes', 'Skip initial question and answer.'),
    '',
    '  - start Start drip main program.',
    '  - client Start drip client program.',
    '  - server Start drip server program.',
    '  - install Install drip packages.',
    '  - upgrade Upgrade drip packages.',
    '  - cleanup Clean up drip packages local cache.',
    '',
    'Use `' + chalk.bold('drip commmand --help') + '` get each command more detail information.',
    'Website [' + chalk.bold('drip doc') + '](' + chalk.bold('https://driptool.com/doc') + ') provide related document. ',
    '',
  ].join('\n'));
}
