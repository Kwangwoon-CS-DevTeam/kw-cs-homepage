const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

// S3 설정
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
});

// S3 버킷 목록 출력
s3.listBuckets((err, data) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("S3 Buckets:", data.Buckets);
    }
});

// Multer S3 스토리지 설정
const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE, // Content-Type 자동 설정
        key: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, `uploads/${uniqueSuffix}-${file.originalname}`); // S3 내 저장 경로
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("이미지 파일만 업로드 가능합니다."), false);
        }
    },
});

module.exports = upload;