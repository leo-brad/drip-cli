import { execSync, } from 'child_process';
import path from 'path';
import fs from 'fs';
import getTagList from '~/lib/util/getTagList';
import LocalNetDatabase from '~/class/LocalNetDatabase';

export default function installPackageFromTar(tar, version, name) {
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