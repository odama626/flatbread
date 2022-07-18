import generateSchema from './generators/schema';
import { FlatbreadConfig, LoadedFlatbreadConfig, Transformer } from './types';

import { graphql, GraphQLArgs } from 'graphql';
import { defaultsDeep } from 'lodash-es';

function camelCase(field: string) {
  return field.replace(/\s(\w)/g, (_, m) => m.toUpperCase());
}

export function initializeConfig(config: any): LoadedFlatbreadConfig {
  config.transformer = Array.isArray(config.transformer)
    ? config.transformer
    : [config.transformer];

  return defaultsDeep(config, {
    loaded: {
      extensions: config.transformer
        .map((transformer: Transformer) => transformer.extensions || [])
        .flat(),
    },
    fieldTransform: camelCase,
  });
}

export default async function createFlatbread(
  flatbreadConfig: FlatbreadConfig
) {
  const config = initializeConfig(flatbreadConfig);
  const schema = await generateSchema({ config });

  return async function query(args: Omit<GraphQLArgs, 'schema'>) {
    return await graphql({ schema, ...args });
  };
}
