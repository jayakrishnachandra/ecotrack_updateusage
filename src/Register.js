import React, { useState } from 'react';

const Register = ({ onSignIn, toggleRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [menCount, setMenCount] = useState('');
  const [roomCount, setRoomCount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Added state for success message

  const handleRegister = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
      men_count: parseInt(menCount),
      room_count: parseInt(roomCount),
    };

    try {
      const response = await fetch('https://render-ecotrack.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.text(); // Read the response as text

      if (response.ok) {
        // Check if the response contains "User already exists"
        if (data.includes("User already exists")) {
          setErrorMessage("User already exists. Please use a different email.");
          setSuccessMessage(''); // Clear success message if user exists
        } else {
          setSuccessMessage("Registration successful!"); // Set success message
          setErrorMessage(''); // Clear error message if registration is successful
        }
      } else {
        setErrorMessage(data || 'An error occurred. Please try again.');
        setSuccessMessage(''); // Clear success message on error
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('An error occurred during registration. Please try again.');
      setSuccessMessage(''); // Clear success message on error
    }
  };

  return (
    <div style={styles.container}>
      <div  style={styles.header}>
              <h2  style={{ color: 'rgb(0, 137, 193)' }}>Register</h2>
            </div>
      <form onSubmit={handleRegister} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={styles.input} 
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={styles.input} 
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Number of Men:</label>
          <input 
            type="number" 
            value={menCount} 
            onChange={(e) => setMenCount(e.target.value)} 
            required 
            style={styles.input} 
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Number of Rooms:</label>
          <input 
            type="number" 
            value={roomCount} 
            onChange={(e) => setRoomCount(e.target.value)} 
            required 
            style={styles.input} 
          />
        </div>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>} {/* Display success message */}
        <button type="submit" style={styles.button}>Register</button>
      </form>
      <p style={styles.toggleRegister} onClick={toggleRegister}>
        Already have an account? Sign In
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '35px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    color : '#565656'
  },
  input: {
    padding: '10px',
    borderRadius: '14px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px',
    backgroundColor: '#e3f2fd',
    color: '#0089c1',
    border: 'none',
    borderRadius: '14px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '20px'
  },
  toggleRegister: {
    textAlign: 'center',
    marginTop: '10px',
    cursor: 'pointer',
    color: '#0089c1',
  },
};

export default Register;
