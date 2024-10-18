import React, { useState, useEffect } from 'react';

const UpdateUsage = ({ token }) => {
  const [usageData, setUsageData] = useState({
    waterUsage: 0,
    electricityUsage: 0,
    localDateTime: new Date().toISOString(),
  });

  const [isAutomatic, setIsAutomatic] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [formData, setFormData] = useState({
    waterUsage: '',
    electricityUsage: '',
  });

  const generateRandomUsage = () => ({
    waterUsage: (Math.random() * 5).toFixed(2),
    electricityUsage: Math.floor(Math.random() * 1000),
    localDateTime: new Date().toISOString(),
  });

  const updateUsageData = (newUsageData) => {
    fetch('https://render-ecotrack.onrender.com/updateUsage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newUsageData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Updated Usage Data:', data);
        setUsageData(newUsageData);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleStart = () => {
    if (isAutomatic && !isRunning) {
      updateUsageData(generateRandomUsage()); // Initial update on start
      const id = setInterval(() => {
        updateUsageData(generateRandomUsage()); // Update every 5 seconds
      }, 5000);
      setIntervalId(id);
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (isAutomatic && isRunning) {
      handleStart(); // Start automatic updates
    } else {
      handleStop(); // Stop updates
    }

    return () => handleStop(); // Cleanup interval on component unmount
  }, [isAutomatic, isRunning]);

  const handleManualUpdate = (e) => {
    e.preventDefault();
    const newUsageData = {
      waterUsage: parseFloat(formData.waterUsage),
      electricityUsage: parseInt(formData.electricityUsage, 10),
      localDateTime: new Date().toISOString(),
    };
    updateUsageData(newUsageData);
    setFormData({ waterUsage: '', electricityUsage: '' }); // Reset form fields
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header" style={{ backgroundColor: '#fff', color: '#0089c1' }}>
          <h2 className="mb-0">Simulate Water and Electricity Usage</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <h5>Water Usage:</h5>
            <p className="display-4">{usageData.waterUsage} liters</p>
          </div>
          <div className="mb-3">
            <h5>Electricity Usage:</h5>
            <p className="display-4">{usageData.electricityUsage} W</p>
          </div>
          <div className="mb-3">
            <h5>Last Updated:</h5>
            <p className="text-muted">{new Date(usageData.localDateTime).toLocaleString()}</p>
          </div>
          <div className="mb-3">
            <label style={{ marginRight: '20px' }}>
              <input
                type="radio"
                value="automatic"
                checked={isAutomatic}
                onChange={() => setIsAutomatic(true)}
              />
               Simulate the usage
            </label>
            <label>
              <input
                type="radio"
                value="manual"
                checked={!isAutomatic}
                onChange={() => setIsAutomatic(false)}
              />
              Manually Update Your Usage Data
            </label>
          </div>
          {isAutomatic ? (
            <button className="btn btn-secondary" onClick={isRunning ? handleStop : handleStart}>
              {isRunning ? 'Stop Updates' : 'Start Updates'}
            </button>
          ) : (
            <form onSubmit={handleManualUpdate}>
              <div className="mb-3">
                <label htmlFor="waterUsage" className="form-label">Water Usage (liters):</label>
                <input
                  type="number"
                  className="form-control"
                  id="waterUsage"
                  value={formData.waterUsage}
                  onChange={(e) => setFormData({ ...formData, waterUsage: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="electricityUsage" className="form-label">Electricity Usage (W):</label>
                <input
                  type="number"
                  className="form-control"
                  id="electricityUsage"
                  value={formData.electricityUsage}
                  onChange={(e) => setFormData({ ...formData, electricityUsage: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Update Manually</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateUsage;
