import React, { FunctionComponent, useState } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Link from './Link';
import { untilNthIndex } from '../utils';
import CardWithPicture from './CardWithPicture';
import ProfileCard from './ProfileCard';
import SectionSelector from './SectionSelector';
import { useGlobalState } from '../stores';
import { sansSerifFont, shadowText, shadow } from '../styles';
import { COLORS, ColorGradient, Color } from '../colors';

interface Props extends RouteComponentProps {}

interface AchievementProps {
  icon: string;
  name: string;
  scheme: ColorGradient;
  color?: string;
}

const Achievement: FunctionComponent<AchievementProps> = ({
  icon,
  name,
  scheme,
  color = '#fff',
}) => (
  <span
    style={{
      lineHeight: '28px',
      margin: '-2px 0 0',
      display: 'inline-flex',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        color,
        backgroundColor: scheme.light,
        ...shadow({ depth: 3, color: new Color(scheme.dark), opacity: 3 }),
        display: 'inline-flex',
        width: '22px',
        height: '22px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        margin: '0 6px 0 0',
        transform: 'translateY(1pt)',
      }}
    >
      <span
        style={{
          fontFamily: 'EdgeIcons',
          display: 'inline-block',
          lineHeight: '22px',
          position: 'relative',
          top: '0',
          fontSize: '.85rem',
        }}
      >
        {icon}
      </span>
    </div>
    <span
      style={{
        lineHeight: '22px',
        fontWeight: 'bold',
        position: 'relative',
        top: '2px',
      }}
    >
      {name}
    </span>
  </span>
);

function ordinalSuffix(i: number) {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return 'st';
  }
  if (j === 2 && k !== 12) {
    return 'nd';
  }
  if (j === 3 && k !== 13) {
    return 'rd';
  }
  return 'th';
}

interface ExerciseCardProps {
  imgSrc?: string;
  name: string;
  rank?: number;
  achievement?: { name: string; scheme: ColorGradient; icon: string; description: string };
}
const ExerciseCard: FunctionComponent<ExerciseCardProps> = ({
  imgSrc,
  name,
  rank,
  achievement,
}) => (
  <CardWithPicture imgSrc={imgSrc}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        ...sansSerifFont,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0',
        }}
      >
        <span
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            lineHeight: '1.5rem',
          }}
        >
          {name}
        </span>
        {rank ? (
          <span style={{ fontSize: '0.9rem' }}>
            <span
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.5rem',
              }}
            >
              {rank}
              <span
                style={{
                  fontSize: '0.8rem',
                  lineHeight: '1.5rem',
                  display: 'inline-block',
                  transform: 'translateY(-0.4rem)',
                }}
              >
                {ordinalSuffix(rank)}
              </span>
            </span>
          </span>
        ) : null}
      </div>
      {achievement ? (
        <div
          style={{
            width: '100%',
            backgroundColor: COLORS.gray!.lightest,
            height: '1px',
            margin: '.4rem 0',
          }}
        />
      ) : null}
      {achievement ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span style={{ fontSize: '0.85rem', color: COLORS.gray!.dark }}>RECENT ACHIEVEMENT</span>
          <span style={{ fontSize: '1rem' }}>
            <Achievement icon="" name={achievement.name} scheme={COLORS.orange!} />
          </span>
          <span
            style={{
              fontSize: '0.85rem',
              color: COLORS.gray!.dark,
              textAlign: 'right',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              marginLeft: '1rem',
              maxWidth: 'calc(100% - 1rem)',
            }}
          >
            1000x benched, 60 kg max. record
          </span>
        </div>
      ) : null}
    </div>
  </CardWithPicture>
);

const Profile: FunctionComponent<Props> = ({ location }) => {
  const [section, setSection] = useState(0);
  const [staticInfo] = useGlobalState('static');
  return (
    <Route
      render={() => (
        <TransitionGroup className="top-level" style={{ height: '100vh', position: 'absolute' }}>
          <CSSTransition
            key={untilNthIndex(location.pathname, '/', 3)}
            timeout={{ enter: 300, exit: 300 }}
            classNames={'content--fade-transition'}
          >
            <div>
              <Route
                path="/profile"
                render={() => (
                  <div className="fade">
                    <div className="content">
                      <h1 className="heading">Profile</h1>
                      <ProfileCard
                        imgSrc="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
                        alt="Profile image"
                        name="Chad"
                        id="chad0314"
                        gym="Silloe Gym"
                        level={16}
                        points={300}
                        maxPoints={2050}
                        message="Aksdalsdk"
                      />
                      <SectionSelector
                        onChange={(v, i) => {
                          setSection(i);
                        }}
                        labels={['Overview', 'Trends']}
                      />
                      {section === 0 ? (
                        <>
                          <ExerciseCard
                            imgSrc={(staticInfo.images.bulking || {}).image}
                            name="Benchpress"
                            rank={3}
                            achievement={{
                              name: 'Benchpress Veteran',
                              icon: '',
                              scheme: COLORS.orange!,
                              description: '1000x benched, 60 kg max. record',
                            }}
                          />
                          <ExerciseCard
                            imgSrc={(staticInfo.images.bulking || {}).image}
                            name="Benchpress"
                            rank={3}
                            achievement={{
                              name: 'Benchpress Veteran',
                              icon: '',
                              scheme: COLORS.orange!,
                              description: '1000x benched, 60 kg max. record',
                            }}
                          />
                          <ExerciseCard
                            imgSrc={(staticInfo.images.bulking || {}).image}
                            name="Benchpress"
                            rank={3}
                            achievement={{
                              name: 'Benchpress Veteran',
                              icon: '',
                              scheme: COLORS.orange!,
                              description: '1000x benched, 60 kg max. record',
                            }}
                          />
                          <div>
                            <Link to="/profile/all">dsd</Link>
                          </div>
                        </>
                      ) : (
                        <div>trasd</div>
                      )}
                    </div>
                  </div>
                )}
              />
            </div>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
};

export default withRouter(Profile);
