import React, { FunctionComponent } from 'react';
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
  const content = (
    <div
      style={{
        backgroundColor: 'white',
        display: 'flex',
        width: '100%',
        height: '9rem',
        borderRadius: '8px',
        boxShadow: shadowText({
          depth,
          opacity,
          color: new Color(COLORS.gray!.darker),
        }),
      }}
    >
      <ButtonBase
        style={{
          width: '7rem',
          height: '7rem',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '8px',
          margin: '1rem',
        }}
      >
        <img
          src={imgSrc}
          style={{
            height: '7rem',
            borderRadius: '8px',
          }}
          alt={alt}
        />
      </ButtonBase>
      <div
        style={{
          width: 'calc(100% - 9rem)',
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
              margin: '1.2rem 0',
            }}
          >
            <div
              style={useStyles(headingFont, {
                display: 'flex',
                flexDirection: 'column',
              })}
            >
              <h2 style={{ margin: '0 0 .4rem' }}>{name}</h2>
            </div>
            <div
              style={{
                marginBottom: '-.2rem',
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
                marginBottom: '.2rem',
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
                    marginRight: '1px',
                  }}
                >
                  
                </span>
                {gym}
              </span>
            </div>
          </div>
          <div
            style={{
              margin: '.9rem 1rem 1rem 0',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'right',
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
                      width: `calc(${(points / maxPoints) * 100}% - ${points / maxPoints / 25}px)`,
                    }}
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            marginRight: '1rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          <span>{message}</span>
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
