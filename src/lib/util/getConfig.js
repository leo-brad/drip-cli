import fs from 'fs';
import Parser from '~/class/Parser';
import Scaner from '~/class/Scaner';

export default function getConfig() {
  const localString = fs.readFileSync('.drip/local/config').toString();
  const localConfig =  new Parser(new Scaner(localString)).parse();
  const projectString = fs.readFileSync('.drip/local/config').toString();
  const projectConfig =  new Parser(new Scaner(projectString)).parse();
  return { ...localConfig, ...projectConfig, };
}
