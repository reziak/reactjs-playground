import { render, screen } from "@testing-library/react";
import { mocked } from 'jest-mock';

import { stripe } from "../../services/stripe";
import Home, { getStaticProps } from '../../pages';

jest.mock('next/router');
jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return { data: null, status: "unauthenticated" };
    }
  }
});
jest.mock('../../services/stripe');

describe("Home page unit test", () => {
  it('should render the page', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: 'R$10,00'}} />);

    expect(screen.getByText(/R\$10,00/i)).toBeInTheDocument();
  });

  it("should load initial data", async () => {
    const stripeRetrivePricedMocked = mocked(stripe.prices.retrieve);

    stripeRetrivePricedMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toStrictEqual({
      props: {
        product: {
          priceId: 'fake-price-id',
          amount: '$10.00',
        },
      },
      revalidate: 86400,
    })
  });
});