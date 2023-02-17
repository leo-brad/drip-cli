import { exec, } from 'child_process';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import askQuestion from '~/lib/util/askQuestion';
import parseOption from '~/lib/util/parseOption';
import checkDependence from '~/lib/util/checkDependence';
import checkPath from '~/lib/util/checkPath';
import loading from '~/lib/util/loading';
import installCommand from '~/lib/util/installCommand';
import Socket from '~/class/Socket';
import Wait from '~/class/Wait';
import getLocalConfig from '~/lib/util/getLocalConfig';
import global from '~/obj/global';

export default async function add(...param) {
  checkDependence(['tar']);
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
