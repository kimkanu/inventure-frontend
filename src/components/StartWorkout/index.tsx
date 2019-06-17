import React, { FunctionComponent, useState, useMemo, useEffect, Component } from 'react';
import Timer from './Timer';
import ButtonLarge from '../Buttons/ButtonLarge';
import EdgeIcon from '../Icons/EdgeIcon';
import { COLORS, COLOR_BACKGROUND } from '../../colors';
import { useStyles, sansSerifFont } from '../../styles';
import { Redirect, Prompt, RouteComponentProps, withRouter } from 'react-router-dom';
import { useGlobalState } from '../../stores';
import {
  toggleMute,
  goNext,
  togglePause,
  quitEntireWorkout,
  quitWorkout,
} from '../../stores/workout';
import BottomToolbar from '../BottomToolbar';
import { voiceAssistance } from '../../voiceAssistance';
import Dialog from '../Dialog';
import { navigateTab } from '../../stores/tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface DialogProps {
  show: boolean;
  title: string | React.ReactNode;
  children: React.ReactNode;
}
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

const StartWorkout: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [workout] = useGlobalState('workout');
  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.time < 0) {
      goNext();
    }
  });
  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.current[1] % 2 === 0) return;
    if (workout.muted) return;
    if (workout.time < plan[workout.current[0]].time - 0.5) return;
    if (voiceAssistance.speaking()) voiceAssistance.cancel();
    voiceAssistance.speak({
      text: `Let's start the workout ${plan[workout.current[0]].name}.`,
    });
  }, []);

  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.muted) return;
    if (workout.time < 31 && workout.time > 30.5) {
      if (voiceAssistance.speaking()) voiceAssistance.cancel();
      voiceAssistance.speak({
        text: 'Thirty seconds before the rest time starts.',
      });
    }
  }, [workout.time < 31]);

  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.muted) return;
    if (workout.time < 11 && workout.time > 10.5) {
      if (voiceAssistance.speaking()) voiceAssistance.cancel();
      voiceAssistance.speak({
        text: 'Ten seconds before the rest time starts.',
      });
    }
  }, [workout.time < 11]);

  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.muted) return;
    if (workout.time < 4 && workout.time > 3.5) {
      if (voiceAssistance.speaking()) voiceAssistance.cancel();
      voiceAssistance.speak({
        text: 'three',
      });
    }
  }, [workout.time < 4]);

  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.muted) return;
    if (workout.time < 3 && workout.time > 2.5) {
      if (voiceAssistance.speaking()) voiceAssistance.cancel();
      voiceAssistance.speak({
        text: 'two',
      });
    }
  }, [workout.time < 3]);

  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.muted) return;
    if (workout.time < 2 && workout.time > 1.5) {
      if (voiceAssistance.speaking()) voiceAssistance.cancel();
      voiceAssistance.speak({
        text: 'one',
      });
    }
  }, [workout.time < 2]);

  useEffect(() => {
    if (workout.muted && voiceAssistance.speaking()) voiceAssistance.cancel();
  }, [workout.muted]);

  const plan = workout.plan.filter((p) => !p.hidden);

  const [wasPaused, setWasPaused] = useState(workout.paused);

  const dialogContent = (
    <div style={{ width: '400px', maxWidth: '100%' }}>
      Do you want to quit the workout? You <b>CANNOT</b> get any points!
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '1.4em',
        }}
      >
        <ButtonLarge
          labelInside="Quit ENTIRE workout"
          backgroundColor={COLORS.red!.dark}
          shadowColor={COLORS.red!.darkest}
          onClick={() => {
            history.push('/profile');
            navigateTab('profile');
            quitEntireWorkout();
          }}
        />
        <ButtonLarge
          labelInside="Quit current workout"
          backgroundColor={COLORS.red!.light}
          shadowColor={COLORS.red!.darker}
          onClick={() => {
            setDialog({
              title: 'Why do you quit?',
              children: (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '1.4em',
                  }}
                >
                  <ButtonLarge
                    labelInside="Injured"
                    backgroundColor={COLORS.red!.light}
                    shadowColor={COLORS.red!.darker}
                    link="/workout/pain"
                    onClick={() => {
                      quitWorkout();
                      setDialog({ show: false });
                    }}
                  />
                  <ButtonLarge
                    labelInside="Don't want to do"
                    backgroundColor={COLORS.gray!.normal}
                    shadowColor={COLORS.gray!.darkest}
                    style={{
                      marginTop: '1.1em',
                    }}
                    onClick={() => {
                      quitWorkout();
                      setDialog({ show: false });
                    }}
                  />
                </div>
              ),
            });
          }}
        />
        <ButtonLarge
          labelInside="Cancel"
          backgroundColor={COLORS.gray!.normal}
          shadowColor={COLORS.gray!.darkest}
          style={{
            marginTop: '1.9em',
          }}
          onClick={() => {
            setDialog({ show: false });
            if (!wasPaused) togglePause();
          }}
        />
      </div>
    </div>
  ) as React.ReactNode;

  const [dialog, s] = useState<DialogProps>({
    show: false,
    title: (
      <span>
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          style={{
            color: COLORS.red!.light,
          }}
        />{' '}
        Warning!
      </span>
    ),
    children: dialogContent,
  });
  const setDialog = (newDialog: Partial<DialogProps>) => {
    s((d) => ({
      ...d,
      ...newDialog,
    }));
  };

  return workout.current[0] === -1 && !workout.quitted ? (
    <Redirect to="/workout" />
  ) : workout.current[0] === -1 && workout.quitted ? null : workout.current[1] % 2 === 0 ? (
    <Redirect to="/workout/rest" />
  ) : (
    <div className="content">
      <Prompt
        when
        message={(location) => {
          if (!location.pathname.startsWith('/workout')) return true;
          if (location.pathname === '/workout/pain') return true;
          setDialog({
            show: !dialog.show,
          });
          return false;
        }}
      />
      <Dialog
        show={dialog.show}
        title={dialog.title}
        onClose={() => {
          setDialog({ show: false });
          if (!wasPaused) togglePause();
        }}
      >
        {dialog.children}
      </Dialog>
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
              onClick={() => {
                setWasPaused(workout.paused);
                setDialog({ show: true });
                if (!workout.paused) togglePause();
              }}
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

export default withRouter(StartWorkout);
