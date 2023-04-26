import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

import CardsList from "./CardsList";

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

const TEST_CARDS_DATA = [
  {
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
  },
  {
    id: 60,
    name: "Battle Cry Goblin",
    set: "Adventures in the Forgotten Realms",
    condition: "NM",
    price: "",
    image:
      "https://cards.scryfall.io/normal/front/9/7/9766a427-2bb3-4028-a502-d1194cdc93aa.jpg?1627705831",
    owner: "d599a616-39fa-443c-a085-e73b399e233b",
    created: "2023-04-25T06:34:22.000Z",
    updated: "2023-04-25T06:34:22.000Z",
  },
];

describe("The CardsList", () => {
  test('Should show "No cards to show." when there are no cards.', () => {
    render(<CardsList items={[]} />);
    expect(screen.getByText("No cards to show.")).toBeInTheDocument();
  });
});

test("Should show a list of cards.", () => {
  render(<CardsList items={TEST_CARDS_DATA} />,{ wrapper });
  expect(screen.queryByText("No cards to show.")).toBeNull();
  expect(screen.getByText('Shivan Dragon')).toBeInTheDocument();
  expect(screen.getByText('Core Set 2020')).toBeInTheDocument();
  expect(screen.getByText('Battle Cry Goblin')).toBeInTheDocument();
  expect(screen.getByText('Adventures in the Forgotten Realms')).toBeInTheDocument();
});

test("Should have search bar for name and condition", () => {
    render(<CardsList items={TEST_CARDS_DATA} />,{ wrapper });
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
