// routes/questions.js
const express = require('express');
const router = express.Router();
const verifyAuth = require('../middlewares/authMiddleware');
const questionsController = require('../controllers/QuestionsController'); // 컨트롤러 가져오기
const validationMiddleware = require('../middlewares/validationMiddleware');
const { 
    createQuestionValidator,
    updateAnswerValidator,
    deleteQuestionValidator } = require('../validators/questionsValidator');

// 1. 질문 등록 (Create)
router.post('/add', createQuestionValidator, validationMiddleware.handleValidationErrors, questionsController.createQuestion);

// 2. 질문 목록 조회 (Read)
router.get('/', questionsController.getQuestions);

// 3. 질문 답변 작성 (Update)
router.put('/answer/:id', verifyAuth, updateAnswerValidator, validationMiddleware.handleValidationErrors, questionsController.updateAnswer);

// 4. 질문 삭제 (Delete) - 소프트 삭제
router.delete('/delete/:id', verifyAuth, deleteQuestionValidator, validationMiddleware.handleValidationErrors, questionsController.deleteQuestion);

module.exports = router;
