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
import help from '~/lib/command/help';
help();
