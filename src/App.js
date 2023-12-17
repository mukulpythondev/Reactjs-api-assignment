import React, { useState, useEffect } from 'react';
import { SpinnerCircularFixed } from 'spinners-react';

const API_URL = 'https://602e7c2c4410730017c50b9d.mockapi.io/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Error fetching data');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-3">
      <div className="row d-flex justify-content-center">
        <div className="col-md-4 col-lg-8 ">
          <h1 className='bg-primary text-center text-light '>Users List</h1>
          {loading && <SpinnerCircularFixed size={50} thickness={100} speed={100} color="#36ad47" secondaryColor="rgba(0, 0, 0, 0.44)" />}
          {!loading && users.length === 0 && <p>No data to show</p>}
          {users.length > 0 && (
            <ul className="list-group">
              {users.map((user) => (
                <li
                  key={user.id}
                  className={`list-group-item mb-2 d-flex justify-content-evenly bg-secondary bg-opacity-50 text-light ${
                    selectedUser && selectedUser.id === user.id ? 'active' : ''
                  }`}
                  onClick={() => handleUserClick(user)}
                  style={{ width: '100%' }}
                >
                  <img
                    src={user.avatar}
                    alt={user.profile.firstName}
                    className="mr-2 rounded-circle"
                    width="50"
                    height="50"
                  />
                  <h4>  {user.profile.firstName} {user.profile.lastName}</h4>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-md-8 text-center">
          {!selectedUser && <p>Select any user to show their information</p>}
          {selectedUser && (
            <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header ">
                   
                    <button type="button" className="close" onClick={closeModal}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                  <h2 className="mb-4  bg-primary   text-light">User Details</h2>
                    <img src={selectedUser.avatar} className='rounded-circle mb-4' alt="" width="100" height="100" />
                    <h4> @{selectedUser.profile.username}</h4>
                    <form className='text-left d-flex align-items-center flex-column'>
                      <div className='form-group'>
                      <textarea
                          type="text"
                          className="form-control font-weight-bold"
                          id="fullName"
                          value={`${selectedUser.Bio}`}
                          readOnly  style={{ width: '100%' }}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                          type="text"
                          className="form-control font-weight-bold"
                          id="fullName"
                          value={`${selectedUser.profile.firstName} ${selectedUser.profile.lastName}`}
                          readOnly  style={{ width: '100%' }}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="jobTitle">Job Title</label>
                        <input
                          type="text"
                          className="form-control font-weight-bold"
                          id="jobTitle"
                          value={selectedUser.jobTitle}
                          readOnly  style={{ width: '100%' }}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control font-weight-bold"
                          id="email"
                          value={selectedUser.profile.email}
                          readOnly  style={{ width: '100%' }}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
