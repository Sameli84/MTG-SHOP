import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

import CardItem from "./CardItem";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const TEST_CARD_DATA = {
  id: 59,
  name: "Shivan Dragon",
  set: "Core Set 2020",
  condition: "LP",
  price: "5",
  image:
    "https://cards.scryfall.io/normal/front/2/2/227cf1b5-f85b-41fe-be98-66e383652039.jpg?1592518393",
  owner: "d599a616-39fa-443c-a085-e73b399e233b",
  created: "2023-04-25T06:33:20.000Z",
  updated: "2023-04-25T07:32:59.000Z",
};

describe("CardItem test", () => {
  test("Should show a card when provided with proper data", () => {
    render(
      <CardItem
        key={TEST_CARD_DATA.id}
        name={TEST_CARD_DATA.name}
        set={TEST_CARD_DATA.set}
        condition={TEST_CARD_DATA.condition}
        price={TEST_CARD_DATA.price}
        owner={TEST_CARD_DATA.owner}
        image={TEST_CARD_DATA.image}
        id={TEST_CARD_DATA.id}
      />,
      { wrapper }
    );
    expect(screen.getByText("Shivan Dragon")).toBeInTheDocument();
    expect(screen.getByText("Core Set 2020")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByAltText("Shivan Dragon")).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', TEST_CARD_DATA.image);
    expect(screen.getByRole('button')).toHaveAccessibleName("Contact Seller");
  });
});
