const { exec, } = child_process;

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
  console.log('[Build] ' + staticPath);
  shells.push('cd ' + srcPath);
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
}

async function constructDrip() {
  const shells = [];
  buildStatic('drip-cli', ['build'], ['bin', 'dist', 'asset', 'node_modules'], shells);
  buildStatic('drip-local', ['build', 'pro'], ['dist', 'node_modules'], shells);
  buildStatic('drip-package-node', ['build', 'pro'], ['dist'], shells);
  buildStatic('drip-server', ['build'], ['dist', 'node_modules'], shells);
  buildStatic('drip-client', ['build', 'pro'], ['dist', 'node_modules'], shells);
  shells.push('node ./dist/bin/install.js');
  shells.push('rm -rf /tmp/example');
  shells.push('mkdir /tmp/example');
  console.log(shells.join('&&'));
  await execScript(shells.join('&&'));
}

async function execScript(script) {
  exec(script, { maxBuffer: 10240 * 1024, }, (error, stdout, stderr) => {
    if (error) {
      throw error;
    } else {
      if (stdout) {
        console.log(stdout);
      } else {
        console.error(stderr);
      }
    }
  });
}

async function main() {
  await constructDrip();
  console.log('finish...');
}

main();
