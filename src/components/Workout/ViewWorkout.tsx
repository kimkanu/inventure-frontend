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

const bottomToolbarId = `bottom-toolbar--${randomString(10)}`;

const adjustToolbarPosition = (
  id: string,
  setPosition: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const tableElement = document.querySelector('.workout-table') as HTMLTableElement;
  const clientBottom = tableElement.clientTop + tableElement.clientHeight;
  const bottomToolbar = document.getElementById(id) as HTMLDivElement;
  const threshold = clientBottom + convertRemToPixels(1) + bottomToolbar.clientHeight + 176;
  setPosition(window.innerHeight <= threshold);
};

const ViewWorkout: FunctionComponent<Props> = ({}) => {
  const [position, setPosition] = useState(true); // true for relative, false for absolute
  const workout = useGlobalState('workout')[0];

  useEffect(() => {
    adjustToolbarPosition(bottomToolbarId, setPosition);
    const handler = () => adjustToolbarPosition(bottomToolbarId, setPosition);
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

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

            <BottomToolbar
              id={bottomToolbarId}
              position={position ? 'relative' : 'absolute'}
              bottom={position ? undefined : '80px'}
            >
              <ButtonLarge
                backgroundColor={'#fff'}
                shadowColor={COLORS.gray!.darker}
                color={COLORS.gray!.dark}
                label={workout.muted ? 'muted' : 'unmuted'}
                margin="1.5rem"
                onClick={() => toggleMute()}
              >
                <EdgeIcon buttonSize={48}>{workout.muted ? '' : ''}</EdgeIcon>
              </ButtonLarge>
              <ButtonLarge
                backgroundColor={COLORS.blue!.light}
                shadowColor={COLORS.blue!.darker}
                labelInside="Start"
                label="&nbsp;"
                margin="1.5rem"
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
