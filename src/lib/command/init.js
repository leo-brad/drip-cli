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

async function installCommandFromTar(tar, name) {
  const localPath = path.resolve('.drip', 'local');
  const command = fs.openSync(path.join(localPath, 'command.tar.bz'), 'a+');
  fs.writeSync(command, tar);
  fs.fsyncSync(command);
  const shells = [];
  shells.push('cd ' + localPath);
  shells.push('cat command.tar.bz | tar jx -');
  shells.push('rm ./command.tar.bz');
  shells.push('echo end');
  const status = { done: false, };
  new Wait('Extra command ' + name, status).start();
  await new Promise((resolve) => {
    exec(shells.join('&&'), (error, stdout, stderr) => {
      if (stdout === 'end\n') {
        status.done = true;
        resolve();
      }
    });
  });
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
      const string = await socket.request([1, command], 'one', 'buffer');
      const all = parseInt(string);
      let bytes = 0;
      let time = new Date().getTime();
      const tar = await socket.request([0, command], 'serail', 'buffer', (data) => {
        bytes += Buffer.byteLength(data);
        const diff = new Date().getTime() - time;
        if (diff >= 1000 / 29) {
          loading(Math.ceil(bytes / all * 100), 'command package download');
          time = new Date().getTime();
        }
      });
      await installCommandFromTar(tar, name);
      console.log(
        'Drip command ' + name + ' install on ' +
        path.join(process.cwd(), '.drip', 'local', 'drip-' + name) + '...'
      );
    }
  }
}

function cancelInstall() {
  console.log('Drip init cancel...');
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
