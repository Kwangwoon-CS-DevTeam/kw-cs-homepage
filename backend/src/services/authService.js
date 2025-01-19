const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin"); // Sequelize 모델
require("dotenv").config(); // .env 파일에서 환경 변수 로드

exports.login = async (id, password) => {
    // 사용자 조회
    const admin = await Admin.findOne({ where: { id } });

    if (!admin) {
        throw new Error("사용자를 찾을 수 없습니다.");
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
        throw new Error("비밀번호가 일치하지 않습니다.");
    }

    // JWT 토큰 생성
    const token = jwt.sign(
        { id: admin.id, role: admin.department },
        process.env.JWT_SECRET,
        { expiresIn: "5h" }
    );

    return token;
};