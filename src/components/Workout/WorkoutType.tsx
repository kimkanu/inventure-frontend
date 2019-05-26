import React, { FunctionComponent, useState, useEffect } from 'react';
import { withRouter, Route, RouteComponentProps, Redirect } from 'react-router-dom';
import { useGlobalState } from '../../stores';
import CardWithPicture from '../CardWithPicture';
import Link from '../Link';
import { useStyles, sansSerifFont } from '../../styles';
import { transparentImage } from '../../contants';
import { changeWorkoutType } from '../../stores/workout';
import { capitalizeFirst } from '../../utils';

interface Props extends RouteComponentProps {}

const WorkoutType: FunctionComponent<Props> = ({ location, history }) => {
  const [workout] = useGlobalState('workout');
  const [staticInfo] = useGlobalState('static');
  useEffect(() => {
    if (workout.current[0] >= 0 && location.pathname === '/workout') {
      history.push('workout/start');
    }
  }, []);

  const workoutTypeList = [
    { name: 'bulking', options: ['Chest and Arms', 'Back', 'Legs'] },
    { name: 'cardio', options: [] },
    { name: 'custom', options: [] },
  ];

  return (
    <Route
      path={['/workout']}
      render={() => (
        <div className="fade">
          <div className="content">
            <h1 className="heading">Start Workout</h1>
            {workoutTypeList.map(({ name, options }, i) => (
              <CardWithPicture
                key={i}
                imgSrc={(staticInfo.images[name] || {}).image || transparentImage}
                alt={`The icon for ${name} workout`}
                onClick={() => {
                  changeWorkoutType(name);
                  if (options.length) {
                    history.push({
                      pathname: '/workout/pain',
                      state: options,
                    });
                  } else history.push('/workout/pain');
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  <span style={useStyles(sansSerifFont, { fontSize: '1.5rem' })}>
                    {capitalizeFirst(name)}
                  </span>
                </div>
              </CardWithPicture>
            ))}
          </div>
        </div>
      )}
    />
  );
};

export default withRouter(WorkoutType);
