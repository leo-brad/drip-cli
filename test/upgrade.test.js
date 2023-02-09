import { describe, expect, test, } from '@jest/globals';
import upgrade from '~/lib/command/upgrade';
import fs from 'fs';
import path from 'path';

describe('[Command] install', () => {
  test('package upgrade should parse correct.', async () => {
    process.chdir('/tmp/example/');
    await upgrade();
    expect(JSON.stringify(fs.readdirSync(path.join('.drip', 'local', 'package')))).toMatch('["node"]');
  });
});
