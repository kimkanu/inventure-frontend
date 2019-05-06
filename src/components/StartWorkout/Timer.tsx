import React, { FunctionComponent } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useStyles, sansSerifFont } from '../../styles';

interface Props {
  name: string;
  sets: { current: number; total: number };
  time: { current: number; total: number };
}

const Timer: FunctionComponent<Props> = ({ name, sets, time }) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <div style={{ position: 'absolute' }}>
        <CircularProgressbar
          percentage={(100 * (time.total - time.current)) / time.total}
          styles={{
            root: {
              width: '45vh',
              height: '45vh',
            },
          }}
        />
        <div
          style={useStyles(sansSerifFont, {
            fontWeight: 'bold',
            position: 'absolute',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
          })}
        >
          <span
            style={{
              fontSize: '1.2em',
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontSize: '1.2em',
            }}
          >
            Set {sets.current} / {sets.total}
          </span>
          <span
            style={{
              fontSize: '2em',
            }}
          >
            {Math.floor(time.current / 60)}:{time.current % 60}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
