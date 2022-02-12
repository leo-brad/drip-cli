import chalk from 'chalk';

export default function help(...param) {
  console.log([
    '                                \n',
    '                                \n',
    '  ██████╗░██████╗░██╗██████╗░   \n',
    '  ██╔══██╗██╔══██╗██║██╔══██╗   \n',
    '  ██║░░██║██████╔╝██║██████╔╝   \n',
    '  ██║░░██║██╔══██╗██║██╔═══╝░   \n',
    '  ██████╔╝██║░░██║██║██║░░░░░   \n',
    '  ╚═════╝░╚═╝░░╚═╝╚═╝╚═╝░░░░░   \n',
    '                                \n',
    '  ', chalk.bold('Usage'), ': drip [command] [flags] \n',
    '                                \n',
    '  Displays help information.    \n',
    '                                \n',
    '  ', chalk.bold('Commands'), ': \n',
    '                                \n',
    '    - init                      \n',
    '    - start                     \n',
    '    - plugin                    \n',
    '                                \n',
    '  Run ', chalk.bold('`drip help [command]`'), ' for more information on specific commands.\n',
    '  Visit ', chalk.bold('https://doc.driptool.com/'), ' to learn more about Drip.\n',
  ].join(''));
}
