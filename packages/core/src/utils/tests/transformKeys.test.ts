import test from 'ava';
import { camelCase } from 'lodash-es';
import transformKeys from '../transformKeys';

test('it works', (t) => {
  t.deepEqual(
    transformKeys({ 'this is a test': true, blah: 'blah' }, camelCase),
    {
      thisIsATest: true,
      blah: 'blah',
    }
  );

  t.deepEqual(
    transformKeys({ 'this is a test': [1, 2, 3, 4], blah: 'blah' }, camelCase),
    {
      thisIsATest: [1, 2, 3, 4],
      blah: 'blah',
    }
  );
});
