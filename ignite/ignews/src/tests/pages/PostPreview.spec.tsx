import { render, screen } from "@testing-library/react";
import { useSession, getSession } from "next-auth/react"
import { mocked } from 'jest-mock';
import { createClient } from "../../services/prismic";

import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { useRouter } from "next/router";

const post = { 
  slug: 'post-1',
  title: 'new post',
  content: '<p>this is the excerpt for this new post</p>',
  updatedAt: '2022-05-16',
}

jest.mock('next-auth/react');
jest.mock('next/router');
jest.mock('../../services/prismic');

describe("Post page unit test", () => {
  it('should render the page', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    });

    render(<PostPreview post={post} />);

    expect(screen.getByText("new post")).toBeInTheDocument();
    expect(screen.getByText("this is the excerpt for this new post")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("should redirect user to full post if authenticated", async () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: { activeSubscription: 'fake-subs'},
      status: 'unauthenticated',
    } as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<PostPreview post={post} />);

    expect(pushMock).toHaveBeenCalledWith('/posts/post-1');
  });

  it("should load initial data", async () => {
    const prismicMocked = mocked(createClient);

    prismicMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        uid: 'my-new-post',
        data: {
          title: "my new post",
          content: [
            {
              type: 'paragraph',
              text: 'this is the excerpt for this new post',
            },
          ],
        },
        last_publication_date: '2022-05-16',
      })
    } as any);

    const response = await getStaticProps({
      params: {
        slug: 'my-new-post',
      },
    } as any);
        
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'my new post',
            content: '<p>this is the excerpt for this new post</p>',
            updated_at: '16 de maio de 2022',
          }
        }
      })
    );
  });
});