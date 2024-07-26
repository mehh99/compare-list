// src/utils/listDiff.js
import { cleanString } from './cleanString';

export function listDiff(listA, listB) {
  const cleanListA = listA.map(item => cleanString(item));
  const cleanListB = listB.map(item => cleanString(item));

  const onlyInListA = cleanListA.filter(item => !cleanListB.includes(item));
  const onlyInListB = cleanListB.filter(item => !cleanListA.includes(item));

  return { onlyInListA, onlyInListB };
}
