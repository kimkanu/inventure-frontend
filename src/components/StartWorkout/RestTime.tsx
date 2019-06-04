import React, { FunctionComponent, useEffect, useState, FunctionComponentElement } from 'react';
import { useStyles, sansSerifFont } from '../../styles';
import { COLORS, COLOR_BACKGROUND } from '../../colors';
import ButtonSmall from '../Buttons/ButtonSmall';
import EdgeIcon from '../Icons/EdgeIcon';
import { useGlobalState } from '../../stores';
import {
  goNext,
  toggleMute,
  togglePause,
  quitEntireWorkout,
  quitWorkout,
} from '../../stores/workout';
import { Redirect, RouteComponentProps, withRouter, Prompt, Route } from 'react-router-dom';
import { capitalizeFirst, untilNthIndex } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfo,
  faCheck,
  faAngleRight,
  faExclamationTriangle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import BottomToolbar from '../BottomToolbar';
import ButtonLarge from '../Buttons/ButtonLarge';
import { voiceAssistance } from '../../voiceAssistance';
import Dialog from '../Dialog';
import { navigateTab } from '../../stores/tab';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import InfoScreen from './InfoScreen';

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

interface CurrentProgressItemProps {
  completed: boolean;
  yet: boolean;
  current?: boolean;
  name: string;
  sets?: number;
  totalSets?: number;
}
const CurrentProgressItem: FunctionComponent<CurrentProgressItemProps> = ({
  completed,
  yet,
  name,
  current = false,
  sets,
  totalSets,
}) => {
  return (
    <div
      style={{
        margin: '0.8rem 0',
      }}
    >
      {current ? (
        <div
          style={{
            position: 'absolute',
            width: 'calc(1.6rem - 4px)',
            height: 'calc(1.6rem - 4px)',
            backgroundColor: 'white',
            borderRadius: '50%',
            left: '-2.85rem',
            border: `2px solid ${COLORS.gray!.light}`,
            color: COLORS.gray!.light,
            textAlign: 'center',
          }}
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            style={{
              transform: 'translate(0.5px, -1px)',
            }}
          />
        </div>
      ) : null}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          lineHeight: '1.6rem',
          height: '1.6rem',
        }}
      >
        <span
          style={{
            color: yet || current ? COLORS.gray!.darkest : COLORS.gray!.dark,
            textDecoration: yet || current ? '' : 'line-through',
            lineHeight: '1rem',
          }}
        >
          {current ? <b>{name}</b> : name}
          {sets ? ` (Set ${sets}/${totalSets})` : ''}
        </span>
        {!yet && !current ? (
          <span>
            <div
              style={{
                color: 'white',
                backgroundColor: completed ? COLORS.green!.normal : COLORS.red!.light,
                width: '1.6rem',
                height: '1.6rem',
                borderRadius: '50%',
                textAlign: 'center',
                marginLeft: '1.5rem',
              }}
            >
              <FontAwesomeIcon
                icon={completed ? faCheck : faTimes}
                style={{
                  transform: completed ? 'translateY(1px)' : 'none',
                }}
              />
            </div>
          </span>
        ) : null}
      </div>
    </div>
  );
};

