import React, { FunctionComponent, useState } from 'react';
import { shadow, useStyles, fullWidth, sansSerifFont } from '../../styles';
import { Color, COLORS } from '../../colors';
import { deleteWorkout, Workout, WorkoutPlan } from '../../stores/workout';
import ButtonSmall from '../Buttons/ButtonSmall';
import EdgeIcon from '../Icons/EdgeIcon';
import { secondsToTimeLiteral } from '../../utils';
import ButtonLarge from '../Buttons/ButtonLarge';
import { Prompt, RouteComponentProps, withRouter } from 'react-router-dom';
import DialogTextButton from '../Dialog/DialogTextButton';
import Dialog from '../Dialog';

interface DialogProps {
  show: boolean;
  title: string;
  children: React.ReactNode;
}
interface Props extends RouteComponentProps {
  editable: boolean;
  workout: Workout;
  onChange?: () => void;
}

const WorkoutTable: FunctionComponent<Props> = ({ editable, workout, onChange, history }) => {
  const plan = editable ? workout.tempPlan : workout.plan;
  const visiblePlan = plan.filter((x) => !x.hidden);
  const breakTime = 60;

  const nonHeaderStyle = {
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
  };
  const firstColumnStyle = {
    paddingLeft: '1em',
    width: editable ? 'calc(100% - 168px - 1.8em)' : 'calc(100% - 120px - 2em)',
  };
  const secondColumnStyle = {
    textAlign: 'center' as 'center',
    width: 60,
  };
  const thirdColumnStyle = {
    textAlign: 'center' as 'center',
    width: 60,
    paddingRight: editable ? '0' : '1em',
  };
  const fourthColumnStyle = {
    textAlign: 'center' as 'center',
    width: 48,
    paddingRight: '.8em',
  };
  const td = ({
    key,
    name,
    reps,
    sets,
    time,
    handleDelete,
  }: WorkoutPlan & {
    key: number | string;
    handleDelete?: () => void;
  }) => (
    <tr
      style={{
        height: 48,
        borderBottom: `1pt solid ${COLORS.gray!.lightest}`,
        fontSize: '0.95em',
      }}
      key={key}
    >
      <td style={useStyles(firstColumnStyle, nonHeaderStyle)}>
        {reps} {name}
      </td>
      <td style={useStyles(secondColumnStyle, nonHeaderStyle)}>{sets}</td>
      <td style={useStyles(thirdColumnStyle, nonHeaderStyle)}>{secondsToTimeLiteral(time)}</td>
      {editable ? (
        <td style={useStyles(fourthColumnStyle, nonHeaderStyle)}>
          <ButtonSmall
            backgroundColor={COLORS.red!.lighter}
            shadowColor={COLORS.red!.dark}
            depth={4}
            opacity={2}
            onClick={() => {
              if (handleDelete) handleDelete();
              if (onChange) setTimeout(onChange, 0);
            }}
          >
            <EdgeIcon buttonSize={36}></EdgeIcon>
          </ButtonSmall>
        </td>
      ) : null}
    </tr>
  );
  const [dialog, s] = useState<DialogProps>({
    show: false,
    title: 'Change rest time',
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
                history.goBack();
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
  return (
    <>
      <Prompt
        when={dialog.show}
        message={(location) => {
          setDialog({
            show: false,
          });
          return false;
        }}
      />
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
      <div
        style={useStyles(shadow({ depth: 4, color: new Color(143, 146, 169), opacity: 1.8 }), {
          borderRadius: 2,
          backgroundColor: 'white',
          maxHeight: 'calc(100 * var(--vh) - 246px)',
          overflow: 'auto',
        })}
      >
        <table
          className="workout-table"
          style={useStyles(fullWidth, {
            borderCollapse: 'collapse',
          })}
        >
          <thead>
            <tr
              style={{
                height: 42,
                borderBottom: `1pt solid ${COLORS.gray!.lightest}`,
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              <th style={useStyles(firstColumnStyle)}>Workout</th>
              <th style={useStyles(secondColumnStyle)}>Sets</th>
              <th style={useStyles(thirdColumnStyle)}>Time</th>
              {editable ? <th style={useStyles(fourthColumnStyle)} /> : null}
            </tr>
          </thead>
          <tbody>
            {plan.map((x, i) =>
              x.hidden
                ? null
                : td({
                    ...x,
                    key: i,
                    handleDelete: () => {
                      deleteWorkout(i);
                    },
                  }),
            )}
          </tbody>
          <tfoot>
            <tr
              style={{
                borderBottom: `1pt solid ${COLORS.gray!.lightest}`,
              }}
            >
              <td
                colSpan={editable ? 4 : 3}
                style={{
                  height: 36,
                  color: COLORS.gray!.normal,
                  textAlign: 'center',
                  fontSize: '0.9em',
                  fontStyle: 'italic',
                }}
              >
                {visiblePlan.length === 0 ? (
                  'CLICK ADD BUTTON TO ADD A NEW WORKOUT'
                ) : (
                  <span>
                    {editable ? (
                      <span
                        style={{
                          color: COLORS.gray!.normal,
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setDialog({ show: true });
                        }}
                      >
                        1 MINUTE BREAK
                      </span>
                    ) : (
                      <>1 MINUTE BREAK</>
                    )}{' '}
                    BETWEEN EACH SET
                  </span>
                )}
                {/* fixme */}
              </td>
            </tr>
            <tr>
              <td
                colSpan={editable ? 4 : 3}
                style={{
                  paddingTop: '0.67em',
                  paddingLeft: '1em',
                  paddingBottom: '0.67em',
                  color: COLORS.gray!.darkest,
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ lineHeight: '1.3em' }}>Total expected time:</span>
                <span
                  style={{
                    lineHeight: '1.3em',
                    fontSize: '1.2em',
                    fontWeight: 'bold',
                  }}
                >
                  {' '}
                  {secondsToTimeLiteral(
                    visiblePlan.map((x) => x.time * x.sets).reduce((a, b) => a + b, 0) +
                      breakTime * (visiblePlan.map((x) => x.sets).reduce((a, b) => a + b, 0) - 1),
                  )}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default withRouter(WorkoutTable);
