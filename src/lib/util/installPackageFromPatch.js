import path from 'path';
import fs from 'fs';
import { execSync, } from 'child_process'

export default function installPackageFromPatch(patch, version, local) {
  fs.writeFileSync(path.resolve(local, 'patch'), patch);
  const shells = [];
  shells.push('cd ' + local);
  shells.push('git apply patch');
  shells.push('rm patch');
  shells.push('git add --all');
  shells.push('git commit -m "' + version + '"');
  shells.push('git tag ' + version + ' master');
  execSync(shells.join('&&'));
}
