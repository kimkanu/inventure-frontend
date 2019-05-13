import React, { FunctionComponent, Component } from 'react';
import Iframe from 'react-iframe';
import { useStyles, headingFont, sansSerifFont } from '../../styles';
import { COLORS } from '../../colors';
import ButtonSmall from '../Buttons/ButtonSmall';
import EdgeIcon from '../Icons/EdgeIcon';

interface State {
  time: number;
  show: boolean;
}

class RemainingTime extends Component<{}, State> {
  timeTotal = 120;

  state = {
    show: true,
    time: this.timeTotal,
  };
  interval = undefined as any;

  componentDidMount() {
    this.interval = setTimeout(() => {}, 1000);
  }
  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  render() {
    this.interval = setTimeout(() => {
      this.setState((state) => {
        if (state.time !== 0) return { ...state, time: state.time - 1 };
        return { ...state, show: false };
      });
    }, 1000);

    return !this.state.show ? (
      // <Redirect to="/profile" />
      <div />
    ) : (
      <>
        {Math.floor(this.state.time / 60)}:
        {(this.state.time < 10 ? '0' : '') + (this.state.time % 60)}
      </>
    );
  }
}

const RestTime: FunctionComponent = () => {
  return (
    <>
      <div className="content">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h1
            className="heading"
            style={{
              width: 'fit-content',
            }}
          >
            Rest Time
          </h1>

          <div
            style={useStyles(headingFont, {
              padding: '1.33rem  0',
              fontSize: '2rem',
              fontWeight: 'normal',
            })}
          >
            <RemainingTime />
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* <span style={useStyles(sansSerifFont)}>{"- What's Next -".toLocaleUpperCase()}</span> */}
          <div
            style={{
              display: 'flex',
              margin: '1.5em',
            }}
          >
            <span style={useStyles(sansSerifFont, { fontSize: '1.6em', margin: '5px' })}>
              Next:
            </span>
            <span
              style={useStyles(sansSerifFont, {
                fontSize: '1.6em',
                fontWeight: 'bold',
                margin: '5px',
              })}
            >
              Deadlift
            </span>

            <span
              style={{
                margin: '5px',
              }}
            >
              <div>
                <ButtonSmall
                  // clickHandler={toggleMute}
                  backgroundColor={COLORS.blue!.light}
                  shadowColor={COLORS.blue!.light}
                  color={'#fff'}
                >
                  <EdgeIcon buttonSize={36}></EdgeIcon>
                </ButtonSmall>
              </div>
            </span>
          </div>
          <div style={{ width: 'fit-content' }}>
            {/* <img src="/next.jpg" width="150px" height="200px" /> */}
            {
              <iframe
                width="300"
                height="200"
                src="https://www.youtube.com/embed/-4qRntuXBSc?start=7"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            }
          </div>
        </div>

        <div
          className="workoutStatus"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '3em',
          }}
        >
          <span style={useStyles(sansSerifFont, { fontSize: '1.2em', margin: '1.5em' })}>
            Current Progress:{' '}
          </span>
          <div
            style={{
              borderLeft: `2px solid ${COLORS.gray!.light}`,
              height: '20%',
            }}
          >
            {/* <div
              style={{
                padding: '0 0 2em 2em',
                display: 'flex',
              }}
            >
              <span>Deadlift</span>
              
            </div> */}
            <div
              style={{
                margin: '0 0 2em 2em',
                overflow: 'auto',
                scrollBehavior: 'smooth',
              }}
            >
              <span>15 Pushups</span>
            </div>
            <div
              style={{
                padding: '0 0 2em 2em',
              }}
            >
              <span>10 Benchpress</span>
            </div>
            <div
              style={{
                padding: '0 0 2em 2em',
              }}
            >
              <span>10 Deadlift</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestTime;
