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
    name: Joi.string().min(4).required(),
    set: Joi.string().min(3),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let card = {};
  try {
    let set = req.body.set.toLowerCase()
    let response = await fetch(
      `https://api.scryfall.com/cards/named?fuzzy=${req.body.name.toLowerCase()}&set=${set}`
    );
    if (!response.ok) {
      response = await fetch(
        `https://api.scryfall.com/cards/named?fuzzy=${req.body.name.toLowerCase()}`
      );
    }
    const data = await response.json();
    card = {
      name: req.body.name.toLowerCase(),
      set: data.set_name,
      image: data.image_uris.small,
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
};
