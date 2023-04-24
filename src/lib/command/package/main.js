import { spawn, } from 'child_process';
import path from 'path';

export default function main(...rest) {
  spawn(
    'node', [path.join(process.env.HOME, '.drip', 'command', 'package', 'dist', 'index.js'), ...rest],
    { stdio: 'inherit', detached: true, },
  );
}
