import { render, screen } from "@testing-library/react";
import { mocked } from 'jest-mock';

import Posts, { getStaticProps } from '../../pages/posts';
import { createClient } from "../../services/prismic";

const posts = [
  { 
    slug: 'post-1', 
    title: 'new post', 
    excerpt: 'this is the excerpt for this new post', 
    updatedAt: '2022-05-16'
  },
]

jest.mock('../../services/prismic');

describe("Posts page unit test", () => {
  it('should render the page', () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("new post")).toBeInTheDocument();
    expect(screen.getByText("this is the excerpt for this new post")).toBeInTheDocument();
  });

  it("should load initial data", async () => {
    const prismicMocked = mocked(createClient);

    prismicMocked.mockReturnValueOnce({
      getAllByType: jest.fn().mockResolvedValueOnce([
        {
          uid: 'post-1',
          data: {
            title: 'new post',
            content: [
              {
                type: 'paragraph',
                text: 'this is the excerpt for this new post',
              },
            ],
          },
          last_publication_date: '2022-05-16',
        }
      ])
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'post-1',
              title: 'new post',
              excerpt: 'this is the excerpt for this new post',
              updated_at: '16 de maio de 2022'
            },
          ],
        },
      })
    );
  });
});