import { execSync, } from 'child_process';
import path from 'path';
import fs from 'fs';

export default function installPackage(pkg) {
  execSync(
    'git clone /tmp/' + 'drip-package-' + pkg + '-static' +
    '/.git .drip/local/package/' + pkg + '/',
  );
  console.log('Package ' + pkg + ' install successful...');
}
