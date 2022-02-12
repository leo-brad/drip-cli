import fs from 'fs';
import Parser from '~/class/Parser';
import Scaner from '~/class/Scaner';

function main() {
  const string = fs.readFileSync('./asset/.driprc').toString();
  const scaner = new Scaner(string);
  const parser = new Parser(scaner);
  console.log('config', parser.parse());
}

main();
