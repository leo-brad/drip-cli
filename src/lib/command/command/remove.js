import path from 'path';
import fs from 'fs';
import removeCommand from '~/lib/util/removeCommand';

export default function remove(...param) {
  const alias = {
    'local': 'start',
  };
  const [command] = param;
  removeCommand(command);
}
