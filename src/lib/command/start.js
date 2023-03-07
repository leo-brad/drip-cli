import { spawn, } from 'child_process';
import path from 'path';
import getConfig from '~/lib/util/getConfig';
import checkPath from '~/lib/util/checkPath';
import help from '~/lib/command/help';
import checkDependence from '~/lib/util/checkDependence';
import checkGitInit from '~/lib/util/checkGitInit';

export default async function start(...param) {
  await checkDependence(['git']);
  checkGitInit();
  checkPath(path.join(process.env.HOME, '.drip', 'command', 'local'), help);
  const [one, ...rest] = param;
  const config = getConfig();
  const cwd = process.cwd();
  process.chdir(path.join(process.env.HOME, '.drip', 'command', 'local'));
  spawn(
    'npx',
    ['electron', 'dist/main.js', JSON.stringify(config), cwd],
    { detached: true, },
  );
}
