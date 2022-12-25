import { execSync, } from 'child_process';
import path from 'path';
import fs from 'fs';

export default function installPackage(pkg) {
  const [_, name, url] = pkg.match(/^\[(\w+)\]\(([\w\-\.\/\:]+)\)$/);
  const packagePath = path.join('.drip', 'local', 'package', pkg);
  if (!fs.existsSync(packagePath)) {
    try {
      execSync(
        'git clone ' + url + ' ' + '.drip/local/package/' + name + '/',
      );
    } catch (e) {
      console.error(chalk.bold('Execution `git clone` fail; please check package address.'));
    }
    console.log('Package ' + '\'' + pkg + '\'' + ' install successful...');
  } else {
    console.error('Package ' + '\'' + pkg + '\'' + ' already installed...');
  }
}
