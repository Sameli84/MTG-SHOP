import React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { RecoveryContext } from "../../App";
import { useMutation } from "react-query";
import { otpFunction } from "../api/users";

const Otp = (props) => {
  const history = useHistory();

  const { email, setOTP } = useContext(RecoveryContext);
  const [timerCount, setTimer] = React.useState(60);
  const [code, setCode] = useState('');
  const [disable, setDisable] = useState(true);

  const otpMutation = useMutation({
    mutationFn: otpFunction,
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

  function resendOTP() {
    if (disable) return;
    otpMutation
      .mutate({
        email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  const handleChange = (event) => {
    // Only allow up to 4 digits
    const inputCode = event.target.value.slice(0, 4);
    setCode(inputCode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email);
    setOTP(code);
    console.log(`Code submitted: ${code}`);
    history.push("/reset");
    return;
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="fourDigitCode">
                <Form.Label>Enter a 4-digit code:</Form.Label>
                <Form.Control
                  type="number"
                  value={code}
                  onChange={handleChange}
                  placeholder="1234"
                  maxLength={4}
                  required
                />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
              <p>Didn't recieve code?</p>{" "}
              <a
                className="flex flex-row items-center"
                style={{
                  color: disable ? "gray" : "blue",
                  cursor: disable ? "none" : "pointer",
                  textDecorationLine: disable ? "none" : "underline",
                }}
                onClick={() => resendOTP()}
              >
                {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
