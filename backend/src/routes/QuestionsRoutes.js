// routes/questions.js
const express = require('express');
const router = express.Router();
const questionsController = require('./QuestionsController'); // 컨트롤러 가져오기
const questionsController = require('../controllers/questionsController'); // 컨트롤러 가져오기

// 1. 질문 등록 (Create)
router.post('/add', questionsController.createQuestion);

// 2. 질문 목록 조회 (Read)
router.get('/', questionsController.getQuestions);

// 3. 질문 답변 작성 (Update)
router.put('/answer/:id', questionsController.updateAnswer);

// 4. 질문 삭제 (Delete) - 소프트 삭제
router.delete('/delete/:id', questionsController.deleteQuestion);

module.exports = router;
