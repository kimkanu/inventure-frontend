import React, { FunctionComponent, useState } from 'react';
import { useStyles, headingFont } from '../styles';
import { COLORS } from '../colors';
import { ButtonBase } from '@material-ui/core';

interface Props {
  onChange: (value: string, index?: number) => void;
  defaultVal?: number;
  labels: string[];
}

const SectionSelector: FunctionComponent<Props> = ({ onChange, defaultVal = 0, labels }) => {
  const [value, setValue] = useState(defaultVal);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {labels.map((label, index) => {
        return (
          <ButtonBase
            key={index}
            style={{
              borderRadius: '2rem',
              margin: '.5rem .2rem',
            }}
            onClick={() => {
              setValue((old) => {
                if (old !== index) onChange(labels[index], index);
                return index;
              });
            }}
          >
            <div
              style={useStyles(headingFont, {
                width: 'fit-content',
                fontSize: '1.5rem',
                padding: '.6rem .8rem .3rem',
                borderRadius: '2rem',
                backgroundColor: value === index ? COLORS.blue!.lighter : 'transparent',
                color: value === index ? '#fff' : COLORS.gray!.normal,
                transition:
                  'color 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              })}
            >
              {label}
            </div>
          </ButtonBase>
        );
      })}
    </div>
  );
};

export default SectionSelector;
