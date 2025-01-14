const express = require("express");
const router = express.Router();
const Resources = require("../models/Resources"); // Sequelize 모델 (Resources 테이블에 대한 모델)

/**
 * @swagger
 * /api/resources:
 *   post:
 *     summary: Create a new resource
 *     description: Adds a new resource to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - admin_id
 *               - title
 *             properties:
 *               admin_id:
 *                 type: string
 *                 description: The ID of the admin creating the resource.
 *               title:
 *                 type: string
 *                 description: The title of the resource.
 *               content:
 *                 type: string
 *                 description: The content of the resource.
 *               file_url:
 *                 type: string
 *                 description: The URL of the file associated with the resource.
 *               isDeleted:
 *                 type: integer
 *                 description: 0 if the resource is not deleted, 1 if deleted.
 *             example:
 *               admin_id: "admin123"
 *               title: "Sample Resource"
 *               content: "This is a sample content."
 *               file_url: "http://example.com/resource.pdf"
 *               isDeleted: 0
 *     responses:
 *       201:
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Invalid input
 */
router.post("/", async (req, res) => {
    try {
        const resource = await Resources.create(req.body); // 새로운 자료 생성
        res.status(201).json(resource); 
    } catch (error) {
        res.status(400).json({ error: error.message }); // 오류 발생 시 에러 메시지 반환
    }
});

/**
 * @swagger
 * /api/resources:
 *   get:
 *     summary: Get list of resources
 *     description: Retrieves a list of resources, with optional filters for category and pagination.
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter resources by category
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of resources per page
 *     responses:
 *       200:
 *         description: List of resources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *       500:
 *         description: Error fetching resources
 */
router.get("/", async (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;
    try {
        const whereClause = { isDeleted: 0 }; // 삭제되지 않은 자료만 조회
        if (category) whereClause.category = category; // 카테고리 필터링

        const resources = await Resources.findAll({
            where: whereClause,
            offset: (page - 1) * limit, 
            limit: parseInt(limit), // 한 페이지에 표시할 자료 수
        });
        res.json(resources); // 조회된 자료 목록 반환
    } catch (error) {
        res.status(500).json({ error: error.message }); // 오류 발생 시 에러 메시지 반환
    }
});

/**
 * @swagger
 * /api/resources/{id}/download:
 *   get:
 *     summary: Download a resource file
 *     description: Downloads the file associated with the specified resource.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the resource to download
 *     responses:
 *       302:
 *         description: Redirect to file download URL
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Error processing request
 */
router.get("/:id/download", async (req, res) => {
    try {
        const resource = await Resources.findByPk(req.params.id); 
        if (!resource || resource.isDeleted) { // 자료가 없거나 삭제된 경우
            return res.status(404).send("자료를 찾을 수 없습니다.");
        }
        res.redirect(resource.file_url); 
    } catch (error) {
        res.status(500).json({ error: error.message }); // 오류 발생 시 에러 메시지 반환
    }
});

/**
 * @swagger
 * /api/resources/{id}:
 *   put:
 *     summary: Update an existing resource
 *     description: Modifies the details of an existing resource.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the resource to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               content:
 *                 type: string
 *               file_url:
 *                 type: string
 *               isDeleted:
 *                 type: integer
 *             example:
 *               title: "Updated Resource"
 *               category_id: 1
 *               content: "Updated content"
 *               file_url: "http://example.com/updated-resource"
 *               isDeleted: 0
 *     responses:
 *       200:
 *         description: Resource updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found
 *       400:
 *         description: Invalid input
 */
router.put("/:id", async (req, res) => {
    try {
        const resource = await Resources.findByPk(req.params.id); 
        if (!resource || resource.isDeleted) { 
            return res.status(404).send("자료를 찾을 수 없습니다.");
        }
        await resource.update(req.body); 
        res.json(resource); 
    } catch (error) {
        res.status(400).json({ error: error.message }); // 오류 발생 시 에러 메시지 반환
    }
});

/**
 * @swagger
 * /api/resources/{id}:
 *   delete:
 *     summary: Soft delete a resource
 *     description: Marks a resource as deleted without actually removing it from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the resource to delete
 *     responses:
 *       200:
 *         description: Resource deleted successfully
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Error deleting resource
 */
// 자료 소프트 삭제
router.delete("/:id", async (req, res) => {
    try {
        const resource = await Resources.findByPk(req.params.id); 
        if (!resource || resource.isDeleted) { 
            return res.status(404).send("자료를 찾을 수 없습니다.");
        }
        await resource.update({ isDeleted: 1 }); // 소프트 삭제 처리
        res.send("자료가 삭제되었습니다.");
    } catch (error) {
        res.status(500).json({ error: error.message }); // 오류 발생 시 에러 메시지 반환
    }
});

module.exports = router;
