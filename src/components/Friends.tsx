import React, { FunctionComponent, useState } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Link from './Link';
import { untilNthIndex, randomString } from '../utils';
import CardWithPicture from './CardWithPicture';
import ProfileCard from './ProfileCard';
import SectionSelector from './SectionSelector';
import { useGlobalState } from '../stores';
import { sansSerifFont, shadowText, shadow, headingFont, useStyles } from '../styles';
import { COLORS, ColorGradient, Color } from '../colors';
import { ButtonBase } from '@material-ui/core';
import EdgeIcon from './Icons/EdgeIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import BackButton from './Buttons/BackButton';
import Fuse from 'fuse.js';
import Feed from './Feed';

interface CardProps {
  rank: number;
  name: string;
  points: number;
  change: number;
  me?: boolean;
}

const RankingWithoutRouter: FunctionComponent<Props> = ({ history }) => {
  const Card: FunctionComponent<CardProps> = ({ rank, name, points, change, me }) => (
    <div>
      <div
        style={{
          backgroundColor: 'white',
          display: 'flex',
          width: '100%',
          height: '8rem',
          margin: '1rem 0',
          borderRadius: '8px',
          textAlign: 'initial',
          boxShadow: shadowText({
            depth: 4,
            color: new Color(COLORS.gray!.darker),
          }),
        }}
      >
        <div
          style={{
            width: '6rem',
            height: '6rem',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '8px',
            margin: '1rem',
            background:
              rank === 1
                ? 'linear-gradient(#f4e24a 0%, #f0ad36 100%)'
                : rank === 2
                ? 'linear-gradient(#9ab5d3 0%, #769bc2 100%)'
                : 'linear-gradient(#d19579 0%, #bf7454 100%)',
          }}
        >
          <img
            src={
              rank === 1
                ? '/gold medal.png'
                : rank === 2
                ? '/silver medal.png'
                : '/bronze medal.png'
            }
            style={{
              height: rank === 1 ? '6.8rem' : '6.4rem',
              position: 'relative',
              marginRight: '-1.7rem',
            }}
            alt={rank === 1 ? 'gold medal' : rank === 2 ? 'silver medal' : 'bronze medal'}
          />
        </div>
        <div
          style={{
            width: 'calc(100% - 9.7rem)',
            height: '100%',
            margin: '0 1rem 0 0.7rem',
            position: 'relative',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ ...headingFont, fontSize: '1.5rem' }}>
              {name} {me && <span style={{ fontWeight: 'normal', fontSize: '1.3rem' }}>(Me)</span>}
            </span>
            <span
              style={{
                ...headingFont,
                fontWeight: 'normal',
                fontSize: '1.5rem',
                color:
                  change > 0
                    ? COLORS.red!.light
                    : change < 0
                    ? COLORS.blue!.lighter
                    : COLORS.gray!.normal,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  height: '1rem!important',
                  transform: 'translateY(2px)',
                  fontFamily: 'EdgeIcons',
                  lineHeight: '1.2rem',
                }}
              >
                {change > 0 ? '' : change < 0 ? '' : ''}
              </span>
              {change !== 0 && <span>{Math.abs(change)}</span>}
            </span>
          </div>
          <span>
            Earned <b>{points}</b> points in this week
          </span>
        </div>
      </div>
    </div>
  );
  return (
    <div className="pop-content">
      {' '}
      <div className="content">
        <h1 className="heading">
          <BackButton onClick={history.goBack} />
          <span>Ranking</span>
        </h1>
        <Card rank={1} name="Emil" change={1} points={1323} />
        <Card rank={2} name="Chad" change={-1} points={1200} me />
        <Card rank={3} name="Zeppe" change={0} points={998} />
      </div>
    </div>
  );
};
const Ranking = withRouter(RankingWithoutRouter);

const searchId = randomString(8);
const FriendsSearch: FunctionComponent = () => {
  const friends = [{ name: 'Emil', id: 'Ostrich101' }, { name: 'Zeppe', id: 'dmt322' }];
  const [active, setActive] = useState(false);
  const [s, setS] = useState('');
  const fuse = new Fuse(friends, { keys: ['name'], threshold: 0.3 });
  return (
    <>
      <div
        className={`search-container${active ? ' active' : ''}`}
        id={`search-container-${searchId}`}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'left',
            position: 'relative',
          }}
        >
          <label htmlFor={`search-${searchId}`}>Search friend's name or ID</label>
          <input
            value={s}
            type="text"
            id={`search-${searchId}`}
            onChange={(e) => {
              setS(e.target.value);
            }}
            autoFocus
            style={useStyles(sansSerifFont, {
              border: 'none',
              padding: '1rem .5rem .2rem .5rem',
              fontSize: '1.1rem',
              borderRadius: '4px',
              width: '300px',
              maxWidth: 'calc(100vw - 3rem)',
              marginBottom: '.4rem',
            })}
            onFocus={() => {
              setActive(true);
            }}
            onBlur={(e) => {
              if (!e.target.value) setActive(false);
            }}
          />
        </div>
      </div>
    </>
  );
};

const AddFriendsWithoutRouter: FunctionComponent<Props> = ({ history }) => {
  return (
    <div className="pop-content">
      {' '}
      <div className="content">
        <h1 className="heading">
          <BackButton onClick={history.goBack} />
          <span>Add Friends</span>
        </h1>
        <FriendsSearch />
      </div>
    </div>
  );
};
const AddFriends = withRouter(AddFriendsWithoutRouter);

interface Props extends RouteComponentProps {}
const Friends: FunctionComponent<Props> = ({ location }) => {
  const [section, setSection] = useState(0);
  const [staticInfo] = useGlobalState('static');
  return (
    <TransitionGroup className="top-level" style={{ height: '100vh', position: 'absolute' }}>
      <CSSTransition
        key={untilNthIndex(location.pathname, '/', 2)}
        timeout={{ enter: 300, exit: 300 }}
        classNames={'content--fade-transition'}
      >
        <div>
          <Route
            location={location}
            path="/friends"
            render={() => (
              <div className="">
                <div className="content">
                  <h1
                    className="heading"
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span>Recent Feed</span>
                    <div>
                      <Link
                        to="/friends/ranking"
                        style={{
                          textDecoration: 'none',
                          color: COLORS.gray!.darker,
                        }}
                        className="without-blue"
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
                            borderRadius: '50%',
                          }}
                        >
                          <FontAwesomeIcon icon={faMedal} style={{ fontSize: '92%' }} />
                        </ButtonBase>
                      </Link>
                      <Link
                        to="/friends/add"
                        style={{
                          textDecoration: 'none',
                          color: COLORS.gray!.darker,
                        }}
                        className="without-blue"
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
                            borderRadius: '50%',
                          }}
                        >
                          <EdgeIcon buttonSize="back"></EdgeIcon>
                        </ButtonBase>
                      </Link>
                    </div>
                  </h1>
                  <Feed />
                </div>
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
                            path="/friends/add"
                            render={() => <AddFriends />}
                          />
                          <Route
                            location={location}
                            path="/friends/ranking"
                            render={() => <Ranking />}
                          />
                        </div>
                      </CSSTransition>
                    </TransitionGroup>
                  )}
                />
              </div>
            )}
          />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter(Friends);
