import React, { FunctionComponent } from 'react';
import { ColorGradient, Color, COLORS } from '../colors';
import { shadow } from '../styles';

interface AchievementProps {
  icon: string;
  name: string;
  scheme: ColorGradient;
  color?: string;
  big?: boolean;
  description: string;
}

const Achievement: FunctionComponent<AchievementProps> = ({
  icon,
  name,
  scheme,
  color = '#fff',
  big = false,
  description,
}) => (
  <>
    <div
      style={{
        width: '100%',
        display: 'flex',
      }}
    >
      <div
        style={{
          color,
          backgroundColor: scheme.light,
          ...shadow({ depth: 3, color: new Color(scheme.dark), opacity: 3 }),
          display: 'inline-flex',
          width: big ? '36px' : '22px',
          height: big ? '36px' : '22px',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          transform: 'translateY(1pt)',
          userSelect: 'none',
          marginTop: big ? '5px' : '2px',
          marginLeft: big ? '0' : '2px',
        }}
      >
        <div
          style={{
            fontFamily: 'EdgeIcons',
            display: 'inline-block',
            width: big ? '36px' : '22px',
            height: big ? '36px' : '22px',
            lineHeight: big ? '36px' : '22px',
            fontSize: big ? '1.2rem' : '.85rem',
            position: 'relative',
            top: '0',
            textAlign: 'center',
          }}
        >
          {icon}
        </div>
      </div>
      {big ? (
        <div
          style={{
            margin: '0 0 0 10px',
            position: 'relative',
            top: '2px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            width: 'calc(100% - 32px)',
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: '0.85rem',
              color: COLORS.gray!.dark,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {description}
          </div>
        </div>
      ) : (
        <div
          style={{
            margin: '0 0 0 6px',
            lineHeight: big ? '36px' : '22px',
            fontWeight: 'bold',
            position: 'relative',
            top: '2px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            width: 'calc(100% - 32px)',
          }}
        >
          {name}
        </div>
      )}
    </div>
    {big ? null : (
      <div
        style={{
          fontSize: '0.85rem',
          color: COLORS.gray!.dark,
          textAlign: 'right',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          marginLeft: '1rem',
        }}
      >
        {description}
      </div>
    )}
  </>
);

export default Achievement;
