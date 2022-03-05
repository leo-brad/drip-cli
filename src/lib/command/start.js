import { spawn, } from 'child_process';
import path from 'path';
import fs from 'fs';
import Parser from '~/class/Parser';
import Scaner from '~/class/Scaner';
import getConfig from '~/lib/util/getConfig';

export default function start(...param) {
  const [one, ...rest] = param;
  const config = getConfig();
  const cwd = process.cwd();
  process.chdir(path.resolve('.drip/local/drip-local/'));
  spawn(
    'npx', ['electron', 'dist/main.js', JSON.stringify(config), cwd],
    { detached: true, },
  );
}
