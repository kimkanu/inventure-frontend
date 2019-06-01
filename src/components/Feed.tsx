import React, { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { COLORS, COLOR_BACKGROUND, Color } from '../colors';
import moment from 'moment';
import { shadowText } from '../styles';
import Achievement from './Achievement';

interface Props extends RouteComponentProps {}

interface SeparatorProps {
  date: Date;
}
const Separator: FunctionComponent<SeparatorProps> = ({ date }) => {
  return (
    <div
      style={{
        position: 'relative',
        fontSize: '0.8rem',
        verticalAlign: 'middle',
        height: '1.5rem',
        margin: '1rem 0 0.5rem',
      }}
    >
      <span
        style={{
          position: 'absolute',
          display: 'inline-block',
          height: '1px',
          background: COLORS.gray!.light,
          width: '100%',
          top: '0.6rem',
        }}
      />
      <span
        style={{
          position: 'absolute',
          color: COLORS.gray!.dark,
          top: 0,
          left: 20,
          padding: '0 4px',
          backgroundColor: COLOR_BACKGROUND,
        }}
      >
        {' '}
        {moment(date).format('L')}{' '}
      </span>
    </div>
  );
};

const Post: FunctionComponent = () => {
  const achievement = {
    name: 'Benchpress Veteran',
    icon: '',
    scheme: COLORS.orange!,
    description: '1000x benched, 60 kg max. record',
  };
  return (
    <div
      style={{
        backgroundColor: 'white',
        display: 'flex',
        width: 'calc(100% - 2rem)',
        height: 'fit-content',
        borderRadius: '8px',
        padding: '1rem',
        WebkitAppearance: 'none',
        boxShadow: shadowText({
          depth: 4,
          color: new Color(COLORS.gray!.darker),
        }),
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
        }}
      >
        <img
          src="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
          style={{
            clipPath: 'circle(2rem at 50% 50%)',
            width: '4rem',
            minWidth: '4rem',
            maxWidth: '4rem',
            height: '4rem',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            marginLeft: '1rem',
            display: 'flex',
            flexDirection: 'column',
            width: 'calc(100% - 5rem)',
            position: 'relative',
          }}
        >
          <div
            style={{
              marginTop: '-2px',
            }}
          >
            <span
              style={{
                fontWeight: 'bold',
              }}
            >
              Amy
            </span>
            <span
              style={{
                fontSize: '.92em',
                color: COLORS.gray!.dark,
              }}
            >
              {' '}
              (@amymymy)
            </span>
            <span> got an achievement!</span>
          </div>
          <div
            style={{
              marginTop: '.5rem',
              border: `1px solid ${COLORS.gray!.lighter}`,
              padding: '6px 12px 12px',
              borderRadius: '8px',
              width: 'calc(100% - 1.67rem)',
            }}
          >
            <Achievement {...achievement} big />
          </div>
        </div>
      </div>
    </div>
  );
};

const Feed: FunctionComponent = () => {
  return (
    <div
      style={{
        marginTop: '-1rem',
      }}
    >
      <Separator date={new Date()} />
      <Post />
    </div>
  );
};

export default withRouter(Feed);
