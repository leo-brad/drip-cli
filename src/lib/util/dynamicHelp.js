import fs from 'fs';

export default function dynamicHelp(commandPath, exist, helps) {
  let ans = [undefined];
  if (exist) {
    if (fs.existsSync(commandPath)) {
      ans = helps;
    }
  } else {
    if (!fs.existsSync(commandPath)) {
      ans = helps;
    }
  }
  return ans;
}
