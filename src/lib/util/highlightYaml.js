import HighLight from '~/class/HighLight';
import YamlLexer from '~/class/YamlLexer';

let highLight;

export default function parseYaml(text) {
  if (highLight === undefined) {
    highLight = new HighLight().addLexer(new YamlLexer());
  }
  return highLight.parse(text);
}
