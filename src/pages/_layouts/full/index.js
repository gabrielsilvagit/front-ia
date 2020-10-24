import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

import Logo from '~/components/Logo';

import Header from '~/pages/_partials/Header';
import Footer from '~/pages/_partials/Footer';

import { Container } from './styles';

export default function FullLayout({ children }) {
  const { Content } = Layout;

  return (
    <Container className="layout">
      <Header>
        <Logo height="70px" width="100px" margin="0 50px 0 0" />
      </Header>
      <Content>{children}</Content>
      {/* <Footer /> */}
    </Container>
  );
}

FullLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
};
