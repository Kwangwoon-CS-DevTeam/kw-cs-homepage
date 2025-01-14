const express = require('express');
const router = express.Router();
const Questions = require('../models/Questions');

/**
 * @swagger
 * /api/qna/add:
 *   post:
 *     summary: 질문을 등록합니다.
 *     description: 새로운 질문을 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: userNickname
 *               IP:
 *                 type: string
 *                 example: 192.168.1.1
 *               question:
 *                 type: string
 *                 example: "How to use Swagger?"
 *               password:
 *                 type: integer
 *                 example: 1234
 *     responses:
 *       201:
 *         description: 질문이 성공적으로 등록되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       400:
 *         description: 질문 등록 실패
 */
router.post('/add', async (req, res) => {
    try {
        const newQuestion = await Questions.create(req.body);
        res.status(201).json(newQuestion); // 성공적으로 생성된 질문 반환
    } catch (error) {
        res.status(400).json({ error: error.message }); // 오류 발생 시 400 에러 반환
    }
});

/**
 * @swagger
 * /api/qna:
 *   get:
 *     summary: 모든 질문을 조회합니다.
 *     description: 삭제되지 않은 질문만 조회됩니다.
 *     responses:
 *       200:
 *         description: 질문 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 */
router.get('/', async (req, res) => {
    try {
        // 삭제되지 않은 모든 질문 조회
        const questions = await Questions.findAll({
            where: { isDeleted: 0 }, // isDeleted가 0인 질문만 조회
        });
        res.status(200).json(questions); // 조회된 질문 목록 반환
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve questions' }); // 오류 발생 시 400 에러 반환
    }
});

/**
 * @swagger
 * /api/qna/answer/{id}:
 *   put:
 *     summary: 답변을 작성합니다.
 *     description: 관리자가 특정 질문에 답변을 작성합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 질문의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               admin_id:
 *                 type: string
 *                 example: "admin123"
 *               answer:
 *                 type: string
 *                 example: "This is the answer."
 *     responses:
 *       200:
 *         description: 답변이 성공적으로 작성되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: 질문을 찾을 수 없음
 */
router.put('/answer/:id', async (req, res) => {
    const { id } = req.params; 
    const { admin_id, answer } = req.body;  

    try {
        // 해당 ID의 삭제되지 않은 질문 조회
        const question = await Questions.findOne({ where: { id, isDeleted: 0 } });
        if (question) {
            question.answer = answer; 
            question.admin_id = admin_id; 
            question.updated_at = new Date(); 
            await question.save(); 
            res.status(200).json(question); 
        } else {
            res.status(404).json({ error: 'Question not found' }); // 질문이 없으면 404 에러 반환
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to update answer' }); // 오류 발생 시 400 에러 반환
    }
});

/**
 * @swagger
 * /api/qna/delete/{id}:
 *   delete:
 *     summary: 질문을 삭제합니다.
 *     description: 관리자가 질문을 논리 삭제(소프트 삭제)합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 질문의 ID
 *     responses:
 *       200:
 *         description: 질문이 성공적으로 삭제되었습니다.
 *       404:
 *         description: 질문을 찾을 수 없음
 */
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params; // URL에서 질문 ID를 가져옴
    try {
        const question = await Questions.findOne({ where: { id } });
        if (question) {
            question.isDeleted = 1; // 논리 삭제 처리 (isDeleted 값을 1로 설정)
            await question.save(); // 변경사항 저장
            res.status(200).json({ message: 'Question deleted' }); // 삭제 성공 메시지 반환
        } else {
            res.status(404).json({ error: 'Question not found' }); // 질문이 없으면 404 에러 반환
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete question' }); // 오류 발생 시 400 에러 반환
    }
});

module.exports = router; 
