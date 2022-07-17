import { schemaComposer } from 'graphql-compose';
export { default as generateSchema } from './generators/schema';
export { default } from './main';

export default generateSchema;

export function createScalar(str: string) {
  return schemaComposer.createObjectTC(str);
}
