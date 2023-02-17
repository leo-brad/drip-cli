import { execSync, } from 'child_process';
import fs from 'fs';
import path from 'path';
import getLocalConfig from '~/lib/util/getLocalConfig';
import askQuestion from '~/lib/util/askQuestion';
import installCommand from '~/lib/util/installCommand';
import removeCommand from '~/lib/util/removeCommand';
import Socket from '~/class/Socket';
import global from '~/obj/global';

const turnAlias = {
  'local': 'start',
};

async function chooseUpgradeCommand(name) {
  let alias = name;
  if (turnAlias[name] !== undefined) {
    alias = turnAlias[name];
  }
  const result = await askQuestion(
    'Are you need upgrade command drip ' + alias + '.'
  );
  if (result) {
    execSync('rm -rf ' + path.join(process.env.HOME, '.drip', 'command', 'drip-'+name));
    await installCommand(name, turnAlias[name]);
  }
}

export default async function upgrade(...param) {
  const commandPath = path.join(process.env.HOME, '.drip', 'command');
  const {
    staticFileServer,
  } = getLocalConfig();
  global.location = staticFileServer;
  const socket = new Socket();
  const commands = fs.readdirSync(commandPath).map((name) => {
    const [_, command] = name.split('-');
    return command;
  });
  const json = await socket.request([2, commands], 'one', 'text');
  const times = JSON.parse(json);
  for (let i = 0; i < commands.length; i += 1) {
    const command = commands[i];
    const time = fs.statSync(path.join(commandPath, 'drip-' + command)).ctimeMs;
    if (Number(time) < Number(times[i])) {
      await chooseUpgradeCommand(command);
    }
  }
  console.log('Drip command upgrade success...');
}
