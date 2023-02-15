import fs from 'fs';
import path from 'path';
import { execSync, } from 'child_process';
import LocalNetDatabase from '~/class/LocalNetDatabase';
import iteratorPackagePath from '~/lib/util/iteratorPackagePath';
import getVersionHash from '~/lib/util/getVersionHash';
import getLatestVersion from '~/lib/util/getLatestVersion';
import parseOption from '~/lib/util/parseOption';
import getTagList from '~/lib/util/getTagList';
import checkDependence from '~/lib/util/checkDependence';
import checkPath from '~/lib/util/checkPath';

function cleanupLocal(pkgPath, localPath, version) {
  let shells = [];
  shells.push('cd ' + pkgPath);
  shells.push('cd ' + localPath);
  shells.push('git checkout ' + version);
  shells.push('git stash');
  shells.push('rm -rf ./.git');
  shells.push('git init');
  shells.push('git add --all');
  shells.push('git commit -m "' + version +  '"');
  shells.push('git tag ' + version + ' master');
  execSync(shells.join('&&'));
}

export default function cleanup(...param) {
  checkPath(path.resolve('.drip'));
  checkDependence(['git']);
  const options = parseOption(...param);
  const packagePath = path.resolve('.drip', 'local', 'package');
  const versionHash = getVersionHash();
  const localNetDatabase = new LocalNetDatabase();
  iteratorPackagePath((p) => {
    const pkgPath = path.join(packagePath, p);
    const localPath = path.resolve(process.env.HOME, '.drip', 'package', p);
    let version = versionHash[p];
    if (version === '') {
      version = getLatestVersion(pkgPath);
    }
    if (options.a || options.all) {
      cleanupLocal(pkgPath, localPath, version);
      localNetDatabase.empty();
    } else {
      getTagList(localPath).forEach((v) => {
        localNetDatabase.plus(p, v);
        const count = localNetDatabase.get(p, v);
        if (count <= 0) {
          cleanupLocal(pkgPath, localPath, v);
          localNetDatabase.clear(p);
        }
      });
    }
  });
}
