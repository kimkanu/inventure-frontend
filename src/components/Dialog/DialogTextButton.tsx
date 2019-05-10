import React, { FunctionComponent } from 'react';
import './index.css';
import { useStyles, sansSerifFont } from '../../styles';
import { Color, primaryColor } from '../../colors';
import { ButtonBase, Button } from '@material-ui/core';
import { styled } from '@material-ui/styles';

interface Props {
  text: string;
  backgroundColor?: string | Color;
  color?: string | Color;
  bold?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const DialogTextButton: FunctionComponent<Props> = ({
  text,
  backgroundColor = 'transparent',
  color = primaryColor.normal,
  bold = false,
  onClick,
}) => {
  const Button = styled(ButtonBase)({
    hover: { backgroundColor: 'red' },
  });

  return (
    <Button
      style={{
        margin: '0 0.2rem',
        borderRadius: '4px',
      }}
      onClick={onClick}
    >
      <div
        style={useStyles(sansSerifFont, {
          padding: '0.4rem 0.7rem',
          fontSize: '0.9rem',
          borderRadius: '4px',
          color: typeof color === 'string' ? color : color.toHex(),
          backgroundColor:
            typeof backgroundColor === 'string' ? backgroundColor : backgroundColor.toHex(),
          fontWeight: bold ? 'bold' : 'normal',
        })}
      >
        {text.toLocaleUpperCase()}
      </div>
    </Button>
  );
};
export default DialogTextButton;
