import path from 'path';
import fs from 'fs';
import Socket from '~/class/Socket';
import getLatestVersion from '~/lib/util/getLatestVersion';
import installPackageFromGit from '~/lib/util/installPackageFromGit';
import installPackageFromTar from '~/lib/util/installPackageFromTar';
import installPackageFromPatch from '~/lib/util/installPackageFromPatch';

async function installPackageCrossLocal(name, version, url) {
  const local = path.join(process.env.HOME, '.drip', 'package', name);
  const socket = new Socket();
  if (version !== '') {
    const tags = getTagList(local);
    if (tags.every((tag) => tag !== version)) {
      const patch = await socket.request([1, name], name, local);
      installPackageFromPatch(patch, version);
    } else {
      installPackageFromGit(version);
    }
  }
}

export default async function installPackage(pkg) {
  let [_, name, url, version] = pkg.match(/^\[(\w+)\]\(([\w\-\.\/\:]+)\)(.*)$/);
  const packagePath = path.join('.drip', 'local', 'package', name);
  if (!fs.existsSync(packagePath)) {
    const socket = new Socket();
    const latest = await socket.request([0, name]);
    const tar = await socket.request([2, name, latest], 'buffer');
    fs.mkdirSync(packagePath);
    await installPackageFromTar(tar, latest, packagePath);
    socket.end();
    console.log('Package ' + '\'' + name + '\'' + ' install successful...');
  } else {
    await installPackageCrossLocal(name, version, url);
    console.error('Package ' + '\'' + name + '\'' + ' update installed...');
  }
}
