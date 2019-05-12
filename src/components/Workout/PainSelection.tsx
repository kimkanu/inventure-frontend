import React, { FunctionComponent, useState, useEffect } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { useGlobalState } from '../../stores';
import BackButton from '../Buttons/BackButton';
import BottomToolbar from '../BottomToolbar';
import Link from '../Link';

interface Props {}

const PainSelectionAnatomy: FunctionComponent = () => {
  const staticInfo = useGlobalState('static')[0];

  return (
    <div
      style={{
        position: 'absolute',
        height: 'calc(100*var(--vh) - 16rem)',
        width: 'calc(100% - 1.33rem)',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={staticInfo.images.anatomy ? staticInfo.images.anatomy.image : ''}
          style={{
            height: 'calc(100*var(--vh) - 24rem)',
          }}
        />
      </div>
    </div>
  );
};

const PainSelection: FunctionComponent<Props> = ({}) => {
  const workout = useGlobalState('workout')[0];

  return (
    <Route
      path={['/workout/pain', '/workout/view', '/workout/edit']}
      render={({ history }) => (
        <div className="to-right">
          <div className="content">
            <h1 className="heading">
              <BackButton
                onClick={() => {
                  history.goBack();
                }}
              />
              <span>Do You Have a Pain?</span>
            </h1>
            <PainSelectionAnatomy />

            <BottomToolbar position={'absolute'} bottom={'80px'}>
              <Link to="/workout/view">Go to /workout/view</Link>
            </BottomToolbar>
          </div>
        </div>
      )}
    />
  );
};

export default withRouter(PainSelection);
