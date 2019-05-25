import React, { FunctionComponent, useState, useMemo, useEffect, Component } from 'react';
import Timer from './Timer';
import ButtonLarge from '../Buttons/ButtonLarge';
import EdgeIcon from '../Icons/EdgeIcon';
import { COLORS, COLOR_BACKGROUND } from '../../colors';
import { useStyles, sansSerifFont } from '../../styles';
import { Redirect } from 'react-router-dom';
import { useGlobalState } from '../../stores';
import { toggleMute, reduceTime, goNext } from '../../stores/workout';

interface Props {
  nextStep: String;
}

const NextSection: FunctionComponent<Props> = ({ nextStep }) => {
  return (
    <>
      <div
        style={{
          width: '200px',
          height: '60px',
          position: 'relative',
          margin: 'auto',
          textAlign: 'center',
          border: `1px solid ${COLORS.gray!.light}`,
        }}
      >
        <div>
          <span
            style={useStyles(sansSerifFont, {
              fontSize: '.9rem',
              backgroundColor: COLOR_BACKGROUND,
              display: 'inline-block',
              transform: 'translateY(-.8em)',
              padding: '0 .8em',
            })}
          >
            Next
          </span>
        </div>
        <div>
          <span
            style={useStyles(sansSerifFont, {
              fontWeight: 'bold',
            })}
          >
            {nextStep}
          </span>
        </div>
      </div>
    </>
  );
};

const MuteButton: FunctionComponent = () => {
  return (
    <ButtonLarge
      onClick={toggleMute}
      backgroundColor={'#fff'}
      shadowColor={COLORS.gray!.darker}
      color={COLORS.gray!.dark}
      label={useGlobalState('workout')[0].muted ? 'MUTED' : 'UNMUTED'}
    >
      <EdgeIcon buttonSize={48}>{useGlobalState('workout')[0].muted ? '' : ''}</EdgeIcon>
    </ButtonLarge>
  );
};

const StartWorkout: FunctionComponent = () => {
  const [workout, setWorkout] = useGlobalState('workout');
  useEffect(() => {
    const timeout = setTimeout(reduceTime, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.time < 0) {
      goNext();
    }
    const timeout = setTimeout(reduceTime, 1000);
    return () => {
      clearTimeout(timeout);
    };
  });
  const plan = workout.plan.filter((p) => !p.hidden);

  return workout.current[1] % 2 === 0 ? (
    <Redirect to="/workout/rest" />
  ) : (
    <div className="content">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'space-between',
          height: 'calc(100% - 28px)',
          marginTop: '28px',
        }}
      >
        <div
          style={{
            height: '48vh',
          }}
        >
          <Timer
            name={plan[workout.current[0]].name}
            reps={plan[workout.current[0]].reps}
            sets={{
              current: (workout.current[1] + 1) / 2,
              total: plan[workout.current[0]].sets,
            }}
            time={{ current: workout.time, total: plan[workout.current[0]].time }}
          />
        </div>
        <NextSection nextStep="1 Minute Rest" />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div>
            <ButtonLarge
              link="/workout"
              backgroundColor={COLORS.red!.light}
              shadowColor={COLORS.red!.dark}
            >
              <EdgeIcon buttonSize={48}></EdgeIcon>
            </ButtonLarge>
          </div>

          <MuteButton />

          <ButtonLarge
            backgroundColor={COLORS.blue!.light}
            shadowColor={COLORS.blue!.dark}
            label="done"
          >
            <EdgeIcon buttonSize={48}></EdgeIcon>
          </ButtonLarge>
        </div>
      </div>
    </div>
  );
};

export default StartWorkout;
