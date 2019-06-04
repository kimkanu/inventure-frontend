import React, { FunctionComponent, useState, useEffect } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Link from './Link';
import { untilNthIndex, randomString, useAsyncEffect } from '../utils';
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
import { navigateTab } from '../stores/tab';
import { login, AuthState, UserProps, addFriend } from '../stores/auth';
import Firebase, { FirebaseContext } from './Firebase';
import { LoadingData } from '../stores/loading';
import { transparentImage } from '../contants';
import { userInfo } from 'os';
import ButtonLarge from './Buttons/ButtonLarge';

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
          WebkitAppearance: 'none',
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
                : rank === 3
                ? 'linear-gradient(#d19579 0%, #bf7454 100%)'
                : 'linear-gradient(#9d9fa0 0%, #54585d 100%)',
          }}
        >
          <img
            src={
              rank === 1
                ? '/gold medal.png'
                : rank === 2
                ? '/silver medal.png'
                : rank === 3
                ? '/bronze medal.png'
                : transparentImage
            }
            style={{
              height: rank === 1 ? '6.8rem' : '6.4rem',
              position: 'relative',
              marginRight: '-1.7rem',
            }}
            alt={
              rank === 1
                ? 'gold medal'
                : rank === 2
                ? 'silver medal'
                : rank === 3
                ? 'bronze medal'
                : ''
            }
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
  const [auth] = useGlobalState('auth');
  const sortedFriends = [...auth.friends, auth.id]
    .map((id) => (auth.users || []).find((user) => user.id === id)!)
    .sort((f1, f2) => f2.points - f1.points);

  return (
    <div className="pop-content">
      {' '}
      <div className="content">
        <h1 className="heading">
          <BackButton onClick={history.goBack} />
          <span>Ranking</span>
        </h1>
        {sortedFriends.map((friend, i) => (
          <Card
            key={i}
            rank={i + 1}
            name={friend.name}
            change={0}
            points={friend.points}
            me={auth.id === friend.id}
          />
        ))}
      </div>
    </div>
  );
};
const Ranking = withRouter(RankingWithoutRouter);

interface FriendCardProps {
  firebase: Firebase;
  name: string;
  id: string;
  message: string;
  depth?: number;
  opacity?: number;
  imgSrc?: string;
  alt?: string;
  friend: boolean;
}

const FriendCard: FunctionComponent<FriendCardProps> = ({
  firebase,
  name,
  id,
  message,
  depth = 4,
  opacity = 1.6,
  imgSrc,
  alt,
  friend,
}) => {
  const [auth] = useGlobalState('auth');
  const content = (
    <div
      style={{
        backgroundColor: 'white',
        display: 'flex',
        width: '100%',
        height: '5rem',
        borderRadius: '8px',
        WebkitAppearance: 'none',
        boxShadow: shadowText({
          depth,
          opacity,
          color: new Color(COLORS.gray!.darker),
        }),
      }}
    >
      <ButtonBase
        style={{
          width: '4rem',
          height: '4rem',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '50%',
          margin: '0.5rem 0.8rem 0.5rem 0.5rem',
        }}
      >
        <img
          src={imgSrc}
          style={{
            height: '4rem',
            borderRadius: '50%',
          }}
          alt={alt}
        />
      </ButtonBase>
      <div
        style={{
          width: 'calc(100% - 8.8rem)',
          height: '100%',
        }}
      >
        <div
          style={{
            width: '100%',
            height: 'calc(100% - 1.6rem)',
            margin: '0.8rem 0',
            right: '0',
            position: 'relative',
            flexDirection: 'column',
            borderRadius: '8px',
            display: 'flex',
          }}
        >
          <div
            style={{
              display: 'flex',
              marginBottom: '-0.3em',
            }}
          >
            <span
              style={{
                ...headingFont,
                fontSize: '1.5rem',
                lineHeight: '2rem',
              }}
            >
              {name}
            </span>
            <span
              style={{
                color: COLORS.gray!.dark,
                fontSize: '.9rem',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                marginLeft: '0.3em',
                lineHeight: '2rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'EdgeIcons',
                  display: 'inline-block',
                  transform: 'translateY(1pt)',
                }}
              >
                
              </span>
              {id}
            </span>
          </div>
          <div
            style={{
              marginBottom: '-.3rem',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              <span>
                <span
                  style={{
                    fontFamily: 'EdgeIcons',
                    display: 'inline-block',
                    transform: 'translateY(1pt)',
                    marginRight: '3px',
                  }}
                >
                  
                </span>
                {message}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: '3rem',
          marginRight: '0.5rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {friend ? (
          <span
            style={{
              fontFamily: 'EdgeIcons',
              fontSize: '1.6rem',
              color: COLORS.blue!.lighter,
            }}
          >
            
          </span>
        ) : (
          <ButtonBase
            style={{
              width: '2.4rem',
              height: '2.4rem',
              borderRadius: '50%',
            }}
            onClick={() => {
              if (auth.friends.includes(id)) return;
              addFriend(id);
              firebase.database.ref(`/users/${auth.id}/friends`).set([...auth.friends, id]);
            }}
          >
            <span
              style={{
                fontFamily: 'EdgeIcons',
                fontSize: '1.6rem',
                color: COLORS.green!.light,
              }}
            >
              
            </span>
          </ButtonBase>
        )}
        <span
          style={{
            ...sansSerifFont,
            fontSize: '0.8rem',
            lineHeight: '0.94rem',
            color: COLORS.gray!.dark,
          }}
        >
          {friend ? 'Friend' : 'Add'}
        </span>
      </div>
    </div>
  );
  return (
    <div
      style={{
        width: '100%',
        margin: '1rem 0',
        borderRadius: '8px',
      }}
    >
      {content}
    </div>
  );
};

