import { spawn, } from 'child_process';
import path from 'path';

export default function main(...rest) {
  const cwd = process.cwd();
  process.chdir(path.join(process.env.HOME, '.drip', 'command', 'client'));
  spawn(
    'npx', ['electron', 'dist/main.js', ...rest],
    { detached: true, },
  );
}
