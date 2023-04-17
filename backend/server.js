const cards = require("./models/cards");

const getCards = async (req, res) => {
  try {
    const response = await cards.findAll();
    if (response) {
      console.log(response);
    }
  } catch (e) {
    console.log(e);
  } finally {
    try {
      const response = await cards.close();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
};

const closeConnection = async () => {
  try {
    console.log(await cards.close());
  } catch (error) {
    console.log(error);
  }
};

const addCard = async (card) => {
  try {
    card.name = card.name.toLowerCase();
    const result = await cards.create(card);
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    try {
      const response = await cards.close();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
};

const getCardById = async (id) => {
  try {
    const result = await cards.findById(id);
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    try {
      const response = await cards.close();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
};

const deleteCardById = async (id) => {
  try {
    const result = await cards.deleteById(id);
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    try {
      const response = await cards.close();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
};

const getCardByName = async (name) => {
  try {
    const result = await cards.findByName(name.toLowerCase());
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    try {
      const response = await cards.close();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
};

const updateCard = async (card) => {
  try {
    const result = await cards.updateById(card);
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    try {
      const response = await cards.close();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
};


getCards();
