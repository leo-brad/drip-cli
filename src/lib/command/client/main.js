import { spawn, } from 'child_process';
import path from 'path';

export default function main() {
  const cwd = process.cwd();
  process.chdir(path.resolve('.drip/local/drip-client/'));
  spawn(
    'npx', ['electron', 'dist/main.js', ...rest],
    { detached: true, },
  );
}
