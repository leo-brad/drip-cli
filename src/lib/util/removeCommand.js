import path from 'path';
import fs from 'fs';

export default function removeCommand(command) {
  const commandPath = path.join(process.env.HOME, '.drip', 'command', command);
  if (fs.existsSync(commandPath)) {
    fs.rmSync(commandPath, { recursive: true, });
    console.log('Drip command `' + command + '` had be removed...');
  } else {
    console.log('Drip command `' + command + '` don\'t be installed.');
  }
}

