import React, { FunctionComponent } from 'react';

interface Props {
  id?: string;
  position?: 'absolute' | 'relative' | 'fixed';
  bottom?: number | string;
  zIndex?: number;
}

const BottomToolbar: FunctionComponent<Props> = ({ children, id, position, bottom, zIndex }) => {
  return (
    <div
      id={id}
      style={{
        bottom,
        display: 'flex',
        position: position || 'relative',
        justifyContent: 'center',
        width: 'calc(100vw - 1.33rem)',
        marginTop: '1.33rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        ...(zIndex ? { zIndex } : {}),
      }}
    >
      {children}
    </div>
  );
};

export default BottomToolbar;
