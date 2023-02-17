//import { spawn, } from 'child_process';
//import fs from 'fs';
//import parseConfig from '~/lib/util/parseConfig';

//const local = parseConfig('./asset/.drip/local/config');
//const project = parseConfig('./asset/.drip/project/config');
//const config = { ...local, ...project, };
//process.chdir('/tmp/example/.drip/local/drip-local/');
//spawn(
  //'npx',
  //['electron', 'dist/main.js', JSON.stringify(config), '/tmp/example/'],
  //{ detached: true, },
//);
import chalk from 'chalk';
import Wait from '~/class/Wait';

process.chdir('/tmp/example/');
new Wait('extra `' +  chalk.bold('command') + '` fasdfdsa', { done: false, }).start();
//help();
