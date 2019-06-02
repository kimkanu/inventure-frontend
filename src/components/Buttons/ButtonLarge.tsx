import React, { FunctionComponent } from 'react';
import { shadowText, useStyles, sansSerifFont } from '../../styles';
import { Color } from '../../colors';
import ButtonBase from '@material-ui/core/ButtonBase';
import Link from '../Link';
import EdgeIcon from '../Icons/EdgeIcon';

interface Props {
  backgroundColor: string | Color;
  color?: string | Color;
  shadowColor: string | Color;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  link?: string;
  label?: string;
  labelInside?: string;
  margin?: number | string;
  depth?: number;
  opacity?: number;
  hidden?: boolean;
  style?: React.CSSProperties;
}

const ButtonLarge: FunctionComponent<Props> = ({
  backgroundColor,
  shadowColor,
  onClick = () => {},
  color = 'white',
  link,
  children,
  label,
  labelInside,
  margin = '1rem',
  depth = 8,
  opacity = 1.6,
  hidden = false,
  style,
}) => {
  const content = (
    <div
      style={{
        backgroundColor:
          typeof backgroundColor === 'string' ? backgroundColor : backgroundColor.toHex(),
        color: typeof color === 'string' ? color : color.toHex(),
        display: 'inline-block',
        width: 'fit-content',
        minWidth: '48px',
        height: '48px',
        borderRadius: '24px',
        textAlign: 'center',
      }}
    >
      <div style={labelInside ? { margin: '0 15px' } : {}}>
        {children ? children : <EdgeIcon buttonSize={48} />}
        {labelInside ? (
          <span
            style={useStyles(sansSerifFont, {
              display: 'inline-block',
              fontSize: '1rem',
              marginLeft: '0.3em',
              marginRight: children ? '0' : '0.3em',
              lineHeight: '31px',
              verticalAlign: 'text-bottom',
            })}
          >
            {labelInside}
          </span>
        ) : null}
      </div>
    </div>
  );
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '.4rem 0',
        opacity: hidden ? 0.2 : 1,
        ...(style || {}),
      }}
      hidden={hidden}
      aria-hidden={hidden}
    >
      <div
        style={{
          margin: `0 ${typeof margin === 'number' ? `${margin}px` : margin}`,
          borderRadius: '24px',
          WebkitAppearance: 'none',
          boxShadow: shadowText({
            depth,
            opacity,
            color: typeof shadowColor === 'string' ? new Color(shadowColor) : shadowColor,
          }),
        }}
      >
        <div onClick={hidden ? undefined : onClick}>
          <ButtonBase
            style={{
              borderRadius: '24px',
              cursor: hidden ? 'default' : 'pointer',
            }}
            hidden={hidden}
            aria-hidden={hidden}
          >
            {link && !hidden ? <Link to={link}>{content}</Link> : content}
          </ButtonBase>
        </div>
      </div>
      {label ? (
        <div
          style={useStyles(sansSerifFont, {
            fontSize: '0.8rem',
            width: 'fit-content',
            marginTop: '.2em',
            cursor: hidden ? 'default' : 'pointer',
          })}
          hidden={hidden}
          aria-hidden={hidden}
        >
          {label.toLocaleUpperCase()}
        </div>
      ) : null}
    </div>
  );
};

export default ButtonLarge;
