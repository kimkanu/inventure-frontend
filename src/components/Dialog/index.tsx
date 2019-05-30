import React, { FunctionComponent, useState } from 'react';
import { Dialog as D } from '@material-ui/core';
import { useStyles, sansSerifFont, headingFont } from '../../styles';
import './index.css';

interface Props {
  show: boolean;
  title?: string | React.ReactNode;
  onClose?: (event: React.SyntheticEvent<{}, Event>) => void;
}

const Dialog: FunctionComponent<Props> = ({ show, title, children, onClose }) => (
  <D
    PaperProps={{
      style: {
        minWidth: '320px',
      },
    }}
    open={show}
    onClose={onClose}
    closeAfterTransition
    transitionDuration={200}
  >
    <div
      style={{
        padding: '1.3rem',
      }}
    >
      {title ? (
        <header style={useStyles(headingFont)}>
          <h2 style={{ marginTop: '0' }}>{title}</h2>
        </header>
      ) : null}
      <div style={useStyles(sansSerifFont)}>{children}</div>
    </div>
  </D>
);

export default Dialog;
