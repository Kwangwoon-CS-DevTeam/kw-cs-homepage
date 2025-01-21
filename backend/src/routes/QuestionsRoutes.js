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
router.post('/new-question', createQuestionValidator, validationMiddleware.handleValidationErrors, questionsController.createQuestion);

// 2. 질문 목록 조회 (Read)
router.get('/', questionsController.getQuestions);

// 2-1. 특정 질문 조회 (Read)
router.get('/:id', questionsController.getQuestionById);

// 2-2. 특정 질문 수정 (Update)
router.put("/update/:id", questionsController.updateQuestion);

module.exports = router;

router.post('/validate-password', questionsController.validatePassword);

// 3. 질문 답변 작성 (Update)
router.put('/answer/:id', verifyAuth, updateAnswerValidator, validationMiddleware.handleValidationErrors, questionsController.updateAnswer);

// 4. 질문 삭제 (Delete) - 소프트 삭제
router.delete('/delete/:id', deleteQuestionValidator, validationMiddleware.handleValidationErrors, questionsController.deleteQuestion);

module.exports = router;
