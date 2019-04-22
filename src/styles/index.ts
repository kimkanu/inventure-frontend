export const useStyles = (...styles: React.CSSProperties[]) => {
  return styles.reduce((s1, s2) => ({ ...s1, ...s2 }));
};

export * from './shadows';
export * from './fonts';
export * from './dimensions';
