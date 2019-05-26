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
    />
  );
};

export default WorkoutTimeManager;
