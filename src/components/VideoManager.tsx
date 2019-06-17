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
  const setSize = (rest: boolean, info: boolean = false) => {
    const h = Math.min(-208 + 0.6 * window.innerHeight, ((window.innerWidth - 1.33 * 16) * 9) / 16);
    setState((s) => ({
      ...s,
      h,
      y: !rest ? 36 + 0.4 * window.innerHeight : info ? 72 : 128,
      w: (h * 16) / 9,
    }));
  };
  useEffect(() => {
    setSize(workout.current[1] % 2 === 0, location.pathname === '/workout/rest/info');
    window.addEventListener('resize', () =>
      setSize(workout.current[1] % 2 === 0, location.pathname === '/workout/rest/info'),
    );
    return () => {
      window.removeEventListener('resize', () =>
        setSize(workout.current[1] % 2 === 0, location.pathname === '/workout/rest/info'),
      );
    };
  }, [workout.current[1], location.pathname]);
  useEffect(() => {
    if (url) setVid(new YT.Player('video'));
  }, [url]);
  useEffect(() => {
    try {
      if (workout.muted) {
        if (typeof vid.mute === 'function') vid.mute();
      } else {
        if (typeof vid.unMute === 'function') vid.unMute();
        vid.setVolume(50);
      }
    } catch (e) {}
  }, [workout.muted]);

  const vis = ['/workout/start', '/workout/rest', '/workout/rest/info'].includes(location.pathname);

  return (
    <div
      style={
        url
          ? {
              position: 'fixed',
              top: y,
              zIndex: location.pathname === '/workout/rest/info' ? 9999999999999 : undefined,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: -208 + 0.6 * window.innerHeight,
              visibility: url && vis ? 'visible' : 'hidden',
              opacity: url && vis ? 1 : 0,
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
        {url ? (
          <iframe
            id="video"
            width={w.toString()}
            height={h.toString()}
            src={`//${url.split('//')[1]}?enablejsapi=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : null}
      </div>
    </div>
  );
};

export default VideoManager;
