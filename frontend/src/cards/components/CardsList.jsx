import React from "react";
import CardItem from './CardItem';
const CardsList = props => {
  return <ul>
    {props.items.map(card => 
      <CardItem 
        key={card.id}
        name={card.name}
        set={card.set}
        image={card.image}
      />
    )}
    </ul>
};
export default CardsList;