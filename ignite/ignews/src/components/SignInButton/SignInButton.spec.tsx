import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { mocked } from 'jest-mock';
import { SignInButton } from '.';

jest.mock('next-auth/react');

describe('SignInButton Unit Test', () => {
  let useSessionMocked;

  beforeEach(() => {
    useSessionMocked = mocked(useSession);
  });
  
  it("should show message when user is not authenticated", () => {
    useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated'});

    render(<SignInButton />)

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  });
  
  it("should show user name when user is authenticated", () => {
    useSessionMocked.mockReturnValueOnce({ 
      data: {
        user: {
          name: "Bruno Lira"
        },
        expires: 'fake-data',
      }, 
      status: 'authenticated'
    });

    render(<SignInButton />)

    expect(screen.getByText('Bruno Lira')).toBeInTheDocument();
  });
});
