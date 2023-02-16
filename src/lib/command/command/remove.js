import path from 'path';
import fs from 'fs';

export default function remove(...param) {
  const commands = ['start', 'client', 'server'];
  const alias = {
    'local': 'start',
  };
  const [command] = param;
  const commandPath = path.join(process.env.HOME, '.drip', 'command', command);
  if (fs.existsSync(commandPath)) {
    fs.rmdirSync(commandPath, { recursive: true, });
    console.log('Drip command ' + command + 'had be removed...');
  } else {
    console.log('Drip command ' + command + ' don\'t be installed.');
  }
}
