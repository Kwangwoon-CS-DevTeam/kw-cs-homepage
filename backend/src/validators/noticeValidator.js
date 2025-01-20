const { query, body } = require('express-validator');

const validateNoticesQuery = [
    query('category')
        .optional()
        .isString().withMessage('카테고리는 문자열이어야 합니다.')
        .isIn(['important', 'event']).withMessage('카테고리는 "important" 또는 "event"만 허용됩니다.'),
    query('page')
        .exists().withMessage('Page는 필수 값입니다.') // 필수 값으로 지정
        .isInt({ min: 1}).withMessage('Page는 1 이상의 정수여야 합니다.')
        .toInt(), // 문자열을 숫자로 변환
    query('size')
        .exists().withMessage('Size는 필수 값입니다.') // 필수 값으로 지정
        .isInt({ min: 1, max: 10 }).withMessage('Size는 1 이상, 10이하의 정수여야 합니다.')
        .toInt(),
];

const validateCreateNotice = [
    body('category')
        .exists().withMessage('Category는 필수 값입니다.')
        .isString().withMessage('Category는 문자열이어야 합니다.')
        .isIn(['important', 'event']).withMessage('Category는 "important" 또는 "event"만 허용됩니다.'),
    body('title')
        .exists().withMessage('Title은 필수 값입니다.')
        .isString().withMessage('Title은 문자열이어야 합니다.')
        .isLength({ min: 1, max: 255 }).withMessage('Title은 1~255자 이내여야 합니다.'),
    body('content')
        .exists().withMessage('Content는 필수 값입니다.')
        .isString().withMessage('Content는 문자열이어야 합니다.'),
    body('url')
        .optional()
        .isURL().withMessage('URL은 유효한 URL이어야 합니다.'),
    body('max_participants')
        .custom((value, { req }) => {
            if (req.body.url && (value === undefined || value === null)) {
                throw new Error('URL이 있는 경우 max_participants는 필수입니다.');
            }
            if (!req.body.url && value !== undefined) {
                throw new Error('URL이 없는 경우 max_participants를 제공하면 안 됩니다.');
            }
            return true;
        })
        .toInt(),
    body('current_participants')
        .default(0) // 기본값을 0으로 설정
        .toInt(),
];

module.exports = {
    validateNoticesQuery,
    validateCreateNotice
};