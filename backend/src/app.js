require("dotenv").config();
const express = require("express");
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const sequelize = require("./db"); // Sequelize 인스턴스 가져오기
const noticeRoutes = require('./routes/noticeRoutes');
const ResourcesRoutes = require("./routes/resourcesRoutes");
const QuestionsRoutes = require("./routes/questionsRoutes");
const authRoutes = require('./routes/authRoutes');
require('./models'); // 관계가 정의된 모델 불러오기 (객체로 묶을 필요 없음)


const app = express();

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173", "https://www.kwangwoon-cie.com", "https://kwangwoon-cie.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Swagger UI 세팅
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Resources 관련 라우트
app.use("/api/resources", ResourcesRoutes);

// Q&A 관련 라우트
app.use("/api/qna", QuestionsRoutes);

// Auth/admin 라우터
app.use('/api/auth', authRoutes);

// Notice 라우터
app.use('/api/notices', noticeRoutes);

// 테이블 동기화
(async () => {
    try {
        // 테이블이 없을 경우 생성
        await sequelize.sync({ alter: false }); // { force: true }로 설정 시 기존 데이터 삭제 후 재생성
        console.log('All tables synced successfully.');
    } catch (error) {
        console.error('Error syncing tables: ', error);
    }
})();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.API_URL}`);
});
