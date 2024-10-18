import React, { useState } from 'react';
import SignIn from './SignIn';
import Register from './Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateUsage from './UpdateUsage';


const App = () => {
  const [token, setToken] = useState(null);
  const [waterLimit, setWaterLimit] = useState(null);
  const [electricityLimit, setElectricityLimit] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false); // Correctly define the state variable

  const handleSignIn = (token, waterLimit, electricityLimit) => {
    setToken(token);
    setWaterLimit(waterLimit);
    setElectricityLimit(electricityLimit);
  };

  const toggleRegister = () => {
    setIsRegistering((prev) => !prev); // Use the correct state variable
  };

  return (
    <div>
 
      {!token ? (
        <>
          {isRegistering ? (
            <Register toggleRegister={toggleRegister} />
          ) : (
            <SignIn onSignIn={handleSignIn} toggleRegister={toggleRegister} />
          )}
        </>
      ) : (
        <>
         <Router>
      <div>
      <div style={{ padding: '5px', border : '2px solid #e3f2fd', borderRadius : '10px' }}>
      <Navbar />
      </div>
        <Routes>
        <Route path="/" element={<UpdateUsage token={token} />} />
          <Route path="/update-usage" element={<UpdateUsage token={token}/>} />
        </Routes>
      </div>
    </Router>
        </>
      )}
    </div>
  );
};

export default App;
