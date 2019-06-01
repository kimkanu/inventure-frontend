import React, { FunctionComponent, useState, useMemo, useEffect, Component } from 'react';
import Timer from './Timer';
import ButtonLarge from '../Buttons/ButtonLarge';
import EdgeIcon from '../Icons/EdgeIcon';
import { COLORS, COLOR_BACKGROUND } from '../../colors';
import { useStyles, sansSerifFont } from '../../styles';
import { Redirect } from 'react-router-dom';
import { useGlobalState } from '../../stores';
import { toggleMute, goNext, togglePause } from '../../stores/workout';
import BottomToolbar from '../BottomToolbar';
import { voiceAssistance } from '../../voiceAssistance';

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
const PauseButton: FunctionComponent = () => {
  return (
    <ButtonLarge
      onClick={togglePause}
      backgroundColor={'#fff'}
      shadowColor={COLORS.gray!.darker}
      color={COLORS.gray!.dark}
      label={useGlobalState('workout')[0].paused ? 'RESUME' : 'PAUSE'}
    >
      <EdgeIcon buttonSize={48}>{useGlobalState('workout')[0].paused ? '' : ''}</EdgeIcon>
    </ButtonLarge>
  );
};

const StartWorkout: FunctionComponent = () => {
  const [workout] = useGlobalState('workout');
  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.time < 0) {
      goNext();
    }
  });
  useEffect(() => {
    if (workout.time < 10) {
      voiceAssistance.speak({
        text: 'Hello, how are you today?', // FIXME
      });
    }
  }, [workout.time < 10]);
  const plan = workout.plan.filter((p) => !p.hidden);

  return workout.current[0] === -1 ? (
    <Redirect to="/workout" />
  ) : workout.current[1] % 2 === 0 ? (
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
        <BottomToolbar bottom="64px" position="absolute">
          <div>
            <ButtonLarge
              link="/workout/pain" /* fixme */
              backgroundColor={COLORS.red!.light}
              shadowColor={COLORS.red!.dark}
              label="quit"
            >
              <EdgeIcon buttonSize={48}></EdgeIcon>
            </ButtonLarge>
          </div>

          <MuteButton />
          <PauseButton />

          <ButtonLarge
            backgroundColor={COLORS.blue!.light}
            shadowColor={COLORS.blue!.dark}
            label="done"
            onClick={goNext}
          >
            <EdgeIcon buttonSize={48}></EdgeIcon>
          </ButtonLarge>
        </BottomToolbar>
      </div>
    </div>
  );
};

export default StartWorkout;
