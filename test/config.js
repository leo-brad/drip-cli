import fs from 'fs';
import Parser from '~/class/Parser';
import Scaner from '~/class/Scaner';

function main() {
  const cp = './asset/.drip/local/config';
  const string = fs.readFileSync(cp).toString();
  const scaner = new Scaner(string);
  const parser = new Parser(scaner, cp);
  console.log('config', parser.parse());
}

main();
