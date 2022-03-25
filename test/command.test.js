import { execSync, } from 'child_process';
import path from 'path';

function buildStatic(project, operates, paths, shells) {
  let srcPath;
  switch (project) {
    case 'drip-cli':
      srcPath = path.join('.');
      break;
    default:
      srcPath = path.join('..', project);
      break;
  }
  console.log('srcPath', srcPath);
  const cwd = process.cwd();
  const staticPath = path.join('/', 'tmp', project + '-staitc');
  shells.push('cd ', srcPath);
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
  shells.push('git commit -m "[Update]"');
  shells.push('cd ' + cwd)
}

beforeAll(() => {
  const shells = [];
  shells.push('rm -rf $HOME/.drip/');
  buildStatic('drip-cli', ['build'], ['bin', 'dist', 'asset', 'node_modules'], shells);
  buildStatic('drip-local', ['build', 'pro'], ['bin', 'dist', 'asset', 'node_modules'], shells);
  buildStatic('drip-package-shell', ['build', 'pro'], ['dist'], shells);
  shells.push('node ./dist/bin/install.js');
  shells.push('rm -rf /tmp/example');
  shells.push('mkdir /tmp/example');
  execSync(shells.join('&&'));
});

afterAll(() => {
  //execSync('rm -rf /tmp/example');
});

test('main process', () => {
  //execSync([
    //'cd /tmp/example/',
    //'unset PREFIX',
    //'. ~/.nvm/nvm.sh',
    //'nvm use v17.3.0',
    //'drip init -y',
    //'drip install',
    //'echo \'locate index\' > /tmp/example/.drip/local/instance/[shell]:shell1',
  //].join(' && '));
});
