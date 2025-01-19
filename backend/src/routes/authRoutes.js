const express = require("express");
const { validateLogin } = require("../validators/authValidator");
const { handleValidationErrors } = require("../middlewares/validationMiddleware");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
    "/login",
    ...validateLogin,
    handleValidationErrors,
    authController.login
);

module.exports = router;