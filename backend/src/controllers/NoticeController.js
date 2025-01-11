const noticeService = require('../services/NoticeService');

exports.getPaginatedNotices = async (req, res) => {
    const { page = 1, size = 10 } = req.query; // 기본값: page=1, size=10
    try {
        const notices = await noticeService.getPaginatedNotices(page, size);
        res.json(notices);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /notices:
 *   post:
 *     summary: 공지사항 생성
 *     description: 새로운 공지사항을 생성합니다.
 *     tags:
 *       - Notices
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               admin_id:
 *                 type: string
 *                 description: 관리자의 ID
 *                 example: admin123
 *               category_id:
 *                 type: integer
 *                 description: 카테고리 ID
 *                 example: 1
 *               title:
 *                 type: string
 *                 description: 공지사항 제목
 *                 example: 새로운 공지
 *               content:
 *                 type: string
 *                 description: 공지사항 내용 (HTML 포함)
 *                 example: <p>공지 내용입니다.</p>
 *               url:
 *                 type: string
 *                 description: 관련 URL
 *                 example: http://example.com
 *               max_participants:
 *                 type: integer
 *                 description: 최대 참가자 수
 *                 example: 100
 *     responses:
 *       201:
 *         description: 성공적으로 공지사항이 생성됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notice created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Notice'
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 에러
 */
exports.createNotice = async (req, res) => {
    const noticeData = req.body;
    // ... 로직 처리
};
exports.createNotice = async (req, res) => {
    const noticeData = req.body; // 클라이언트에서 보낸 데이터

    try {
        const result = await noticeService.saveNotice(noticeData);

        if (result.success) {
            res.status(201).json({
                message: '공지사항이 성공적으로 저장되었습니다.',
                data: result.data,
            });
        } else {
            res.status(400).json({
                message: result.message,
                error: result.error,
            });
        }
    } catch (error) {
        console.error('공지사항 저장에 실패하였습니다 in Controller: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}