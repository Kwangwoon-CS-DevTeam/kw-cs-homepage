const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/NoticeController');
const { validateNoticesQuery } = require('../validators/noticeValidator');
const { handleValidationErrors } = require('../middlewares/validationMiddleware');

// 페이징 기능이 포함되고 카테고리 별로 필터링 된 공지사항 목록 API
router.get('/',
    validateNoticesQuery,      // 유효성 검사 체인
    handleValidationErrors,    // 에러 처리 미들웨어
    noticeController.getNotices);

// 공지사항 저장 API
router.post('/new-notice', noticeController.createNotice);

// 공지사항 수정 API
router.put('/new-notice/:id', noticeController.updateNotice);

// 공지사항 논리적 삭제 API
router.delete('/:id/delete', noticeController.deleteNotice);

module.exports = router;