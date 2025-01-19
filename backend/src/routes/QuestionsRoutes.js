// routes/questions.js
const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController'); // 컨트롤러 가져오기
const validateRequest = require("../middlewares/ValidationMiddleware"); // 유효성 검사 미들웨어
const { 
    createQuestionValidator,
    updateAnswerValidator,
    deleteQuestionValidator } = require('../validators/QuestionsValidator');

// 1. 질문 등록 (Create)
router.post('/add', createQuestionValidator, validateRequest, questionsController.createQuestion);

// 2. 질문 목록 조회 (Read)
router.get('/', updateAnswerValidator, validateRequest, questionsController.getQuestions);

// 3. 질문 답변 작성 (Update)
router.put('/answer/:id', questionsController.updateAnswer);

// 4. 질문 삭제 (Delete) - 소프트 삭제
router.delete('/delete/:id', deleteQuestionValidator, validateRequest, questionsController.deleteQuestion);

module.exports = router;
