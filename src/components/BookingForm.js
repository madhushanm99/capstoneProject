import React, { useState } from "react";

const BookingForm = (props) => {
  const [occasion, setOccasion] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");
  const [times, setTimes] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    const newErrors = validateForm();
    setErrors(newErrors);

    // If there are no errors, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      props.submitForm({
        occasion,
        guests,
        date,
        times,
        firstName,
        lastName,
      });
    }
  };

  const handleChange = (e) => {
    setDate(e);
    props.dispatch(e);
  };

  const handleDateBlur = () => {
    // Validate the date on blur
    const newErrors = validateForm();
    setErrors(newErrors);
  };

  const validateForm = () => {
    let newErrors = {};

    // Validation for date
    if (!date) {
      newErrors.date = "Please choose a date.";
    } else {
      // Check if the selected date is in the past
      const selectedDate = new Date(date);
      const currentDate = new Date();

      if (selectedDate < currentDate) {
        newErrors.date = "Selected date must be today or in the future.";
      }
    }

    // Validation for times
    if (!times) {
      newErrors.times = "Please choose a time.";
    }

    // Validation for guests
    if (!guests) {
      newErrors.guests = "Please enter the number of guests.";
    } else if (guests < 1 || guests > 10) {
      newErrors.guests = "Number of guests must be between 1 and 10.";
    }

    // Validation for occasion
    if (!occasion) {
      newErrors.occasion = "Please choose an occasion.";
    }

    // Validation for first name
    if (!firstName) {
      newErrors.firstName = "Please enter your first name.";
    }

    // Validation for last name
    if (!lastName) {
      newErrors.lastName = "Please enter your last name.";
    }

    return newErrors;
  };

  return (
    <header>
      <section>
        <form onSubmit={handleSubmit}>
          <fieldset className="formField">
            <div>
              <label htmlFor="book-firstName">First Name:</label>
              <input
                id="book-firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>
            <div>
              <label htmlFor="book-lastName">Last Name:</label>
              <input
                id="book-lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
            <div>
              <label htmlFor="book-date">Choose Date:</label>
              <input
                id="book-date"
                value={date}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleDateBlur}
                type="date"
              />
              {errors.date && <span className="error">{errors.date}</span>}
            </div>
            <div>
              <label htmlFor="book-time">Choose Time:</label>
              <select
                id="book-time"
                value={times}
                onChange={(e) => setTimes(e.target.value)}
              >
                <option value="">Select a Time</option>
                {props.availableTimes.availableTimes.map((availableTimes) => (
                  <option key={availableTimes}>{availableTimes}</option>
                ))}
              </select>
              {errors.times && <span className="error">{errors.times}</span>}
            </div>
            <div>
              <label htmlFor="book-guests">Number of Guests:</label>
              <input
                id="book-guests"
                min="1"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                type={"number"}
                placeholder={0}
                max={10}
              />
              {errors.guests && <span className="error">{errors.guests}</span>}
            </div>
            <div>
              <label htmlFor="book-occasion">Occasion:</label>
              <select
                id="book-occasion"
                key={occasion}
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
              >
                <option value="">Select an Option</option>
                <option>Birthday</option>
                <option>Anniversary</option>
              </select>
              {errors.occasion && (
                <span className="error">{errors.occasion}</span>
              )}
            </div>

            <div className="btnReceive">
              <input
                aria-label="On Click"
                type={"submit"}
                value={"Make Your Reservation"}
              />
            </div>
          </fieldset>
        </form>
      </section>
    </header>
  );
};

export default BookingForm;
