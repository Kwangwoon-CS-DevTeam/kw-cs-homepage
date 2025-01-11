const NoticeModel = require("../models/Notices");
const CategoryModel = require("../models/Category");

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

/**
 * 특정 카테고리 이름과 페이징을 적용한 공지사항 조회
 * @param {string} categoryName - 카테고리 이름 ("Important" 또는 "event")
 * @param {number} page - 현재 페이지 번호
 * @param {number} size - 페이지당 항목 수
 * @returns {object} 공지사항 목록 및 페이징 정보
 */
exports.getFilteredNoticesByCategory = async (categoryName, page, size) => {
    const offset = (page - 1) * size;
    const limit = parseInt(size, 10);

    try {
        // 1. 카테고리 ID 조회
        const category = await CategoryModel.findOne({ where: { category_name: categoryName } });
        if (!category) {
            throw new Error(`Category '${categoryName}' not found`);
        }

        // 2. 해당 카테고리 ID를 기반으로 공지사항 조회
        const { count, rows } = await Notices.findAndCountAll({
            where: { category_id: category.id },
            offset,
            limit,
            order: [['created_at', 'DESC']],
        });

        return {
            total: count,
            page: parseInt(page, 10),
            size: limit,
            notices: rows,
        };
    } catch (error) {
        console.error('Error fetching filtered notices:', error);
        throw new Error('Failed to fetch notices');
    }
};

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
exports.updateNotice = async (id, updateData) => {
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

exports.deleteNotice = async (id) => {
    try {
        const notice = await NoticeModel.findByPk(id);

        if (!notice) {
            return {
                code: 404,
                success: false,
                message: 'Notice not found',
            };
        }

        // isDeleted 필드를 1로 업데이트
        notice.isDeleted = 1;
        await notice.save();

        return {
            code: 200,
            success: true,
            message: 'Notice deleted successfully',
        };
    } catch (error) {
        console.error('Error deleting notice:', error);
        return {
            code: 500,
            success: false,
            message: 'Failed to delete notice',
            error,
        };
    }
};