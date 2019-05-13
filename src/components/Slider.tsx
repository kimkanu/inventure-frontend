import React, { FunctionComponent, useState, useEffect } from 'react';
import { randomString } from '../utils';
import './Slider.css';
import { useStyles, sansSerifFont } from '../styles';

// TODO: impliment gap and unit

interface Props {
  id?: string;
  min?: number;
  defaultVal?: number;
  max?: number;
  integer?: boolean;
  style?: React.CSSProperties;
  onChange?: (value: number) => void;
  title?: string;
  gap?: number;
  unit?: string;
}

const Slider: FunctionComponent<Props> = ({
  min = 5,
  defaultVal = min,
  max = 10,
  integer = false,
  id = randomString(8),
  style = {},
  onChange = () => {},
  title,
  gap = 1,
  unit,
}) => {
  const minValue = integer ? Math.round(min) : min;
  const maxValue = integer ? Math.round(max) : max;
  const defaultValue = integer ? Math.round(defaultVal) : defaultVal;
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [inputString, setInputString] = useState(value.toString());

  const uptoSecond = (s: string) => {
    const i = s.indexOf('.');
    if (i < 0) return s;
    if (i === 0) return `0${s}`;
    return s.slice(0, i + 3);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const sliderBar = document.getElementById(`slider-bar-${id}`) as HTMLDivElement;
    const sliderThumbContainer = document.getElementById(
      `slider-thumb-container-${id}`,
    ) as HTMLDivElement;
    const { left, right } = sliderBar.getClientRects()[0];
    const thumbPosition = Math.max(left, Math.min(e.clientX, right));
    const ratio = (thumbPosition - left) / (right - left);
    const integralRatio = Math.round(ratio * (maxValue - minValue)) / (maxValue - minValue);
    const percentage = Math.min(Math.max(0, (integer ? integralRatio : ratio) * 100), 100);
    sliderThumbContainer.style.transform = `translateX(calc(${percentage}% - 24px))`;
    const nextValue =
      (integer ? Math.round(ratio * (maxValue - minValue)) : ratio * (maxValue - minValue)) +
      minValue;
    setValue(nextValue);
    setInputString(uptoSecond(nextValue.toString()));
    if (value !== nextValue) onChange(nextValue);
  };
  const touchMoveHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    const sliderBar = document.getElementById(`slider-bar-${id}`) as HTMLDivElement;
    const sliderThumbContainer = document.getElementById(
      `slider-thumb-container-${id}`,
    ) as HTMLDivElement;
    const { left, right } = sliderBar.getClientRects()[0];
    const thumbPosition = Math.max(Math.min(e.touches[0].clientX, right), left);
    const ratio = (thumbPosition - left) / (right - left);
    const integralRatio = Math.round(ratio * (maxValue - minValue)) / (maxValue - minValue);
    const percentage = (integer ? integralRatio : ratio) * 100;
    sliderThumbContainer.style.transform = `translateX(calc(${percentage}% - 24px))`;
    const nextValue = (integer ? integralRatio : ratio) * (maxValue - minValue) + minValue;
    setValue(nextValue);
    setInputString(uptoSecond(nextValue.toString()));
    if (value !== nextValue) onChange(nextValue);
  };
  const stringFilter = (s: string) => {
    return s
      .replace(/^0(\d)/, '$1')
      .replace(/[^0-9\.]/, '')
      .replace(/(\d*\..*?)\./, '$1');
  };

  return (
    <div
      style={{
        margin: '1rem 0',
        overflowX: 'hidden',
      }}
    >
      {title ? (
        <div>
          <span>{title}</span>
        </div>
      ) : null}
      <div
        style={{
          margin: '0 0.5rem',
          display: 'flex',
          ...style,
        }}
        onMouseMove={(e) => {
          const sliderBar = document.getElementById(`slider-bar-${id}`) as HTMLDivElement;
          const sliderThumb = document.getElementById(`slider-thumb-${id}`) as HTMLDivElement;
          if (active && sliderBar && sliderThumb) mouseMoveHandler(e);
        }}
        onTouchMove={(e) => {
          const sliderBar = document.getElementById(`slider-bar-${id}`) as HTMLDivElement;
          const sliderThumb = document.getElementById(`slider-thumb-${id}`) as HTMLDivElement;
          if (active && sliderBar && sliderThumb) touchMoveHandler(e);
        }}
        onMouseUp={() => {
          setActive(false);
          setTimeout(() => setActive(false), 100);
        }}
        onTouchEnd={() => {
          setActive(false);
          setTimeout(() => setActive(false), 100);
        }}
      >
        <div
          className={`slider${active ? ' active' : ''}`}
          style={{ position: 'relative', height: '48px', width: '100%', margin: '0 36px 0 16px' }}
          id={`slider-${id}`}
        >
          <div
            id={`slider-bar-${id}`}
            className="slider-bar"
            onMouseDown={(e) => {
              setTimeout(() => setActive(true), 100);
              mouseMoveHandler(e);
            }}
            onTouchStart={(e) => {
              setTimeout(() => setActive(true), 100);
              touchMoveHandler(e);
            }}
          >
            <div />
          </div>
          <div
            id={`slider-thumb-container-${id}`}
            style={{
              position: 'absolute',
              width: '100%',
              transform: `translateX(calc(${Math.min(
                Math.max(0, ((value - minValue) / (maxValue - minValue)) * 100),
                100,
              )}% - 24px))`,
              transition:
                integer && !active ? 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            }}
          >
            <div
              id={`slider-thumb-${id}`}
              className="slider-thumb"
              onMouseDown={() => {
                setActive(true);
              }}
              onTouchStart={() => {
                setActive(true);
              }}
            >
              <div />
            </div>
          </div>
        </div>
        <input
          className="slider-input"
          type="number"
          value={inputString}
          min={minValue}
          max={maxValue}
          style={useStyles(sansSerifFont)}
          onChange={(e) => {
            onChange(parseFloat(e.currentTarget.value));
            setValue(parseFloat(e.currentTarget.value));
            setInputString(stringFilter(e.currentTarget.value));
          }}
        />
      </div>
    </div>
  );
};

export default Slider;
