import path from 'path';
import fs from 'fs';
import Socket from '~/class/Socket';
import getLocalConfig from '~/lib/util/getLocalConfig';
import compareVersion from '~/lib/util/compareVersion';
import getLatestVersion from '~/lib/util/getLatestVersion';
import installPackage from '~/lib/util/installPackage';
import installPackageFromPatch from '~/lib/util/installPackageFromPatch';
import iteratorConfigPackage from '~/lib/util/iteratorConfigPackage';
import checkPath from '~/lib/util/checkPath';
import help from '~/lib/command/help';
import global from '~/obj/global';

async function upgradePackageCrossLocal(name, version, url) {
  const local = path.resolve('.drip', 'local', 'package', name);
  const socket = new Socket();
  const latest = await socket.request([0, 'pkg', name], 'one', 'text');
  const result = compareVersion(
    await getLatestVersion(local), latest, (v1, v2) => v1 >= v2
  );
  if (result.some((flag) => !flag)) {
    const current = getLatestVersion(local);
    const patch = await socket.request([1, name, current, latest], 'serail', 'buffer');
    await installPackageFromPatch(patch, latest, name);
    console.error('Package ' + '\'' + name + '\'' + ' upgrade...');
  }
  socket.end();
}

export default async function upgrade(...param) {
  checkPath(path.resolve('.drip'), help);
  const { packageFileServer,  } = getLocalConfig();
  global.location = packageFileServer;
  let count = 0;
  await iteratorConfigPackage(async (p) => {
    let {  pkg, location, version, } = p;
    const pkgPath = path.resolve('.drip', 'local', 'package', pkg);
    if (!fs.existsSync(pkgPath)) {
      installPackage(pkg);
      count += 1;
    } else {
      if (version === undefined) {
        await upgradePackageCrossLocal(pkg, version, location);
      }
    }
  });
  if (count === 0) {
    console.log('Every package to latest...');
  }
}
