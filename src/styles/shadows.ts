import { Color } from '../colors';

/* tslint:disable */
type ShadowParams = {
  depth: number;
  opacity?: number;
  color?: Color;
};
export const shadow: (params: ShadowParams) => React.CSSProperties = ({
  depth,
  opacity = 1,
  color = new Color(0, 0, 0),
}) => {
  const s = [0.1, 0.08, 0.03].map((alpha) => color.withARel(opacity * alpha).toRgba());
  return (
    ({
      0: {
        boxShadow: 'none',
      },
      1: {
        boxShadow: `0 1px 1px 0 ${s[0]}, 0 2px 1px -1px ${s[1]}, 0 1px 3px 0 ${s[2]}`,
      },
      2: {
        boxShadow: `0 2px 2px 0 ${s[0]}, 0 3px 1px -2px ${s[1]}, 0 1px 5px 0 ${s[2]}`,
      },
      3: {
        boxShadow: `0 3px 4px 0 ${s[0]}, 0 3px 3px -2px ${s[1]}, 0 1px 8px 0 ${s[2]}`,
      },
      4: {
        boxShadow: `0 4px 5px 0 ${s[0]}, 0 1px 10px 0 ${s[1]}, 0 2px 4px -1px ${s[2]}`,
      },
      6: {
        boxShadow: `0 6px 10px 0 ${s[0]}, 0 1px 18px 0 ${s[1]}, 0 3px 5px -1px ${s[2]}`,
      },
      8: {
        boxShadow: `0 8px 10px 1px ${s[0]}, 0 3px 14px 2px ${s[1]}, 0 5px 5px -3px ${s[2]}`,
      },
      9: {
        boxShadow: `0 9px 12px 1px ${s[0]}, 0 3px 16px 2px ${s[1]}, 0 5px 6px -3px ${s[2]}`,
      },
      12: {
        boxShadow: `0 12px 17px 2px ${s[0]}, 0 5px 22px 4px ${s[1]}, 0 7px 8px -4px ${s[2]}`,
      },
      16: {
        boxShadow: `0 16px 24px 2px ${s[0]}, 0 6px 30px 5px ${s[1]}, 0 8px 10px -5px ${s[2]}`,
      },
      24: {
        boxShadow: `0 24px 38px 3px ${s[0]}, 0 9px 46px 8px ${s[1]}, 0 11px 15px -7px ${s[2]}`,
      },
    } as { [d: number]: React.CSSProperties })[depth] || {
      boxShadow: 'none',
    }
  );
};
export const shadowText: (params: ShadowParams) => string = ({
  depth,
  opacity = 1,
  color = new Color(0, 0, 0),
}) => {
  const s = [0.1, 0.08, 0.03].map((alpha) => color.withARel(opacity * alpha).toRgba());
  return (
    ({
      0: 'none',
      1: `0 1px 1px 0 ${s[0]}, 0 2px 1px -1px ${s[1]}, 0 1px 3px 0 ${s[2]}`,
      2: `0 2px 2px 0 ${s[0]}, 0 3px 1px -2px ${s[1]}, 0 1px 5px 0 ${s[2]}`,
      3: `0 3px 4px 0 ${s[0]}, 0 3px 3px -2px ${s[1]}, 0 1px 8px 0 ${s[2]}`,
      4: `0 4px 5px 0 ${s[0]}, 0 1px 10px 0 ${s[1]}, 0 2px 4px -1px ${s[2]}`,
      6: `0 6px 10px 0 ${s[0]}, 0 1px 18px 0 ${s[1]}, 0 3px 5px -1px ${s[2]}`,
      8: `0 8px 10px 1px ${s[0]}, 0 3px 14px 2px ${s[1]}, 0 5px 5px -3px ${s[2]}`,
      9: `0 9px 12px 1px ${s[0]}, 0 3px 16px 2px ${s[1]}, 0 5px 6px -3px ${s[2]}`,
      12: `0 12px 17px 2px ${s[0]}, 0 5px 22px 4px ${s[1]}, 0 7px 8px -4px ${s[2]}`,
      16: `0 16px 24px 2px ${s[0]}, 0 6px 30px 5px ${s[1]}, 0 8px 10px -5px ${s[2]}`,
      24: `0 24px 38px 3px ${s[0]}, 0 9px 46px 8px ${s[1]}, 0 11px 15px -7px ${s[2]}`,
    } as { [d: number]: string })[depth] || 'none'
  );
};
