import React from "react";
const CardItem = (props) => {
  return (
    <div>
      <div>
        <img src={props.image} alt={props.name} />
      </div>
      <div>
        <h5>
          {props.name} - {props.set}
        </h5>
      </div>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};
export default CardItem;
