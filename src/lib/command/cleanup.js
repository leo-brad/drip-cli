import fs from 'fs';
import path from 'path';
import { execSync, } from 'child_process';
import iteratorPackagePath from '~/lib/util/iteratorPackagePath';
import getVersionHash from '~/lib/util/getVersionHash';
import getLatestVersion from '~/lib/util/getLatestVersion';

export default function cleanup(...param) {
  const packagePath = path.resolve('.drip', 'local', 'package');
  const versionHash = getVersionHash();
  iteratorPackagePath((p) => {
    const pkgPath = path.join(packagePath, p);
    let shells = [];
    shells.push('cd ' + pkgPath);
    let version = versionHash[p];
    if (version === '') {
      version = getLatestVersion(pkgPath);
    }
    const localPath = path.resolve(process.env.HOME, '.drip', 'package', p);
    shells.push('cd ' + localPath);
    shells.push('git checkout ' + version);
    shells.push('git stash');
    shells.push('rm -rf ./.git');
    shells.push('git init');
    shells.push('git add --all');
    shells.push('git commit -m "' + version +  '"');
    shells.push('git tag ' + version + ' master');
    execSync(shells.join('&&'));
  });
}
