import { spawn, } from 'child_process';
import path from 'path';
import getConfig from '~/lib/util/getConfig';
import checkPath from '~/lib/util/checkPath';
import help from '~/lib/command/help';

export default function start(...param) {
  checkPath(path.join(process.env.HOME, '.drip', 'command', 'drip-local'), help);
  const [one, ...rest] = param;
  const config = getConfig();
  const cwd = process.cwd();
  process.chdir(path.join(process.env.HOME, '.drip'));
  spawn(
    'npx',
    ['electron', 'dist/main.js', JSON.stringify(config), cwd],
    { detached: true, },
  );
}
