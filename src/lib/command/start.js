import { spawn, } from 'child_process';
import path from 'path';
import getConfig from '~/lib/util/getConfig';
import checkPath from '~/lib/util/checkPath';

export default function start(...param) {
  checkPath(path.resolve('.drip', 'local', 'drip-local'));
  const [one, ...rest] = param;
  const config = getConfig();
  const cwd = process.cwd();
  process.chdir(path.resolve('.drip/local/drip-local/'));
  spawn(
    'npx',
    ['electron', 'dist/main.js', JSON.stringify(config), cwd],
    { detached: true, },
  );
}