const searchId = randomString(8);
interface FriendsSearchProps {
  firebase: Firebase;
}
const FriendsSearch: FunctionComponent<FriendsSearchProps> = ({ firebase }) => {
  const [auth] = useGlobalState('auth');
  const [loading] = useGlobalState('loading');
  const [results, setResults] = useState([] as ({ id: string } & UserProps)[]);

  const [active, setActive] = useState(false);
  const [s, setS] = useState('');
  const fuse = new Fuse((auth.users || []).filter((user) => user.id !== auth.id), {
    keys: ['name', 'id'],
    threshold: 0.3,
  });
  useEffect(() => {
    const filteredFriends = s
      ? fuse.search(s)
      : (auth.users || []).filter((user) => auth.friends.includes(user.id));
    setResults(filteredFriends);
  }, [s, loading[LoadingData.UsersInfo]]);

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
      <div>
        {s
          ? results.map((friend, i) => (
              <FriendCard
                firebase={firebase}
                key={i}
                name={friend.name}
                id={friend.id}
                message={friend.profileMessage}
                imgSrc={friend.profileImagePath}
                friend={auth.friends.includes(friend.id)}
              />
            ))
          : results.map((friend, i) => (
              <FriendCard
                firebase={firebase}
                key={i}
                name={friend.name}
                id={friend.id}
                message={friend.profileMessage}
                imgSrc={friend.profileImagePath}
                friend={true}
              />
            ))}
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
        <FirebaseContext.Consumer>
          {(firebase) => <FriendsSearch firebase={firebase} />}
        </FirebaseContext.Consumer>
      </div>
    </div>
  );
};
const AddFriends = withRouter(AddFriendsWithoutRouter);

interface Props extends RouteComponentProps {}
const Friends: FunctionComponent<Props> = ({ location, history }) => {
  const [auth] = useGlobalState('auth');
  useEffect(() => {
    if (auth.id === '') {
      history.push('/login?redirect=friends');
      navigateTab('');
    }
  });
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
                  <h1 className="heading">
                    <span>Friends</span>
                  </h1>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <ButtonLarge
                      shadowColor={COLORS.orange!.darker}
                      backgroundColor={COLORS.orange!.normal}
                      link="/friends/ranking"
                      labelInside="Ranking"
                    >
                      <span style={{ marginTop: '1.4rem' }}>
                        <FontAwesomeIcon
                          icon={faMedal}
                          style={{
                            fontSize: '1.5rem',
                            transform: 'translateY(-3px)',
                            marginTop: '0.64em',
                          }}
                        />
                      </span>
                    </ButtonLarge>
                    <ButtonLarge
                      shadowColor={COLORS.blue!.darker}
                      backgroundColor={COLORS.blue!.light}
                      link="/friends/add"
                      labelInside="Add Friends"
                    >
                      <EdgeIcon buttonSize={48}></EdgeIcon>
                    </ButtonLarge>
                  </div>
                  <h2 className="heading" style={{ ...headingFont, margin: '2.3rem 0 1.7rem' }}>
                    <span>Recent Feed</span>
                  </h2>
                  <Feed />
                </div>
                <Route
                  render={({ location }) => (
                    <TransitionGroup>
                      <CSSTransition
                        key={untilNthIndex(location.pathname, '/', 4)}
                        timeout={{ enter: 300, exit: 500 }}
                        classNames={'content--pop-up-transition'}
                        unmountOnExit={false}
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
