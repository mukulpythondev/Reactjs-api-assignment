import React from 'react';

const UserDetails = ({ user }) => {
  return (
    <div>
      {user ? (
        <div>
          <h2>{user.profile.firstName} {user.profile.lastName}</h2>
          <p>Email: {user.profile.email}</p>
          <p>Job Title: {user.jobTitle}</p>
          <p>Bio: {user.Bio}</p>
          {/* Add other details as needed */}
        </div>
      ) : (
        <p className="text-center mt-3">Select a user to view details</p>
      )}
    </div>
  );
};

export default UserDetails;
