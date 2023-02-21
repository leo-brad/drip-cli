import { execSync, } from 'child_process';
import path from 'path';
import fs from 'fs';
import checkDependence from '~/lib/util/checkDependence';
import help from '~/lib/command/help';

export default async function installPackageFromGit(version, name) {
  await checkDependence(['cd', 'git']);
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
