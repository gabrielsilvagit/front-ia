import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// import Logo from '~/components/Logo';

import { Container } from './styles';

const image = '/assets/images/cropped-small-logo-32x32.png';

export default function Footer() {
  const { t } = useTranslation();
  const { version } = useSelector(state => state.app);
  return (
    <Container>
      {t('messages:desenvolvimento')} <img src={image} style={{ margin: '0 5px 0 5px' }} /> | {version}
    </Container>
  );
}
