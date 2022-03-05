import { spawn, } from 'child_process';
import fs from 'fs';
import Parser from '~/class/Parser';
import Scaner from '~/class/Scaner';

const string = fs.readFileSync('./asset/.drip/local/config').toString();
const scaner = new Scaner(string);
const parser = new Parser(scaner);
process.chdir('/tmp/example/.drip/local/drip-local/');
const { stdout, stderr, } = spawn(
  'npx',
  ['electron', 'dist/main.js', JSON.stringify(parser.parse()), '/tmp/example/'], { detached: true, },
);
stdout.on('data', (data) => {
  console.log(data);
});
stderr.on('data', (data) => {
  console.log(data);
})
