import React, { FunctionComponent, useEffect } from 'react';
import { useStyles, sansSerifFont } from '../../styles';
import { COLORS } from '../../colors';
import ButtonSmall from '../Buttons/ButtonSmall';
import EdgeIcon from '../Icons/EdgeIcon';
import { useGlobalState } from '../../stores';
import { goNext, toggleMute, togglePause } from '../../stores/workout';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { capitalizeFirst } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faCheck, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import BottomToolbar from '../BottomToolbar';
import ButtonLarge from '../Buttons/ButtonLarge';
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
const RestTime: FunctionComponent<RouteComponentProps> = () => {
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
    voiceAssistance.speak({
      text: `Next workout is ${plan[workout.current[0]].name}, set ${workout.current[1] / 2 +
        1} of ${plan[workout.current[0]].sets}.`,
    });
  }, []);

  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.muted) return;
    if (workout.time < 31 && workout.time > 30.5) {
      voiceAssistance.speak({
        text: 'Thirty seconds before the workout starts.',
      });
    }
  }, [workout.time < 31]);

  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.muted) return;
    if (workout.time < 11 && workout.time > 10.5) {
      voiceAssistance.speak({
        text: 'Ten seconds before the workout starts.',
      });
    }
  }, [workout.time < 11]);

  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.muted) return;
    if (workout.time < 4 && workout.time > 3.5) {
      voiceAssistance.speak({
        text: 'three',
      });
    }
  }, [workout.time < 4]);

  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.muted) return;
    if (workout.time < 3 && workout.time > 2.5) {
      voiceAssistance.speak({
        text: 'two',
      });
    }
  }, [workout.time < 3]);

  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.muted) return;
    if (workout.time < 2 && workout.time > 1.5) {
      voiceAssistance.speak({
        text: 'one',
      });
    }
  }, [workout.time < 2]);

  const plan = workout.plan.filter((p) => !p.hidden);

  return workout.current[0] === -2 ? (
    <Redirect to="/workout/congrats" />
  ) : workout.current[0] === -1 ? (
    <Redirect to="/workout" />
  ) : workout.current[1] % 2 === 1 ? (
    <Redirect to="/workout/start" />
  ) : (
    <>
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
            // clickHandler={toggleMute}
            backgroundColor={COLORS.blue!.light}
            shadowColor={COLORS.blue!.light}
            color={'#fff'}
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
              link="/workout/pain" /* fixme */
              onClick={() => {
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
                position: 'fixed',
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
                left: 'calc(2px + 3rem)',
                width: 'calc(100% - 2rem)',
              }}
            >
              <div
                style={{
                  margin: '0.5rem 0',
                }}
              >
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
                      color: COLORS.gray!.dark,
                    }}
                  >
                    <s>이름</s>
                  </span>
                  <span>
                    <div
                      style={{
                        color: 'white',
                        backgroundColor: COLORS.green!.normal,
                        width: '1.6rem',

                        height: '1.6rem',
                        borderRadius: '50%',
                        textAlign: 'center',
                        marginRight: '1.5rem',
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{
                          transform: 'translateY(1px)',
                        }}
                      />
                    </div>
                  </span>
                </div>
              </div>
              <div
                style={{
                  margin: '0.5rem 0',
                }}
              >
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    lineHeight: '1.6rem',
                    height: '1.6rem',
                  }}
                >
                  <span>이름</span>
                </div>
              </div>
              <div
                style={{
                  margin: '0.5rem 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    lineHeight: '1.6rem',
                    height: '1.6rem',
                  }}
                >
                  <span>이름</span>
                </div>
              </div>
              <div
                style={{
                  margin: '0.5rem 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    lineHeight: '1.6rem',
                    height: '1.6rem',
                  }}
                >
                  <span>이름</span>
                </div>
              </div>
              <div
                style={{
                  margin: '0.5rem 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    lineHeight: '1.6rem',
                    height: '1.6rem',
                  }}
                >
                  <span>이름</span>
                </div>
              </div>
              <div
                style={{
                  margin: '0.5rem 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    lineHeight: '1.6rem',
                    height: '1.6rem',
                  }}
                >
                  <span>이름</span>
                </div>
              </div>
              <div
                style={{
                  margin: '0.5rem 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    lineHeight: '1.6rem',
                    height: '1.6rem',
                  }}
                >
                  <span>이름</span>
                </div>
              </div>
              <div
                style={{
                  margin: '0.5rem 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    lineHeight: '1.6rem',
                    height: '1.6rem',
                  }}
                >
                  <span>이름</span>
                </div>
              </div>
              <div
                style={{
                  margin: '0.5rem 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    lineHeight: '1.6rem',
                    height: '1.6rem',
                  }}
                >
                  <span>이름</span>
                </div>
              </div>
              <div
                style={{
                  margin: '0.5rem 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    lineHeight: '1.6rem',
                    height: '1.6rem',
                  }}
                >
                  <span>이름</span>
                </div>
              </div>
              <div
                style={{
                  margin: '0.5rem 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    lineHeight: '1.6rem',
                    height: '1.6rem',
                  }}
                >
                  <span>이름</span>
                </div>
              </div>
              <div
                style={{
                  margin: '0.5rem 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    lineHeight: '1.6rem',
                    height: '1.6rem',
                  }}
                >
                  <span>이름</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(RestTime);
