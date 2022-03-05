import { execSync, } from 'child_process';
import path from 'path';

beforeAll(() => {
  const cwd = process.cwd();

  execSync('rm -rf $HOME/.drip/');

  execSync('yarn run build');
  execSync('[ -d /tmp/drip-cli-static/ ] || mkdir /tmp/drip-cli-static/');
  process.chdir(cwd);
  execSync('cp -a -R ../drip-cli/bin /tmp/drip-cli-static/');
  execSync('cp -a -R ../drip-cli/dist /tmp/drip-cli-static/');
  execSync('cp -a -R ../drip-cli/asset /tmp/drip-cli-static/');
  execSync('cp -a -R ../drip-cli/node_modules /tmp/drip-cli-static/');
  process.chdir('/tmp/drip-cli-static/');
  execSync('rm -rf .git');
  execSync('git init');
  execSync('git add --all');
  execSync('git commit -m "[Update]"');

  process.chdir(path.resolve(cwd, '../drip-local/'));
  execSync('yarn run build');
  execSync('yarn run pro');
  execSync('rm -rf /tmp/drip-local-static/ && mkdir /tmp/drip-local-static/');
  process.chdir(cwd);
  execSync('cp -a -R ../drip-local/dist /tmp/drip-local-static/');
  execSync('cp -a -R ../drip-local/node_modules /tmp/drip-local-static/');
  process.chdir('/tmp/drip-local-static/');
  execSync('rm -rf .git');
  execSync('git init');
  execSync('git add --all');
  execSync('git commit -m "[Update]"');

  process.chdir(path.resolve(cwd, '../drip-package-shell/'));
  execSync('yarn run pro');
  execSync('yarn run build');
  execSync('[ -d /tmp/drip-package-shell-static/ ] || mkdir /tmp/drip-package-shell-static/');
  process.chdir(cwd);
  execSync('cp -a -R ../drip-package-shell/dist /tmp/drip-package-shell-static/');
  process.chdir('/tmp/drip-package-shell-static/');
  execSync('rm -rf .git');
  execSync('git init');
  execSync('git add --all');
  execSync('git commit -m "[Update]"');

  process.chdir(cwd);
  execSync('node ./dist/bin/install.js');

  process.chdir('/tmp');
  execSync('rm -rf example');
  execSync('mkdir example');
});

afterAll(() => {
  //execSync('rm -rf /tmp/example');
});

test('main process', () => {
  execSync([
    'cd /tmp/example/',
    'unset PREFIX',
    '. ~/.nvm/nvm.sh',
    'nvm use v17.3.0',
    'drip init -y',
    'drip install',
    'echo \'locate index\' > /tmp/example/.drip/local/instance/[shell]:shell1',
  ].join(' && '));
});
