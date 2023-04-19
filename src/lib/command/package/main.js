import { spawn, } from 'child_process';
import path from 'path';

export default function main(...rest) {
  const cwd = process.cwd();
  process.chdir(path.join(process.env.HOME, '.drip', 'command', 'package'));
  spawn(
    'node', ['dist/index.js', ...rest], { stdio: 'inherit', },
  );
}
