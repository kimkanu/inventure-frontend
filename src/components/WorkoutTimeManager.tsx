import React, { FunctionComponent, useState, useEffect } from 'react';
import { useGlobalState } from '../stores';
import { setTime } from '../stores/workout';

const WorkoutTimeManager: FunctionComponent = () => {
  const [workout] = useGlobalState('workout');
  const [lastLocalTimeMili, setState] = useState(new Date().getTime());

  useEffect(() => {
    const timeout = setTimeout(() => {
      const dateTime = new Date().getTime();
      if (!workout.paused && workout.current[0] >= 0) {
        setTime(workout.time - (dateTime - lastLocalTimeMili) / 1000);
      }
      setState((s) => dateTime);
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  });

  return null;
};

export default WorkoutTimeManager;
