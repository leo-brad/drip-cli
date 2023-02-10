import path from 'path';
import fs from 'fs';
import { execSync, } from 'child_process';
import copyIgnore from '~/lib/util/copyIgnore';
import emptyDirectory from '~/lib/util/emptyDirectory';

export default function installPackageFromGit(version, name) {
  const localPath = path.resolve(process.env.HOME, '.drip', 'package', name);
  const shells = [];
  shells.push('cd ' + localPath);
  shells.push('git checkout ' + version);
  shells.push('git stash');
  execSync(shells.join('&&'));
  const pkgPath = path.resolve('.drip', 'local', 'package', name);
  if (fs.existsSync(pkgPath)) {
    fs.rmdirSync(pkgPath, { recursive: true, });
  }
  fs.cpSync(localPath, pkgPath, {
    filter: (p) => p !== path.join(pkgPath, '.git'),
    recursive: true,
  });
}
