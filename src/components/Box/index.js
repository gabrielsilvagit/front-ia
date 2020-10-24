import React from 'react';
import PropTypes from 'prop-types';

import { Container, Content, Header, Footer } from './styles';

export default function Box({ children, title, footer, showForm }) {
  return (
    <Container style={{ display: showForm }} className="ll-box">
      {title && <Header>{title}</Header>}
      <Content>{children}</Content>
      {footer && <Footer>{footer}</Footer>}
    </Container>
  );
}

Box.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.element,
  footer: PropTypes.element,
  showForm: PropTypes.string,
};

Box.defaultProps = {
  title: null,
  footer: null,
  showForm: 'block',
};
