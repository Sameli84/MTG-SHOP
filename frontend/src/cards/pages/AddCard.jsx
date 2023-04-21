import React from "react";
import Select from "react-select";
import { useRef, useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { createCard } from "../../users/api/cards";
import { AuthContext } from "../../shared/context/auth-context";
import { sets } from "./sets";

const AddCard = () => {
  const options = sets;
  const nameRef = useRef();

  const auth = useContext(AuthContext);

  const createCardMutation = useMutation({
    mutationFn: createCard,
  });

  const cardSubmitHandler = (event) => {
    console.log(selectedOption.value)
    event.preventDefault();
    createCardMutation.mutate({
      name: nameRef.current.value,
      set: selectedOption.value,
      token: auth.token,
    });
  };

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div style={{ marginLeft: 10 }}>
      <Form onSubmit={cardSubmitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Card Name</Form.Label>
          <Form.Control
            type="text"
            ref={nameRef}
            placeholder="Enter card name"
          />
        </Form.Group>

        <Form.Group controlId="set">
          <Form.Label>Card Set</Form.Label>
          <Select
            aria-label="Select card set"
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
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