const CurrentProgress: FunctionComponent = ({ children }) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        height: 'fit-content',
        marginBottom: '-1rem',
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 'calc(2px + 2rem)',
          height: '100%',
          maxHeight: 'calc(40 * var(--vh) - 78px - 42px)',
        }}
      >
        <div
          style={{
            position: 'relative',
            margin: '0 1rem',
            width: '2px',
            backgroundColor: COLORS.gray!.light,
            height: '100%',
          }}
        />
      </div>
      <div
        style={{
          position: 'relative',
          margin: '0.5rem 0',
          marginLeft: 'calc(2px + 3rem)',
          width: 'calc(100% - 2rem)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

const RestTime: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [workout] = useGlobalState('workout');
  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.time < 0) {
      goNext();
    }
  });
  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.muted) return;
    if (workout.time < workout.restTime - 0.5) return;
    if (voiceAssistance.speaking()) voiceAssistance.cancel();
    voiceAssistance.speak({
      text: `Next workout is ${plan[workout.current[0]].name}, set ${workout.current[1] / 2 +
        1} of ${plan[workout.current[0]].sets}.`,
    });
  }, []);

  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.muted) return;
    if (workout.time < 31 && workout.time > 30.5) {
      if (voiceAssistance.speaking()) voiceAssistance.cancel();
      voiceAssistance.speak({
        text: 'Thirty seconds before the workout starts.',
      });
    }
  }, [workout.time < 31]);

  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.muted) return;
    if (workout.time < 11 && workout.time > 10.5) {
      if (voiceAssistance.speaking()) voiceAssistance.cancel();
      voiceAssistance.speak({
        text: 'Ten seconds before the workout starts.',
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
                    onClick={() => {
                      history.push('/profile');
                      navigateTab('profile');
                      quitEntireWorkout();
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
                      history.push('/profile');
                      navigateTab('profile');
                      quitEntireWorkout();
                    }}
                  />
                </div>
              ),
            });
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

  const [staticInfo] = useGlobalState('static');

  return workout.current[0] === -2 ? (
    <Redirect to="/workout/congrats" />
  ) : workout.current[0] === -1 && !workout.quitted ? (
    <Redirect to="/workout" />
  ) : workout.current[0] === -1 && workout.quitted ? null : workout.current[1] % 2 === 1 ? (
    <Redirect to="/workout/start" />
  ) : (
    <>
      <Prompt
        when
        message={(location) => {
          if (!location.pathname.startsWith('/workout')) return true;
          if (location.pathname === '/workout/pain') return true;
          if (location.pathname === '/workout/rest/info') return true;
          if (location.pathname === '/workout/rest') return true;
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
      <div className="content">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h1
            className="heading"
            style={{
              width: 'fit-content',
            }}
          >
            Rest Time
          </h1>

          <div
            style={useStyles(sansSerifFont, {
              padding: '0.6em 0px 1em',
              fontSize: '1.6em',
              fontWeight: 'normal',
            })}
          >
            {Math.floor(Math.floor(workout.time) / 60)}:
            {(Math.floor(workout.time) % 60 < 10 ? '0' : '') + (Math.floor(workout.time) % 60)}
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: '1.3em',
              lineHeight: '36px',
              maxWidth: 'calc(100% - 48px)',
              display: 'inline-block',
            }}
          >
            Next:{' '}
            <b
              style={{
                fontSize: '1.1em',
              }}
            >
              {capitalizeFirst(workout.current[0] < 0 ? '' : plan[workout.current[0]].name)}
            </b>
          </span>
          &nbsp;&nbsp;
          <ButtonSmall
            backgroundColor={COLORS.blue!.light}
            shadowColor={COLORS.blue!.light}
            color={'#fff'}
            onClick={() => history.push('/workout/rest/info')}
            hidden={!staticInfo.workoutInfo[plan[workout.current[0]].name].instruction}
          >
            <span
              style={{
                fontSize: '1.3rem',
                lineHeight: '33px',
              }}
            >
              <FontAwesomeIcon icon={faInfo} style={{ fontSize: '80%' }} />
            </span>
          </ButtonSmall>
        </div>

        <BottomToolbar bottom="64px" position="absolute">
          <div>
            <ButtonLarge
              onClick={() => {
                setWasPaused(workout.paused);
                setDialog({
                  show: true,
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

        <div
          className="workoutStatus"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            marginTop: 'calc(60 * var(--vh) - 184px)',
            marginLeft: 'auto',
            marginRight: 'auto',
            minWidth: '248px',
            width: 'fit-content',
            maxHeight: 'calc(40 * var(--vh) - 60px - 42px)',
          }}
        >
          <span
            style={{
              fontWeight: 'bold',
              marginBottom: '.5rem',
              fontSize: '1.1rem',
            }}
          >
            Current Progress
          </span>
          <CurrentProgress>
            {plan.map((p, i) => {
              if (i < workout.completed.length) {
                return (
                  <CurrentProgressItem
                    key={i}
                    completed={workout.completed[i][0]}
                    yet={false}
                    name={p.name}
                  />
                );
              }
              if (i === workout.current[0]) {
                return (
                  <CurrentProgressItem
                    key={i}
                    completed={false}
                    yet={false}
                    current
                    name={p.name}
                    sets={workout.current[1] / 2 + 1}
                    totalSets={p.sets}
                  />
                );
              }
              return <CurrentProgressItem key={i} completed={false} yet={true} name={p.name} />;
            })}
          </CurrentProgress>
        </div>
      </div>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={untilNthIndex(location.pathname, '/', 4)}
              timeout={{ enter: 300, exit: 500 }}
              classNames={'content--pop-up-transition'}
            >
              <div>
                <Route
                  location={location}
                  path="/workout/rest/info"
                  render={() => <InfoScreen />}
                />
              </div>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </>
  );
};

export default withRouter(RestTime);
