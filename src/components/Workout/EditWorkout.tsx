import React, { FunctionComponent, useState, useEffect } from 'react';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { COLORS, primaryColor } from '../../colors';
import { useGlobalState } from '../../stores';
import ButtonLarge from '../Buttons/ButtonLarge';
import EdgeIcon from '../Icons/EdgeIcon';
import BackButton from '../Buttons/BackButton';
import BottomToolbar from '../BottomToolbar';
import WorkoutTable from './WorkoutTable';
import { randomString, convertRemToPixels } from '../../utils';
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

// the id for bottom toolbar in this component, containing three buttons: undo, add, and save.
const bottomToolbarId = `bottom-toolbar--${randomString(10)}`;

// function adjusting position property of the toolbar.
// called when the component is loaded, the window is resized, or the table height is changed.
const adjustToolbarPosition = (setPosition: React.Dispatch<React.SetStateAction<boolean>>) => {
  const tableElement = document.querySelector('.workout-table') as HTMLTableElement;
  const clientBottom = tableElement.clientTop + tableElement.clientHeight;
  const bottomToolbar = document.getElementById(bottomToolbarId) as HTMLDivElement;
  const threshold = clientBottom + convertRemToPixels(1) + bottomToolbar.clientHeight + 72 + 104;
  setPosition(window.innerHeight <= threshold);
};

// click handler for back button
const backButtonClickHandler = (
  history: History<any>,
  setDialog: any,
  actionRecords: ActionRecord[],
) => {
  if (actionRecords.length === 0) {
    history.push('/workout/view');
    return;
  }
  history.push('/workout/edit/confirm');
  setDialog({
    show: true,
  });
};

// click handler for save button
const saveButtonClickHandler = (history: History<any>, setDialog: any) => {
  saveEditWorkoutPlan();
  setDialog({
    show: false,
  });
  history.push('/workout/view');
};
// click handler for cancel button
const cancelButtonClickHandler = (history: History<any>, setDialog: any) => {
  history.push('/workout/edit');
  setDialog({
    show: false,
  });
};
// click handler for discard button
const discardButtonClickHandler = (history: History<any>, setDialog: any) => {
  setDialog({
    show: false,
  });
  setTimeout(() => {
    history.push('/workout/view');
  }, 100);
  setTimeout(() => {
    discardEditWorkoutPlan();
  }, 500);
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

interface Props extends RouteComponentProps {}
const EditWorkout: FunctionComponent<Props> = ({ location, history }) => {
  const [position, setPosition] = useState(true); // true for relative, false for absolute
  const workout = useGlobalState('workout')[0];

  const [dialog, s] = useState<DialogProps>({
    show: false,
    title: 'Discard changes?',
    children: (
      <>
        <p>There are unsaved changes. Do you want to save them?</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: 'calc(100% + 1.6rem)',
            marginLeft: '-0.8rem',
            marginBottom: '-0.7rem',
          }}
        >
          <div>
            <DialogTextButton
              text="discard"
              onClick={() => discardButtonClickHandler(history, setDialog)}
            />
          </div>
          <div>
            <DialogTextButton
              text="cancel"
              onClick={() => cancelButtonClickHandler(history, setDialog)}
            />
            <DialogTextButton
              text="save"
              bold
              onClick={() => saveButtonClickHandler(history, setDialog)}
            />
          </div>
        </div>
      </>
    ) as React.ReactNode,
  });
  const setDialog = (newDialog: Partial<DialogProps>) =>
    s({
      ...dialog,
      ...newDialog,
    });

  useEffect(() => {
    if (location.pathname === '/workout/edit/confirm') {
      setDialog({
        show: true,
      });
    } else {
      setDialog({
        show: false,
      });
    }

    adjustToolbarPosition(setPosition);
    const handler = () => adjustToolbarPosition(setPosition);
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);
  useEffect(() => {
    window.onpopstate = () => {
      history.push('/workout/edit/confirm');
      backButtonClickHandler(history, setDialog, workout.actionRecords);
    };
    return () => {
      window.onpopstate = null;
    };
  }, [workout.actionRecords.length]);

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
                    <BackButton
                      onClick={() =>
                        backButtonClickHandler(history, setDialog, workout.actionRecords)
                      }
                    />
                    <span>Edit Your Workout</span>
                  </h1>

                  <WorkoutTable
                    workout={workout}
                    editable={true}
                    onChange={() => adjustToolbarPosition(setPosition)}
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
                      onClick={() => undoEditWorkoutPlan()}
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
                      onClick={() => saveButtonClickHandler(history, setDialog)}
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
                      path="/workout/edit/add"
                      component={() => <AddWorkout />}
                    />
                  </div>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
          <EditWorkoutDialog show={dialog.show} title={dialog.title}>
            {dialog.children}
          </EditWorkoutDialog>
        </div>
      )}
    />
  );
};

export default withRouter(EditWorkout);
