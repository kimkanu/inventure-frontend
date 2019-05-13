import React, { FunctionComponent } from 'react';
import { shadowText } from '../styles';
import { Color, COLORS } from '../colors';
import ButtonBase from '@material-ui/core/ButtonBase';
import Link from './Link';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  link?: string;
  depth?: number;
  opacity?: number;
  imgSrc?: string;
  alt?: string;
}

const CardWithPicture: FunctionComponent<Props> = ({
  onClick = () => {},
  link,
  children,
  depth = 4,
  opacity = 1.6,
  imgSrc,
  alt,
}) => {
  const content = (
    <div
      style={{
        backgroundColor: 'white',
        display: 'flex',
        width: '100%',
        height: '10rem',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: shadowText({
          depth,
          opacity,
          color: new Color(COLORS.gray!.darker),
        }),
      }}
    >
      <div
        style={{
          width: '10rem',
          height: '10rem',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '8px',
        }}
      >
        <img
          src={imgSrc}
          style={{
            height: '10rem',
            borderRadius: '8px',
          }}
          alt={alt}
        />
      </div>
      <div
        style={{
          width: 'calc(100% - 10rem)',
          height: '100%',
          right: '0',
          position: 'relative',
          borderRadius: '8px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
  return (
    <div
      onClick={onClick}
      style={{
        width: '100%',
        margin: '1rem 0',
      }}
    >
      <ButtonBase
        style={{
          width: '100%',
          borderRadius: '8px',
        }}
      >
        {link ? <Link to={link}>{content}</Link> : content}
      </ButtonBase>
    </div>
  );
};

export default CardWithPicture;
