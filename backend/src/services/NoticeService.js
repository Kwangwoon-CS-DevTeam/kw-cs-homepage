const NoticeModel = require("../models/Notices");

exports.getNotices = async (page, size) => {
    const offset = (page - 1) * size; // 몇 개의 데이터를 건너뛸지 계산
    const total = await NoticeModel.count(); // 전체 데이터 수

    const notices = await NoticeModel.findAll({
        offset: offset,
        limit: parseInt(size), // 한 번에 반환할 데이터 수
        order: [['createdAt', 'DESC']], // 정렬 기준
    });

    return {
        total, // 전체 데이터 개수
        page: parseInt(page), // 현재 페이지
        limit: parseInt(size), // 페이지 크기
        notices, // 사용자 데이터
    };
}

exports.saveNotice = async (noticeData) => {
    try {
        // 데이터 저장
        const newNotice = await NoticeModel.create({
            admin_id: noticeData.admin_id,
            category_id: noticeData.category_id,
            title: noticeData.title,
            content: noticeData.content,
            url: noticeData.url || null,
            max_participants: noticeData.max_participants || null,
            current_participants: noticeData.current_participants || null,
        });

        return {
            success: true,
            data: newNotice,
        };
    } catch (error) {
        console.error('공지사항 저장을 실패하였습니다. 에러내용:', error);
        return {
            success: false,
            message: 'Failed to save notice',
            error,
        };
    }
};

/**
 * 공지사항 업데이트 로직
 * @param {number} id - 업데이트할 공지사항의 ID
 * @param {object} updateData - 업데이트할 데이터 객체
 * @returns {object} 업데이트 결과
 */
const updateNotice = async (id, updateData) => {
    try {
        // 1. 업데이트할 데이터가 존재하는지 확인
        const notice = await NoticeModel.findByPk(id);
        if (!notice) {
            return {
                code: 404,
                success: false,
                message: 'Notice not found',
            };
        }

        // 2. 데이터 업데이트
        const updatedNotice = await notice.update(updateData);

        return {
            code: 200,
            success: true,
            data: updatedNotice,
        };
    } catch (error) {
        console.error('Error updating notice:', error);
        return {
            code: 500,
            success: false,
            message: 'Failed to update notice',
            error,
        };
    }
};

module.exports = {
    updateNotice,
};