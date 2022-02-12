import { execSync, } from 'child_process';
import path from 'path';
import fs from 'fs';
import askQuestion from '~/lib/util/askQuestion';

function cancelInstall() {
  console.log('Install cancel...');
}

function alreadyInstall() {
  console.error('Directory .drip-project/ already had been exist...');
}

function confirmInstall() {
  const dripDir = path.join(process.env.HOME, '.drip');
  fs.cpSync(
    path.join(dripDir, 'asset/.drip-project/'),
    '.drip-project/',
    { recursive: true, },
  );
  fs.cpSync(
    path.join(dripDir, 'asset/.drip-local/'),
    '.drip-local/',
    { recursive: true, },
  );
  execSync('git clone /tmp/drip-static/.git .drip-local/drip');
  execSync('git clone /tmp/drip-gui-static/.git .drip-local/drip-gui');
  console.log('Drip install on ' + process.cwd() + '...');
}

export default async function init(...param) {
  const [one, ...rest] = param;
  if (fs.existsSync('.drip-project/')) {
    alreadyInstall();
  } else {
    let result;
    switch (one) {
      case '-y':
      case '--yes':
        result = true;
        break;
      default:
        result = await askQuestion(
          'Are your sure install drip in current directory.'
        );
        break;
    }
    if (result) {
      confirmInstall();
    } else {
      cancelInstall();
    }
  }
}
