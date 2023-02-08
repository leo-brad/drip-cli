import getTagList from '~/lib/util/getTagList';

export default function getLatestVersion(pkgPath) {
  const tags = getTagList(pkgPath);
  return tags[tags.length - 1];
}

