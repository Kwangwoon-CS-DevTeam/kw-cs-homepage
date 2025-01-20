const express = require("express");
const router = express.Router();
const resourcesController = require("../controllers/resourcesController"); // 컨트롤러 가져오기
const validateRequest = require("../middlewares/validationMiddleware"); // 유효성 검사 미들웨어
const {
    createResourceValidator,
    getResourcesValidator,
    updateResourceValidator,
    deleteResourceValidator,
} = require("../validators/resourceValidator");

// 1. 자료 등록
router.post("/new-resource", createResourceValidator, validateRequest, resourcesController.createResource);

// 2. 자료 목록 조회 (페이징 포함) 및 특정 카테고리 조회
router.get("/", getResourcesValidator, validateRequest, resourcesController.getResources);

// 4. 자료 다운로드
router.get("/:id/download", resourcesController.downloadResource);

// 5. 자료 수정
router.put("/new-resource/:id", updateResourceValidator, validateRequest, resourcesController.updateResource);

// 6. 자료 삭제 (소프트 삭제)
router.delete("/:id/delete", deleteResourceValidator, validateRequest, resourcesController.deleteResource);

//관리자 인증 기능이 만들어지면, 추후 보완 예정. (1, 3, 6번 관리자 기능 추가 필요함)

module.exports = router;
