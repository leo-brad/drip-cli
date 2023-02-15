import fs from 'fs';

export default function dynamicHelp(commandPath, helps) {
  let ans = [undefined];
  if (fs.existsSync(commandPath)) {
    ans = helps;
  }
  return ans;
}
