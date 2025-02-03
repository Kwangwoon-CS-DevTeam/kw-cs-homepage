const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
    try {
        // 요청 헤더에서 토큰 가져오기
        const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>" 형식

        if (!token) {
            return res.status(401).json({ message: "토큰이 제공되지 않았습니다." });
        }

        // 토큰 검증
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // 검증된 사용자 정보를 요청 객체에 추가

        next(); // 다음 미들웨어 또는 컨트롤러로 이동
    } catch (error) {
        console.error("토큰 검증 실패:", error.message);
        return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    }
};

module.exports = verifyAuth;