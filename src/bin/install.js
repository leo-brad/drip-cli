import { execSync, } from 'child_process';
import fs from 'fs';
import path from 'path';

const dripDir = path.join(process.env.HOME, '.drip');
if (fs.existsSync(dripDir)) {
  console.log(dripDir + ' is already exist.')
} else {
  const shells = [];
  shells.push('git clone /tmp/drip-cli-static/.git $HOME/.drip');
  shells.push('rm $HOME/.drip/package/.gitkeep');
  shells.push('rm $HOME/.drip/db/.gitkeep');
  shells.push('rm -rf $HOME/.drip/.git');
  execSync(shells.join('&&'));
  console.log('Drip install in ' + dripDir);
}
