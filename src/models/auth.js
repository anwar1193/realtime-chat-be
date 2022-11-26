const pool = require("../config/db");

const authModel = {
  register: (data) => {
    const { id, name, email, password, is_verified, token } = data;
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into users(id, name, email, password, is_verified, token) values('${id}','${name}','${email}','${password}', ${is_verified}, '${token}')`,
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },

  findBy: (row, keyword) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from users where ${row}='${keyword}'`,
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },
  
  // verifyingEmail: (token) => {
  //   return new Promise((resolve, reject) => {
  //     pool.query(
  //       `UPDATE users SET token= null, is_verified= true WHERE token ='${token}'`,
  //       (err, res) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(res);
  //         }
  //       }
  //     );
  //   });
  // },
};

module.exports = authModel;
