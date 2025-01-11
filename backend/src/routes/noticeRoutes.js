const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/NoticeController');

// 페이징 기능이 포함된 사용자 목록 API
router.get('/', noticeController.getPaginatedNotices);

// 공지사항 저장 API
router.post('/new-notice', noticeController.createNotice);

// 공지사항 수정 API
router.put('/new-notice/:id', noticeController.updateNotice);

// 공지사항 논리적 삭제 API
router.delete('/:id/delete', noticeController.deleteNotice);

module.exports = router;