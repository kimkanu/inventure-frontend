import React, { FunctionComponent, useState, useMemo, useEffect, Component } from 'react';
import Timer from './Timer';
import { Redirect } from 'react-router-dom';

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
      <form>
        <fieldset
          style={{
            width: '200px',
            position: 'relative',
            top: '350px',
            margin: 'auto',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.2em',
          }}
        >
          <legend>Next</legend>
          <p>{nextStep}</p>
        </fieldset>
      </form>
    </>
  );
};

class StartWorkout extends Component<{}, State> {
  timeTotal = 30;
  setsTotal = 2;

  state = {
    show: true,
    time: this.timeTotal,
    sets: 1,
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
      <Redirect to="/profile" />
    ) : (
      <div>
        <h1 className="heading">Workout</h1>
        <Timer
          name="15 Benchpress"
          sets={{ current: this.state.sets, total: this.setsTotal }}
          time={{ current: this.state.time, total: this.timeTotal }}
        />
        <NextSection nextStep="2 Minute rests" />
      </div>
    );
  }
}

export default StartWorkout;
