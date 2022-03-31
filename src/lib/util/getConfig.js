import fs from 'fs';
import Parser from '~/class/Parser';
import Scaner from '~/class/Scaner';

export default function getConfig() {
  const cp1 = '.drip/local/config';
  const ls = fs.readFileSync(cp1).toString();
  const lc =  new Parser(new Scaner(ls), cp1).parse();
  const cp2 = '.drip/project/config';
  const ps = fs.readFileSync().toString();
  const pc =  new Parser(new Scaner(ps), cp2).parse();
  return { ...lc, ...pc, };
}
