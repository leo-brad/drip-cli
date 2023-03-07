import path from 'path';
import fs from 'fs';
import removeCommand from '~/lib/util/removeCommand';

export default function remove(...param) {
  const turnAlias = {
    'start': 'local',
  };
  let [command] = param;
  if (turnAlias[command] !== undefined) {
    command = turnAlias[command];
  }
  removeCommand(command);
}
