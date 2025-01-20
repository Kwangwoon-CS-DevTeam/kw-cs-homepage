const { check } = require('express-validator');

const validateLogin = [
    check("id")
        .isLength({ min: 4, max: 20 })
        .withMessage("ID는 4자리 이상 20자리 이하로 입력해야 합니다."),
    check("password")
        .isLength({ min: 8, max: 16 })
        .withMessage("비밀번호는 8자리 이상 16자리 이하로 입력해야 합니다."),
];

module.exports = {
    validateLogin
};