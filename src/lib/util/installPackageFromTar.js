import { execSync, } from 'child_process';
import path from 'path';
import fs from 'fs';

export default function installPackageFromTar(tar, version, local) {
  let shells = [];
  fs.writeFileSync(path.join(local, 'tag.tar.gz'), tar);
  shells.push('cd ' + local);
  shells.push('cat tag.tar.gz | tar xf -');
  shells.push('rm ./tag.tar.gz');
  shells.push('git init');
  shells.push('git add --all');
  shells.push('git commit -m "' + version + '"');
  shells.push('git tag ' + version + ' master');
  execSync(shells.join('&&'));
}
