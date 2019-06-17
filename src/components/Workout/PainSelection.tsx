import React, { FunctionComponent, useState, useEffect } from 'react';
import { withRouter, Route, RouteComponentProps, Prompt } from 'react-router-dom';
import { useGlobalState } from '../../stores';
import BackButton from '../Buttons/BackButton';
import BottomToolbar from '../BottomToolbar';
import Link from '../Link';
import { COLORS } from '../../colors';
import ButtonLarge from '../Buttons/ButtonLarge';
import EdgeIcon from '../Icons/EdgeIcon';
import DialogTextButton from '../Dialog/DialogTextButton';
import {
  WorkoutPlan,
  addWorkout,
  BodyPart,
  togglePain,
  unbanWorkout,
  saveEditWorkoutPlan,
} from '../../stores/workout';
import Dialog from '../Dialog';
import { capitalizeFirst, unique, randomElement } from '../../utils';
import { History } from 'history';
import { makeStyles } from '@material-ui/styles';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from '@material-ui/core';
import { sansSerifFont, useStyles } from '../../styles';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PainSelectorProps {
  bodyParts: BodyPart[];
}
const PainSelector: FunctionComponent<PainSelectorProps> = ({ bodyParts }) => {
  const [workout] = useGlobalState('workout');

  const handleChange = (bodyPart: BodyPart, checked: boolean) => {
    togglePain({ bodyPart, checked });
  };

  return (
    <FormControl
      style={{
        marginBottom: '1rem',
      }}
    >
      <FormGroup>
        {bodyParts
          .map((x) => workout.pain[x])
          .map((pain, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  defaultChecked={pain}
                  onChange={(e) => {
                    handleChange(bodyParts[i], e.currentTarget.checked);
                  }}
                  value={bodyParts[i]}
                  color="primary"
                />
              }
              label={
                <span style={useStyles(sansSerifFont, { fontSize: '1rem' })}>
                  {capitalizeFirst(bodyParts[i])}
                </span>
              }
            />
          ))}
      </FormGroup>
    </FormControl>
  );
};

interface SpotProps {
  x: number;
  y: number;
  bodyPart: BodyPart | BodyPart[];
  right?: boolean;
  setDialog: (newDialog: Partial<DialogProps>) => void;
  onSave: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const Spot: FunctionComponent<SpotProps> = ({ x, y, setDialog, bodyPart, onSave }) => {
  const workout = useGlobalState('workout')[0];
  const pain = Array.isArray(bodyPart)
    ? bodyPart.some((x) => workout.pain[x])
    : workout.pain[bodyPart];
  return (
    <div
      style={{
        position: 'absolute',
        top: `${y}%`,
        left: `${x}%`,
        margin: 'calc(-3 * var(--vh)) 0 0 calc(-3 * var(--vh))',
        width: 'calc(6 * var(--vh))',
        minWidth: '24px',
        minHeight: '24px',
        height: 'calc(6 * var(--vh))',
        borderRadius: '50%',
        border: `2.7px dashed ${pain ? COLORS.red!.light : COLORS.gray!.normal}cc`,
        backgroundColor: pain ? `${COLORS.red!.light}80` : '#fff9',
        boxSizing: 'border-box',
        cursor: 'pointer',
      }}
      onClick={() => {
        if (!Array.isArray(bodyPart)) {
          togglePain({ bodyPart, checked: !pain });
          return;
        }
        setDialog({
          show: true,
          title: bodyPart.map(capitalizeFirst).join(' & '),
          children: (
            <div style={{ width: '400px', maxWidth: '100%' }}>
              <PainSelector bodyParts={bodyPart} />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: 'calc(100% + 1.6rem)',
                  marginLeft: '-0.8rem',
                  marginBottom: '-0.7rem',
                }}
              >
                <div>
                  <DialogTextButton
                    text="save"
                    bold
                    onClick={(e) => {
                      onSave(e);
                    }}
                  />
                </div>
              </div>
            </div>
          ),
        });
      }}
    />
  );
};

interface AnatomyProps {
  setDialog: (newDialog: Partial<DialogProps>) => void;
}

