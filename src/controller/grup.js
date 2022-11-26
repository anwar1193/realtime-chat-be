const { v4: uuidv4 } = require("uuid");
const commonHelper = require("../helper/common");
const { create, getAll } = require("../models/grup");

const grup = {
  createGrup: async (req, res, next) => {
    try {
      const { name_grup } = req.body;
      const id = uuidv4();
      const data = {
        id,
        name_grup,
      };
      create(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Create group sucsess")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  getAllGrup: async (req, res) => {
    try {
      const key = req.query.key || "";
      const result = await getAll({ key });
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = grup;
