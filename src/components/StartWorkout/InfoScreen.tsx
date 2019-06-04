import React, {
  FunctionComponent,
  useState,
  Component,
  PureComponent,
  useEffect,
  useMemo,
} from 'react';
import BackButton from '../Buttons/BackButton';
import { COLOR_BACKGROUND } from '../../colors';
import { useGlobalState } from '../../stores';
import { Route, RouteComponentProps, withRouter, Prompt } from 'react-router-dom';
import { untilNthIndex, randomString, capitalizeFirst } from '../../utils';
import { ButtonBase } from '@material-ui/core';
import Dialog from '../Dialog';
import DialogTextButton from '../Dialog/DialogTextButton';
import { useStyles, sansSerifFont, shadow } from '../../styles';
import { WorkoutInfo } from '../../stores/static';
import Fuse from 'fuse.js';
import Slider from '../Slider';
import { addWorkout, WorkoutPlan } from '../../stores/workout';

interface Props extends RouteComponentProps {}

const InfoScreen: FunctionComponent<Props> = ({ history, location }) => {
  return (
    <Route
      path="/workout/rest/info"
      location={{
        ...location,
        pathname: untilNthIndex(location.pathname, '/', 4),
      }}
      render={() => (
        <div className="pop-content">
          <div className="content" style={{ backgroundColor: COLOR_BACKGROUND }}>
            <h1 className="heading">
              <BackButton onClick={history.goBack} />
              <span>Info?</span>
            </h1>
          </div>
        </div>
      )}
    />
  );
};

export default withRouter(InfoScreen);
