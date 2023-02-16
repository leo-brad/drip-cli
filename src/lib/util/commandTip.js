import chalk from 'chalk';

export default function commandTip(subcommandTip, tip) {
  return '- ' + chalk.bold(subcommandTip) + ' ' + tip;
}
