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
  setRestTime,
} from '../../stores/workout';
import Dialog from '../Dialog';
import { History } from 'history';
import DialogTextButton from '../Dialog/DialogTextButton';
import AddWorkout from './AddWorkout';

// click handler for back button
const backButtonClickHandler = (
  history: History<any>,
  setDialog: any,
  actionRecords: ActionRecord[],
) => {
  if (actionRecords.length !== 0) {
    setDialog({
      show: true,
    });
  } else {
    history.goBack();
  }
};

// click handler for save button
const saveButtonClickHandler = (
  history: History<any>,
  setDialog: any,
  restTime: number,
  setError: () => void,
) => {
  if (!restTime) {
    setError();
    return;
  }
  saveEditWorkoutPlan();
  setDialog({
    show: false,
  });
  setRestTime(restTime);
  history.goBack();
};
// click handler for cancel button
const cancelButtonClickHandler = (setDialog: any) => {
  setDialog({
    show: false,
  });
};
// click handler for discard button
const discardButtonClickHandler = (history: History<any>, setDialog: any, setSaved: any) => {
  setDialog({
    show: false,
  });
  setSaved(true);
  setTimeout(() => {
    discardEditWorkoutPlan();
  }, 500);
  history.goBack();
};

interface DialogProps {
  show: boolean;
  title: string;
  children: React.ReactNode;
}
interface Props extends RouteComponentProps {}

const EditWorkout: FunctionComponent<Props> = ({ history }) => {
  const workout = useGlobalState('workout')[0];
  const [saved, setSaved] = useState(true);
  const [error, setError] = useState(false);

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
              onClick={() => discardButtonClickHandler(history, setDialog, setSaved)}
            />
          </div>
          <div>
            <DialogTextButton text="cancel" onClick={() => cancelButtonClickHandler(setDialog)} />
            <DialogTextButton
              text="save"
              bold
              onClick={() =>
                saveButtonClickHandler(history, setDialog, mins * 60 + secs, () => setError(true))
              }
            />
          </div>
        </div>
      </>
    ) as React.ReactNode,
  });

  useEffect(() => {
    setSaved(!workout.actionRecords.length);
  }, [workout.actionRecords.length]);

  const setDialog = (newDialog: Partial<DialogProps>) =>
    s({
      ...dialog,
      ...newDialog,
    });

  const [{ mins, secs }, setTime] = useState({
    mins: Math.min(Math.floor(workout.restTime / 60), 5),
    secs: Math.round((workout.restTime % 60) / 15) * 15,
  });

  return (
    <Route
      render={({ history }) => (
        <div>
          <Route
            path="/workout/edit"
            render={() => (
              <div className="fade">
                <Prompt
                  when={!!workout.actionRecords.length}
                  message={(location) => {
                    if (location.pathname === '/workout/view') {
                      if (!saved) {
                        setDialog({
                          show: true,
                        });
                      }
                      return saved;
                    }
                    return true;
                  }}
                />
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
                    mins={mins}
                    secs={secs}
                    setTime={setTime}
                    error={error}
                  />

                  <BottomToolbar position={'fixed'} bottom={'64px'}>
                    <ButtonLarge
                      backgroundColor={COLORS.gray!.normal}
                      shadowColor={COLORS.gray!.dark}
                      label="undo"
                      margin="1.5rem"
                      onClick={() => undoEditWorkoutPlan()}
                      hidden={workout.actionRecords.length === 0}
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
                      backgroundColor={COLORS.green!.light}
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
                      onClick={() =>
                        saveButtonClickHandler(history, setDialog, mins * 60 + secs, () =>
                          setError(true),
                        )
                      }
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
                  key={untilNthIndex(location.pathname, '/', 4)}
                  timeout={{ enter: 300, exit: 500 }}
                  classNames={'content--pop-up-transition'}
                >
                  <div>
                    <Route
                      location={location}
                      path="/workout/edit/add"
                      render={() => <AddWorkout />}
                    />
                  </div>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
          <Dialog
            show={dialog.show}
            title={dialog.title}
            onClose={() => cancelButtonClickHandler(setDialog)}
          >
            {dialog.children}
          </Dialog>
        </div>
      )}
    />
  );
};

export default withRouter(EditWorkout);
