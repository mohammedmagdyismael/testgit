import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Image from '../image/Image';
import Text from '../text/Text';

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 200px;
`;

const UserName = styled(Text)`
  font-weight: 500;
  margin: 0;
`;

const UserEmail = styled(Text)`
  font-weight: 400;
`;
const UserPreview = ({ photo, name, email, reverse }) => {
  const margin = reverse ? { ml: 3 } : { mr: 3 };

  return (
    <UserContainer>
      <Image
        src={photo}
        alt="doctor"
        id="doctor-img--preview"
        radius={40}
        name={name}
        {...margin}
      />
      <div>
        <UserName>{name}</UserName>
        <br />
        <UserEmail>{email}</UserEmail>
      </div>
    </UserContainer>
  );
};

UserPreview.propTypes = {
  photo: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
};

UserPreview.defaultProps = {
  photo: undefined,
  reverse: false,
};

export default UserPreview;
