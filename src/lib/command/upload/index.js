import path from 'path';
import { spawn, } from 'child_process';
import checkPath from '~/lib/util/checkPath';
import help from '~/lib/command/help';
import checkDependence from '~/lib/util/checkDependence';

export default async function upload(...param) {
  checkPath(path.join(process.env.HOME, '.drip', 'command', 'upload'), help);
  await checkDependence(['rm', 'tar']);
  const cwd = process.cwd();
  process.chdir(path.join(process.env.HOME, '.drip', 'command', 'upload'));
  spawn(
    'node', [path.join(process.env.HOME, '.drip', 'command', 'upload', 'dist', 'index.js'), cwd, ...param],
    { stdio: 'inherit', detached: true, },
  );
}
