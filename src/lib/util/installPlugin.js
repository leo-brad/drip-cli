import { execSync, } from 'child_process';
import path from 'path';
import fs from 'fs';

export default function installPlugin(plugin) {
  execSync(
    'git clone ' + path.join('/tmp', 'drip-plugin-' + plugin + '-static', '.git')
    + ' ' + path.join('.drip-local', 'plugin'),
  );
  console.log('Plugin ' + plugin + ' install success...');
}
