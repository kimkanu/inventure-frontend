import React, { FunctionComponent, useState } from 'react';
import { Dialog as D } from '@material-ui/core';
import { useStyles, sansSerifFont, headingFont } from '../../styles';
import './index.css';

interface Props {
  show: boolean;
  title?: string;
}

const Dialog: FunctionComponent<Props> = ({ show, title, children }) => (
  <D
    open={show}
    closeAfterTransition
    transitionDuration={300}
    fullWidth={true}
    classes={{
      paperFullWidth: 'dialog--fullscreen',
    }}
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
