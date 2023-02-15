import path from 'path';
import fs from 'fs';
import help from '~/lib/command/help';

export default function checkPath(path, cb) {
  if (!fs.existsSync(path)) {
    help();
    process.exit(0);
  }
}
