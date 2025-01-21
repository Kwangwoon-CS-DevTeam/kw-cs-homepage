// validators/questionsValidator.js
const { body, param } = require('express-validator');

const createQuestionValidator = [
  body('nickname').isString().notEmpty().withMessage('닉네임은 필수입니다.'),
  body('title').isString().notEmpty().withMessage('제목은 필수입니다.'),
  body('question').isString().notEmpty().withMessage('질문 내용을 입력하세요.'),
  body('password').isInt({ min: 1000 , max : 9999 }).withMessage('비밀번호는 4자리 숫자여야 합니다.')
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
    