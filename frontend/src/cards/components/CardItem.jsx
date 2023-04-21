import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useMutation } from "react-query";
import { Button, Modal } from "react-bootstrap";
import { deleteCard } from "../api/cards";
const CardItem = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const showModal = () => setShow(true);

  const deleteCardMutation = useMutation({
    mutationFn: deleteCard, 
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleDelete = () => {
    deleteCardMutation.mutate({
      id: props.id,
      token: auth.token
    })
    setShow(false);
  }

  const auth = useContext(AuthContext);
  return (
    <>
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
          {auth.isLoggedIn && (
            <div>
              <Button variant="outline-dark">Edit</Button>
              <Button
                onClick={showModal}
                style={{ marginLeft: 8 }}
                variant="outline-danger"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>You're about to delete {props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body><img src={props.image} alt={props.name}/></Modal.Body>
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
export default CardItem;
