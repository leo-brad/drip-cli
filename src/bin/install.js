import { exec, } from 'child_process';
import fs from 'fs';
import path from 'path';

const dripDir = path.join(process.env.HOME, '.drip');
if (fs.existsSync(dripDir)) {
  console.log(dripDir + ' is already exist.')
} else {
  exec('git clone /tmp/drip-cli-static/.git $HOME/.drip');
  console.log('Drip install in ' + dripDir);
}
