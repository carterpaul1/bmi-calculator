import React, { useState } from 'react';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    const parsedWeight = parseFloat(weight);
    const parsedFeet = parseInt(feet);
    const parsedInches = parseInt(inches);

    if (isNaN(parsedWeight) || isNaN(parsedFeet) || isNaN(parsedInches) ||
      parsedWeight <= 0 || parsedFeet <= 0 || parsedInches < 0) {
      setBmi(null);
      setMessage('Please enter a valid positive number for weight and height.');
      return;
    }

    const heightInInches = parsedFeet * 12 + parsedInches;
    if (parsedWeight > 0 && heightInInches > 0) {
      const heightInMeters = heightInInches * 0.0254; // Convert height to meters
      const weightInKg = parsedWeight * 0.453592; // Convert weight to kg
      const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
      setMessage(getBMIMessage(bmiValue));
    } else {
      setBmi(null);
      setMessage('Please enter valid height and weight');
    }
  };

  const getBMIMessage = (bmi) => {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      return 'Overweight';
    } else {
      return 'Obesity';
    }
  };

  return (
    <div className="form-container">
      <img src={`${process.env.PUBLIC_URL}/scale.jfif`} alt="scale" className="left-image" />
      <div className="bmi-calculator">
        <h3>Please enter your weight and height to find your BMI</h3>
        <form onSubmit={calculateBMI}>
          <div>
            <label>
              Weight
              <input
                type="number"
				placeholder="lbs"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Height 
              <div>
                <input
                  type="number"
                  placeholder="Feet"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <input
                  type="number"
                  placeholder="Inches"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                />
              </div>
            </label>
          </div>
          <button type="submit">Calculate BMI</button>
        </form>
        {bmi && (
          <div>
            <h3>Your BMI: {bmi}</h3>
            <p>{message}</p>
          </div>
        )}
        {message && !bmi && (
          <div>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;

