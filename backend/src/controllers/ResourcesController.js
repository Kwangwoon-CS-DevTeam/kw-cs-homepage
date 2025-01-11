const express = require("express");
const router = express.Router();
const Resources = require("../models/Resources"); // Sequelize 모델

// 자료 등록
router.post("/", async (req, res) => {
    try {
        const resource = await Resources.create(req.body);
        res.status(201).json(resource);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 자료 목록 조회 (페이징 포함)
router.get("/", async (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;
    try {
        const whereClause = { isDeleted: 0 };
        if (category) whereClause.category = category;

        const resources = await Resources.findAll({
            where: whereClause,
            offset: (page - 1) * limit,
            limit: parseInt(limit),
        });
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 자료 다운로드
router.get("/:id/download", async (req, res) => {
    try {
        const resource = await Resources.findByPk(req.params.id);
        if (!resource || resource.isDeleted) {
            return res.status(404).send("자료를 찾을 수 없습니다.");
        }
        res.redirect(resource.file_url); // 파일 다운로드 URL로 리다이렉트
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 자료 수정
router.put("/:id", async (req, res) => {
    try {
        const resource = await Resources.findByPk(req.params.id);
        if (!resource || resource.isDeleted) {
            return res.status(404).send("자료를 찾을 수 없습니다.");
        }
        await resource.update(req.body);
        res.json(resource);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 자료 삭제 (소프트 삭제)
router.delete("/:id", async (req, res) => {
    try {
        const resource = await Resources.findByPk(req.params.id);
        if (!resource || resource.isDeleted) {
            return res.status(404).send("자료를 찾을 수 없습니다.");
        }
        await resource.update({ isDeleted: 1 });
        res.send("자료가 삭제되었습니다.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
