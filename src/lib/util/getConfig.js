import fs from 'fs';
import Parser from '~/class/Parser';
import Scaner from '~/class/Scaner';

export default function getConfig() {
  const localStr = fs.readFileSync('.drip-local/config').toString();
  const localConfig =  new Parser(new Scaner(localStr)).parse();
  const projectStr = fs.readFileSync('.drip-local/config').toString();
  const projectConfig =  new Parser(new Scaner(projectStr)).parse();
  return { ...localConfig, ...projectConfig, };
}
