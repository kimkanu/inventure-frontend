import React, { FunctionComponent } from 'react';
import { shadowText, useStyles, sansSerifFont } from '../../styles';
import { Color } from '../../colors';
import ButtonBase from '@material-ui/core/ButtonBase';
import Link from '../Link';

interface Props {
  backgroundColor: string | Color;
  color?: string | Color;
  shadowColor: string | Color;
  clickHandler?: (e: React.MouseEvent) => void;
  link?: string;
  label?: string;
  margin?: number | string;
  depth?: number;
  opacity?: number;
}

const ButtonLarge: FunctionComponent<Props> = ({
  backgroundColor,
  shadowColor,
  clickHandler = () => {},
  color = 'white',
  link,
  children,
  label,
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
        width: 48,
        height: 48,
        borderRadius: '50%',
        textAlign: 'center',
        boxShadow: shadowText({
          depth,
          opacity,
          color: typeof shadowColor === 'string' ? new Color(shadowColor) : shadowColor,
        }),
      }}
    >
      {children}
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
      <div onClick={clickHandler}>
        <ButtonBase style={{ borderRadius: '50%' }}>
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
