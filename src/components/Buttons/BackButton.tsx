import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../../colors';
import { ButtonBase } from '@material-ui/core';
import EdgeIcon from '../Icons/EdgeIcon';

interface Props {
  to?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const BackButton: FunctionComponent<Props> = ({ to, onClick }) => {
  if (!to && !onClick) return null;
  if (to) {
    return (
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
          onClick={onClick}
        >
          <EdgeIcon buttonSize="back"></EdgeIcon>
        </ButtonBase>
      </Link>
    );
  }
  return (
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
      onClick={onClick}
    >
      <EdgeIcon buttonSize="back"></EdgeIcon>
    </ButtonBase>
  );
};

export default BackButton;
