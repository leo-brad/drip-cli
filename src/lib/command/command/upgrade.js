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
  let result;
  if (all) {
    result = true;
  } else {
    result = await askQuestion(
      'Are you need upgrade command drip ' + turnAlias[name] + '.'
    );
  }
  if (result) {
    removeCommand(name);
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
  const commands = fs.readdirSync(commandPath);
  const times = await ocket.request([3, commands], 'one', 'text');
  commands.forEach((p, i) => {
    const time = fs.statsSync(path.join(commandPath, p)).ctimeMs;
    if (time < times[i]) {
      const [_, name] = p.split('-');
      await chooseUpgradeCommand(name, alias);
    }
  });
}
