import React, { useContext, useState, useEffect } from "react";
import WindowedSelect from "react-windowed-select";
import { AuthContext } from "../../shared/context/auth-context";
import { useMutation } from "react-query";
import { Button, Modal, Form } from "react-bootstrap";
import { deleteCard, updateCard } from "../api/cards";

const CardItem = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const showModal = () => setShow(true);
  const [deleted, setDeleted] = useState(false);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const showUpdateModal = () => setShowUpdate(true);

  const deleteCardMutation = useMutation({
    mutationFn: deleteCard,
    onSuccess: (data) => {
      console.log(data);
      setDeleted(true)
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = () => {
    deleteCardMutation.mutate({
      id: props.id,
      token: auth.token,
    });
    setShow(false);
  };

  const updateCardMutation = useMutation({
    mutationFn: updateCard,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdate = () => {
    updateCardMutation.mutate({
      condition: cardCondition,
      price: cardPrice,
      id: props.id,
      token: auth.token,
    });
    setShowUpdate(false);
  };

  const handleConditionChange = (selectedOption) => {
    setCardCondition(selectedOption.value);
  };

  const auth = useContext(AuthContext);

  const conditionOptions = [
    { value: "NM", label: "NM" },
    { value: "LP", label: "LP" },
    { value: "MP", label: "MP" },
    { value: "HP", label: "HP" },
    { value: "D", label: "D" },
  ];

  const [cardCondition, setCardCondition] = useState(props.condition);
  const [cardPrice, setCardPrice] = useState(props.price);

  const handlePriceChange = (event) => {
    let value = event.target.value.replace(/[^\d.]|\.(?=.*\.)/g, ""); // remove non-digit characters
    if (value.length > 6) {
      value = value.substr(0, 6);
    }
    if (value.startsWith("0")) {
      value = value.replace(/^0+/, "");
    }
    value = value.replace(/(\.\d{0,2})\d*/, "$1");
    setCardPrice(value);
  };
  if (deleted) {
    return null
  }

  return (
    <>
      <div>
        <div>
          <img src={props.image} alt={props.name} />
        </div>
        <div>
          <h5>{props.name}</h5>
          <h5>{props.set}</h5>
          <h5>
            {cardCondition} - {cardPrice} €
          </h5>
        </div>
        <div>
          {auth.isLoggedIn && auth.userId === props.owner ? (
            <div>
              <Button variant="outline-dark" onClick={showUpdateModal}>
                Edit
              </Button>
              <Button
                onClick={showModal}
                style={{ marginLeft: 8 }}
                variant="outline-danger"
              >
                Delete
              </Button>
            </div>
          ) : (
            <div>
              <Button variant="outline-success">Contact Seller</Button>
            </div>
          )}
        </div>
      </div>

      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update {props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={props.image} alt={props.name} />
          <Form.Group controlId="condition">
            <Form.Label>Card Condition</Form.Label>
            <WindowedSelect
              aria-label="Select card condition"
              options={conditionOptions}
              value={cardCondition}
              onChange={handleConditionChange}
              styles={styles}
              placeholder={cardCondition}
            ></WindowedSelect>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={cardPrice}
              onChange={handlePriceChange}
              placeholder="Enter card price in euros"
              style={{ width: 400 }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleCloseUpdate}>
            Cancel
          </Button>
          <Button variant="outline-danger" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>You're about to delete {props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={props.image} alt={props.name} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
const styles = {
  control: (provided, state) => ({
    ...provided,
    width: 400, // set the width of the select
    backgroundColor: state.isSelected ? "#007bff" : "transparent",
    color: state.isSelected ? "white" : "black",
    ":hover": {
      backgroundColor: "unset !important", // remove the hover color
    },
  }),
};
export default CardItem;
