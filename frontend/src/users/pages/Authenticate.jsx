import React, { useRef, useState } from "react";
import { useMutation } from "react-query";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { signUpUser, loginUser } from "../api/users";

const Authenticate = (props) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoginMode, setLoginMode] = useState(true);
  const [validated, setValidated] = useState(false);
  const [isError, setError] = useState(false);

  const switchModeHanlder = () => {
    setLoginMode((prevMode) => !prevMode);
  };

  const signUpUserMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      // Will execute only once, for the last mutation,
      // regardless which mutation resolves first
      if (typeof data === "string") {
        setError(data);
      } else {
        setError(false);
      }
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
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

  const onSubmitHandler = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (form.checkValidity() === true) {
      if (isLoginMode) {
        loginUserMutation.mutate({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
      } else {
        signUpUserMutation.mutate({
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
      }
    }
  };

  return (
    <div className="m-5">
      <Card style={{ width: "24rem" }}>
        <Card.Header>{isLoginMode ? "Login" : "Sign Up"}</Card.Header>
        <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
          {!isLoginMode && (
            <Form.Group className="mb-2">
              <Form.Label className="m-1">Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter username"
                ref={nameRef}
              />
              <Form.Control.Feedback className="m-1" type="invalid">
                Please provide a username.
              </Form.Control.Feedback>
            </Form.Group>
          )}
          <Form.Group className="mb-2">
            <Form.Label className="m-1">Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              ref={emailRef}
            />
            <Form.Control.Feedback className="m-1" type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label className="m-1">Password</Form.Label>
            <Form.Control
              required
              minLength="8"
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
            <Form.Control.Feedback className="m-1" type="invalid">
              Please provide a password of at least 8 characters.
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            className="m-1"
            variant="primary"
            type="submit"
            disable={signUpUserMutation.isLoading.toString()}
          >
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
          <Button variant="outline-primary" onClick={switchModeHanlder}>
            {isLoginMode ? "SignUp" : "Login"} instead?
          </Button>
        </Form>
        {isError && <div className="text-danger m-1">{isError}</div>}
      </Card>
    </div>
  );
};

export default Authenticate;
