import React, { FunctionComponent, Component, useEffect } from 'react';
import Iframe from 'react-iframe';
import { useStyles, headingFont, sansSerifFont } from '../../styles';
import { COLORS } from '../../colors';
import ButtonSmall from '../Buttons/ButtonSmall';
import EdgeIcon from '../Icons/EdgeIcon';
import { useGlobalState } from '../../stores';
import { goNext, reduceTime } from '../../stores/workout';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';

const RestTime: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [workout, setWorkout] = useGlobalState('workout');
  const [staticInfo] = useGlobalState('static');
  useEffect(() => {
    if (workout.current[0] < 0) return;
    if (workout.time === 0) {
      goNext();
    }
    const timeout = setTimeout(reduceTime, 1000);
    return () => {
      clearTimeout(timeout);
    };
  });

  const plan = workout.plan.filter((p) => !p.hidden);
  console.log(plan[workout.current[0]].name);
  console.log(staticInfo.workoutInfo);
  console.log(staticInfo.workoutInfo[plan[workout.current[0]].name].youtube);

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
            style={useStyles(headingFont, {
              padding: '1.33rem  0',
              fontSize: '2rem',
              fontWeight: 'normal',
            })}
          >
            {Math.floor(workout.time / 60)}:
            {(workout.time % 60 < 10 ? '0' : '') + (workout.time % 60)}
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              margin: '1.5em',
            }}
          >
            <span style={useStyles(sansSerifFont, { fontSize: '1.6em', margin: '5px' })}>
              Next:
            </span>
            <span
              style={useStyles(sansSerifFont, {
                fontSize: '1.6em',
                fontWeight: 'bold',
                margin: '5px',
              })}
            >
              {plan[workout.current[0]].name}
            </span>

            <span
              style={{
                margin: '5px',
              }}
            >
              <div>
                <ButtonSmall
                  // clickHandler={toggleMute}
                  backgroundColor={COLORS.blue!.light}
                  shadowColor={COLORS.blue!.light}
                  color={'#fff'}
                >
                  <EdgeIcon buttonSize={36}></EdgeIcon>
                </ButtonSmall>
              </div>
            </span>
          </div>
          <div style={{ width: 'fit-content' }}>
            {
              <iframe
                width="300"
                height="200"
                src={staticInfo.workoutInfo[plan[workout.current[0]].name].youtube}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            }
          </div>
        </div>

        <div
          className="workoutStatus"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '3em',
          }}
        >
          <span style={useStyles(sansSerifFont, { fontSize: '1.2em', margin: '1.5em' })}>
            Current Progress:{' '}
          </span>
          <div
            style={{
              borderLeft: `2px solid ${COLORS.gray!.light}`,
              height: '20%',
            }}
          >
            {/* <div
              style={{
                padding: '0 0 2em 2em',
                display: 'flex',
              }}
            >
              <span>Deadlift</span>
              
            </div> */}
            <div
              style={{
                margin: '0 0 2em 2em',
                overflow: 'auto',
                scrollBehavior: 'smooth',
              }}
            >
              <span>15 Pushups</span>
            </div>
            <div
              style={{
                padding: '0 0 2em 2em',
              }}
            >
              <span>10 Benchpress</span>
            </div>
            <div
              style={{
                padding: '0 0 2em 2em',
              }}
            >
              <span>10 Deadlift</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(RestTime);
