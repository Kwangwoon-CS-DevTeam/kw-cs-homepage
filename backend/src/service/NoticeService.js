const NoticeModel = require("../models/NoticeModel");

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