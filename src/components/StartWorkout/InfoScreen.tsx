import React, {
  FunctionComponent,
  useState,
  Component,
  PureComponent,
  useEffect,
  useMemo,
} from 'react';
import BackButton from '../Buttons/BackButton';
import { COLOR_BACKGROUND } from '../../colors';
import { useGlobalState } from '../../stores';
import { Route, RouteComponentProps, withRouter, Prompt } from 'react-router-dom';
import { untilNthIndex, randomString, capitalizeFirst } from '../../utils';
import ReactMarkdown from 'react-markdown';

interface Props extends RouteComponentProps {}

const InfoScreen: FunctionComponent<Props> = ({ history, location }) => {
  const [staticInfo] = useGlobalState('static');
  const [workout] = useGlobalState('workout');
  const plan = workout.plan.filter((p) => !p.hidden);

  const [h, setH] = useState(
    Math.min(-208 + 0.6 * window.innerHeight, ((window.innerWidth - 1.33 * 16) * 9) / 16),
  );

  useEffect(() => {
    window.addEventListener('resize', () =>
      setH(Math.min(-208 + 0.6 * window.innerHeight, ((window.innerWidth - 1.33 * 16) * 9) / 16)),
    );
    return () => {
      window.removeEventListener('resize', () =>
        setH(Math.min(-208 + 0.6 * window.innerHeight, ((window.innerWidth - 1.33 * 16) * 9) / 16)),
      );
    };
  }, [workout.current[1], location.pathname]);

  return (
    <Route
      path="/workout/rest/info"
      location={{
        ...location,
        pathname: untilNthIndex(location.pathname, '/', 4),
      }}
      render={() => {
        return (
          <div className="pop-content">
            <div className="content" style={{ backgroundColor: COLOR_BACKGROUND }}>
              <h1 className="heading">
                <BackButton onClick={history.goBack} />
                <span>{capitalizeFirst(plan[workout.current[0]].name)}</span>
              </h1>
              <div
                style={{
                  top: `${h}px`,
                  height: `calc(100% - ${h + 96}px)`,
                  position: 'relative',
                  overflowY: 'auto',
                }}
              >
                <ReactMarkdown
                  source={staticInfo.workoutInfo[plan[workout.current[0]].name].instruction}
                />
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default withRouter(InfoScreen);
