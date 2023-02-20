import path from 'path';
import fs from 'fs';
import Socket from '~/class/Socket';
import getVersionHash from '~/lib/util/getVersionHash';
import getLatestVersion from '~/lib/util/getLatestVersion';
import installPackageFromGit from '~/lib/util/installPackageFromGit';
import installPackageFromTar from '~/lib/util/installPackageFromTar';
import installPackageFromPatch from '~/lib/util/installPackageFromPatch';

async function installPackageCrossLocal(name, version, url) {
  const localPath = path.resolve(process.env.HOME, '.drip', 'package', name);
  const pkgPath = path.resolve('.drip', 'local', 'package', name);
  if (!fs.existsSync(pkgPath)) {
    await installPackageFromGit(version, name);
  } else {
    if (version !== '') {
      const tags = await getTagList(localPath);
      if (tags.every((tag) => tag !== version)) {
        const socket = new Socket();
        const versionHash = getVersionHash();
        const patch = await socket.request([1, name, versionHash[name], version], 'serail', 'buffer');
        await installPackageFromPatch(patch, version, name);
        socket.end();
      } else {
        await installPackageFromGit(version, name);
      }
    }
  }
}

export default async function installPackage(pkg) {
  let [_, name, url, version] = pkg.match(/^\[(\w+)\]\(([\w\-\.\/\:]+)\)(.*)$/);
  version = version.trim();
  const localPath = path.join(process.env.HOME, '.drip', 'package', name);
  if (!fs.existsSync(localPath)) {
    const socket = new Socket();
    const latest = await socket.request([0, name], 'one', 'text');
    const tar = await socket.request([2, name, latest], 'serail', 'buffer');
    await installPackageFromTar(tar, latest, name);
    socket.end();
    console.log('Package ' + '\'' + name + '\'' + ' install successful...');
  } else {
    await installPackageCrossLocal(name, version, url);
    console.log('Package ' + '\'' + name + '\'' + ' update successful...');
  }
}
