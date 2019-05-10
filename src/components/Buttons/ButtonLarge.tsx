import React, { FunctionComponent } from 'react';
import { shadowText, useStyles, sansSerifFont } from '../../styles';
import { Color } from '../../colors';
import ButtonBase from '@material-ui/core/ButtonBase';
import Link from '../Link';

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
        boxShadow: shadowText({
          depth,
          opacity,
          color: typeof shadowColor === 'string' ? new Color(shadowColor) : shadowColor,
        }),
      }}
    >
      <div style={labelInside ? { margin: '0 15px' } : {}}>
        {children}
        {labelInside ? (
          <span
            style={useStyles(sansSerifFont, {
              display: 'inline-block',
              fontSize: '1rem',
              marginLeft: '0.3em',
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
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: `.4rem ${typeof margin === 'number' ? `${margin}px` : margin}`,
      }}
    >
      <div onClick={onClick}>
        <ButtonBase
          style={{
            borderRadius: '24px',
          }}
        >
          {link ? <Link to={link}>{content}</Link> : content}
        </ButtonBase>
      </div>
      {label ? (
        <div
          style={useStyles(sansSerifFont, {
            fontSize: '0.9rem',
            width: 'fit-content',
            marginTop: '.4em',
          })}
        >
          {label.toLocaleUpperCase()}
        </div>
      ) : null}
    </div>
  );
};

export default ButtonLarge;
