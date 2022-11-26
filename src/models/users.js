const pool = require("../config/db");

const getUser = (getSearch) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT * FROM users WHERE name ILIKE '%${getSearch}%'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const select = (id) => {
  return pool.query(`SELECT * FROM users WHERE id='${id}'`);
};

const countData = () => {
  return pool.query("SELECT COUNT(*) FROM users");
};

const update = (data) => {
  const { id, photo } = data;
  return pool.query(`UPDATE users SET photo = '${photo}' WHERE id='${id}'`);
};
const updateName = (data) => {
  const { id, name } = data;
  return pool.query(`UPDATE users SET name = '${name}' WHERE id='${id}'`);
};
const updateShortName = (data) => {
  const { id, shortname } = data;
  return pool.query(
    `UPDATE users SET shortname = '${shortname}' WHERE id='${id}'`
  );
};
const updateBio = (data) => {
  const { id, bio } = data;
  return pool.query(`UPDATE users SET bio = '${bio}' WHERE id='${id}'`);
};
const updatePhone = (data) => {
  const { id, phone } = data;
  return pool.query(`UPDATE users SET phone = '${phone}' WHERE id='${id}'`);
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT id FROM users WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const deleteUser = (id) => {
  return pool.query(`DELETE FROM users WHERE id=${id}`)
}

module.exports = {
  getUser,
  select,
  countData,
  update,
  findId,
  updateName,
  updateShortName,
  updateBio,
  updatePhone,
  deleteUser,
};
