import React, { FunctionComponent } from 'react';

type PermittedSize = 36 | 48 | 'back';
interface Props {
  buttonSize: PermittedSize;
}

const EdgeIcon: FunctionComponent<Props> = ({ children, buttonSize }) => {
  const styleArray: { key: PermittedSize; value: React.CSSProperties }[] = [
    { key: 36, value: { fontSize: '1.2rem', lineHeight: '33px' } },
    { key: 48, value: { fontSize: '1.6rem', lineHeight: '45px' } },
    {
      key: 'back',
      value: { fontSize: '2rem', lineHeight: '0.7em', transform: 'translateY(-0.064em)' },
    },
  ];

  const styleMap = new Map<PermittedSize, React.CSSProperties>(
    styleArray.map((x) => [x.key, x.value] as [PermittedSize, React.CSSProperties]),
  );

  return (
    <span
      style={{
        ...styleMap.get(buttonSize),
        fontFamily: 'EdgeIcons',
      }}
    >
      {children}
    </span>
  );
};

export default EdgeIcon;
