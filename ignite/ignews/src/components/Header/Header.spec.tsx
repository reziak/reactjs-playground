import { render, screen } from '@testing-library/react';
import { Header } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      };
    }
  }
});

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null,  false];
    }
  }
});

describe('Header Unit Test', () => {
  it("should render Header correctly", () => {
    render(
      <Header />
    )

    expect(screen.getByText('Home')).toHaveClass('active');
    expect(screen.getByText('Posts')).toBeInTheDocument();
  });
});
