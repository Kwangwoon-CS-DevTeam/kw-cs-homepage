const authService = require("../services/authService");

exports.login = async (req, res) => {
    try {
        const { id, password } = req.body;

        // 로그인 처리
        /**
         * 반환값: jwt 토큰
         * */
        const token = await authService.login(id, password);

        // 성공 응답
        res.status(200).json({ message: "로그인 성공", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
};
