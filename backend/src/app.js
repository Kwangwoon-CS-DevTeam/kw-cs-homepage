require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const sequelize = require("./db"); // Sequelize 인스턴스 가져오기
const ResourcesRoutes = require("./controllers/ResourcesController");
require("./models"); // 관계가 정의된 모델 불러오기 (객체로 묶을 필요 없음)

const app = express();

// JSON 파싱 미들웨어 추가
app.use(express.json());

// Swagger UI 세팅
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Resources 관련 라우트
app.use("/api/resources", ResourcesRoutes);

// 테이블 동기화
(async () => {
    try {
        // 테이블이 없을 경우 생성
        await sequelize.sync({ alter: true }); // { force: true }로 설정 시 기존 데이터 삭제 후 재생성
        console.log("All tables synced successfully.");
    } catch (error) {
        console.error("Error syncing tables:", error);
    }
})();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

const Admin = require("./models/Admin"); // Admin 모델 가져오기

/*
테스트를 위한 관리자 ID생성
*/
async function createAdmin() {
    try {
        const admin = await Admin.create({
            id: "admin123", // 관리자 ID (고유 값)
            password: "securepassword", // 비밀번호
            department: "Computer Science", // 부서
        });
        console.log("Admin created:", admin);
    } catch (error) {
        console.error("Error creating admin:", error);
    }
}

// 실행
createAdmin();
