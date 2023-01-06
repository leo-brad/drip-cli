import chalk from 'chalk';
import '~/lib/util/checkVersion';

export default function help(...param) {
  console.log([
    '                                ',
    '                                ',
    '  ██████╗░██████╗░██╗██████╗░   ',
    '  ██╔══██╗██╔══██╗██║██╔══██╗   ',
    '  ██║░░██║██████╔╝██║██████╔╝   ',
    '  ██║░░██║██╔══██╗██║██╔═══╝░   ',
    '  ██████╔╝██║░░██║██║██║░░░░░   ',
    '  ╚═════╝░╚═╝░░╚═╝╚═╝╚═╝░░░░░   ',
    '                                ',
    '  ' + chalk.bold('Usage') + ': drip [command] [flags] ',
    '                                ',
    '  Displays help information.    ',
    '                                ',
    '  ' + chalk.bold('Commands') + ': ',
    '                                ',
    '    - init                      ',
    '    - start                     ',
    '    - client                    ',,
    '    - server                    ',
    '                                ',
    '  Run ' + chalk.bold('`drip help [command]`') + ' for more information on specific commands.',
    '  Visit ' +  chalk.bold('https://driptool.org/doc') + ' to learn more about Drip.',
    '',
  ].join('\n'));
}
