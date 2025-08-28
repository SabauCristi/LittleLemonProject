import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReservationCard from '../Sections/ReservationCard'; 

jest.mock("../Styles/ReservationCard.scss", () => ({}));

describe('ReservationCard Component', () => {
  let alertSpy: jest.SpyInstance;
  beforeEach(() => {
    alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    alertSpy.mockRestore();
  });

  test('renders the reservation form correctly', () => {
    render(<ReservationCard />);

    expect(screen.getByRole('heading', { name: /reserve a table/i })).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/number of persons/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /reserve/i })).toBeInTheDocument();
  });

  test('shows validation errors for all fields when form is submitted empty', async () => {
    const user = userEvent.setup();
    render(<ReservationCard />);

    const submitButton = screen.getByRole('button', { name: /reserve/i });
    await user.click(submitButton);

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid number of persons')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid phone number')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument();

    expect(alertSpy).not.toHaveBeenCalled();
  });

  test('shows validation error for invalid email format', async () => {
    const user = userEvent.setup();
    render(<ReservationCard />);

    const emailInput = screen.getByPlaceholderText(/email address/i);
    await user.type(emailInput, 'invalid-email');

    const submitButton = screen.getByRole('button', { name: /reserve/i });
    await user.click(submitButton);

    expect(await screen.findByText('Enter a valid email')).toBeInTheDocument();
    expect(alertSpy).not.toHaveBeenCalled();
  });

  test('clears error message on input change', async () => {
    const user = userEvent.setup();
    render(<ReservationCard />);

    // First, trigger the validation by submitting
    const submitButton = screen.getByRole('button', { name: /reserve/i });
    await user.click(submitButton);

    // Verify the error message is present
    let nameError = await screen.findByText('Name is required');
    expect(nameError).toBeInTheDocument();

    // Start typing in the name field
    const nameInput = screen.getByPlaceholderText(/your name/i);
    await user.type(nameInput, 'John Doe');

    // The error message should disappear
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
  });

  test('submits the form and resets fields when all data is valid', async () => {
    const user = userEvent.setup();
    render(<ReservationCard />);

    // Get all the inputs
    const nameInput = screen.getByPlaceholderText(/your name/i);
    const personsInput = screen.getByPlaceholderText(/number of persons/i);
    const phoneInput = screen.getByPlaceholderText(/phone number/i);
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const submitButton = screen.getByRole('button', { name: /reserve/i });

    // Fill the form with valid data
    await user.type(nameInput, 'Jane Doe');
    await user.type(personsInput, '4');
    await user.type(phoneInput, '1234567890');
    await user.type(emailInput, 'jane.doe@example.com');

    // Submit the form
    await user.click(submitButton);

    // Check that the alert was called with the success message
    expect(alertSpy).toHaveBeenCalledWith('Reservation submitted!');

    expect(nameInput).toHaveValue('');
    expect(personsInput).toHaveValue(null);
    expect(phoneInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
  });
});
