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
        height: '8rem',
        borderRadius: '8px',
        textAlign: 'initial',
        WebkitAppearance: 'none',
        boxShadow: shadowText({
          depth,
          opacity,
          color: new Color(COLORS.gray!.darker),
        }),
      }}
    >
      <div
        style={{
          width: '6rem',
          height: '6rem',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '8px',
          margin: '1rem',
        }}
      >
        <img
          src={imgSrc}
          style={{
            height: '6rem',
            borderRadius: '8px',
          }}
          alt={alt}
        />
      </div>
      <div
        style={{
          width: 'calc(100% - 9rem)',
          height: '100%',
          margin: '0 1rem 0 0',
          position: 'relative',
          borderRadius: '8px',
          display: 'flex',
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
