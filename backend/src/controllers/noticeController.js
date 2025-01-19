const noticeService = require('../services/noticeService');

// 이미지 처리 로직
exports.uploadNoticeImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // URL 디코딩
    const fileUrl = decodeURIComponent(req.file.location);
    console.log("Decoded file URL:", fileUrl);

    res.status(200).json({ location: fileUrl });
};

// noticeController.js

/**
 * 특정 ID의 공지사항 조회 컨트롤러
 */
/**
 * @swagger
 * /api/notices/{id}:
 *   get:
 *     summary: 특정 공지사항 조회
 *     description: 주어진 ID에 해당하는 공지사항을 조회합니다.
 *     tags:
 *       - Notices
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 조회할 공지사항의 고유 ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 공지사항이 성공적으로 조회됨
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notice'
 *       404:
 *         description: 페이지를 찾을 수 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 페이지를 찾을 수 없습니다.
 *       500:
 *         description: 서버 내부 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 공지사항 조회 중 오류가 발생했습니다.
 *                 error:
 *                   type: string
 *                   example: 에러 메시지 내용
 */
exports.getNoticeById = async (req, res) => {
    try {
        const { id } = req.params;   // /notices/:id

        // Service를 통해 공지사항 데이터 가져오기
        const notice = await noticeService.getNoticeById(id);

        // 공지사항이 없으면 404
        if (!notice) {
            return res.status(404).json({ message: '페이지를 찾을 수 없습니다.' });
        }

        // 성공 시 공지사항 객체 반환
        return res.json(notice);
    } catch (error) {
        console.error('Error in getNoticeById Controller:', error);
        return res.status(500).json({
            message: '공지사항 조회 중 오류가 발생했습니다.',
            error: error.message,
        });
    }
};

/**
 * 특정 카테고리의 공지사항 목록 조회
 * 카테고리로 필터된 공지사항 불러오기
 */
/**
 * @swagger
 * /api/notices:
 *   get:
 *     summary: 공지사항 목록 조회 (카테고리 및 페이징 포함)
 *     description: 카테고리 이름이 주어지면 해당 카테고리의 공지사항을, 없으면 전체 공지사항 중 최신 데이터를 반환합니다.
 *     tags:
 *       - Notices
 *     parameters:
 *       - name: category
 *         in: query
 *         required: false
 *         description: 카테고리 이름 ("important" 또는 "event"). 값이 없으면 전체 공지사항을 조회합니다.
 *         schema:
 *           type: string
 *           enum: [important, event]
 *           example: important
 *       - name: page
 *         in: query
 *         required: false
 *         description: "현재 페이지 번호 (기본값: 1)"
 *         schema:
 *           type: integer
 *           default: 1
 *           example: 1
 *       - name: size
 *         in: query
 *         required: false
 *         description: "페이지당 항목 수 (기본값: 10)"
 *         schema:
 *           type: integer
 *           default: 10
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
 *                   example: 50
 *                 page:
 *                   type: integer
 *                   description: 현재 페이지 번호
 *                   example: 1
 *                 size:
 *                   type: integer
 *                   description: 페이지당 항목 수
 *                   example: 5
 *                 notices:
 *                   type: array
 *                   description: 공지사항 데이터 배열
 *                   items:
 *                     $ref: '#/components/schemas/Notice'
 *       400:
 *         description: 잘못된 요청 (유효하지 않은 카테고리 이름)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid category format
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
exports.getNotices = async (req, res) => {
    const { category, page, size } = req.query; // page와 size는 이미 toInt로 변환됨

    try {
        const notices = await noticeService.getNotices(category, page, size);
        res.status(200).json(notices);
    } catch (error) {
        console.error('Error in getNotices Controller:', error);
        if (error.message.includes('Category')) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * 공지사항 추가
 */
/**
 * @swagger
 * /api/notices/new-notice:
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
    
    // 카테고리 변환
    const categoryMapping = {
        important: 1,
        event: 2,
    };

    noticeData.category_id = categoryMapping[noticeData.category];
    delete noticeData.category;

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
        console.log('공지사항 저장에 실패하였습니다 in Controller: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

/**
 * 공지사항 업데이트
 */
/**
 * @swagger
 * /api/notices/new-notice/{id}:
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

        const categoryMapping = {
            important: 1,
            event: 2,
        };

        updateData.category_id = categoryMapping[updateData.category];
        delete updateData.category;

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
 * 공지사항 삭제
 */
/**
 * @swagger
 * /api/notices/{id}/delete:
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