import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../../colors';
import { ButtonBase } from '@material-ui/core';
import EdgeIcon from '../Icons/EdgeIcon';

// FIXME: we need confirmation
const BackButton: FunctionComponent<{ to: string }> = ({ to }) => (
  <Link
    to={to}
    style={{
      textDecoration: 'none',
      color: COLORS.gray!.darker,
    }}
  >
    <ButtonBase
      style={{
        fontSize: '1em',
        display: 'inline-flex',
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '6px',
        transform: 'translateY(-4px)',
        marginLeft: '-6px',
        marginRight: '6px',
        borderRadius: '50%',
      }}
    >
      <EdgeIcon buttonSize="back"></EdgeIcon>
    </ButtonBase>
  </Link>
);

export default BackButton;
