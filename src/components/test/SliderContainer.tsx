import React, { FunctionComponent, useState, useEffect } from 'react';
import Slider from '../Slider';

const SliderContainer: FunctionComponent = () => {
  return (
    <div style={{ width: '500px' }}>
      <Slider integer onChange={(e) => console.log(e)} title="Slider" />
    </div>
  );
};

export default SliderContainer;
