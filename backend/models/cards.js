const connection = require("../db/connection");

const cards = {
  findAll: () =>
    new Promise((resolve, reject) => {
      connection.query("SELECT * FROM cards;", (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    }),
  create: (card) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO cards SET ?",
        card,
        (err, result) => {
          if (err) {
            return reject(err);
          } else {
            resolve(result);
          }
        }
      );
      console.log(query.sql);
    }),

  findById: (id) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "SELECT * FROM cards WHERE ID = ?",
        id,
        (err, result) => {
          if (err) {
            return reject(err);
          } else {
            resolve(result);
          }
        }
      );
      console.log(query.sql);
    }),

  updateById: (card) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        `UPDATE cards SET name = ?, set = ? WHERE id = ?`,
        [card.name, card.set, card.id],
        (err, result) => {
          if (err) {
            return reject(err);
          } else {
            resolve(result);
          }
        }
      );
      console.log(query.sql);
    }),

  deleteById: (id) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "DELETE FROM cards where ID = ?",
        id,
        (err, result) => {
          if (err) {
            return reject(err);
          } else {
            resolve(result);
          }
        }
      );
      console.log(query.sql);
    }),

  findByName: (name) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "SELECT * FROM cards where name = ?",
        name,
        (err, result) => {
          if (err) {
            return reject(err);
          } else {
            resolve(result);
          }
        }
      );
      console.log(query.sql);
    }),
  close: () =>
    new Promise((resolve, reject) => {
      connection.end((err) => {
        if (err) {
          return reject(err);
        }
        resolve("Connection Closed");
      });
    }),
};

module.exports = cards;
