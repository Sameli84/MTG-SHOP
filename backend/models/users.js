const { query } = require("express");
const pool = require("../db/pool");

const users = {
  createOtp: (userOtp) =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      connection.query("INSERT INTO otp SET ?;", userOtp, (err, result) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }),
  findOtpByEmail: (email) =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query(
        "SELECT email, UNIX_TIMESTAMP(created) as created, otp FROM otp WHERE email LIKE ? ORDER BY created;",
        email,
        (err, result) => {
          connection.release();
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  }),
  create: (user) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        connection.query("INSERT INTO users SET ?;", user, (err, result) => {
          connection.release();
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }),
  findByEmail: (email) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query(
          "SELECT * FROM users WHERE email LIKE ?;",
          email,
          (err, result) => {
            connection.release();
            if (err) {
              return reject(err);
            }
            resolve(result);
          }
        );
      });
    }),
  updatePassword: (email, password) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        const qPass = password;
        const qMail = email;
        connection.query(
          `UPDATE users SET password = '${qPass}' WHERE email LIKE '${qMail}'`,
          (err, result) => {
            connection.release();
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    }),
};

module.exports = users;
