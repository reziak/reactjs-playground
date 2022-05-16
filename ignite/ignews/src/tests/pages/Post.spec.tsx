import { render, screen } from "@testing-library/react";
import { getSession } from "next-auth/react"
import { mocked } from 'jest-mock';
import { createClient } from "../../services/prismic";

import Post, { getServerSideProps } from '../../pages/posts/[slug]';

const post = { 
  slug: 'post-1',
  title: 'new post',
  content: '<p>this is the excerpt for this new post</p>',
  updatedAt: '2022-05-16',
}

jest.mock('next-auth/react');
jest.mock('../../services/prismic');

describe("Post page unit test", () => {
  it('should render the page', () => {
    render(<Post post={post} />);

    expect(screen.getByText("new post")).toBeInTheDocument();
    expect(screen.getByText("this is the excerpt for this new post")).toBeInTheDocument();
  });

  it("should redirect user if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: 'new-post',
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: '/',
          permanent: false,
        },
      })
    );
  });

  it("should load initial data", async () => {
    const getSessionMocked = mocked(getSession);
    const prismicMocked = mocked(createClient);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subs'
    } as any);

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

    const response = await getServerSideProps({
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