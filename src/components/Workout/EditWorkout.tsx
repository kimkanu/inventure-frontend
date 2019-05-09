import React, { FunctionComponent, useState, useEffect } from 'react';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { COLORS } from '../../colors';
import { useGlobalState } from '../../stores';
import ButtonLarge from '../Buttons/ButtonLarge';
import EdgeIcon from '../Icons/EdgeIcon';
import BackButton from '../Buttons/BackButton';
import BottomToolbar from '../BottomToolbar';
import WorkoutTable from './WorkoutTable';
import { randomString, convertRemToPixels } from '../../utils';
import { undoEditWorkoutPlan } from '../../stores/workout';
import Dialog from '../Dialog';
import { History } from 'history';

interface Props extends RouteComponentProps {}

const bottomToolbarId = `bottom-toolbar--${randomString(10)}`;

const adjustTablePosition = (
  id: string,
  setPosition: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const tableElement = document.querySelector('.workout-table') as HTMLTableElement;
  const clientBottom = tableElement.clientTop + tableElement.clientHeight;
  const bottomToolbar = document.getElementById(id) as HTMLDivElement;
  const threshold = clientBottom + convertRemToPixels(1) + bottomToolbar.clientHeight + 72 + 104;
  setPosition(window.innerHeight <= threshold);
};

const backButtonClickHandler = (history: History<any>, setDialog: any) => {
  setDialog({
    show: true,
    title: 'Discard changes?',
    children: <div>hihi</div>,
  });
  history.push('/workout/edit/confirm');
};

interface DialogProps {
  show: boolean;
  title: string;
  children: React.ReactNode;
}

const EditWorkoutDialog: FunctionComponent<DialogProps> = (dialog) => {
  return (
    <Dialog show={dialog.show} title={dialog.title}>
      {dialog.children}
    </Dialog>
  );
};

const EditWorkout: FunctionComponent<Props> = ({ location }) => {
  const [position, setPosition] = useState(true); // true for relative, false for absolute
  const workout = useGlobalState('workout')[0];

  const [dialog, setDialog] = useState({
    show: false,
    title: 'Discard changes?',
    children: <div>hihi</div> as React.ReactNode,
  });

  useEffect(() => {
    if (location.pathname === '/workout/edit/confirm') {
      setDialog({
        show: true,
        title: 'Discard changes?',
        children: <div>hihi</div>,
      });
    } else {
      setDialog({
        show: false,
        title: '',
        children: null,
      });
    }

    adjustTablePosition(bottomToolbarId, setPosition);
    const handler = () => adjustTablePosition(bottomToolbarId, setPosition);
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [location.pathname]);

  return (
    <Route
      render={({ history }) => (
        <div>
          <Route
            path="/workout/edit"
            component={() => (
              <div className="fade">
                <div className="content">
                  <h1 className="heading">
                    <BackButton onClick={() => backButtonClickHandler(history, setDialog)} />
                    <span>Edit Your Workout</span>
                  </h1>

                  <WorkoutTable
                    workout={workout}
                    editable={true}
                    onChange={() => adjustTablePosition(bottomToolbarId, setPosition)}
                  />

                  <BottomToolbar
                    id={bottomToolbarId}
                    position={position ? 'relative' : 'absolute'}
                    bottom={position ? undefined : '80px'}
                  >
                    <ButtonLarge
                      backgroundColor={COLORS.gray!.light}
                      shadowColor={COLORS.gray!.dark}
                      label="undo"
                      margin="1.5rem"
                      clickHandler={() => undoEditWorkoutPlan()}
                    >
                      <div
                        style={{
                          transform: 'scaleX(-1)',
                        }}
                      >
                        <EdgeIcon buttonSize={48}></EdgeIcon>
                      </div>
                    </ButtonLarge>
                    <ButtonLarge
                      backgroundColor={COLORS.green!.normal}
                      shadowColor={COLORS.green!.dark}
                      link="/workout/edit/add"
                      label="add"
                      margin="1.5rem"
                    >
                      <EdgeIcon buttonSize={48}></EdgeIcon>
                    </ButtonLarge>
                    <ButtonLarge
                      backgroundColor={COLORS.blue!.lighter}
                      shadowColor={COLORS.blue!.darker}
                      clickHandler={() => {}}
                      label="save"
                      margin="1.5rem"
                    >
                      <EdgeIcon buttonSize={48}></EdgeIcon>
                    </ButtonLarge>
                  </BottomToolbar>
                </div>
              </div>
            )}
          />
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.pathname}
                  timeout={{ enter: 400, exit: 400 }}
                  classNames={'content--pop-up-transition'}
                >
                  <div>
                    <Route
                      location={location}
                      exact
                      path="/workout/edit/add"
                      component={() => (
                        <div className="pop-content">
                          <div className="content" style={{ backgroundColor: '#fcfcfc' }}>
                            <h1 className="heading">
                              <BackButton to={'/workout/edit'} />
                              <span>Add Workout</span>
                            </h1>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
          <EditWorkoutDialog show={dialog.show} title="hi">
            hihi
          </EditWorkoutDialog>
        </div>
      )}
    />
  );
};

export default withRouter(EditWorkout);
