import React from "react";
const CardItem = props => {
  return <li>
     <div>
      <img src={props.image} alt={props.name} />
    </div>
    <div>
      <h3>{props.name} - {props.set}</h3>
    </div>
    <div>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  </li>
};
export default CardItem;