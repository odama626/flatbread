import { schemaComposer } from 'graphql-compose';
export { default as generateSchema } from './generators/schema';
export { default, initializeConfig } from './main';
export * from './types';

export function createScalar(str: string) {
  return schemaComposer.createObjectTC(str);
}
