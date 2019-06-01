import { useEffect, useMemo } from 'react';

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
  for (let i = 0; i < len; i += 1) {
    const pos = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(pos, pos + 1);
  }
  return randomString;
}

export function convertRemToPixels(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize || '16');
}

export function useAsyncEffect(effect: () => Promise<void | (() => void)>, dependencies?: any[]) {
  return useEffect(() => {
    const cleanupPromise = effect();
    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, dependencies);
}

export function useAsyncMemo(memo: () => Promise<void | (() => void)>, dependencies?: any[]) {
  return useMemo(() => {
    const cleanupPromise = memo();
    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, dependencies);
}

export function unique<T>(
  array: T[],
  eq: (left: T, right: T) => boolean = (left, right) => left === right,
) {
  const res = [];
  for (let i = 0; i < array.length; i += 1) {
    let duplicate = false;
    for (let j = 0; j < i - 1; j += 1) {
      if (eq(array[i], array[j])) {
        duplicate = true;
        break;
      }
    }
    if (!duplicate) res.push(array[i]);
  }
  return res;
}

export function randomElement<T>(array: T[]): T | null {
  if (array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
}

export function capitalizeFirst(s: string) {
  if (s.length === 0) return '';
  return `${s[0].toLocaleUpperCase()}${s.slice(1)}`;
}

export function capitalizeFirstOnly(s: string) {
  if (s.length === 0) return '';
  return `${s[0].toLocaleUpperCase()}${s.slice(1).toLocaleLowerCase()}`;
}
