import { execSync, } from 'child_process';
import path from 'path';
import fs from 'fs';
import checkDependence from '~/lib/util/checkDependence';
import getTagList from '~/lib/util/getTagList';
import LocalNetDatabase from '~/class/LocalNetDatabase';
import help from '~/lib/command/help';

export default async function installPackageFromTar(tar, version, name) {
  await checkDependence(['cd', 'cat', 'rm', 'git']);
  let shells = [];
  const localPath = path.resolve(process.env.HOME, '.drip', 'package', name);
  if (!fs.existsSync(localPath)) {
    fs.mkdirSync(localPath);
  }
  fs.writeFileSync(path.join(localPath, 'tag.tar.gz'), tar);
  shells.push('cd ' + localPath);
  shells.push('cat tag.tar.gz | tar xf -');
  shells.push('rm ./tag.tar.gz');
  shells.push('git init');
  shells.push('git add --all');
  shells.push('git commit -m "' + version + '"');
  shells.push('git tag ' + version + ' master');
  execSync(shells.join('&&'));
  new LocalNetDatabase().add(name, version);
  const pkgPath = path.resolve('.drip', 'local', 'package', name);
  if (fs.existsSync(pkgPath)) {
    fs.rmdirSync(pkgPath, { recursive: true, });
  }
  fs.cpSync(localPath, pkgPath, {
    filter: (p) => p !== path.join(pkgPath, '.git'),
    recursive: true,
  });
}
