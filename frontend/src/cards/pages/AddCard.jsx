import React from "react";
import Select from "react-select";
import { useRef, useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { createCard } from "../api/cards";
import { AuthContext } from "../../shared/context/auth-context";
import { sets } from "../components/sets";
import { cards } from "../components/cards";

const AddCard = () => {
  const setOptions = sets;
  const cardOptions = cards;

  const auth = useContext(AuthContext);

  const createCardMutation = useMutation({
    mutationFn: createCard,
  });

  const cardSubmitHandler = (event) => {
    event.preventDefault();
    console.log(selectedCardOption.value);
    createCardMutation.mutate({
      name: selectedCardOption.value,
      set: selectedSetOption.value,
      token: auth.token,
    });
  };

  const [selectedSetOption, setSelectedSetOption] = useState(null);
  const [selectedCardOption, setSelectedCardOption] = useState(null);

  return (
    <div style={{ marginLeft: 10 }}>
      <Form onSubmit={cardSubmitHandler}>
      <Form.Group controlId="set">
          <Form.Label>Card Name</Form.Label>
          <Select
            aria-label="Select card name"
            options={cardOptions}
            value={selectedCardOption}
            onChange={setSelectedCardOption}
            isSearchable={true}
          ></Select>
        </Form.Group>

        <Form.Group controlId="set">
          <Form.Label>Card Set</Form.Label>
          <Select
            aria-label="Select card set"
            options={setOptions}
            value={selectedSetOption}
            onChange={setSelectedSetOption}
            isSearchable={true}
          ></Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {createCardMutation.isSuccess && <p>Card added successfully!</p>}

      {createCardMutation.isError && (
        <p>Error adding card: {createCardMutation.error.message}</p>
      )}
    </div>
  );
};
export default AddCard;
