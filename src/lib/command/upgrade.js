import path from 'path';
import Socket from '~/class/Socket';
import installPackageFromPatch from '~/lib/util/installPackageFromPatch';
import iteratorPackagePath from '~/lib/util/iteratorPackagePath';
import getVersionHash from '~/lib/util/getVersionHash';

async function upgradePackageCrossLocal(name, version, url) {
  const local = path.join(process.env.HOME, '.drip', 'package', name);
  const socket = new Socket();
  const latest = await socket.request([0, name]);
  const result = compareVersion(
    getPackageLatestVersion(pkg, local), lastestVersion, (v1, v2) => v1 >= v2
  );

  if (!result.some((flag) => flag)) {
    const versionHash = getVersionHash();
    const current =  versionHash[name];
    const patch = await socket.request([1, name], name, latest, current);
    installPackageFromPatch(patch, version);
  }
  socket.end();
}

export default async function upgrade(...param) {
  iteratorPackagePath(async (p) => {
    let [_, name, url, version] = pkg.match(/^\[\w+\]\([\w\-\.\/\:]+\)(.*)$/);
    version = version.trim();
    if (version === '') {
      await upgradePackageCrossLocal(name, version, url);
      if (!fs.existsSync(packagePath)) {
        console.log('Package ' + '\'' + name + '\'' + ' install successful...');
      } else {
        console.error('Package ' + '\'' + name + '\'' + ' update installed...');
      }
    }
  });
}
