const { body, query, param } = require('express-validator');

// 자료 등록 시 검증 규칙
const createResourceValidator = [
    body('admin_id')
        .isString().withMessage('admin_id는 문자열이어야 합니다.')
        .notEmpty().withMessage('admin_id는 필수 항목입니다.'),
    body('title')
        .isString().withMessage('title은 문자열이어야 합니다.')
        .notEmpty().withMessage('title은 필수 항목입니다.'),
    body('content')
        .optional()
        .isString().withMessage('content는 문자열이어야 합니다.'),
    body('file_url')
        .optional()
        .isURL().withMessage('file_url은 유효한 URL이어야 합니다.'),
    body('isDeleted')
        .optional()
        .isInt({ min: 0, max: 1 }).withMessage('isDeleted는 0 또는 1이어야 합니다.')
];

// 자료 목록 조회 시 검증 규칙 (예: 페이지네이션)
const getResourcesValidator = [
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('page는 1 이상의 정수여야 합니다.'),
    query('limit')
        .optional()
        .isInt({ min: 1 }).withMessage('limit는 1 이상의 정수여야 합니다.')
];

// 자료 수정 시 검증 규칙
const updateResourceValidator = [
    param('id')
        .isInt().withMessage('id는 숫자이어야 합니다.'),
    body('title')
        .optional()
        .notEmpty().withMessage("title은 필수입니다.")
        .isString().withMessage('title은 문자열이어야 합니다.'),
    body('content')
        .optional()
        .isString().withMessage('content는 문자열이어야 합니다.'),
    body('file_url')
        .optional()
        .isURL().withMessage('file_url은 유효한 URL이어야 합니다.'),
    body('isDeleted')
        .optional()
        .isInt({ min: 0, max: 1 }).withMessage('isDeleted는 0 또는 1이어야 합니다.')
];

// 자료 삭제 시 검증 규칙
const deleteResourceValidator = [
    param('id')
        .isInt().withMessage('id는 숫자이어야 합니다.')
];

module.exports = {
    createResourceValidator,
    getResourcesValidator,
    updateResourceValidator,
    deleteResourceValidator
};
