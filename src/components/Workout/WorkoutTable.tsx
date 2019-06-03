import React, { FunctionComponent, useState, useEffect } from 'react';
import { shadow, useStyles, fullWidth, sansSerifFont } from '../../styles';
import { Color, COLORS } from '../../colors';
import { deleteWorkout, Workout, WorkoutPlan } from '../../stores/workout';
import ButtonSmall from '../Buttons/ButtonSmall';
import EdgeIcon from '../Icons/EdgeIcon';
import { secondsToTimeLiteral } from '../../utils';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const timeToString = (time: number) => {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  if (min === 0) return `${sec} second${sec === 1 ? '' : 's'}`;
  if (sec === 0) return `${min} minute${min === 1 ? '' : 's'}`;
  return `${min} minute${min === 1 ? '' : 's'} ${sec} second${sec === 1 ? '' : 's'}`;
};

interface Props extends RouteComponentProps {
  editable: boolean;
  workout: Workout;
  onChange?: () => void;
  mins?: number;
  secs?: number;
  error?: boolean;
  setTime?: React.Dispatch<
    React.SetStateAction<{
      mins: number;
      secs: number;
    }>
  >;
}

const WorkoutTable: FunctionComponent<Props> = ({
  editable,
  workout,
  onChange,
  mins,
  secs,
  error,
  setTime,
}) => {
  const plan = editable ? workout.tempPlan : workout.plan;
  const visiblePlan = plan.filter((x) => !x.hidden);

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
  return (
    <>
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
                }}
              >
                {visiblePlan.length === 0 ? (
                  <span
                    style={{
                      color: COLORS.gray!.normal,
                      fontStyle: 'italic',
                    }}
                  >
                    CLICK <u>ADD BUTTON</u> TO ADD A NEW WORKOUT
                  </span>
                ) : editable ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        margin: '0.3em 0',
                      }}
                    >
                      <FormControl
                        error={error}
                        style={{
                          margin: '0 0.4em 0 0.7em',
                        }}
                      >
                        <Select
                          value={mins}
                          onChange={(event) => {
                            if (!setTime) return;
                            setTime((s) => ({ ...s, mins: parseInt(event.target.value, 10) }));
                          }}
                          name="mins"
                        >
                          {[0, 1, 2, 3, 4, 5].map((x) => (
                            <MenuItem value={x} key={x}>
                              {x.toString()}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>{' '}
                      <span
                        style={{
                          color: COLORS.gray!.normal,
                          fontStyle: 'italic',
                          lineHeight: '1.88rem',
                        }}
                      >
                        MINUTE{mins === 1 ? '' : 'S'}
                      </span>{' '}
                      <FormControl
                        error={error}
                        style={{
                          margin: '0 0.4em 0 0.8em',
                        }}
                      >
                        <Select
                          value={secs}
                          onChange={(event) => {
                            if (!setTime) return;
                            setTime((s) => ({ ...s, secs: parseInt(event.target.value, 10) }));
                          }}
                          name="secs"
                        >
                          {[0, 1, 2, 3].map((x) => (
                            <MenuItem value={15 * x} key={x}>
                              {(15 * x).toString()}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <span
                        style={{
                          color: COLORS.gray!.normal,
                          fontStyle: 'italic',
                          lineHeight: '1.88rem',
                        }}
                      >
                        SECONDS
                      </span>
                    </div>
                    <span
                      style={{
                        color: COLORS.gray!.normal,
                        fontStyle: 'italic',
                      }}
                    >
                      BREAK BETWEEN EACH SET
                    </span>
                  </div>
                ) : (
                  <span
                    style={{
                      color: COLORS.gray!.normal,
                      fontStyle: 'italic',
                    }}
                  >
                    {timeToString(workout.restTime).toLocaleUpperCase()} BREAK BETWEEN EACH SET
                  </span>
                )}
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
                      (editable ? 60 * (mins || 0) + (secs || 0) : workout.restTime) *
                        (visiblePlan.map((x) => x.sets).reduce((a, b) => a + b, 0) - 1),
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
