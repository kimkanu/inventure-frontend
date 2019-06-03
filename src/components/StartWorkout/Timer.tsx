import React, { FunctionComponent } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useStyles, sansSerifFont } from '../../styles';
import { COLORS, primaryColor } from '../../colors';

interface Props {
  name: string;
  reps: number;
  sets: { current: number; total: number };
  time: { current: number; total: number };
}

const Timer: FunctionComponent<Props> = ({ name, sets, time, reps }) => {
  const integerTime = Math.floor(time.current);
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
          percentage={(100 * (time.total - integerTime)) / time.total}
          strokeWidth={7}
          styles={{
            root: {
              width: 'calc(40 * var(--vh))',
              height: 'calc(40 * var(--vh))',
            },
            path: {
              stroke: primaryColor.light,
            },
          }}
        />
        <div
          style={useStyles(sansSerifFont, {
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
              textAlign: 'center',
            }}
          >
            {reps} {name}
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
              fontWeight: 'bold',
            }}
          >
            {time.current < 0 ? (
              <>0:00</>
            ) : (
              <>
                {Math.floor(integerTime / 60)}:
                {(integerTime % 60 < 10 ? '0' : '') + (integerTime % 60)}
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
