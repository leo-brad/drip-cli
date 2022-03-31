//import { spawn, } from 'child_process';
//import fs from 'fs';
//import Parser from '~/class/Parser';
//import Scaner from '~/class/Scaner';

//const string = fs.readFileSync('./asset/.drip/local/config').toString();
//const scaner = new Scaner(string);
//const parser = new Parser(scaner);
//const config = parser.parse();
//process.chdir('/tmp/example/.drip/local/drip-local/');
//spawn(
  //'npx', ['electron', 'dist/main.js', JSON.stringify(config), '/tmp/example/'],
  //{ detached: true, },
//);
import fs from 'fs';
import Parser from '~/class/Parser';
import Scaner from '~/class/Scaner';

function main() {
  const string = fs.readFileSync('./asset/.drip/local/config').toString();
  const scaner = new Scaner(string);
  const parser = new Parser(scaner);
  console.log('config', parser.parse());
}

main();
