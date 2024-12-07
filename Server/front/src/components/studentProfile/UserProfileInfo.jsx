
import React from 'react';

const UserProfileInfo = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.location}</p>
      <p>{user.role} - {user.position}</p>
      <p>{user.university} - {user.city}</p>
    </div>
  );
};

export default UserProfileInfo;
