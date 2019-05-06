import React, {
  FunctionComponent,
  useState,
  useMemo,
  useEffect,
  Component
} from 'react';
import Timer from './Timer';
import ButtonLarge from '../Buttons/ButtonLarge';
import EdgeIcon from '../Icons/EdgeIcon';
import { COLORS } from '../../colors';
import { useStyles, sansSerifFont } from '../../styles';
import { Redirect } from 'react-router-dom';
import { toggleMute, useGlobalState } from '../../stores';

interface Props {
  nextStep: String;
}

interface State {
  time: number;
  sets: number;
  show: boolean;
}

const NextSection: FunctionComponent<Props> = ({ nextStep }) => {
  return (
    <>
      <div
        style={{
          width: '200px',
          height: '60px',
          position: 'relative',
          margin: 'auto',
          textAlign: 'center',
          border: `1px solid ${COLORS.gray!.light}`
        }}
      >
        <div>
          <span
            style={useStyles(sansSerifFont, {
              fontSize: '.9rem',
              backgroundColor: '#f7f7f7',
              display: 'inline-block',
              transform: 'translateY(-.8em)',
              padding: '0 .8em'
            })}
          >
            Next
          </span>
        </div>
        <div>
          <span
            style={useStyles(sansSerifFont, {
              fontWeight: 'bold'
            })}
          >
            {nextStep}
          </span>
        </div>
      </div>
    </>
  );
};

const MuteButton: FunctionComponent = () => {
  return (
    <ButtonLarge
      clickHandler={toggleMute}
      backgroundColor={'#fff'}
      shadowColor={COLORS.gray!.darker}
      color={COLORS.gray!.dark}
    >
      <EdgeIcon buttonSize={48}>
        {useGlobalState('workout')[0].muted ? '' : ''}
      </EdgeIcon>
    </ButtonLarge>
  );
};

class StartWorkout extends Component<{}, State> {
  timeTotal = 30;
  setsTotal = 4;

  state = {
    show: true,
    time: this.timeTotal,
    sets: 1
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
        if (this.state.sets === this.setsTotal) {
          return { ...state, show: false };
        }
        return { ...state, sets: state.sets + 1, time: this.timeTotal };
      });
    }, 1000);

    return !this.state.show ? (
      // <Redirect to="/profile" />
      <div />
    ) : (
      <div className="content">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'space-between',
            height: 'calc(100% - 28px)',
            marginTop: '28px'
          }}
        >
          <div
            style={{
              height: '48vh'
            }}
          >
            <Timer
              name="15 Benchpress"
              sets={{ current: this.state.sets, total: this.setsTotal }}
              time={{ current: this.state.time, total: this.timeTotal }}
            />
          </div>
          <NextSection nextStep="2 Minutes rest" />
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <div>
              <ButtonLarge
                link="/workout"
                backgroundColor={COLORS.red!.light}
                shadowColor={COLORS.red!.dark}
              >
                <EdgeIcon buttonSize={48}></EdgeIcon>
              </ButtonLarge>
            </div>

            <MuteButton />

            <ButtonLarge
              backgroundColor={COLORS.blue!.light}
              shadowColor={COLORS.blue!.dark}
            >
              <EdgeIcon buttonSize={48}></EdgeIcon>
            </ButtonLarge>
          </div>
        </div>
      </div>
    );
  }
}

export default StartWorkout;
