import React, { FunctionComponent, useState, useEffect } from 'react';
import { COLORS } from '../colors';

const Banner: FunctionComponent = () => {
  const [visible, setV] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 360 || window.innerHeight < 600) {
      setV(true);
    }
  }, []);

  return (
    <div
      style={{
        width: 'calc(100% - 16px)',
        position: 'fixed',
        bottom: 'calc(100 * var(--vh) + 2px)',
        height: 'fit-content',
        zIndex: 999999999,
        transition: 'transform .38s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: visible ? 'translateY(calc(100% + 2px))' : 'none',
        backgroundColor: COLORS.red!.lighter,
        color: 'white',
        padding: '4px 8px',
        fontSize: '0.8rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <span>Your screen size is not supported.</span>
      <span
        style={{
          fontFamily: 'EdgeIcons',
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
