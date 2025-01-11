const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/NoticeController');

// 페이징 기능이 포함된 사용자 목록 API
router.get('/', noticeController.getPaginatedNotices);

module.exports = router;