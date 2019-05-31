import React, { FunctionComponent, useState, useEffect } from 'react';
import { useGlobalState } from '../stores';

const VideoManager: FunctionComponent = () => {
  const [workout] = useGlobalState('workout');
  const [staticInfo] = useGlobalState('static');
  const plan = workout.plan.filter((p) => !p.hidden);
  const [{ y, w, h, url }, setState] = useState({
    y: 0,
    w: 100,
    h: 0,
    url: undefined as string | undefined,
  });
  const [vid, setVid] = useState(null as any);

  useEffect(() => {
    setState((s) => ({
      ...s,
      url:
        workout.current[0] >= 0
          ? staticInfo.workoutInfo[plan[workout.current[0]].name].youtube
          : undefined,
    }));
  }, [workout.current[0]]);
  const setSize = (rest: boolean) => {
    const h = Math.min(-208 + 0.6 * window.innerHeight, ((window.innerWidth - 1.33 * 16) * 9) / 16);
    setState((s) => ({
      ...s,
      h,
      y: rest ? 128 : 36 + 0.4 * window.innerHeight,
      w: (h * 16) / 9,
    }));
  };
  useEffect(() => {
    setSize(workout.current[1] % 2 === 0);
    window.addEventListener('resize', () => setSize(workout.current[1] % 2 === 0));
    return () => {
      window.removeEventListener('resize', () => setSize(workout.current[1] % 2 === 0));
    };
  }, [workout.current[1]]);
  useEffect(() => {
    if (url) setVid(new YT.Player('video'));
  }, [url]);
  useEffect(() => {
    if (vid) {
      if (workout.muted) {
        if (typeof vid.mute === 'function') vid.mute();
      } else {
        if (typeof vid.unMute === 'function') vid.unMute();
      }
    }
  }, [workout.muted]);

  return (
    <div
      style={
        url
          ? {
              position: 'fixed',
              top: y,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: -208 + 0.6 * window.innerHeight,
              visibility: url && location.pathname.startsWith('/workout') ? 'visible' : 'hidden',
              opacity: url && location.pathname.startsWith('/workout') ? 1 : 0,
              transition:
                'visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1),' +
                'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }
          : {}
      }
    >
      <div
        style={
          url
            ? {
                width: w,
                height: h,
                zIndex: 999999,
                borderRadius: '8px',
                overflow: 'hidden',
              }
            : {}
        }
      >
        <iframe
          id="video"
          width={w.toString()}
          height={h.toString()}
          src={url ? `${url}?enablejsapi=1` : ''}
          frameBorder="0"
          allow="accelerometer; autoplay; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoManager;
