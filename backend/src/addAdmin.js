const bcrypt = require("bcrypt");
const Admin = require("./models/Admin"); // Admin 모델 경로에 맞게 수정하세요.
const sequelize = require("./db"); // DB 연결 인스턴스
require("dotenv").config(); // .env 파일에서 환경 변수 로드

(async () => {
    try {
        // 데이터베이스 동기화
        await sequelize.sync();
        console.log("Database synchronized successfully.");

        // 수동으로 입력할 관리자 정보
        const adminData = {
            id: "kwcie_hq", // 아이디를 입력하세요
            password: "KwCieOps406!", // 비밀번호를 입력하세요
            department: "운영국", // 관리자 소속
            created_at: Date.now(),
        };

        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(adminData.password, 10);

        console.log(hashedPassword);

        // 데이터베이스에 관리자 추가
        const newAdmin = await Admin.create({
            id: adminData.id,
            password: hashedPassword,
            department: adminData.department,
        });

        console.log("관리자 계정이 성공적으로 추가되었습니다:", newAdmin.id);
    } catch (error) {
        console.error("관리자 추가 중 오류가 발생했습니다:", error);
    } finally {
        process.exit(); // 스크립트 종료
    }
})();