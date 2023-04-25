import React from "react";
import WindowedSelect from "react-windowed-select";
import { createFilter } from "react-windowed-select";
import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { createCard } from "../api/cards";
import { AuthContext } from "../../shared/context/auth-context";
import { sets } from "../components/sets";
import { cards } from "../components/cards";
import { conditions } from "../components/conditions";

const AddCard = () => {
  const setOptions = sets;
  const cardOptions = cards;
  const conditionOptions = conditions;

  const auth = useContext(AuthContext);

  const createCardMutation = useMutation({
    mutationFn: createCard,
    onSuccess: (data) => {
      // Will execute only once, for the last mutation,
      // regardless which mutation resolves first
      console.log(data);
    },
    onError: (error) => {
      // An error happened!
      console.log(error);
    },
  });

  const cardSubmitHandler = (event) => {
    event.preventDefault();
    console.log(selectedCardOption.value);
    createCardMutation.mutate({
      name: selectedCardOption.label,
      set: selectedSetOption.value,
      condition: cardCondition.value,
      price: cardPrice,
      owner: auth.userId,
      token: auth.token,
    });
  };

  const [selectedSetOption, setSelectedSetOption] = useState(setOptions[0]);
  const [selectedCardOption, setSelectedCardOption] = useState(null);
  const [cardCondition, setCardCondition] = useState(conditionOptions[0]);

  const [cardPrice, setCardPrice] = useState("0");

  const handlePriceChange = (event) => {
    let value = event.target.value.replace(/[^\d.]|\.(?=.*\.)/g, ""); // remove non-digit characters
    if (value.length > 6) {
      value = value.substr(0, 6);
    }
    setCardPrice(value);
  };

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const labelFilter = (option, searchText) => {
    const query = removeAccents(searchText.toLowerCase());
    if (query.length < 3) return;
    const label = removeAccents(option.label.toLowerCase());
    return label.includes(query);
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <h2>Choose a card to add!</h2>
      <h6>
        If set is not selected, or the card doesn't appear in the chosen set,
      </h6>
      <h6>the most recent set for the card will be chosen.</h6>
      <Form onSubmit={cardSubmitHandler}>
        <Form.Group controlId="card">
          <Form.Label>Card Name</Form.Label>
          <WindowedSelect
            aria-label="Select card name"
            options={cardOptions}
            value={selectedCardOption}
            onChange={setSelectedCardOption}
            isSearchable={true}
            itemSize={30}
            filterOption={labelFilter}
            placeholder="Type three letters to show cards!"
          ></WindowedSelect>
        </Form.Group>

        <Form.Group controlId="set">
          <Form.Label>Card Set</Form.Label>
          <WindowedSelect
            aria-label="Select card set"
            options={setOptions}
            value={selectedSetOption}
            onChange={setSelectedSetOption}
            isSearchable={true}
            filterOption={createFilter({ ignoreAccents: false })}
          ></WindowedSelect>
        </Form.Group>

        <Form.Group controlId="condition">
          <Form.Label>Card Condition</Form.Label>
          <WindowedSelect
            aria-label="Select card condition"
            options={conditionOptions}
            value={cardCondition}
            onChange={setCardCondition}
            placeholder="Near Mint"
            isSearchable={false}
          ></WindowedSelect>
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            value={cardPrice}
            onChange={handlePriceChange}
            placeholder="Enter card price in euros"
            style={{ width: 462 }}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!selectedCardOption}>
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
