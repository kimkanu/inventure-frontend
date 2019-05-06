export function nthIndexOf(string: string, subString: string, index: number) {
  return string.split(subString, index).join(subString).length;
}

export function untilNthIndex(string: string, subString: string, index: number) {
  return string.slice(0, nthIndexOf(string, subString, index));
}
