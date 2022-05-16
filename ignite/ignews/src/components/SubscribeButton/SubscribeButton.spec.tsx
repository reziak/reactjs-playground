import { render, screen, fireEvent } from "@testing-library/react";
import { signIn, useSession } from "next-auth/react";
import { mocked } from "jest-mock";
import { useRouter } from "next/router";
import { SubscribeButton } from ".";

jest.mock('next-auth/react');

jest.mock('next/router');

describe("SubscribeButton Unit test", () => {
  let useSessionMocked;

  beforeEach(() => {
    useSessionMocked = mocked(useSession);
  });

  it("should render correctly", () => {
    useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' });

    render(<SubscribeButton />);

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });
  
  it("should redirect user to sigin when not authenticated", () => {
    useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' });

    const signInMocked = mocked(signIn);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');
    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled();
  });
  
  it("should redirect user to posts when user has subscription", () => {
    const useRouterMocked = mocked(useRouter);
    
    const pushMock = jest.fn();
    
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "john.doe@email.com",
        },
        activeSubscription: 'fake-data',
        expires: 'fake-data',
      },
      status: "authenticated"
    })

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);
    
    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');
    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith('/posts');
  });
});