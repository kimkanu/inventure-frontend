import React, { FunctionComponent, useState, useEffect } from 'react';
import { shadowText, useStyles, sansSerifFont, headingFont } from '../styles';
import { Color, COLORS } from '../colors';
import ButtonBase from '@material-ui/core/ButtonBase';
import Link from './Link';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  link?: string;
  depth?: number;
  name: string;
  id: string;
  gym: string;
  message?: string;
  level: number;
  points: number;
  maxPoints: number;
  opacity?: number;
  imgSrc?: string;
  alt?: string;
}

const ProfileCard: FunctionComponent<Props> = ({
  onClick = () => {},
  name,
  id,
  gym,
  message = '',
  level,
  points,
  maxPoints,
  depth = 4,
  opacity = 1.6,
  imgSrc,
  alt,
}) => {
  const [visibilityOfPoints, setVisibility] = useState(true);
  useEffect(() => {
    const setV = () => {
      setVisibility(window.innerWidth >= 370);
    };
    setV();
    window.addEventListener('resize', setV);
    return () => {
      window.removeEventListener('resize', setV);
    };
  }, []);
  const content = (
    <div
      style={{
        backgroundColor: 'white',
        display: 'flex',
        width: '100%',
        height: '8rem',
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
          width: '6rem',
          height: '6rem',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '50%',
          margin: '1rem',
        }}
      >
        <img
          src={imgSrc}
          style={{
            height: '6rem',
            borderRadius: '50%',
          }}
          alt={alt}
        />
      </ButtonBase>
      <div
        style={{
          width: 'calc(100% - 8rem)',
          height: '100%',
        }}
      >
        <div
          style={{
            width: '100%',
            height: 'calc(100% - 2.5rem)',
            right: '0',
            position: 'relative',
            justifyContent: 'space-between',
            borderRadius: '8px',
            display: 'flex',
          }}
        >
          <div
            style={{
              margin: '1rem 0 0.5rem',
              width: '100%',
            }}
          >
            <div
              style={useStyles(headingFont, {
                display: 'flex',
                flexDirection: 'column',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                marginBottom: '-.1rem',
              })}
            >
              <h2 style={{ margin: '0' }}>{name}</h2>
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
              <span
                style={{
                  color: COLORS.gray!.dark,
                  fontSize: '.9rem',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    fontFamily: 'EdgeIcons',
                    display: 'inline-block',
                    transform: 'translateY(1pt)',
                    marginRight: '2px',
                  }}
                >
                  
                </span>
                {id}
              </span>
            </div>
            <div
              style={{
                marginBottom: '.1rem',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  color: COLORS.gray!.dark,
                  fontSize: '.9rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'EdgeIcons',
                    display: 'inline-block',
                    transform: 'translateY(1pt)',
                    marginRight: '1px',
                  }}
                >
                  
                </span>
                {gym}
              </span>
            </div>
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
          <div
            style={{
              margin: '.9rem 1rem 1rem 0',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'right',
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '.9rem',
                }}
              >
                Level
              </span>{' '}
              <span
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                }}
              >
                {level}
              </span>
            </div>
            {visibilityOfPoints ? (
              <div
                style={{
                  marginTop: '-6px',
                }}
              >
                <span
                  style={{
                    color: COLORS.gray!.dark,
                    fontSize: '.8rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'EdgeIcons',
                      display: 'inline-block',
                      transform: 'translateY(1pt)',
                      marginRight: '1px',
                    }}
                  >
                    
                  </span>
                  <b>{points}</b>/{maxPoints} pts{' '}
                  <div
                    style={{
                      border: `1px solid ${COLORS.gray!.normal}`,
                      borderRadius: '4px',
                      height: '10px',
                      marginTop: '.2rem',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: COLORS.blue!.lighter,
                        borderRadius: '4px',
                        height: '6px',
                        margin: '2px',
                        width: `calc(${(points / maxPoints) * 100}% - ${points /
                          maxPoints /
                          25}px)`,
                      }}
                    />
                  </div>
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div
      onClick={onClick}
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

export default ProfileCard;
