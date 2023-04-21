const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");

const users = require("../models/users");

const createOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log(otp);
  let hashedOtp;
  try {
    hashedOtp = await bcrypt.hash(otp.toString(), 12);
  } catch (err) {
    return res.status(500).send("Error, try again please");
  }

  const userOtp = {
    id: v4(),
    email,
    otp: hashedOtp,
  };

  try {
    const result = await users.createOtp(userOtp);
    if (!result) {
      return res.status(500).send("Could not create user, try again please");
    }
  } catch (err) {
    return res.status(500).send("Could not create user, try again please");
  }
};

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).send("Could not create user, try again please");
  }

  const newUser = {
    id: v4(),
    name,
    email,
    password: hashedPassword,
  };

  try {
    const exist = await users.findByEmail(newUser.email);
    if (exist.length > 0) {
      return res.status(422).send("Could not create user, user exists");
    }

    const result = await users.create(newUser);
    if (!result) {
      return res.status(500).send("Could not create user, try again please");
    }

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      token,
    });
  } catch (err) {
    return res.status(500).send("Could not create user, try again please");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let identifiedUser;
  try {
    const result = await users.findByEmail(email);
    if (!result[0]) {
      return res.status(401).send("No user found - Check your credentials");
    }
    identifiedUser = result[0];
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
    if (!isValidPassword) {
      return res.status(401).send("No user found - Check your credentials");
    }
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }

  try {
    const token = jwt.sign(
      {
        id: identifiedUser.id,
        email: identifiedUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      id: identifiedUser.id,
      email: identifiedUser.email,
      token,
    });
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
};

const resetUserPass = async (req, res) => {
  const { email, otp, password } = req.body;
  let userOtp;
  try {
    const result = await users.findOtpByEmail(email);
    if (!result[0]) {
      return res.status(401).send("No otp found - Check your credentials");
    }
    userOtp = result[result.length - 1];
  } catch (err) {
    return res.status(500).send("Something went Wrong");
  }

  let isValidOtp;
  try {
    isValidOtp = await bcrypt.compare(otp.toString(), userOtp.otp);

    if (!isValidOtp) {
      return res.status(401).send("No otp found - Check your credentials");
    }
  } catch (err) {
    return res.status(500).send("Something went Wrong");
  }
  isValidOtp = userOtp.created * 1000 > Date.now() - 100000;

  if (!isValidOtp) {
    return res.status(401).send("Time out");
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).send("Could not change password, try again please");
  }

  const result = await users.updatePassword(email, hashedPassword);
  if (!result) {
    return res.status(500).send("Could not change password, try again please");
  }
};

module.exports = {
  loginUser,
  signUpUser,
  resetUserPass,
  createOtp,
};
