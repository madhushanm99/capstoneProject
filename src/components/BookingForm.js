import React, { useState } from "react";

const BookingForm = () => {
    const [date, setDate] = useState("");
    const [times, SetTimes] = useState("");
    const [guests, setGuest] = useState("");
    const [occasion, setOccasion] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.SubmitForm(e);
    }
    const handleChange = (e) => {
        setDate(e);
        props.dispatch(e);
    }

    const onFocus = useCallback(
        ({ target }) => {
          dispatch({
            type: 'setIsDirty',
            payload: { [target.name]: true },
          });
        },
        [dispatch]
      );
    return (
        <header>
            <section>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div>
                            <label htmlFor="book-date">Choose Date:</label>
                            <input id="book-date" value={date} onChange={(e) => handleChange(e.target.value)} onFocus={onFocus} type="date" required />
                        </div>

                        <div>
                            <label htmlFor="book-time">Choose Time:</label>
                            <select id="book-time" value={times} onChange={(e) => SetTimes(e.target.value)}>
                                <option value="">Select a Time</option>
                                {
                                    props.availableTimes.availableTimes.map(availableTimes => { return <option key={availableTimes}>{availableTimes}</option> })
                                }

                            </select>
                        </div>

                        <div>
                            <label htmlFor="book-guests">Nimber of Guests:</label>
                            <input id="book-guests" value={guests} min="1" onChange={(e) => setGuest(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="book-occasion">Occasion:</label>
                            <select id="book-occasion" key={occasion} value={occasion} min="1" onChange={(e) => setOccasion(e.target.value)} >
                                <option>Birthday</option>
                                <option>Anniversary</option>
                                <option>Engagement</option>
                            </select>
                        </div>
                        <div className="btnReceive">
                                <input aria-label="On Click" type="submit" value={"Make Your Reservation"}/>
                        </div>

                    </fieldset>
                </form>
            </section>

        </header>
    );
};

export default BookingForm;