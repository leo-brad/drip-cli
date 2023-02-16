import { exec, } from 'child_process';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import getConfig from '~/lib/util/getConfig';
import askQuestion from '~/lib/util/askQuestion';
import parseOption from '~/lib/util/parseOption';
import checkDependence from '~/lib/util/checkDependence';
import checkPath from '~/lib/util/checkPath';
import loading from '~/lib/util/loading';
import Socket from '~/class/Socket';
import Wait from '~/class/Wait';
import global from '~/obj/global';

function cancelInit() {
  console.log('Drip init cancel...');
}

function finishInit() {
  console.error('Current project drip init finish...');
}

async function confirmInit() {
  const dripDir = path.join(process.env.HOME, '.drip');
  fs.cpSync(
    path.join(dripDir, 'asset/.drip/'), '.drip/',
    {
      recursive: true,
      filter: (src) => !src.match(/\.gitkeep$/),
    },
  );
  console.log('Drip install on ' + process.cwd() + '...');
}

async function installCommands(all) {
  const alias = {
    'local': 'start',
  };
  const commands = ['local', 'client', 'server'];
  for (let i = 0; i < commands.length; i += 1) {
    const c = commands[i];
  }
}

export default async function init(...param) {
  checkDependence(['git', 'tar']);
  const options = parseOption(...param);
  if (!fs.existsSync('.drip/')) {
    let result;
    if (options.y || options.yes) {
      result = true;
    } else {
      result = await askQuestion(
        'Are your sure install drip in current directory.'
      );
    }
    if (result) {
      await confirmInit();
    } else {
      cancelInit();
    }
  }
  finishInit();
}
