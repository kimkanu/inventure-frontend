import React, { FunctionComponent } from 'react';
import { shadow, useStyles, fullWidth, sansSerifFont } from '../../styles';
import { Color, COLORS } from '../../colors';
import { deleteWorkout, Workout, WorkoutPlan } from '../../stores/workout';
import ButtonSmall from '../Buttons/ButtonSmall';
import EdgeIcon from '../Icons/EdgeIcon';
import { secondsToTimeLiteral } from '../../utils';
import ButtonLarge from '../Buttons/ButtonLarge';

interface Props {
  editable: boolean;
  workout: Workout;
  onChange?: () => void;
}

const WorkoutTable: FunctionComponent<Props> = ({ editable, workout, onChange }) => {
  const plan = editable ? workout.tempPlan : workout.plan;
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
        height: 56,
        borderBottom: `1pt solid ${COLORS.gray!.lightest}`,
        fontSize: '1.07rem',
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
            clickHandler={() => {
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
  return (
    <div style={useStyles({ padding: '0 -0.33em' })}>
      <table
        className="workout-table"
        style={useStyles(
          shadow({ depth: 8, color: new Color(143, 146, 169), opacity: 1.8 }),
          fullWidth,
          sansSerifFont,
          {
            borderRadius: 2,
            backgroundColor: 'white',
            borderCollapse: 'collapse',
          },
        )}
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
                height: 40,
                color: COLORS.gray!.normal,
                fontSize: '.9rem',
                textAlign: 'center',
                fontStyle: 'italic',
              }}
            >
              {plan.length === 0
                ? 'CLICK ADD BUTTON TO ADD A NEW WORKOUT'
                : '1-MINUTE BREAK BETWEEN EACH SET'}
            </td>
          </tr>
          <tr>
            <td
              colSpan={editable ? 4 : 3}
              style={{
                paddingTop: '0.67em',
                paddingLeft: '1.33em',
                paddingBottom: '0.67em',
                height: 40,
                color: COLORS.gray!.darkest,
                fontSize: '1em',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ lineHeight: editable ? '1.3em' : 'calc(2em + 18px)' }}>
                Total expected time:
              </span>
              <span
                style={{
                  lineHeight: editable ? '1.3em' : 'calc(2em + 18px)',
                  fontSize: '1.2em',
                  fontWeight: 'bold',
                }}
              >
                {' '}
                {secondsToTimeLiteral(
                  plan.map((x) => x.time * x.sets).reduce((a, b) => a + b, 0) +
                    breakTime * (plan.map((x) => x.sets).reduce((a, b) => a + b, 0) - 1),
                )}
              </span>
              {editable ? null : (
                <div style={{ float: 'right', margin: '-0.17rem 0.5rem 0.4rem 0' }}>
                  <ButtonLarge
                    backgroundColor={COLORS.gray!.normal}
                    shadowColor={COLORS.gray!.darker}
                    link="/workout/edit"
                    labelInside="EDIT"
                  >
                    <EdgeIcon buttonSize={48}></EdgeIcon>
                  </ButtonLarge>
                </div>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default WorkoutTable;
