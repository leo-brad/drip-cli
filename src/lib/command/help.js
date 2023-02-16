import path from 'path';
import '~/lib/util/checkVersion';
import chalk from 'chalk';
import OptionTip from '~/lib/util/OptionTip';
import dynamicHelp from '~/lib/util/dynamicHelp';
import commandList from '~/lib/util/commandList';

export default function help(...param) {
  const localPath = path.resolve('.drip', 'local');
  console.log([
    '                                ',
    '  ██████╗░██████╗░██╗██████╗░   ',
    '  ██╔══██╗██╔══██╗██║██╔══██╗   ',
    '  ██║░░██║██████╔╝██║██████╔╝   ',
    '  ██║░░██║██╔══██╗██║██╔═══╝░   ',
    '  ██████╔╝██║░░██║██║██║░░░░░   ',
    '  ╚═════╝░╚═╝░░╚═╝╚═╝╚═╝░░░░░   ',
    '                                ',
    chalk.bold('Command line prompt') + ':',
    '  - init  Initial current project as a drip project.',
    '  ' + OptionTip('y', 'yes', 'Skip initial question and init base drip project.'),
    '  - command ' + commandList(['add', 'remove', 'upgrade', 'list']) + ' drip command program.',
    ...dynamicHelp(
      path.join(localPath, 'drip-local'), true,
      ['  - start Start drip main program.'],
    ),
    ...dynamicHelp(
      path.join(localPath, 'drip-client'), true,
      ['  - client Start drip client program.'],
    ),
    ...dynamicHelp(
      path.join(localPath, 'drip-server'), true,
      ['  - server Start drip server program.'],
    ),
    ...dynamicHelp(
      localPath, true,
      ['  - install Install drip packages.'],
    ),
    ...dynamicHelp(
      localPath, true,
      ['  - upgrade Upgrade drip packages.'],
    ),
    ...dynamicHelp(
      localPath, true,
      [
        '  - cleanup Clean up drip project packages local cache.',
        '  ' + OptionTip('a', 'all', 'Clean up current user project local all cache.'),
      ],
    ),
    '',
    'Use `' + chalk.bold('drip commmand --help') + '` get each command more detail information.',
    'Website [' + chalk.bold('drip doc') + '](' + chalk.bold('https://driptool.com/doc') + ') provide related document. ',
    '',
  ].filter((e) => e !== undefined).join('\n'));
}
