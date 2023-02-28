import { exec, } from 'child_process';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import loading from '~/lib/util/loading';
import getLocalConfig from '~/lib/util/getLocalConfig';
import checkDependence from '~/lib/util/checkDependence';
import help from '~/lib/command/help';
import Socket from '~/class/Socket';
import Wait from '~/class/Wait';
import global from '~/obj/global';

async function installCommandFromTar(tar, name) {
  await checkDependence(['cd', 'rm', 'echo']);
  const localPath = path.join(process.env.HOME, '.drip', 'command');
  const command = fs.openSync(path.join(localPath, 'command.tar.gz'), 'a+');
  fs.writeSync(command, tar);
  fs.fsyncSync(command);
  const shells = [];
  shells.push('cd ' + localPath);
  shells.push('tar xzf command.tar.gz');
  shells.push('rm ./command.tar.gz');
  shells.push('echo end');
  const status = { done: false, };
  new Wait('extra  command `' + chalk.bold(name) + '`', status).start();
  await new Promise((resolve) => {
    exec(shells.join('&&'), (error, stdout, stderr) => {
      if (stdout === 'end\n') {
        status.done = true;
        resolve();
      }
    });
  });
}

export default async function installCommand(command, alias) {
  const commandPath = path.join(process.env.HOME, '.drip', 'command', 'drip-' + command);
  if (!fs.existsSync(commandPath)) {
    let name;
    if (alias !== undefined) {
      name = alias;
    } else {
      name = command;
    }
    const {
      staticFileServer,
    } = getLocalConfig();
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
      'Drip command `' + name + '` install on ' +
      path.join(process.cwd(), '.drip', 'local', 'drip-' + name) + '...'
    );
  } else {
    console.log('Drip command `' + command + '` is already exist.');
  }
}
