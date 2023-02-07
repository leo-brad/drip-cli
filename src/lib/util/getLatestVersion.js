export default function getLatestVersion() {
  let tags = execSync('git tag').toString().split('\n');
  tags = tags.slice(0, tags.length - 1);
  return tags[tags.length - 1];
}

