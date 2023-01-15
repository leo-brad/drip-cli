import { execSync, } from 'child_process';
import path from 'path';

function buildStatic(project, operates, paths, shells) {
  let srcPath;
  switch (project) {
    case 'drip-cli':
      srcPath = '.';
      break;
    default:
      srcPath = path.join('..', project);
      break;
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
  shells.push('git init');
  shells.push('git add --all');
  shells.push('git gc --force');
  shells.push('git commit -m "[Update]"');
  shells.push('cd ' + cwd)
  shells.push('node ./dist/bin/install.js');
}

function buildEnv() {
  const shells = [];
  shells.push('rm -rf $HOME/.drip/');
  buildStatic('drip-cli', ['build'], ['bin', 'dist', 'asset', 'node_modules'], shells);
  //buildStatic('drip-local', ['build', 'pro'], ['dist', 'node_modules'], shells);
  //buildStatic('drip-package-node', ['build', 'pro'], ['dist'], shells);
  //buildStatic('drip-server', ['build'], ['dist', 'node_modules'], shells);
  //buildStatic('drip-client', ['build', 'pro'], ['dist', 'node_modules'], shells);
  shells.push('node ./dist/bin/install.js');
  shells.push('rm -rf /tmp/example');
  shells.push('mkdir /tmp/example');
  execSync(shells.join('&&'));
}

function buildDrip() {
  const shells = [];
  shells.push('cd /tmp/example/');
  shells.push('unset PREFIX');
  shells.push('. ~/.nvm/nvm.sh');
  shells.push('nvm use v19.3.0');
  shells.push('drip init -y');
  shells.push('drip install');
  execSync(shells.join('&&'));
}

function main() {
  buildEnv();
  buildDrip();
}

main();
