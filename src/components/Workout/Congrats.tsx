import React, { FunctionComponent, useState, useEffect } from 'react';
import { withRouter, Route, RouteComponentProps, Redirect } from 'react-router-dom';
import { useGlobalState } from '../../stores';
import CardWithPicture from '../CardWithPicture';
import Link from '../Link';
import { useStyles, sansSerifFont } from '../../styles';
import { transparentImage } from '../../contants';
import { changeWorkoutType, goNext, initializeWorkout } from '../../stores/workout';
import { capitalizeFirst } from '../../utils';
import ButtonLarge from '../Buttons/ButtonLarge';
import { COLORS } from '../../colors';

interface Props extends RouteComponentProps {}

const colorArray = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];

class Confetti {
  color: number[];
  r: number;
  opacity: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacitySpeed: number;
  globalOpacity: number;
  constructor() {
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.r = Math.random() * 4 + 2;
    this.opacity = 0;
    this.x = Math.random() * window.innerWidth;
    this.y = -Math.random() * window.innerHeight - 10;
    this.vx = Math.random() * 0.5;
    this.vy = 0.8 * this.r + Math.random() * 5 + 2;
    this.opacitySpeed = 0.03 * (Math.random() * 3 + 1);
    this.globalOpacity = 10;
  }
  draw(drawCircle: (x: number, y: number, r: number, style?: string) => void, delta: number) {
    this.globalOpacity -= delta / 20;
    this.x += this.vx * delta;
    this.y += this.vy * delta;
    this.opacity += this.opacitySpeed * delta;
    if (this.opacity > 1) {
      this.opacity = 1;
      this.opacitySpeed *= -1;
    }
    if (this.opacity < 0) {
      this.opacity = 0;
      this.opacitySpeed *= -1;
    }
    drawCircle(
      this.x,
      this.y,
      this.r,
      `rgba(${this.color.join(',')},${this.opacity *
        Math.max(0, Math.min(1, this.globalOpacity))})`,
    );
  }
}

const Congrats: FunctionComponent<Props> = ({ location, history }) => {
  const [workout] = useGlobalState('workout');

  const flag = Date.now();
  const confettis = [...Array(150).keys()].map(() => new Confetti());
  let lastRender = Date.now();

  const drawCircle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    style?: string,
  ) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    if (style) ctx.fillStyle = style;
    ctx.fill();
  };
  const step = (ctx: CanvasRenderingContext2D) => {
    const delta = Date.now() - lastRender;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const dC = (x: number, y: number, r: number, style?: string) => {
      drawCircle(ctx, x, y, r, style);
    };
    if (Date.now() - flag < 10000) requestAnimationFrame(() => step(ctx));
    confettis.map((c) => c.draw(dC, delta / 30));
    lastRender = Date.now();
  };
  useEffect(() => {
    if (workout.current[0] === -1) {
      history.push('/workout');
      return;
    }
    initializeWorkout();

    lastRender = Date.now();
    const canvas = document.getElementById('congrats') as HTMLCanvasElement;
    const handler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    if (canvas) {
      handler();
      const ctx = canvas.getContext('2d')!;
      step(ctx);
    }
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);
  return (
    <Route
      path={['/workout/congrats']}
      render={() => (
        <div className="pop-content">
          <div className="content" style={{ overflow: 'hidden' }}>
            <h1 className="heading" style={{ position: 'relative', zIndex: 9999999 }}>
              Congrats
            </h1>
            <div
              style={{
                position: 'absolute',
                zIndex: 99999999,
                top: 0,
                width: 'calc(100% - 1.33rem)',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  marginBottom: '1rem',
                }}
              >
                You completed your workouts!
              </span>
              <ButtonLarge
                link="/profile"
                labelInside="Go to My Profile"
                backgroundColor={COLORS.blue!.light}
                shadowColor={COLORS.blue!.dark}
              />
            </div>
            <canvas
              id="congrats"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 99999998,
              }}
            />
          </div>
        </div>
      )}
    />
  );
};

export default withRouter(Congrats);
