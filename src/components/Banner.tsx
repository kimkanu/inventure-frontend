import React, { FunctionComponent, useState, useEffect } from 'react';
import { COLORS } from '../colors';
import { sansSerifFont } from '../styles';

const Banner: FunctionComponent = () => {
  const [visible, setV] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 360 || window.innerHeight < 360) {
      setV(true);
    }
  }, []);

  return (
    <div
      style={{
        ...sansSerifFont,
        width: 'calc(100% - 16px)',
        position: 'fixed',
        bottom: 'calc(100 * var(--vh) + 2px)',
        height: 'fit-content',
        zIndex: 999999999,
        transition: 'transform .38s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: visible ? 'translateY(calc(100% + 2px))' : 'none',
        backgroundColor: COLORS.red!.lighter,
        color: 'white',
        padding: '0 8px',
        fontSize: '0.8rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <span
        style={{
          padding: '4px 6px',
        }}
      >
        Your screen size is not supported.
      </span>
      <span
        style={{
          fontFamily: 'EdgeIcons',
          cursor: 'pointer',
          padding: '4px 6px',
        }}
        onClick={() => {
          setV(false);
        }}
      >
        
      </span>
    </div>
  );
};

export default Banner;
