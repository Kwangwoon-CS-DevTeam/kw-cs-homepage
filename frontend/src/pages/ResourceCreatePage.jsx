import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import NavbarBlack from "../components/NavbarBlack.jsx";
import FooterBlack from "../components/FooterBlack.jsx";

import axios from "axios";
import apiClient from "../api/axiosClient.js";
import {useCheckAuth} from "../api/auth.js";

export default function ResourceCreatePage() {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "전공", // 기본값
        provider: "",
        subject: "",
        file_url: "",
    });

    const checkAuth = useCheckAuth(); // useCheckAuth 훅 호출

    useEffect(() => {
        checkAuth(); // 인증 확인
    }, []);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post(`${import.meta.env.VITE_API_URL}/resources/new-resource`, formData);
            alert("자료가 성공적으로 등록되었습니다.");
            navigate("/resources");
        } catch (error) {
            console.error("자료 등록 중 오류 발생:", error);
            alert("자료 등록에 실패했습니다.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">

            <NavbarBlack />

            <div className="min-h-screen flex flex-col flex-grow px-80 py-12">
                <h1 className="text-2xl font mb-10">자료실 작성</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 제목 입력 */}
                    <div>
                        <label htmlFor="title" className="text-sm block mb-2">
                            제목
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="제목을 입력하세요"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* 내용 입력 */}
                    <div>
                        <label htmlFor="content" className="text-sm block mb-2">
                            내용
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="내용을 입력하세요"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            rows="5"
                            required
                        ></textarea>
                    </div>

                    {/* 카테고리 선택 */}
                    <div>
                        <label htmlFor="category" className="text-sm block mb-2">
                            카테고리
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        >
                            <option value="전공">전공</option>
                            <option value="교양">교양</option>
                        </select>
                    </div>

                    {/* 제공자 입력 */}
                    <div>
                        <label htmlFor="provider" className="text-sm block mb-2">
                            제공자
                        </label>
                        <input
                            type="text"
                            id="provider"
                            name="provider"
                            value={formData.provider}
                            onChange={handleChange}
                            placeholder="제공자를 입력하세요"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* 과목 입력 */}
                    <div>
                        <label htmlFor="subject" className="text-sm block mb-2">
                            과목
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="과목명을 입력하세요"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* 클라우드 주소 입력 */}
                    <div>
                        <label htmlFor="file_url" className="text-sm block mb-2">
                            클라우드 주소
                        </label>
                        <input
                            type="url"
                            id="file_url"
                            name="file_url"
                            value={formData.file_url}
                            onChange={handleChange}
                            placeholder="http://example.com/resource.pdf"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* 제출 버튼 */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            등록하기
                        </button>
                    </div>
                </form>
            </div>

            <FooterBlack />
        </div>
    );
}