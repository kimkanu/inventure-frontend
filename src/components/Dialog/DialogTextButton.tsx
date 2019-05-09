import React, { FunctionComponent } from 'react';
import './index.css';
import { useStyles, sansSerifFont } from '../../styles';

interface Props {
  show: boolean;
  title: string;
}

const Dialog: FunctionComponent<Props> = ({ show, title, children }) => (
  <div
    style={{
      padding: '1.3rem',
    }}
  >
    <div style={useStyles(sansSerifFont)}>{children}</div>
  </div>
);

export default Dialog;
