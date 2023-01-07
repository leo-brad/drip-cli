import { spawn, } from 'child_process';
import path from 'path';
import getConfig from '~/lib/util/getConfig';

export default function main(...rest) {
  const config = getConfig();
  const cwd = process.cwd();
  process.chdir(path.resolve('.drip/local/drip-server/'));
  spawn(
    'node',
    ['dist/index.js', JSON.stringify(config), cwd, ...rest],
    { detached: true, },
  );
}
