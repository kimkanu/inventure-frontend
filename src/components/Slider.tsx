import React, { FunctionComponent, useState, useEffect } from 'react';
import { randomString } from '../utils';
interface Props {
  id?: string;
  min?: number;
  max?: number;
  integer?: boolean;
}

const fallbackId = randomString(8);

const Slider: FunctionComponent<Props> = ({
  min = 0,
  max = 100,
  integer = false,
  id = fallbackId,
}) => {
  const maxValue = 100;
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(0);
  const thumbSize = 48;
  let sliderBar: HTMLDivElement;
  let sliderThumb: HTMLDivElement;
  useEffect(() => {
    sliderBar = document.getElementById(`slider-bar-${id}`) as HTMLDivElement;
    sliderThumb = document.getElementById(`slider-thumb-${id}`) as HTMLDivElement;
  });
  console.log(value);
  return (
    <div
      style={{ padding: '3rem', display: 'flex' }}
      onMouseMove={(e) => {
        if (active && sliderBar && sliderThumb) {
          const { left, right } = sliderBar.getClientRects()[0];
          const thumbPosition = Math.max(Math.min(e.clientX, right), left);
          sliderThumb.style.left = `calc(${((thumbPosition - left) / (right - left)) *
            100}% - ${thumbSize / 2}px)`;
          setValue(((thumbPosition - left) / (right - left)) * maxValue);
        }
      }}
      onTouchMove={(e) => {
        if (active && sliderBar && sliderThumb) {
          const { left, right } = sliderBar.getClientRects()[0];
          const thumbPosition = Math.max(Math.min(e.touches[0].clientX, right), left);
          sliderThumb.style.left = `calc(${((thumbPosition - left) / (right - left)) *
            100}% - ${thumbSize / 2}px)`;
          setValue(((thumbPosition - left) / (right - left)) * maxValue);
        }
      }}
      onMouseUp={() => setActive(false)}
      onTouchEnd={() => setActive(false)}
    >
      <div style={{ position: 'relative', height: thumbSize, width: '70%' }} id={`slider-${id}`}>
        <div
          id={`slider-bar-${id}`}
          style={{
            height: '4px',
            backgroundColor: 'gray',
            top: `${thumbSize / 2 - 2}px`,
            position: 'absolute',
            width: '100%',
          }}
        />
        <div
          id={`slider-thumb-${id}`}
          style={{
            position: 'absolute',
            width: thumbSize,
            height: thumbSize,
            top: 0,
            left: `calc(${(value / maxValue) * 100}% - ${thumbSize / 2}px)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
          }}
          onMouseDown={() => {
            setActive(true);
          }}
          onTouchStart={() => setActive(true)}
        >
          <div
            style={{
              backgroundColor: active ? 'red' : 'green',
              width: thumbSize / 2,
              height: thumbSize / 2,
              borderRadius: '50%',
            }}
          />
        </div>
      </div>
      <input value={value} />
    </div>
  );
};

export default Slider;
