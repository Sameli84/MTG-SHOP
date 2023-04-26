import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import WindowedSelect from "react-windowed-select";

import CardItem from "./CardItem";

const CardsList = (props) => {
  const [cards, setCards] = useState(props.items);

  const conditions = [
    { value: "Any Condition", label: "Any Condition" },
    { value: "NM", label: "NM" },
    { value: "LP", label: "LP" },
    { value: "MP", label: "MP" },
    { value: "HP", label: "HP" },
    { value: "D", label: "D" },
  ];

  const [searchString, setSearchString] = useState("");
  const [cardCondition, setCardCondition] = useState(conditions[0]);

  const handleSearchChange = (event) => {
    const newSearchString = event.target.value;
    setSearchString(newSearchString);
    const filteredCards = filterCards(
      props.items,
      newSearchString,
      cardCondition.value
    );
    setCards(filteredCards);
  };

  const handleConditionChange = (selectedOption) => {
    if (selectedOption.value === "Any Condition") {
      setCardCondition(selectedOption);
      setCards(props.items);
      const filteredCards = filterCards(
        props.items,
        searchString,
        selectedOption.value
      );
      setCards(filteredCards);
      return;
    } else {
      setCardCondition(selectedOption);
      const filteredCards = filterCards(
        props.items,
        searchString,
        selectedOption.value
      );
      setCards(filteredCards);
    }
  };

  const filterCards = (cards, searchString, searchCondition) => {
    return cards.filter(
      (card) =>
        card.name.toLowerCase().includes(searchString.toLowerCase()) &&
        (searchCondition === "Any Condition" ||
          card.condition.toLowerCase().includes(searchCondition.toLowerCase()))
    );
  };

  if (cards === undefined || cards.length == 0) {
    return (<h3>No cards to show.</h3>)
  }

  return (
    <div>
      <Row
        className="justify-content-between"
        style={{
          position: "fixed",
          top: 60,
          zIndex: 1,
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <Col>
          <Form.Group controlId="search" className="mx-3">
            <Form.Control
              type="text"
              value={searchString}
              onChange={handleSearchChange}
              placeholder="Filter listings by name"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="searchCondition">
            <WindowedSelect
              aria-label="Select card condition"
              options={conditions}
              value={cardCondition}
              onChange={handleConditionChange}
              placeholder="Filter listings by condition"
              isSearchable={false}
            ></WindowedSelect>
          </Form.Group>
        </Col>
      </Row>
      <div
        style={{
          marginTop: "30px",
          width: "100%",
          overflowY: "auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "space-between",
          maxWidth: "1220px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              paddingTop: "8px",
            }}
          >
            <CardItem
              key={card.id}
              name={card.name}
              set={card.set}
              condition={card.condition}
              price={card.price}
              owner={card.owner}
              image={card.image}
              id={card.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsList;
