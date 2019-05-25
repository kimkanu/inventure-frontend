import React, { FunctionComponent } from 'react';
import { useGlobalState } from '../stores';

const WorkoutTimeManager: FunctionComponent = () => {
  const [workout] = useGlobalState('workout');
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        zIndex: 999999,
      }}
    >
      {workout.time}
      <br />
      {workout.current[0]},{workout.current[1]}
    </div>
  );
};

export default WorkoutTimeManager;
