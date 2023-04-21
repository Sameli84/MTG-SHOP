import React from "react";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { resetPass } from "../api/users";
import { useMutation } from "react-query";
import { Form, Button } from 'react-bootstrap';

import { RecoveryContext } from "../../App";

export default function Reset() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [passwordIsLong, setPasswordIsLong] = useState(false);

  const handleChangePassword1 = (event) => {
    setPassword1(event.target.value);
    setPasswordIsLong(event.target.value.length > 7);
    setPasswordsMatch(event.target.value === password2);
  };

  const handleChangePassword2 = (event) => {
    setPassword2(event.target.value);
    setPasswordsMatch(event.target.value === password1);
  };

  const resetMutation = useMutation({
    mutationFn: resetPass,
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

  const history = useHistory();
  const { email, otp } = useContext(RecoveryContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(otp);    
    if (email && passwordsMatch) {
      try {
        resetMutation.mutate({
          email: email,
          otp: otp,
          password: password1,
        });
      } catch (error) {
        return alert(error);
      }
      history.push("/auth");
    }
  }

  return (
    <div>
      <section className="bg-gray-50 w-screen dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password for {email}
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="password1">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password1}
                  onChange={handleChangePassword1}
                  placeholder="Enter password"
                  required
                />
              </Form.Group>
              <Form.Group controlId="password2">
                <Form.Label>Confirm password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password2}
                  onChange={handleChangePassword2}
                  placeholder="Confirm password"
                  required
                />
              </Form.Group>
              <Button type="submit" disabled={!passwordsMatch || !passwordIsLong}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}
