import generateSchema from './generators/schema';
import { FlatbreadConfig, LoadedFlatbreadConfig, Transformer } from './types';

import { graphql, GraphQLArgs } from 'graphql';

export function initializeConfig(config: any): LoadedFlatbreadConfig {
  config.transformer = Array.isArray(config.transformer)
    ? config.transformer
    : [config.transformer];

  config.loaded = {
    extensions: config.transformer
      .map((transformer: Transformer) => transformer.extensions || [])
      .flat(),
  };
  return config;
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
