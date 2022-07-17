import { mapKeys } from 'lodash-es';

export default function transformKeys(
  obj: any,
  transform: (key: string) => string
) {
  return JSON.parse(
    JSON.stringify(obj, (_, value) => {
      if (typeof value === 'object') {
        return mapKeys(value, (key) => transform(key));
      }
      return value;
    })
  );
}
