import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    attendingWithGuest: "",
    guestName: "",
  });

  const [errors, setErrors] = useState({});
  const [showGuestNameField, setShowGuestNameField] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    setShowGuestNameField(formData.attendingWithGuest === "yes");
  }, [formData.attendingWithGuest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name) formErrors.name = "Name is required.";
    if (!formData.email) {
      formErrors.email = "Email is required.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email))
        formErrors.email = "Please enter a valid email address.";
    }
    if (!formData.age) {
      formErrors.age = "Age is required.";
    } else if (formData.age <= 0) {
      formErrors.age = "Age must be a number greater than 0.";
    }
    if (!formData.attendingWithGuest)
      formErrors.attendingWithGuest = "Please select whether you are attending with a guest.";
    if (formData.attendingWithGuest === "yes" && !formData.guestName)
      formErrors.guestName = "Guest Name is required if you are attending with a guest.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedData(formData);
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        age: "",
        attendingWithGuest: "",
        guestName: "",
      });
      setErrors({});
      setShowGuestNameField(false);
    }
  };

  return (
    <div className="App">
      <h1>Event Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <br />

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <br />

        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>
        <br />

        <div>
          <label>Are you attending with a guest?</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="attendingWithGuestYes"
                name="attendingWithGuest"
                value="yes"
                checked={formData.attendingWithGuest === "yes"}
                onChange={handleChange}
              />
              <label htmlFor="attendingWithGuestYes">Yes</label>
            </div>
            <div className="radio-option">
              <input
                className="radio-ans"
                type="radio"
                id="attendingWithGuestNo"
                name="attendingWithGuest"
                value="no"
                checked={formData.attendingWithGuest === "no"}
                onChange={handleChange}
              />
              <label htmlFor="attendingWithGuestNo">No</label>
            </div>
          </div>
          {errors.attendingWithGuest && (
          <span className="error">{errors.attendingWithGuest}</span>
          )}
        </div>

        <br />

        {showGuestNameField && (
          <div>
            <label htmlFor="guestName">Guest Name:</label>
            <input
              type="text"
              id="guestName"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
            />
            {errors.guestName && (
              <span className="error">{errors.guestName}</span>
            )}
          </div>
        )}
        <br />

        <button type="submit">Submit</button>
      </form>

      {formSubmitted && submittedData && (
        <div className="summary">
          <h2>Summary of Registration</h2>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Age:</strong> {submittedData.age}</p>
          <p><strong>Attending with Guest:</strong> {submittedData.attendingWithGuest === "yes" ? "Yes" : "No"}</p>
          {submittedData.attendingWithGuest === "yes" && (
            <p><strong>Guest Name:</strong> {submittedData.guestName}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
