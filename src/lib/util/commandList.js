import chalk from 'chalk';

export default function commandList(commands) {
  return commands.map((c) => chalk.bold(c)).join(',');
}
