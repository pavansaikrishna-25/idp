import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [storedUserId, setStoredUserId] = useState('');
  const [storedPassword, setStoredPassword] = useState('');
  const [storedImage, setStoredImage] = useState(null);
  const [storedData, setStoredData] = useState('');
  const [inputData, setInputData] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleLogin = () => {
    // Check if the entered credentials match the stored ones
    if (userId === storedUserId && password === storedPassword) {
      setIsLoggedIn(true);
      setInputData(storedData);  // Display previously entered data after login
      alert('Logged in successfully!');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleRegister = () => {
    // Store the user details during registration
    setStoredUserId(userId);
    setStoredPassword(password);
    setStoredImage(selectedImage);
    setStoredData(inputData);  // You can also set some default data if required
    setIsLoggedIn(true);
    alert('User registered');
  };

  const handleSaveAndClose = () => {
    setStoredData(inputData);  // Save the input data entered by the user
    alert('Data saved successfully!');
    setIsLoggedIn(false); // Redirect back to Sign In screen
    setInputData(''); // Optionally clear the input data
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  const selectImage = (index) => {
    setSelectedImage(index);
  };

  return (
    <div className="app">
      <div className="auth-options">
        <button onClick={() => { setIsRegistering(true); setIsLoggedIn(false); }}>Sign In</button>
        <button onClick={() => { setIsRegistering(false); setIsLoggedIn(false); }}>Log In</button>
      </div>

      {!isLoggedIn ? (
        <div className="form-container">
          <h2>{isRegistering ? 'Register' : 'Login'}</h2>

          {/* UserID and Password Fields */}
          <input
            type="text"
            placeholder="USERID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Image Gallery (Appears after ID and Password) */}
          <div className="image-gallery">
            {[...Array(4)].map((_, index) => (
              <img
                key={index}
                src={`https://source.unsplash.com/random/100x100?sig=${index}`}
                alt={`random${index}`}
                className={selectedImage === index ? 'selected' : ''}
                onClick={() => selectImage(index)}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={isRegistering ? handleRegister : handleLogin}>
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </div>
        </div>
      ) : (
        <div className="data-entry">
          {/* Text Field for Entering Data after Login */}
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Enter additional information..."
          ></textarea>
          <button onClick={handleSaveAndClose}>Save & Close</button>
          {storedData && (
            <div className="saved-data">
              <h3>Previously Entered Data:</h3>
              <p>{storedData}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
