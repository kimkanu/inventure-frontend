import React, { FunctionComponent, useState, useEffect } from 'react';
import { useGlobalState } from '../stores';
import { setTime } from '../stores/workout';

const WorkoutTimeManager: FunctionComponent = () => {
  const [workout] = useGlobalState('workout');
  const [{ lastLocalTimeMili, lastWorkoutTime }, setState] = useState({
    lastLocalTimeMili: new Date().getTime(),
    lastWorkoutTime: workout.time,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      const dateTime = new Date().getTime();
      if (!workout.paused && workout.current[0] >= 0) {
        setTime(workout.time - (dateTime - lastLocalTimeMili) / 1000);
      }
      setState((s) => ({
        ...s,
        lastLocalTimeMili: dateTime,
      }));
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        zIndex: 999999,
      }}
    >
      {workout.time} s, current {workout.current[0]}, {workout.current[1]}
    </div>
  );
};

export default WorkoutTimeManager;
