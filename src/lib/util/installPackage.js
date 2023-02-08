import installPackageFromGit from '~/lib/util/installPackageFromGit';
import installPackageFromPatch from '~/lib/util/installPackageFromPatch';

async function installPackageCrossLocal(name, version, url) {
  const local = path.join(process.env.HOME, '.drip', 'package', name);
  const socket = new Socket();
  if (version !== '') {
    const tags = getTagList(pkgPath);
    if (tags.every((tag) => tag !== version)) {
      fs.rmdirSync(local, { recursive: true });
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
  await installPackageCrossLocal(name, version, url);
  if (!fs.existsSync(packagePath)) {
    console.log('Package ' + '\'' + name + '\'' + ' install successful...');
  } else {
    console.error('Package ' + '\'' + name + '\'' + ' update installed...');
  }
}
