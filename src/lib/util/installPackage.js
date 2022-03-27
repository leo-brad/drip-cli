import { execSync, } from 'child_process';
import path from 'path';
import fs from 'fs';

export default function installPackage(pkg) {
  const packagePath = path.join('.drip', 'local', 'package', pkg);
  if (!fs.existsSync(packagePath)) {
    execSync(
      'git clone /tmp/' + 'drip-package-' + pkg + '-static' +
      '/.git .drip/local/package/' + pkg + '/',
    );
    console.log('Package ' + '\'' + pkg + '\'' + ' install successful...');
  } else {
    console.error('Package ' + '\'' + pkg + '\'' + ' already installed...');
  }
}
