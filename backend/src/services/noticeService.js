const NoticeModel = require("../models/Notices");
const CategoryModel = require("../models/Category");
const Sequelize = require("sequelize");

/**
 * 공지사항 목록 조회 (카테고리 포함 가능)
 * @param {string} [categoryName] - 카테고리 이름 (선택적)
 * @param {number} page - 현재 페이지 번호
 * @param {number} size - 페이지당 항목 수
 * @returns {object} 공지사항 목록 및 페이징 정보
 */
exports.getNotices = async (categoryName, page, size) => {
    const offset = (page - 1) * size; // 데이터 시작 지점
    const limit = size; // 페이지당 항목 수

    try {
        let whereCondition = {
            isDeleted: 0
        };

        // 카테고리가 제공된 경우 카테고리 ID 조회 및 필터 설정
        if (categoryName) {
            const category = await CategoryModel.findOne({ where: { category_name: categoryName } });
            if (!category) {
                throw new Error(`Category '${categoryName}' not found`);
            }
            whereCondition.category_id = category.id;
        }

        // 공지사항 조회
        const { count, rows } = await NoticeModel.findAndCountAll({
            where: whereCondition,
            offset,
            limit,
            order: [['created_at', 'DESC']],
        });

        // 카테고리 ID를 문자열로 변환
        const categoryMapping = {
            1: 'important',
            2: 'event',
        };

        const notices = rows.map((notice) => ({
            ...notice.toJSON(), // Sequelize 객체를 일반 객체로 변환
            category: categoryMapping[notice.category_id] || 'unknown', // 문자열 변환
        }));

        return {
            total: count,        // 전체 공지사항 수
            page,                // 현재 페이지
            size,                // 페이지당 항목 수
            notices,             // 문자열로 변환된 공지사항 데이터 배열
        };
    } catch (error) {
        console.error('Error fetching notices:', error);
        throw new Error('Failed to fetch notices');
    }
};

// noticeService.js

/**
 * 특정 ID의 공지사항 조회
 * @param {number} id
 * @returns {object|null} 공지사항 데이터 혹은 null
 */
exports.getNoticeById = async (id) => {
    try {
        // PK로 공지사항 찾기
        const notice = await NoticeModel.findByPk(id);

        // 존재하지 않거나, 삭제된(isDeleted=1) 공지사항인 경우
        if (!notice || notice.isDeleted === 1) {
            return null;
        }

        return notice;
    } catch (error) {
        throw error; // Controller에서 처리
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
            excerpt: noticeData.excerpt,
            url: noticeData.url || null,
            max_participants: noticeData.max_participants || null,
            current_participants: noticeData.current_participants || null,
            created_at: Date.now(),
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