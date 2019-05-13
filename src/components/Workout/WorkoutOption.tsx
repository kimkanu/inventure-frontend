import React, { FunctionComponent, useState, useEffect, useMemo } from 'react';
import { withRouter, RouteComponentProps, Route, Prompt } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { COLORS, primaryColor } from '../../colors';
import { useGlobalState } from '../../stores';
import ButtonLarge from '../Buttons/ButtonLarge';
import EdgeIcon from '../Icons/EdgeIcon';
import BackButton from '../Buttons/BackButton';
import BottomToolbar from '../BottomToolbar';
import WorkoutTable from './WorkoutTable';
import { randomString, convertRemToPixels, untilNthIndex } from '../../utils';
import {
  undoEditWorkoutPlan,
  ActionRecord,
  saveEditWorkoutPlan,
  discardEditWorkoutPlan,
} from '../../stores/workout';
import Dialog from '../Dialog';
import { History } from 'history';
import DialogTextButton from '../Dialog/DialogTextButton';
import AddWorkout from './AddWorkout';

interface DialogProps {
  show: boolean;
  title: string;
  children: React.ReactNode;
}
interface Props extends RouteComponentProps {}

const WorkoutOption: FunctionComponent<Props> = ({ location }) => {
  const options = location.state as string[];
  return (
    <Route
      render={({ history, location }) => (
        <div>
          <Route
            path="/workout/option"
            render={() => (
              <div className="to-right">
                <div className="content">
                  <h1 className="heading">
                    <BackButton onClick={() => history.goBack()} />
                    <span>Select Option</span>
                  </h1>
                  {options.reduce((a: string, b: string) => a + b)}
                </div>
              </div>
            )}
          />
        </div>
      )}
    />
  );
};

export default withRouter(WorkoutOption);
