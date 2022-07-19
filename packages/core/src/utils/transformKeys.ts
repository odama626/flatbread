function isObject(obj: any): obj is Object {
  return obj != null && obj.constructor.name === 'Object';
}

export default function transformKeys(
  obj: any,
  transform: (key: string) => string
): any {
  if (Array.isArray(obj))
    return obj.map((item) => transformKeys(item, transform));
  if (!isObject(obj)) return obj;
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      transform(key),
      transformKeys(value, transform),
    ])
  );
}
