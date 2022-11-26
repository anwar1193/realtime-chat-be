const createError = require("http-errors");
const {
  getUser,
  select,
  update,
  findId,
  updateName,
  updateShortName,
  updateBio,
  updatePhone,
  deleteUser,
} = require("../models/users");
const commonHelper = require("../helper/common");
const { success, failed } = require('../helper/response');

const workerController = {
  getAll: async (req, res, next) => {
    const { search } = req.query;
    const getValueSearch = search || "";
    try {
      const users = await getUser(getValueSearch);
      commonHelper.response(res, users.rows, 200, "get data success");
    } catch (error) {
      next(createError);
    }
  },
  getById: (req, res) => {
    const id = req.params.id;
    select(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200);
      })
      .catch((err) => res.send(err));
  },
  updatePhoto: async (req, res, next) => {
    try {
      const DB_HOST = process.env.DB_HOST;
      const id = req.params.id;
      const photo = req.file.filename;
      const PORT = process.env.PORT;

      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        photo: `${DB_HOST}/${PORT}/${photo}`,
      };
      update(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Photo updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  updateName: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        name,
      };
      updateName(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Name updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  updateShortName: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { shortname } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        shortname,
      };
      updateShortName(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Short Name updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  updateBio: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { bio } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        bio,
      };
      updateBio(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Bio updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  updatePhone: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { phone } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        phone,
      };
      updatePhone(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Phone updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  dltUser: async (req, res) => {
    try {
      const { id } = req.params;
      const detailUser = await select(id);
      if (detailUser.rowCount > 0) {
        await deleteUser(id);
        success(res, {
          code: 200,
          status: 'success',
          message: `success deleted user with id ${id}`,
          error: [],
        });
        return;
      } else {
        failed(res, {
          code: 404,
          status: 'error',
          message: `user with id ${id} is not found`,
          error: [],
        });
        return;
      }
    } catch(error) {
      failed(res, {
        code: 500,
        status: 'error',
        message: error.message,
        error: [],
      });
    }
  }
};

module.exports = workerController;