const PainSelectionAnatomy: FunctionComponent<AnatomyProps> = ({ setDialog }) => {
  const staticInfo = useGlobalState('static')[0];

  return (
    <div
      style={{
        position: 'absolute',
        height: 'calc(100*var(--vh) - 247px)',
        width: 'calc(100% - 1.33rem)',
        marginTop: '-36px',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          marginBottom: '.5em',
          fontSize: '0.9em',
        }}
      >
        Touch wherever you feel a pain to select.
      </p>
      <div
        style={{
          position: 'relative',
          width: 'calc(56.23 * var(--vh) - 138.9px)',
          left: 'calc(50% - 28.12 * var(--vh) + 69.45px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={staticInfo.images.anatomy ? staticInfo.images.anatomy.image : ''}
          style={{
            height: 'calc(100*var(--vh) - 91px - 156px)',
          }}
        />
        {/* neck */}
        <Spot
          x={50}
          y={15}
          bodyPart="neck"
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
        {/* chest & back */}
        <Spot
          x={50}
          y={27}
          bodyPart={['chest', 'back']}
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
        {/* stomach & waist */}
        <Spot
          x={50}
          y={40}
          bodyPart={['stomach', 'waist']}
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
        {/* shoulders */}
        <Spot
          x={30}
          y={21}
          bodyPart="shoulder"
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
        <Spot
          x={70}
          y={21}
          bodyPart="shoulder"
          right
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
        {/* arms */}
        <Spot
          x={27.5}
          y={34}
          bodyPart="arm"
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
        <Spot
          x={72.5}
          y={34}
          bodyPart="arm"
          right
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
        {/* wrists */}
        <Spot
          x={24}
          y={47}
          bodyPart="wrist"
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
        <Spot
          x={76}
          y={47}
          bodyPart="wrist"
          right
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
        {/* thighs */}
        <Spot
          x={40}
          y={58}
          bodyPart="thigh"
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
        <Spot
          x={60}
          y={58}
          bodyPart="thigh"
          right
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
        {/* knees */}
        <Spot
          x={38}
          y={70}
          bodyPart="knee"
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
        <Spot
          x={62}
          y={70}
          bodyPart="knee"
          right
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
        {/* calves */}
        <Spot
          x={38}
          y={82}
          bodyPart="calf"
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
        <Spot
          x={62}
          y={82}
          bodyPart="calf"
          right
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
        {/* ankles */}
        <Spot
          x={38}
          y={93}
          bodyPart="ankle"
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
        <Spot
          x={62}
          y={93}
          bodyPart="ankle"
          right
          setDialog={setDialog}
          onSave={() => {
            setDialog({ show: false });
          }}
        />
      </div>
    </div>
  );
};

const BannedTrainingList: FunctionComponent = () => {
  const [workout] = useGlobalState('workout');
  const [staticInfo] = useGlobalState('static');
  return (
    <FormControl
      style={{
        marginBottom: '1rem',
      }}
    >
      <FormGroup>
        {unique(
          Object.keys(staticInfo.others.painInfo)
            .filter((bodyPart) => (workout.pain as any)[bodyPart] as boolean)
            .map((bodyPart) => staticInfo.others.painInfo[bodyPart])
            .reduce((a, b) => [...a, ...b], []),
        ).map((bannedWorkout, i) => (
          <FormControlLabel
            key={i}
            style={{
              marginBottom: '-0.3rem',
            }}
            control={
              <Checkbox
                defaultChecked={workout.unbannedWorkouts.includes(bannedWorkout)}
                onChange={(e) => {
                  unbanWorkout(bannedWorkout);
                }}
                value={bannedWorkout}
                color="primary"
              />
            }
            label={
              <span
                style={useStyles(
                  sansSerifFont,
                  { fontSize: '1rem' },
                  workout.unbannedWorkouts.includes(bannedWorkout)
                    ? {}
                    : { color: COLORS.gray!.dark, textDecoration: 'line-through' },
                )}
              >
                {capitalizeFirst(bannedWorkout)}
              </span>
            }
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

interface DialogProps {
  show: boolean;
  title: string | React.ReactNode;
  children: React.ReactNode;
}
interface Props extends RouteComponentProps {}
const PainSelection: FunctionComponent<Props> = ({ history }) => {
  const [workout] = useGlobalState('workout');
  const pain = Object.values(workout.pain).some((x) => x);
  const [staticInfo] = useGlobalState('static');
  const [dialog, s] = useState<DialogProps>({
    show: false,
    title: '',
    children: (
      <div style={{ width: '400px', maxWidth: '100%' }}>
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
              text="cancel"
              onClick={() => {
                setDialog({ show: false });
              }}
            />
          </div>
          <div>
            <DialogTextButton
              text="add"
              bold
              onClick={() => {
                setDialog({ show: false });
              }}
            />
          </div>
        </div>
      </div>
    ) as React.ReactNode,
  });
  const setDialog = (newDialog: Partial<DialogProps>) => {
    s((d) => ({
      ...d,
      ...newDialog,
    }));
  };
  const bannedWorkouts =
    Object.keys(staticInfo.others.painInfo)
      .filter((bodyPart) => (workout.pain as any)[bodyPart] as boolean)
      .map((bodyPart) => staticInfo.others.painInfo[bodyPart])
      .reduce((a, b) => [...a, ...b], [])
      .filter((name) => !workout.unbannedWorkouts.includes(name)).length === 0;
  const workouts = Object.keys(staticInfo.workoutInfo)
    .filter((name) => [staticInfo.workoutInfo[name].type.name, 'custom'].includes(workout.type))
    .filter(
      (name) =>
        !Object.keys(staticInfo.others.painInfo)
          .filter((bodyPart) => (workout.pain as any)[bodyPart] as boolean)
          .map((bodyPart) => staticInfo.others.painInfo[bodyPart])
          .reduce((a, b) => [...a, ...b], [])
          .filter((name) => !workout.unbannedWorkouts.includes(name))
          .includes(name),
    )
    .map((name) => ({
      name,
      ...staticInfo.workoutInfo[name],
    }));

  const setDefaultPlan = () => {
    if (workout.plan.filter((p) => !p.hidden).length > 0) return;
    if (workouts.length === 0) return;
    [0, 1, 2].map(() => {
      const { name } = randomElement(workouts)!;
      const reps = 8 + Math.floor(Math.random() * 8);
      const sets = 2 + Math.floor(Math.random() * 3);
      const t = 4 + Math.random() * 8;
      const time = Math.round((t * reps) / 5) * 5;
      addWorkout({
        name,
        reps,
        sets,
        time,
        hidden: false,
      });
      saveEditWorkoutPlan();
    });
  };

  return (
    <Route
      path={['/workout/pain', '/workout/view', '/workout/edit']}
      render={({ history }) => (
        <div className="to-right">
          <Prompt
            when={dialog.show}
            message={(location) => {
              if (location.pathname === '/workout') {
                setDialog({
                  show: false,
                });
                return false;
              }
              return true;
            }}
          />
          <div className="content">
            <h1 className="heading">
              <BackButton
                onClick={() => {
                  history.goBack();
                }}
              />
              <span>Feel a Pain?</span>
            </h1>
            <PainSelectionAnatomy setDialog={setDialog} />

            <BottomToolbar position="absolute" bottom="80px">
              {pain ? (
                <ButtonLarge
                  shadowColor={COLORS.red!.dark}
                  backgroundColor={COLORS.red!.light}
                  labelInside="Continue with pain"
                  onClick={() => {
                    if (bannedWorkouts) {
                      history.push(workout.current[0] === -1 ? '/workout/view' : '/workout/rest');
                    }
                    setDialog({
                      show: true,
                      title: (
                        <span>
                          <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            style={{
                              color: COLORS.red!.light,
                            }}
                          />{' '}
                          Warning!
                        </span>
                      ),
                      children: (
                        <div>
                          <p style={{ marginTop: 0 }}>
                            These workouts can cause you <b>PAIN</b>. You may select them to include
                            in today's training.
                          </p>
                          <BannedTrainingList />
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              width: 'calc(100% + 1.6rem)',
                              marginLeft: '-0.8rem',
                              marginBottom: '-0.7rem',
                            }}
                          >
                            <div>
                              <DialogTextButton
                                text="proceed"
                                bold
                                onClick={() => {
                                  workout.current[0] === -1 && setDefaultPlan();
                                  setDialog({ show: false });
                                  history.push(
                                    workout.current[0] === -1 ? '/workout/view' : '/workout/rest',
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ),
                    });
                  }}
                />
              ) : (
                <ButtonLarge
                  link={workout.current[0] === -1 ? '/workout/view' : '/workout/rest'}
                  shadowColor={COLORS.blue!.dark}
                  backgroundColor={COLORS.blue!.light}
                  labelInside="I have no pain now"
                  onClick={() => {
                    workout.current[0] === -1 && setDefaultPlan();
                  }}
                />
              )}
            </BottomToolbar>
          </div>
          <Dialog
            show={dialog.show}
            title={dialog.title}
            onClose={() =>
              setDialog({
                show: false,
              })
            }
          >
            {dialog.children}
          </Dialog>
        </div>
      )}
    />
  );
};

export default withRouter(PainSelection);
