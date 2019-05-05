import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { shadowText, shadow, useStyles, fullWidth, sansSerifFont } from '../../styles';
import { Color, colorScheme } from '../../colors';
import { useGlobalState, deleteWorkout } from '../../stores';
import ButtonBase from '@material-ui/core/ButtonBase';
import Link from '../Link';
import { LongContent } from '../LongContent';

interface Props extends RouteComponentProps {}

const WorkoutTable: FunctionComponent = () => {
  const nonHeaderStyle = {
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
  };
  const firstColumnStyle = {
    paddingLeft: '1em',
    width: 'calc(100% - 175px)',
  };
  const secondColumnStyle = {
    textAlign: 'center' as 'center',
    width: 50,
  };
  const thirdColumnStyle = {
    textAlign: 'center' as 'center',
    width: 50,
  };
  const fourthColumnStyle = {
    textAlign: 'center' as 'center',
    width: 48,
    paddingRight: '.33em',
  };
  const td = ({
    key,
    name,
    reps,
    sets,
    time,
    handleDelete,
  }: {
    key: number | string;
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
      <td style={useStyles(firstColumnStyle, nonHeaderStyle)}>
        {reps} {name}
      </td>
      <td style={useStyles(secondColumnStyle, nonHeaderStyle)}>{sets}</td>
      <td style={useStyles(thirdColumnStyle, nonHeaderStyle)}>{time}</td>
      <td style={useStyles(fourthColumnStyle, nonHeaderStyle)}>
        <div onClick={handleDelete}>
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
            <th style={useStyles(firstColumnStyle)}>Workout</th>
            <th style={useStyles(secondColumnStyle)}>Sets</th>
            <th style={useStyles(thirdColumnStyle)}>Time</th>
            <th style={useStyles(fourthColumnStyle)} />
          </tr>
        </thead>
        <tbody>
          {useGlobalState('workout')[0].plan.map((x, i) =>
            td({
              ...x,
              key: i,
              handleDelete: () => {
                deleteWorkout(i);
              },
            }),
          )}
        </tbody>
        <tfoot>
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
        </tfoot>
      </table>
      <div style={useStyles(sansSerifFont, { margin: '1rem 0', fontSize: '1.1rem' })}>
        Total expected time:
      </div>
      <ButtonBase style={{ borderRadius: '50%' }}>
        <Link to="/workout/edit/add">
          <div
            style={{
              backgroundColor: colorScheme.red!.lighter,
              display: 'inline-block',
              width: 48,
              height: 48,
              borderRadius: '50%',
              textAlign: 'center',
              color: 'white',
              fontFamily: 'EdgeIcons',
              lineHeight: '45px',
              fontSize: '1.6rem',
              boxShadow: shadowText({
                depth: 6,
                color: new Color(colorScheme.red!.dark),
                opacity: 1.6,
              }),
            }}
          >
            
          </div>
        </Link>
      </ButtonBase>
      <ButtonBase style={{ borderRadius: '50%' }}>
        <Link to="/workout/view">
          <div
            style={{
              backgroundColor: colorScheme.red!.lighter,
              display: 'inline-block',
              width: 48,
              height: 48,
              borderRadius: '50%',
              textAlign: 'center',
              color: 'white',
              fontFamily: 'EdgeIcons',
              lineHeight: '45px',
              fontSize: '1.6rem',
              boxShadow: shadowText({
                depth: 6,
                color: new Color(colorScheme.red!.dark),
                opacity: 1.6,
              }),
            }}
          >
            
          </div>
        </Link>
      </ButtonBase>
    </div>
  );
};

const EdgeIcon: FunctionComponent = ({ children }) => {
  return (
    <span
      style={{
        fontFamily: 'EdgeIcons',
        display: 'inline-block',
        lineHeight: '0.7em',
        transform: 'translateY(-0.064em)',
      }}
    >
      {children}
    </span>
  );
};

const BackButton: FunctionComponent<{ to: string }> = ({ to }) => (
  <Link
    to={to}
    style={{
      textDecoration: 'none',
      color: colorScheme.gray!.darkest,
    }}
  >
    <ButtonBase
      style={{
        fontSize: '1em',
        display: 'inline-flex',
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '6px',
        transform: 'translateY(-4px)',
        marginLeft: '-6px',
        marginRight: '6px',
        borderRadius: '50%',
      }}
    >
      <EdgeIcon></EdgeIcon>
    </ButtonBase>
  </Link>
);

const EditWorkout: FunctionComponent<Props> = () => {
  return (
    <Route
      render={() => (
        <div>
          <Route
            path="/workout/edit"
            component={() => (
              <div className="fade">
                <div className="content">
                  <h1 className="heading">
                    <BackButton to={'/workout/view'} />
                    <span>Edit Your Workout</span>
                  </h1>
                  <WorkoutTable />
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
        </div>
      )}
    />
  );
};

export default withRouter(EditWorkout);
