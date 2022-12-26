import fs from 'fs';
import Scaner from '~/class/Scaner';
import Parser from '~/class/Parser';

export default function parseConfig(cp) {
  const string = fs.readFileSync(cp).toString();
  const scaner = new Scaner(string);
  const parser = new Parser(scaner, cp);
  return parser.parse();
}
