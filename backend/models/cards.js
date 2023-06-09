const db = require("../db/pool");

const cards = {
  findAll: () =>
    new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query("SELECT * FROM cards;", (err, result) => {
          connection.release()
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    }),
  create: (card) =>
    new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query("INSERT INTO cards SET ?", card, (err, result) => {
          connection.release()
          if (err) {
            return reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }),

  findById: (id) =>
    new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(
          "SELECT * FROM cards WHERE ID = ?",
          id,
          (err, result) => {
            connection.release()
            if (err) {
              return reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    }),

  updateById: (card) =>
    new Promise((resolve, reject) => {
      console.log(card.id)
      db.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(
          "UPDATE cards SET `condition` = ?, price = ? WHERE id = ?",
          [card.condition, card.price, card.id],
          (err, result) => {
            connection.release()
            if (err) {
              return reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    }),

  deleteById: (id) =>
    new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(
          "DELETE FROM cards where ID = ?",
          id,
          (err, result) => {
            connection.release()
            if (err) {
              return reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    }),

  findByName: (name) =>
    new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(
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
      });
    }),
};

module.exports = cards;
