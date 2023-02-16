import chalk from 'chalk';
import path from 'path';
import dynamicHelp from '~/lib/util/dynamicHelp';

export default function list() {
  const localPath = path.resolve('.drip', 'local');
  console.log([
    '',
    chalk.bold('Command don\'t be install not yet') + ':',
    ...dynamicHelp(
      path.join(localPath, 'drip-local'), false,
      ['- start Start drip main program.'],
    ),
    ...dynamicHelp(
      path.join(localPath, 'drip-client'), false,
      ['- client Start drip client program.'],
    ),
    ...dynamicHelp(
      path.join(localPath, 'drip-server'), false,
      ['- server Start drip server program.'],
    ),
    '',
  ].join('\n'));
}
