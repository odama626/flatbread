import { LoadedFlatbreadConfig, Override } from 'flatbread';
import { get, set } from 'lodash-es';

export function getFieldOverrides(
  collection: string,
  config: LoadedFlatbreadConfig
) {
  let content = config.content.find(
    (content) => content.collection === collection
  );
  if (!content?.overrides) return {};
  const overrides = content.overrides;

  return overrides.reduce((fields: any, override: Override) => {
    let path = override.field.replace(/\[\]/g, '[0]');
    const endsWithArray = path.endsWith('[0]');

    if (endsWithArray) path = path.slice(0, -3);

    const getPath = path.split(/(?:\.|\[0\])/).at(-1) as string;
    set(fields, path, () => ({
      type: endsWithArray ? `[${override.type}]` : override.type,
      resolve: (source: any) => {
        return override.resolve(get(source, getPath), source);
      },
    }));
    return fields;
  }, {});

  return {};
}
