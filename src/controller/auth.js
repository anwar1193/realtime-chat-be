const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authModel = require("../models/auth");
const sendEmail = require("../helper/sendEmail");
const { generateToken, generateRefreshToken } = require("../helper/auth");
const { success, failed } = require("../helper/response");

const authController = {
  register: async (req, res) => {
    try {
      const { name, email } = req.body;
      const password = req.body.password;
      const checkEmail = await authModel.findBy("email", email);
      if (checkEmail.rowCount == 0) {
        const id = uuidv4();
        const is_verified = true;
        const token = crypto.randomBytes(16).toString("hex");
        const data = {
          id,
          name,
          email,
          password,
          is_verified,
          token,
        };
        await authModel.register(data);
        success(res, {
          code: 200,
          status: "success",
          message: "register succcess",
          data: data,
        });
      } else {
        const err = {
          message: "email is already registered",
        };
        failed(res, {
          code: 409,
          status: "error",
          message: err.message,
          error: [],
        });
        return;
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const {
        rows: [user],
      } = await authModel.findBy("email", email);

      if (user) {
        if (password == user.password) {
          const isAuth = password == user.password;
          if(!isAuth) {
            failed(res, {
              code: 500,
              status: "error",
              message: "wrong email or password",
              error: [],
            });
          }
            delete user.password;
            delete user.is_verified;
            if (isAuth) {
              const token = await generateToken({
                id: user.id,
              });
              success(res, {
                code: 200,
                status: "success",
                message: "login success",
                token: token,
                user,
              });
        } else {
          failed(res, {
            code: 500,
            status: "error",
            message: "wrong email or password",
            error: [],
          });
          return;
        }
      } else {
        failed(res, {
          code: 404,
          status: "error",
          message: "email not registered",
          error: [],
        });
      }
    }
  } catch (error) {
    failed(res, {
      code: 500,
      status: "error",
      message: error.message,
      error: [],
    });
  }},

  verifyEmail: async (req, res) => {
    try {
      const { token } = req.query;
      const verifyTokenCheck = await authModel.findBy("token", token);
      if (verifyTokenCheck.rowCount > 0) {
        await authModel
          .verifyingEmail(token)
          .then(() => {
            res.send(`
      <center>
      <div>
        <h1>Activation Success</h1>
      </div>
      </center>
        `);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const err = {
          message: "verify token is invalid",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
};

module.exports = authController;
