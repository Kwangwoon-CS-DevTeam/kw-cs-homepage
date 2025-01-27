const axios = require("axios");
const Resources = require("../models/Resources"); // Sequelize 모델

/**
 * @swagger
 * /api/resources/new-resource:
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
exports.createResource = async (req, res) => {
    try {
        const data = req.body;
        data.admin_id = req.user.id;
        const resource = await Resources.create(req.body); // 새로운 자료 생성
        res.status(201).json(resource); // 생성된 자료 반환
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message }); // 오류 발생 시 에러 메시지 반환
    }
};

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
exports.getResources = async (req, res) => {
    const { page = 1, limit = 5, category } = req.query; // 페이지, 항목 수, 카테고리 필터
    const offset = (page - 1) * limit;

    try {
        // 조건 설정
        const whereClause = { isDeleted: 0 };
        if (category) {
            whereClause.category = category;
        }

        // 데이터 및 총 개수 조회
        const { rows: resources, count } = await Resources.findAndCountAll({
            where: whereClause,
            offset: offset,
            limit: limit,
            order: [["created_at", "DESC"]], // 최신순 정렬
        });

        // 응답 데이터 구성
        res.json({
            total: count,       // 전체 자료 수
            page: page, // 현재 페이지
            size: limit, // 페이지당 항목 수
            resources,          // 데이터 배열
        });
    } catch (error) {
        res.status(500).json({ error: error.message }); // 오류 처리
    }
};

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
exports.downloadResource = async (req, res) => {
    try {
        const resource = await Resources.findByPk(req.params.id); 
        if (!resource || resource.isDeleted) { // 자료가 없거나 삭제된 경우
            return res.status(404).send("자료를 찾을 수 없습니다.");
        }

        // 외부 파일 URL 가져오기
        const fileUrl = resource.file_url;

        // Axios를 사용하여 외부 URL에서 데이터 가져오기
        const response = await axios.get(fileUrl, { responseType: 'stream' });

        // 외부 리소스를 클라이언트에 스트림으로 전달
        res.setHeader('Content-Type', response.headers['content-type']);
        response.data.pipe(res);
    } catch (error) {
        console.error('Error fetching the resource:', error);
        res.status(500).json({ error: '리소스를 가져오는 도중 문제가 발생했습니다.' });
    }
};

/**
 * @swagger
 * /api/resources/new-resource/{id}:
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
exports.updateResource = async (req, res) => {
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
};

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
exports.deleteResource = async (req, res) => {
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
};

