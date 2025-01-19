// validators/questionsValidator.js
const { body, param } = require('express-validator');

const createQuestionValidator = [
  body('nickname').isString().notEmpty().withMessage('닉네임은 필수입니다.'),
  body('title').isString().notEmpty().withMessage('제목은 필수입니다.'),
  body('IP').isIP().withMessage('유효한 IP 주소를 입력하세요.'),
  body('question').isString().notEmpty().withMessage('질문 내용을 입력하세요.'),
  body('password').isInt({ min: 1 }).withMessage('비밀번호는 숫자여야 하며 1 이상의 값이어야 합니다.')
];

const updateAnswerValidator = [
  param('id').isInt().withMessage('유효한 질문 ID를 입력하세요.'),
  body('admin_id').isString().notEmpty().withMessage('관리자 ID는 필수입니다.'),
  body('answer').isString().notEmpty().withMessage('답변을 입력하세요.')
];

const deleteQuestionValidator = [
  param('id').isInt().withMessage('유효한 질문 ID를 입력하세요.')
];

module.exports = {
  createQuestionValidator,
  updateAnswerValidator,
  deleteQuestionValidator
};
    