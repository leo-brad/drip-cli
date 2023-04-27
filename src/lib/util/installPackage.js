import path from 'path';
import fs from 'fs';
import Socket from '~/class/Socket';
import getVersionHash from '~/lib/util/getVersionHash';
import getLatestVersion from '~/lib/util/getLatestVersion';
import installPackageFromGit from '~/lib/util/installPackageFromGit';
import installPackageFromTar from '~/lib/util/installPackageFromTar';
import installPackageFromPatch from '~/lib/util/installPackageFromPatch';

async function installPackageCrossLocal(pkg, version) {
  const localPath = path.resolve(process.env.HOME, '.drip', 'package', pkg);
  const pkgPath = path.resolve('.drip', 'local', 'package', pkg);
  if (!fs.existsSync(pkgPath)) {
    await installPackageFromGit(version, pkg);
  } else {
    if (version !== undefined) {
      const tags = await getTagList(localPath);
      if (tags.every((tag) => tag !== version)) {
        const socket = new Socket();
        const versionHash = getVersionHash();
        const patch = await socket.request([1, 'pkg', pkg, versionHash[pkg], version], 'serail', 'buffer');
        await installPackageFromPatch(patch, version, pkg);
        socket.end();
      } else {
        await installPackageFromGit(version, pkg);
      }
    }
  }
}

export default async function installPackage(p) {
  let { pkg, location, version, } = p;
  if (location !== undefined) {
    const pkgPath = path.resolve('.drip', 'local', 'package',pkg);
    execSync('git clone ' + location + ' ' + pkgPath);
  } else {
    const localPath = path.join(process.env.HOME, '.drip', 'package', pkg);
    if (!fs.existsSync(localPath)) {
      const socket = new Socket();
      const latest = await socket.request([0, 'pkg', pkg], 'one', 'text');
      const tar = await socket.request([2, 'pkg', pkg, latest], 'serail', 'buffer');
      await installPackageFromTar(tar, latest, pkg);
      socket.end();
      console.log('Package ' + '\'' + pkg + '\'' + ' install successful...');
    } else {
      await installPackageCrossLocal(pkg, version);
      console.log('Package ' + '\'' + pkg + '\'' + ' update successful...');
    }
  }
}
