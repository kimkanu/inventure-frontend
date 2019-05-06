import React, { FunctionComponent } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <div style={{ position: 'absolute' }}>
        <CircularProgressbar percentage={(100 * (time.total - time.current)) / time.total} />
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '1.8em',
            position: 'absolute',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
          }}
        >
          <span>{name}</span>
          <span>
            Set {sets.current} / {sets.total}
          </span>
          <span>
            {Math.floor(time.current / 60)}:{time.current % 60}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
