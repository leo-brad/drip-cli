export default function iteratorPackagePath(method) {
  const packagesPath = path.join('.drip', 'local', 'package');
  if (fs.existsSync(packagesPath)) {
    fs.readdirSync(packagesPath).forEach(method);
  }
}
