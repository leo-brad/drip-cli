import { execSync, } from 'child_process';
import path from 'path';

function buildStatic(project, operates, paths, shells) {
  let srcPath;
  if (project === 'drip-cli') {
    srcPath = '.';
  } else {
    srcPath = path.resolve('..', project);
  }
  const cwd = process.cwd();
  const staticPath = path.join('/', 'tmp', project + '-static');
  shells.push('cd ' + srcPath);
  operates.forEach((p) => {
    shells.push('yarn run ' + p);
  });
  shells.push('rm -rf ' + staticPath);
  shells.push('mkdir ' + staticPath);
  process.chdir(cwd);
  paths.forEach((p) => {
    shells.push('cp -a -R ' + path.join(srcPath, p) + ' ' + staticPath);
  });
  shells.push('cd ' + staticPath);
  shells.push('rm -rf .git');
  shells.push('cd ' + cwd)
}

function buildDrip() {
  const shells = [];
  //shells.push('rm -rf $HOME/.drip/');
  //buildStatic('drip-cli', ['build'], ['bin', 'dist', 'asset', 'node_modules', 'package', 'db', 'command', 'config'], shells);
  //buildStatic('drip-local', ['build', 'pro'], ['dist', 'node_modules'], shells);
  //buildStatic('drip-package-node', ['build', 'pro'], ['dist'], shells);
  //buildStatic('drip-server', ['build'], ['dist', 'node_modules'], shells);
  //buildStatic('drip-client', ['build', 'pro'], ['dist', 'node_modules'], shells);
  buildStatic('drip-package', ['build'], ['dist', 'node_modules'], shells);
  //shells.push('node ./dist/bin/install.js');
  execSync(shells.join('&&'));
}

function buildExample() {
  const shells = [];
  shells.push('rm -rf /tmp/example');
  shells.push('mkdir /tmp/example');
  shells.push('cd /tmp/example/');
  shells.push('unset PREFIX');
  shells.push('. ~/.nvm/nvm.sh');
  shells.push('nvm use v19.3.0');
  shells.push('drip init -y');
  execSync(shells.join('&&'));
}

buildDrip();
//buildExample();
