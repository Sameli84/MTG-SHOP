const Joi = require("joi");
const cards = require("../models/cards");

const getCards = async (req, res) => {
  try {
    const response = await cards.findAll();
    if (response) {
      res.send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const getCardById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await cards.findById(id);
    if (response.length === 1) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const createCard = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    set: Joi.string().min(3),
    condition: Joi.string().min(1),
    price: Joi.string().min(1).max(6),
    owner: Joi.string().min(1),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let card = {};
  try {
    let set = req.body.set.toLowerCase();
    let response = await fetch(
      `https://api.scryfall.com/cards/named?fuzzy=${req.body.name.toLowerCase()}&set=${set}`
    );
    if (!response.ok) {
      response = await fetch(
        `https://api.scryfall.com/cards/named?fuzzy=${req.body.name.toLowerCase()}`
      );
    }
    const data = await response.json();
    let price = req.body.price;
    if (price.endsWith(".")) {
      price = price.slice(0, -1);
    }
    if (price.startsWith("0")) {
      price = price.replace(/^0+/, "");
    }
    price = price.replace(/(\.\d{0,2})\d*/, "$1");
    card = {
      name: req.body.name,
      set: data.set_name,
      condition: req.body.condition,
      price: price,
      image: data.image_uris.small,
      owner: req.body.owner,
    };
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    res.status(500).send("Something went wrong");
    return;
  }

  try {
    const response = await cards.create(card);
    if (response) {
      card.id = response.insertId;
      res.status(201).send(card);
      console.log(card);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const updateCard = async (req, res) => {
  console.log(req.body.id)
  const schema = Joi.object({
    condition: Joi.string().min(1),
    price: Joi.string().min(1).max(6),
    id: Joi.number().integer(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let card = {};

  let price = req.body.price;
  if (price.endsWith(".")) {
    price = price.slice(0, -1);
  }
  if (price.startsWith("0")) {
    price = price.replace(/^0+/, "");
  }
  price = price.replace(/(\.\d{0,2})\d*/, "$1");
  card = {
    condition: req.body.condition,
    price: price,
    id: parseInt(req.params.id),
  };

  try {
    const response = await cards.updateById(card);
    if (response) {
      card.id = response.insertId;
      res.status(204).send(card);
      console.log(card);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const deleteCard = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await cards.deleteById(id);
    if (response) {
      res.status(200).send("Card deleted");
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  createCard,
  getCardById,
  deleteCard,
  getCards,
  updateCard,
};
