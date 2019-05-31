import React, { FunctionComponent, useState, useEffect } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { useGlobalState } from '../../stores';
import WorkoutTable from './WorkoutTable';
import BackButton from '../Buttons/BackButton';
import BottomToolbar from '../BottomToolbar';
import { convertRemToPixels, randomString, untilNthIndex } from '../../utils';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import EditWorkout from './EditWorkout';
import ButtonLarge from '../Buttons/ButtonLarge';
import { COLORS } from '../../colors';
import { undoEditWorkoutPlan, toggleMute, goNext } from '../../stores/workout';
import EdgeIcon from '../Icons/EdgeIcon';

interface Props {}

const ViewWorkout: FunctionComponent<Props> = ({}) => {
  const workout = useGlobalState('workout')[0];

  return (
    <Route
      path={['/workout/view', '/workout/edit']}
      render={({ history }) => (
        <div className="to-right">
          <div className="content">
            <h1 className="heading">
              <BackButton
                onClick={() => {
                  history.goBack();
                }}
              />
              <span>Your Workout</span>
            </h1>
            <WorkoutTable workout={workout} editable={false} />

            <BottomToolbar position={'fixed'} bottom={'64px'}>
              <ButtonLarge
                backgroundColor={COLORS.gray!.normal}
                shadowColor={COLORS.gray!.darker}
                depth={6}
                link="/workout/edit"
                label="Edit"
                margin=".8em"
              >
                <EdgeIcon buttonSize={48}></EdgeIcon>
              </ButtonLarge>
              <ButtonLarge
                backgroundColor={'#fff'}
                shadowColor={COLORS.gray!.darker}
                color={COLORS.gray!.dark}
                label={workout.muted ? 'muted' : 'unmuted'}
                onClick={() => toggleMute()}
              >
                <EdgeIcon buttonSize={48}>{workout.muted ? '' : ''}</EdgeIcon>
              </ButtonLarge>
              <ButtonLarge
                backgroundColor={COLORS.blue!.light}
                shadowColor={COLORS.blue!.darker}
                labelInside="Start"
                label="&nbsp;"
                link="/workout/start"
                onClick={goNext}
              >
                <EdgeIcon buttonSize={48}></EdgeIcon>
              </ButtonLarge>
            </BottomToolbar>
          </div>
        </div>
      )}
    />
  );
};

export default withRouter(ViewWorkout);
