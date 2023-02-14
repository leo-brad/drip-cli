import '~/lib/util/checkVersion';
import chalk from 'chalk';
import OptionTip from '~/lib/util/OptionTip';
import dynamicHelp from '~/lib/util/dynamicHelp';

export default function help(...param) {
  const localPath = path.resolve('.drip', 'local');
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
    OptionTip('a', 'all', 'Skip initial question and install all commmand.'),
    '',
    dynamicHelp(
      path.join(localPath, 'drip-local'),
      '  - start Start drip main program.'
    ),
    dynamicHelp(
      path.join(localPath, 'drip-client'),
      '  - client Start drip client program.'
    ),
    dynamicHelp(
      path.join(localPath, 'drip-server'),
      '  - server Start drip server program.'
    ),
    '  - install Install drip packages.',
    '  - upgrade Upgrade drip packages.',
    '  - cleanup Clean up drip project packages local cache.',
    OptionTip('a', 'all', 'Clean up current user project local all cache.'),
    '',
    'Use `' + chalk.bold('drip commmand --help') + '` get each command more detail information.',
    'Website [' + chalk.bold('drip doc') + '](' + chalk.bold('https://driptool.com/doc') + ') provide related document. ',
    '',
  ].filter((e) => e !== undefined).join('\n'));
}
