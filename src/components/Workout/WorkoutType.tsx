import React, { FunctionComponent, useState, useEffect } from 'react';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { useGlobalState } from '../../stores';
import CardWithPicture from '../CardWithPicture';
import Link from '../Link';
import { useStyles, sansSerifFont } from '../../styles';
import { transparentImage } from '../../contants';
import { changeWorkoutType } from '../../stores/workout';
import { capitalizeFirst } from '../../utils';

interface Props extends RouteComponentProps {}

const WorkoutType: FunctionComponent<Props> = ({ history }) => {
  const staticInfo = useGlobalState('static')[0];

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
                alt={`${capitalizeFirst(name)} image`}
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
                <span style={useStyles(sansSerifFont, { fontSize: '1.5rem' })}>
                  {capitalizeFirst(name)}
                </span>
              </CardWithPicture>
            ))}
          </div>
        </div>
      )}
    />
  );
};

export default withRouter(WorkoutType);
