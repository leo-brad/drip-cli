import HighLight from '~/class/HighLight';
import YamlLexer from '~/class/YamlLexer';

let highLight;

export default function parseYaml(text) {
  if (highLight === undefined) {
    highLight = new HighLight()
    highLight.addLexer(YamlLexer);
  }
  return highLight.parse(text);
}
