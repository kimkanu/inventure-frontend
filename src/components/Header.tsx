import React, { FunctionComponent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeadRoom from 'react-headroom';

import { useStyles, shadow, headerFont, centeredText, fullWidth } from '../styles';
import { layer, Layers } from '../styles/layers';

interface Props {}

import './Header.css';

const Header: FunctionComponent<Props> = () => {
  const { t } = useTranslation();

  return (
    <HeadRoom>
      <header
        style={useStyles(
          shadow({ depth: 4 }),
          layer(Layers.Header),
          headerFont,
          centeredText,
          fullWidth,
          {
            height: '48px',
            marginTop: '0px',
            backgroundColor: 'white',
            fontSize: '1.3rem',
          },
        )}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <span>{t('title')}</span>
        </div>
      </header>
    </HeadRoom>
  );
};
export default Header;
