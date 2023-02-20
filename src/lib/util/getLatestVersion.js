import getTagList from '~/lib/util/getTagList';

export default async function getLatestVersion(pkgPath) {
  const tags = await getTagList(pkgPath);
  return tags[tags.length - 1];
}

