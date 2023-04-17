const Joi = require('joi');
const cards = require('../models/cards');

const getCards = async (req, res) => {
  try {
    const response = await cards.findAll();
    if(response) {
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
    if(response.length === 1) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const createCard = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    set: Joi.string().min(3).required()
  });

  const { error } = schema.validate(req.body);
  if(error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const card = {
    name: req.body.name.toLowerCase(),
    set: req.body.set.toLowerCase()
  }

  try {
    const response = await cards.create(card);
    if(response) {
      card.id = response.insertId;
      res.status(201).send(card);
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
    if(response) {
      res.status(200).send('Card deleted');
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  createCard,
  getCardById,
  deleteCard,
  getCards
};
