import installPackageFromGit from '~/lib/util/installPackageFromGit';
import installPackageFromPatch from '~/lib/util/installPackageFromPatch';

async function installPackageCrossLocal(name, version, url) {
  const local = path.join(process.env.HOME, '.drip', 'package', name);
  const socket = new Socket();
  if (version !== '') {
    const tags = getTagList(pkgPath);
    if (tags.every((tag) => tag !== version)) {
      const patch = await socket.request([1, name], name, local);
      installPackageFromPatch(patch, version);
    } else {
      installPackageFromGit(version);
    }
  }
}

export async function installPackage(pkg) {
  let [_, name, url, version] = pkg.match(/^\[\w+\]\([\w\-\.\/\:]+\)(.*)$/);
  const packagePath = path.join('.drip', 'local', 'package', name);
  if (!fs.existsSync(packagePath)) {
    const local = path.join(process.env.HOME, '.drip', 'package', name);
    const socket = new Socket();
    const latest = await socket.request([0, name]);
    const result = compareVersion(
      getPackageLatestVersion(pkg, local), lastestVersion, (v1, v2) => v1 >= v2
    );
    if (!result.some((flag) => flag)) {
      const tar = await socket.request([2, name], name, latest);
      await installPackageFromTar(tar, version, local);
    }
    socket.end();
    console.log('Package ' + '\'' + name + '\'' + ' install successful...');
  } else {
    await installPackageCrossLocal(name, version, url);
    console.error('Package ' + '\'' + name + '\'' + ' update installed...');
  }
}
