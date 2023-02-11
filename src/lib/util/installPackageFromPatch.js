import path from 'path';
import fs from 'fs';
import { execSync, } from 'child_process'
import LocalNetDatabase from '~/class/LocalNetDatabase';

export default function installPackageFromPatch(patch, version, name) {
  const localPath = path.resolve(process.env.HOME, '.drip', 'package', name);
  fs.writeFileSync(path.resolve(localPath, 'patch'), patch);
  const shells = [];
  shells.push('cd ' + localPath);
  shells.push('git apply patch');
  shells.push('rm patch');
  shells.push('git add --all');
  shells.push('git commit -m "' + version + '"');
  shells.push('git tag ' + version + ' master');
  execSync(shells.join('&&'));
  new LocalNetDatabase().add(name, version);
  const pkgPath = path.resolve('.drip', 'local', 'package', name);
  if (fs.existsSync(pkgPath)) {
    fs.rmSync(pkgPath, { recursive: true, });
  }
  fs.cpSync(localPath, pkgPath, {
    filter: (p) => p !== path.join(pkgPath, '.git'),
    recursive: true,
  });
}
