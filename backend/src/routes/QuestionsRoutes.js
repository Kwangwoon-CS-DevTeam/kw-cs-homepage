// routes/questions.js
const express = require('express');
const router = express.Router();
const Questions = require('../models/Questions');

// 1. 질문 등록 (Create)
router.post('/add', async (req, res) => {
    const { admin_id, nickname, IP, question, password } = req.body;

    try {
        const newQuestion = await Questions.create({
            admin_id,
            nickname,
            IP,
            question,
            password,
        });
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create question' });
    }
});

// 2. 질문 목록 조회 (Read)
router.get('/', async (req, res) => {
    try {
        const questions = await Questions.findAll({
            where: { isDeleted: 0 }, // 삭제되지 않은 질문만 조회
        });
        res.status(200).json(questions);
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve questions' });
    }
});

// 3. 질문 답변 작성 (Update)
router.put('/answer/:id', async (req, res) => {
    const { id } = req.params;
    const { answer } = req.body;

    try {
        const question = await Questions.findOne({ where: { id, isDeleted: 0 } });
        if (question) {
            question.answer = answer;
            question.updated_at = new Date();
            await question.save();
            res.status(200).json(question);
        } else {
            res.status(404).json({ error: 'Question not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to update answer' });
    }
});

// 4. 질문 삭제 (Delete) - 소프트 삭제
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const question = await Questions.findOne({ where: { id } });
        if (question) {
            question.isDeleted = 1;  // 논리 삭제 처리
            await question.save();
            res.status(200).json({ message: 'Question deleted' });
        } else {
            res.status(404).json({ error: 'Question not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete question' });
    }
});

module.exports = router;
