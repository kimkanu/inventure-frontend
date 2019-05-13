import React, { FunctionComponent } from 'react';

interface Props {
  id?: string;
  position?: 'absolute' | 'relative';
  bottom?: number | string;
}

const BottomToolbar: FunctionComponent<Props> = ({ children, id, position, bottom }) => {
  return (
    <div
      id={id}
      style={{
        bottom,
        display: 'flex',
        position: position || 'relative',
        justifyContent: 'center',
        width: 'calc(100% - 1.33rem)',
        marginTop: '1.33rem',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {children}
    </div>
  );
};

export default BottomToolbar;
