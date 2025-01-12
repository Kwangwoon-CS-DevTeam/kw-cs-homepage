const { query } = require('express-validator');

const noticeValidator = [
    query('category')
        .optional()
        .isString().withMessage('카테고리는 문자열이어야 합니다.')
        .isIn(['important', 'event']).withMessage('카테고리는 "important" 또는 "event"만 허용됩니다.'),
    query('page')
        .exists().withMessage('Page는 필수 값입니다.') // 필수 값으로 지정
        .isInt({ min: 1 }).withMessage('Page는 1 이상의 정수여야 합니다.')
        .toInt(), // 문자열을 숫자로 변환
    query('size')
        .exists().withMessage('Size는 필수 값입니다.') // 필수 값으로 지정
        .isInt({ min: 1 }).withMessage('Size는 1 이상의 정수여야 합니다.')
        .toInt(),
];



module.exports = { validateNoticesQuery: noticeValidator };