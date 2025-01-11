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