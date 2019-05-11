import React, { FunctionComponent, useState, useEffect } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { useGlobalState } from '../../stores';
import WorkoutTable from './WorkoutTable';
import BackButton from '../Buttons/BackButton';
import BottomToolbar from '../BottomToolbar';
import { convertRemToPixels, randomString } from '../../utils';

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
      render={() => (
        <div>
          <Route
            path="/workout/view"
            component={() => (
              <div className="fade">
                <div className="content">
                  <h1 className="heading">
                    <BackButton to="/workout" />
                    <span>Your Workout</span>
                  </h1>
                  <WorkoutTable workout={workout} editable={false} />

                  <BottomToolbar
                    id={bottomToolbarId}
                    position={position ? 'relative' : 'absolute'}
                    bottom={position ? undefined : '80px'}
                  >
                    ㅇㅅ
                  </BottomToolbar>
                </div>
              </div>
            )}
          />
        </div>
      )}
    />
  );
};

export default withRouter(ViewWorkout);
