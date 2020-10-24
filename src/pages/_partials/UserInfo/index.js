import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '~/components/Avatar';

import { Container } from './styles';
import { AiOutlineUser } from 'react-icons/ai';

export default function UserInfo({ children }) {
  const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      {children}
      <Avatar image={profile && profile.avatar_url}>
        <AiOutlineUser />
      </Avatar>
    </Container>
  );
}

UserInfo.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
};
