import { fork, execSync, } from 'child_process';
import path from 'path';
import fs from 'fs';
import Parser from '~/class/Parser';
import Scaner from '~/class/Scaner';
import getConfig from '~/lib/util/getConfig';

export default function start(...param) {
  const [one, ...rest] = param;
  const config = getConfig();
  fork('.drip/local/drip/dist/index.js', [JSON.stringify(config)]);
  execSync('cd .drip/local/drip-gui/ && npx electron dist/main.js');
}
