import { execSync, } from 'child_process';
import path from 'path';
import fs from 'fs';

export default function installPlugin(plugin) {
  execSync(
    'git clone /tmp/' + 'drip-plugin-' + plugin + '-static' +
    '/.git .drip/local/plugin/' + plugin + '/',
  );
  console.log('Plugin ' + plugin + ' install success...');
}
