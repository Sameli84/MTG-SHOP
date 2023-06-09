import React, { useContext } from "react";
import { useQuery } from "react-query";
import Spinner from "react-bootstrap/Spinner";
import CardsList from "../components/CardsList";
import { AuthContext } from "../../shared/context/auth-context";

const MyCards = (props) => {
  const auth = useContext(AuthContext);

  const { isLoading, error, data } = useQuery("cardsData", () =>
    fetch("http://localhost:5000/api/cards").then((res) => res.json())
  );

  const filterByOwner = (items, ownerValue) => {
    return items.filter((item) => item.owner === ownerValue);
  };
  
  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  if (error) return "An error has occurred: " + error.message;
  
  if (props.user === "user") {
    const filteredItems = filterByOwner(data, auth.userId);
    return <CardsList items={filteredItems} />;
  }
  return <></>;
};
export default MyCards;