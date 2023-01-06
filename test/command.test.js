import { execSync, } from 'child_process';
import path from 'path';
import { describe, expect, test, } from '@jest/globals';

beforeAll(() => {
  const shells = [];
  shells.push('cd /tmp/example/');
  shells.push('unset PREFIX');
  shells.push('. ~/.nvm/nvm.sh');
  shells.push('nvm use v19.3.0');
  shells.push('drip init -y');
  shells.push('drip install');
  execSync(shells.join('&&'));
});

test('main process', () => {
});
