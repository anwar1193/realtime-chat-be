const pool = require("../config/db");

const create = (data) => {
  const { id, name_grup } = data;
  return new Promise((resolve, reject) =>
    pool.query(
      `INSERT INTO grup(id,name_grup) VALUES('${id}','${name_grup}')`,
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

const getAll = ({ key }) => {
  return pool.query(`select * from grup where name_grup ilike '%${key}%'`);
};

module.exports = {
  create,
  getAll,
};
