import { describe, expect, test, } from '@jest/globals';
import install from '~/lib/command/install';
import fs from 'fs';
import path from 'path';

describe('[Command] install', () => {
  test('package install should parse correct.', async () => {
    process.chdir('/tmp/example/');
    await install();
    expect(JSON.stringify(fs.readdirSync(path.join('.drip', 'local', 'package')))).toMatch('["node"]');
  });
});
