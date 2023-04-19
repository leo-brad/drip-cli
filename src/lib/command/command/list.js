import chalk from 'chalk';
import path from 'path';
import dynamicHelp from '~/lib/util/dynamicHelp';

export default function list() {
  const localPath = path.resolve('.drip', 'local');
  console.log([
    chalk.bold('Command don\'t be install not yet') + ':',
    ...dynamicHelp(
      path.join(process.env.HOME, '.drip', 'command', 'local'), false,
      ['- start Start drip main program.'],
    ),
    ...dynamicHelp(
      path.join(process.env.HOME, '.drip', 'command', 'client'), false,
      ['- client Start drip client program.'],
    ),
    ...dynamicHelp(
      path.join(process.env.HOME, '.drip', 'command', 'server'), false,
      ['- server Start drip server program.'],
    ),
    ...dynamicHelp(
      path.join(process.env.HOME, '.drip', 'command', 'package'), false,
      ['- package Develop drip package program.'],
    ),
  ].filter((e) => e !== undefined).join('\n'));
}
