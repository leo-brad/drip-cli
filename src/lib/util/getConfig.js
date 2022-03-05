import fs from 'fs';
import Parser from '~/class/Parser';
import Scaner from '~/class/Scaner';

export default function getConfig() {
  const ls = fs.readFileSync('.drip/local/config').toString();
  const lc =  new Parser(new Scaner(ls)).parse();
  const ps = fs.readFileSync('.drip/local/config').toString();
  const pc =  new Parser(new Scaner(ps)).parse();
  return { ...lc, ...pc, };
}
