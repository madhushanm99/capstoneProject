import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertion messages
import BookingForm from './components/BookingForm';

// Mock the submitForm and dispatch functions
const mockSubmitForm = jest.fn();
const mockDispatch = jest.fn();

const renderComponent = () =>
  render(
    <BookingForm
      submitForm={mockSubmitForm}
      dispatch={mockDispatch}
      availableTimes={{ availableTimes: ['10:00 AM', '12:00 PM'] }}
    />
  );

describe('BookingForm', () => {
  it('renders the form with all input fields', () => {
    const { getByLabelText, getByText } = renderComponent();

    expect(getByLabelText('First Name:')).toBeInTheDocument();
    expect(getByLabelText('Last Name:')).toBeInTheDocument();
    expect(getByLabelText('Choose Date:')).toBeInTheDocument();
    expect(getByLabelText('Choose Time:')).toBeInTheDocument();
    expect(getByLabelText('Number of Guests:')).toBeInTheDocument();
    expect(getByLabelText('Occasion:')).toBeInTheDocument();

    expect(getByText('Make Your Reservation')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const { getByLabelText, getByText } = renderComponent();

    fireEvent.change(getByLabelText('First Name:'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name:'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Choose Date:'), { target: { value: '2023-12-15' } });
    fireEvent.change(getByLabelText('Choose Time:'), { target: { value: '10:00 AM' } });
    fireEvent.change(getByLabelText('Number of Guests:'), { target: { value: '4' } });
    fireEvent.change(getByLabelText('Occasion:'), { target: { value: 'Birthday' } });

    fireEvent.submit(getByText('Make Your Reservation'));

    // Wait for the form submission
    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalledWith({
        occasion: 'Birthday',
        guests: '4',
        date: '2023-12-15',
        times: '10:00 AM',
        firstName: 'John',
        lastName: 'Doe',
      });
    });
  });

  it('displays error messages for invalid form data', async () => {
    const { getByText } = renderComponent();

    fireEvent.submit(getByText('Make Your Reservation'));

    // Wait for the validation to trigger
    await waitFor(() => {
      expect(getByText('Please enter your first name.')).toBeInTheDocument();
      expect(getByText('Please enter your last name.')).toBeInTheDocument();
      expect(getByText('Please choose a date.')).toBeInTheDocument();
      expect(getByText('Please choose a time.')).toBeInTheDocument();
      expect(getByText('Please enter the number of guests.')).toBeInTheDocument();
      expect(getByText('Please choose an occasion.')).toBeInTheDocument();
    });

    // Ensure that the form submission function was not called
    expect(mockSubmitForm).not.toHaveBeenCalled();
  });
});
