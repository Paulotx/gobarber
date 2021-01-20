import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToasty = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            push: mockedHistoryPush,
        }),
        Link: ({ children }: { children: React.ReactNode }) => children,
    };
});

jest.mock('../../hooks/auth', () => {
    return {
        useAuth: () => ({
            signIn: mockedSignIn,
        }),
    };
});

jest.mock('../../hooks/toast', () => {
    return {
        useToast: () => ({
            addToast: mockedAddToasty,
        }),
    };
});

describe('SignIn Page', () => {
    beforeEach(() => {
        mockedHistoryPush.mockClear();
    });

    it('should be able to sign in', async () => {
        const { getByPlaceholderText, getByText } = render(<SignIn />);

        const emailField = getByPlaceholderText('Email');
        const passwordField = getByPlaceholderText('Senha');
        const buttonElement = getByText('Entrar');

        fireEvent.change(emailField, {
            target: { value: 'johndo@example.com' },
        });

        fireEvent.change(passwordField, {
            target: { value: '123456' },
        });

        fireEvent.click(buttonElement);

        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
        });
    });

    it('should not be able to sign in with invalid credentials', async () => {
        const { getByPlaceholderText, getByText } = render(<SignIn />);

        const emailField = getByPlaceholderText('Email');
        const passwordField = getByPlaceholderText('Senha');
        const buttonElement = getByText('Entrar');

        fireEvent.change(emailField, {
            target: { value: 'not-valid-email' },
        });

        fireEvent.change(passwordField, {
            target: { value: '123456' },
        });

        fireEvent.click(buttonElement);

        await waitFor(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalled();
        });
    });

    it('should display an error if login fails', async () => {
        mockedSignIn.mockImplementation(() => {
            throw new Error();
        });

        const { getByPlaceholderText, getByText } = render(<SignIn />);

        const emailField = getByPlaceholderText('Email');
        const passwordField = getByPlaceholderText('Senha');
        const buttonElement = getByText('Entrar');

        fireEvent.change(emailField, {
            target: { value: 'johndo@example.com' },
        });

        fireEvent.change(passwordField, {
            target: { value: '123456' },
        });

        fireEvent.click(buttonElement);

        await waitFor(() => {
            expect(mockedAddToasty).toHaveBeenCalledWith(
                expect.objectContaining({ type: 'error' }),
            );
        });
    });
});
