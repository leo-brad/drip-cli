import { describe, expect, test, } from '@jest/globals';
import fs from 'fs';
import Parser from '~/class/Parser';
import Scaner from '~/class/Scaner';

describe('[Config] local', () => {
  test('local configuartion should parse correct.', () => {
    const cp = './asset/.drip/local/config';
    const string = fs.readFileSync(cp).toString();
    const scaner = new Scaner(string);
    const parser = new Parser(scaner, cp);
    console.log();
    //expect(parser.parse()).toBe('{"adjustCore": 0, "ignores": [".drip/local/", ".git/", ".gitkeep"], "indexLevel": 2, "interval": 5000, "minMem": 100, "packages": ["[node](/tmp/drip-package-node-static/.git/)"]}');
  });
});
