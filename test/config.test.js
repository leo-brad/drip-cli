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
    expect(JSON.stringify(parser.parse())).toMatch('{\"interval\":5000,\"minMem\":100,\"adjustCore\":0,\"ignores\":[\".drip/local/\",\".git/\",\".gitkeep\"],\"packages\":[\"[node](/tmp/drip-package-node-static/.git/) v1.0.0\"],\"indexLevel\":2,\"packageFileServer\":\"127.0.0.1:3001\"}');
  });
});
