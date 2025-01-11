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