
import React from "react";
import { ListGroup, Row, Col } from "react-bootstrap";

import CardItem from './CardItem';

const CardsList = (props) => {
  const items = props.items;

  const chunkSize = Math.ceil(items.length / 3); // divide the items into 3 equal parts
  const chunks = Array.from({ length: 3 }, (_, i) =>
    items.slice(i * chunkSize, (i + 1) * chunkSize)
  ); // create 3 chunks of items

  return (
    <ListGroup>
      <Row>
      {chunks.map((chunk, i) => (
        <Col key={i}>
          {chunk.map((card) => (
            <div key={card.id}>
              <ListGroup.Item >
                <CardItem
                  key={card.id}
                  name={card.name}
                  set={card.set}
                  image={card.image}
                  id={card.id}
                />
              </ListGroup.Item>
            </div>
          ))}
        </Col>
      ))}
      </Row>
    </ListGroup>
  );
};

export default CardsList;
