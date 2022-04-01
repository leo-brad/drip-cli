import { spawn, } from 'child_process';
import fs from 'fs';
import Parser from '~/class/Parser';
import Scaner from '~/class/Scaner';

const cp = './asset/.drip/local/config';
const string = fs.readFileSync(cp).toString();
const scaner = new Scaner(string);
const parser = new Parser(scaner, cp);
const config = parser.parse();
process.chdir('/tmp/example/.drip/local/drip-local/');
spawn(
  'npx', ['electron', 'dist/main.js', JSON.stringify(config), '/tmp/example/'],
  { detached: true, },
);
