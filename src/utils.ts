export function nthIndexOf(string: string, subString: string, index: number) {
  return string.split(subString, index).join(subString).length;
}

export function untilNthIndex(string: string, subString: string, index: number) {
  return string.slice(0, nthIndexOf(string, subString, index));
}

export function secondsToTimeLiteral(seconds: number) {
  if (seconds < 0) return '0:00';
  if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}:${`0${seconds % 60}`.slice(-2)}`;
  }
  return (
    `${Math.floor(seconds / 3600)}:` +
    `${`0${Math.floor(seconds / 60) % 60}`.slice(-2)}:` +
    `${`0${seconds % 60}`.slice(-2)}`
  );
}

export function randomString(
  len: number,
  charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
) {
  let randomString = '';
  for (let i = 0; i < len; i++) {
    const pos = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(pos, pos + 1);
  }
  return randomString;
}

export function convertRemToPixels(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize || '16');
}
