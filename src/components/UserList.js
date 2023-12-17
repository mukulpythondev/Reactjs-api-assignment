import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading && <p className="text-center mt-3">Loading...</p>}
      {!loading && users.length === 0 && <p className="text-center mt-3">No data to show</p>}
      {!loading && users.length > 0 && (
        <div className="container" >
          <div className="row">
            {users.map(user => (
              <div  
                key={user.id}
                className="card col-md-2 border border-dark bg-light  scale-on-hover  m-3"
                onClick={() => onSelectUser(user)}
              >
                <img
                  src={user.avatar}
                  alt={user.profile.firstName + ' ' + user.profile.lastName}
                  className="card-img-top rounded-circle"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{user.profile.firstName} {user.profile.lastName}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
