import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
const image = '/assets/images/logo.png';

export default function Logo({ margin, height = '70px', width = '200px' }) {
  return (
    <Container className="logo" to="/" margin={margin} style={{ marginBottom: '15px' }}>
      <img src={image} alt={'ShopIA - Soluções em TI para mercados'} width={width} height={height} />
      <span style={{ marginTop: '15px' }}>ShopIA - Soluções em TI para mercados</span>
    </Container>
  );
}

Logo.propTypes = {
  color: PropTypes.string,
  margin: PropTypes.string,
  size: PropTypes.string,
};

Logo.defaultProps = {
  color: null,
  margin: '0',
  size: '24px',
};
