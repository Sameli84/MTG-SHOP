import React from "react";
import { useQuery } from "react-query";
import CardsList from "../components/CardsList";

const Cards = () => {
  const { isLoading, error, data } = useQuery("cardsData", () =>
    fetch("http://localhost:5000/api/cards").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return <CardsList items={data} />;
};
export default Cards;
