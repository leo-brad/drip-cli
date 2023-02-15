import { execSync, } from 'child_process';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import getConfig from '~/lib/util/getConfig';
import askQuestion from '~/lib/util/askQuestion';
import parseOption from '~/lib/util/parseOption';
import checkDependence from '~/lib/util/checkDependence';
import Socket from '~/class/Socket';
import global from '~/obj/global';

function installCommandFromTar(tar) {
  const localPath = path.resolve('.drip', 'local');
  const command = fs.openSync(path.join(localPath, 'command.tar.bz'), 'a+');
  fs.writeSync(command, tar);
  fs.fsyncSync(command);
  const shells = [];
  shells.push('cd ' + localPath);
  shells.push('cat command.tar.bz | tar jx -');
  shells.push('rm ./command.tar.bz');
  execSync(shells.join('&&'));
}

async function installCommand(command, alias, all) {
  const commandPath = path.resolve('.drip', 'local', 'drip-' + command);
  if (!fs.existsSync(commandPath)) {
    let name;
    if (alias !== undefined) {
      name = alias;
    } else {
      name = command;
    }
    let result;
    if (all) {
      result = true;
    } else {
      result = await askQuestion(
        'Are you need command drip ' + name + ' in this project.'
      );
    }
    if (result) {
      const {
        staticFileServer,
      } = getConfig();
      global.location = staticFileServer;
      const socket = new Socket();
      const tar = await socket.request([0, command], 'serail', 'buffer');
      installCommandFromTar(tar);
      console.log(
        'Drip command ' + name + ' install on ' +
        path.join(process.cwd(), '.drip', 'local', 'drip-' + name), + '...'
      );
    }
  }
}

function cancelInstall() {
  console.log('./drip init cancel...');
}

function installFinish() {
  console.error('Current project drip init finish...');
}

async function confirmInstall() {
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
    await installCommand(c, alias[c], all);
  }
}

export default async function init(...param) {
  checkDependence(['git', 'tar']);
  const options = parseOption(...param);
  if (!fs.existsSync('.drip/')) {
    let result;
    if (options.b || options.base) {
      result = true;
    } else {
      result = await askQuestion(
        'Are your sure install drip in current directory.'
      );
    }
    if (result) {
      await confirmInstall();
    } else {
      cancelInstall();
    }
  }
  await installCommands(options.a || options.all);
  installFinish();
}
