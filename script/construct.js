const cwd = process.cwd();

function buildStatic(project, operates, paths) {
  const shells = [];
  let srcPath;
  switch (project) {
    case 'drip-cli':
      srcPath = '.';
      break;
    default:
      srcPath = path.join('..', project);
      break;
  }
  const staticPath = path.join('/', 'tmp', project + '-static');
  console.log('[Build] ' + staticPath);
  shells.push('cd ' + srcPath);
  operates.forEach((p) => {
    shells.push('yarn ' + p);
  });
  shells.push('rm -rf ' + staticPath);
  shells.push('mkdir ' + staticPath);
  process.chdir(cwd);
  paths.forEach((p) => {
    shells.push('cp -a -R ' + path.join(srcPath, p) + ' ' + staticPath);
  });
  shells.push('cd ' + staticPath);
  shells.push('rm -rf .git');
  shells.push('git init');
  shells.push('git add --all');
  shells.push('git gc --force');
  shells.push('git commit -m "[Update]"');
  shells.push('cd ' + cwd)
  execScript(shells.join('&&'));
}

function makeExample() {
  const shells = [];
  shells.push('node ./dist/bin/install.js');
  shells.push('rm -rf /tmp/example');
  shells.push('mkdir /tmp/example');
  execScript(shells.join('&&'));
}

function constructDrip() {
  //buildStatic('drip-cli', ['build'], ['bin', 'dist', 'asset', 'node_modules']);
  buildStatic('drip-local', ['build', 'pro'], ['dist', 'node_modules']);
  buildStatic('drip-package-node', ['build', 'pro'], ['dist']);
  buildStatic('drip-server', ['build'], ['dist', 'node_modules']);
  buildStatic('drip-client', ['build', 'pro'], ['dist', 'node_modules']);
}

function execScript(script) {
  console.log(script);
  child_process.execSync(script);
  console.log('finish');
}

function main() {
  constructDrip();
  makeExample();
  console.log('finish...');
}

main();
