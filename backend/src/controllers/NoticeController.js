const noticeService = require('../services/NoticeService');

/**
 * @swagger
 * /notices:
 *   get:
 *     summary: 공지사항 목록 조회 (페이징 포함)
 *     description: 페이지와 크기를 기준으로 공지사항 목록을 조회합니다.
 *     tags:
 *       - Notices
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: "현재 페이지 번호 (기본값: 1)"
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: size
 *         in: query
 *         required: false
 *         description: "페이지당 항목 수 (기본값: 10)"
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: 공지사항 목록이 성공적으로 반환됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: 총 공지사항 개수
 *                   example: 100
 *                 page:
 *                   type: integer
 *                   description: 현재 페이지 번호
 *                   example: 1
 *                 size:
 *                   type: integer
 *                   description: 페이지당 항목 수
 *                   example: 10
 *                 notices:
 *                   type: array
 *                   description: 공지사항 데이터 배열
 *                   items:
 *                     $ref: '#/components/schemas/Notice'
 *       500:
 *         description: 서버 내부 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
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
 * /notices/new-notice:
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
 *             $ref: '#/components/schemas/Notice'
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
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

/**
 * @swagger
 * /notices/new-notice/{id}:
 *   put:
 *     summary: 공지사항 수정
 *     description: 특정 공지사항을 수정합니다.
 *     tags:
 *       - Notices
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 수정할 공지사항의 ID
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notice'
 *     responses:
 *       200:
 *         description: "공지사항이 성공적으로 수정됨"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notice updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Notice'
 *       400:
 *         description: "잘못된 요청 (예: 공지사항 ID가 없거나 유효하지 않음)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid request data
 *       404:
 *         description: "공지사항을 찾을 수 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notice not found
 *       500:
 *         description: "서버 내부 에러"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
exports.updateNotice = async (req, res) => {
    const { id } = req.params; // 공지사항 ID (예: /notices/:id)
    const updateData = req.body; // 업데이트할 데이터

    try {
        const result = await noticeService.updateNotice(id, updateData);

        if (result.success) {
            res.status(result.code).json({
                message: 'Notice updated successfully',
                data: result.data,
            });
        } else {
            res.status(result.code).json({
                message: result.message,
            });
        }
    } catch (error) {
        console.error('Error in updateNotice Controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /notices/{id}/delete:
 *   delete:
 *     summary: 공지사항 삭제
 *     description: 특정 ID의 공지사항을 삭제합니다.
 *     tags:
 *       - Notices
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 삭제할 공지사항의 ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 공지사항이 성공적으로 삭제됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notice deleted successfully
 *       404:
 *         description: 공지사항을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notice not found
 *       500:
 *         description: 서버 내부 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
exports.deleteNotice = async (req, res) => {
    const { id } = req.params; // URL에서 ID 가져오기

    try {
        const result = await noticeService.deleteNotice(id);

        if (result.success) {
            res.status(result.code).json({
                message: result.message,
            });
        } else {
            res.status(result.code).json({
                message: result.message,
            });
        }
    } catch (error) {
        console.error('Error in deleteNotice Controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};