import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(data => {
        setTotalUsers(data.users.length);
        const randomIndex = Math.floor(Math.random() * data.users.length);
        const randomUser = data.users[randomIndex];
        setUserData(randomUser);
      })
      .catch(error => console.error('Error fetching user data:', error));
  };

  const handleRefresh = () => {
    fetchUserData();
    changeBackgroundColor();
  };

  const changeBackgroundColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setBackgroundColor(randomColor);
  };

  return (
    <div className="container" >
      <header>
        <h1>Random User Generator</h1>
        <button className="refresh-button" onClick={handleRefresh}>Refresh</button>
        <p>Total Users: {totalUsers}</p>
      </header>
      <main >
        {userData && (
          <div className="user-details" style={{ backgroundColor }}>
            <div className="user-avatar">
              <img src={userData.image} alt="User Avatar" />
            </div>
            <div className="user-info">
              <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Phone:</strong> {userData.phone}</p>
              <p><strong>Age:</strong> {userData.age}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
              <p><strong>Address:</strong> {userData.address.address}, {userData.address.city}, {userData.address.state}, {userData.address.postalCode}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
