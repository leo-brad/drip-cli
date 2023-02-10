import path from 'path';
import fs from 'fs';
import Socket from '~/class/Socket';
import getConfig from '~/lib/util/getConfig';
import compareVersion from '~/lib/util/compareVersion';
import getLatestVersion from '~/lib/util/getLatestVersion';
import installPackage from '~/lib/util/installPackage';
import installPackageFromPatch from '~/lib/util/installPackageFromPatch';
import iteratorConfigPackage from '~/lib/util/iteratorConfigPackage';
import global from '~/obj/global';

async function upgradePackageCrossLocal(name, version, url) {
  const local = path.resolve('.drip', 'local', 'package', name);
  const socket = new Socket();
  const latest = await socket.request([0, name]);
  const result = compareVersion(
    getLatestVersion(local), latest, (v1, v2) => v1 >= v2
  );
  if (result.some((flag) => !flag)) {
    const current = getLatestVersion(local);
    const patch = await socket.request([1, name, latest, current], 'buffer');
    installPackageFromPatch(patch, latest, local);
    console.error('Package ' + '\'' + name + '\'' + ' upgrade installed...');
  }
  socket.end();
}

export default async function upgrade(...param) {
  const { packageFileServer,  } = getConfig();
  global.location = packageFileServer;
  iteratorConfigPackage(async (pkg) => {
    let [_, name, url, version] = pkg.match(/^\[(\w+)\]\(([\w\-\.\/\:]+)\)(.*)$/);
    const pkgPath = path.resolve('.drip', 'local', 'package', name);
    if (!fs.existsSync(pkgPath)) {
      installPackage(pkg);
    } else {
      version = version.trim();
      if (version === '') {
        await upgradePackageCrossLocal(name, version, url);
      }
    }
  });
}
