import checkPath from '~/lib/util/checkPath';
import installCommand from '~/lib/util/installCommand';

export default async function add(...param) {
  const commands = ['start', 'client', 'server'];
  const alias = {
    'local': 'start',
  };
  const [command] = param;
  if (!commands.includes(command)) {
    console.log('Command `' + command + '` isn\'t a drip command.');
  } else {
    await installCommand(command, alias[command]);
  }
}
