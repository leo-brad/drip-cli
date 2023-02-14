import fs from 'fs';

export default function dynamicHelp(commandPath, help) {
  let ans;
  if (fs.existsSync(commandPath)) {
    ans = help;
  }
  return ans;
}
