import React, { FunctionComponent } from 'react';
import { shadowText } from '../../styles';
import { Color } from '../../colors';
import ButtonBase from '@material-ui/core/ButtonBase';
import Link from '../Link';

interface Props {
  backgroundColor: string | Color;
  shadowColor: string | Color;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  link?: string;
  color?: string | Color;
  depth?: number;
  opacity?: number;
}

const ButtonSmall: FunctionComponent<Props> = ({
  backgroundColor,
  shadowColor,
  onClick = () => {},
  color = 'white',
  link,
  children,
  depth = 6,
  opacity = 1.6,
}) => {
  const content = (
    <div
      style={{
        backgroundColor:
          typeof backgroundColor === 'string' ? backgroundColor : backgroundColor.toHex(),
        color: typeof color === 'string' ? color : color.toHex(),
        width: 36,
        height: 36,
        borderRadius: '50%',
        WebkitAppearance: 'none',
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
      onClick={onClick}
      style={{
        display: 'inline-block',
      }}
    >
      <ButtonBase style={{ borderRadius: '50%' }}>
        {link ? <Link to={link}>{content}</Link> : content}
      </ButtonBase>
    </div>
  );
};

export default ButtonSmall;
