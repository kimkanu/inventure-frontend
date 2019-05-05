import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { shadowText, shadow, useStyles, fullWidth, sansSerifFont } from '../../styles';
import { Color, colorScheme } from '../../colors';
import { useGlobalState } from '../../stores';
import ButtonBase from '@material-ui/core/ButtonBase';
import Link from '../Link';
import { LongContent } from '../LongContent';

interface Props extends RouteComponentProps {}

const WorkoutTable: FunctionComponent = () => {
  const td = ({
    key,
    name,
    reps,
    sets,
    time,
    handleDelete,
  }: {
    key: number;
    name: string;
    reps: number;
    sets: number;
    time: string;
    handleDelete: () => void;
  }) => (
    <tr
      style={{
        height: 56,
        borderBottom: `1pt solid ${colorScheme.gray!.lightest}`,
        fontSize: '1.07rem',
      }}
      key={key}
    >
      <td style={{ paddingTop: '0.5em', paddingBottom: '0.5em', paddingLeft: '1em', width: '60%' }}>
        {reps} {name}
      </td>
      <td style={{ paddingTop: '0.5em', paddingBottom: '0.5em', textAlign: 'center' }}>{sets}</td>
      <td style={{ paddingTop: '0.5em', paddingBottom: '0.5em', textAlign: 'center' }}>{time}</td>
      <td style={{ paddingTop: '0.5em', paddingBottom: '0.5em', width: 48, paddingRight: '.67em' }}>
        <div
          style={{
            width: 48,
            height: 48,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleDelete}
        >
          <ButtonBase style={{ borderRadius: '50%' }}>
            <div
              style={{
                backgroundColor: colorScheme.red!.lighter,
                display: 'inline-block',
                width: 36,
                height: 36,
                borderRadius: '50%',
                textAlign: 'center',
                color: 'white',
                fontFamily: 'EdgeIcons',
                lineHeight: '33px',
                fontSize: '1.2rem',
                boxShadow: shadowText({
                  depth: 6,
                  color: new Color(colorScheme.red!.dark),
                  opacity: 1.6,
                }),
              }}
            >
              
            </div>
          </ButtonBase>
        </div>
      </td>
    </tr>
  );
  return (
    <div style={useStyles({ padding: '0 -0.33em' })}>
      <table
        style={useStyles(
          shadow({ depth: 6, color: new Color(132, 139, 179) }),
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
              borderBottom: `1pt solid ${colorScheme.gray!.lightest}`,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            <th>Workout</th>
            <th>Sets</th>
            <th>Time</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {useGlobalState('workout')[0].plan.map((x, i) =>
            td({
              ...x,
              key: i,
              handleDelete: () => {
                ('click');
              },
            }),
          )}
          <tr>
            <td
              colSpan={4}
              style={{
                height: 40,
                color: colorScheme.gray!.normal,
                fontSize: '.9rem',
                textAlign: 'center',
                fontStyle: 'italic',
              }}
            >
              1-MINUTE BREAK BETWEEN EACH SET
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        Total expected time: <Link to="/workout/edit/add">ADDDDDDD</Link>
      </div>
    </div>
  );
};

const EditWorkout: FunctionComponent<Props> = () => {
  return (
    <Route
      render={({ location }) => (
        <div>
          <Route
            path="/workout/edit"
            component={() => (
              <div className="fade">
                <div className="content">
                  <h1 className="heading">Edit Your Workout</h1>
                  <WorkoutTable />
                  <LongContent />
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
                            <h1 className="heading">Add Workout</h1>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </div>
      )}
    />
  );
};

export default withRouter(EditWorkout);
