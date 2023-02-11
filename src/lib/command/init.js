import { execSync, } from 'child_process';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import askQuestion from '~/lib/util/askQuestion';
import parseOption from '~/lib/util/parseOption';

function cancelInstall() {
  console.log('Install cancel...');
}

function alreadyInstall() {
  console.error('Directory \'.drip/\' already had been exist...');
}

function confirmInstall() {
  const dripDir = path.join(process.env.HOME, '.drip');
  fs.cpSync(
    path.join(dripDir, 'asset/.drip/'), '.drip/',
    {
      recursive: true,
      filter: (src) => !src.match(/\.gitkeep$/),
    },
  );
  execSync('git clone /tmp/drip-local-static/.git .drip/local/drip-local');
  execSync('git clone /tmp/drip-client-static/.git .drip/local/drip-client');
  execSync('git clone /tmp/drip-server-static/.git .drip/local/drip-server');
  console.log('Drip install on ' + process.cwd() + '...');
}

export default async function init(...param) {
  const options = parseOption(...param);
  if (fs.existsSync('.drip/')) {
    alreadyInstall();
  } else {
    let result;
    if (options.y || options.yes) {
      result = true;
    } else {
      result = await askQuestion(
        'Are your sure install drip in current directory.'
      );
    }
    if (result) {
      confirmInstall();
    } else {
      cancelInstall();
    }
  }
}
