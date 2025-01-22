import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarBlack from "../components/NavbarBlack.jsx";
import FooterBlack from "../components/FooterBlack.jsx";
import apiClient from "../api/axiosClient.js";

const AnswerCreatePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { question } = location.state; // QnaDetailPage에서 전달받은 질문 데이터
    const [answer, setAnswer] = useState("");

    // 답변 등록 요청
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (answer.trim().length === 0) {
            alert("답변 내용을 작성해주세요.");
            return;
        }

        try {
            await apiClient.put(`${import.meta.env.VITE_API_URL}/qna/answer/${question.id}`, {
                answer,
            });
            alert("답변이 성공적으로 등록되었습니다.");
            navigate("/qna");
        } catch (error) {
            console.error("Error submitting answer:", error);
            alert("답변 등록에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div>
            <NavbarBlack />
            <div className="container mx-auto mt-10 px-8">
                <h1 className="text-3xl font-bold mb-6">답변하기</h1>

                {/* 질문 정보 */}
                <div className="bg-white shadow-[0_0_6px_rgba(0,0,0,0.25)] rounded-lg p-6 mb-20 px-8">
                    <div className="px-7 mt-8">
                        {/* Title과 nickname, created_at 정렬 */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold">{question.title || "제목 없음"}</h2>
                            <div className="flex space-x-4 text-gray-500 text-sm">
                                <span>{question.nickname}</span>
                                <span>{new Date(question.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* 구분선 */}
                        <hr className="border-t border-[1px] border-neutral-500 my-2 mb-10" />

                        {/* 질문 내용 */}
                        <p className="text-gray-600 mb-4">{question.question}</p>
                    </div>
                </div>

                {/* 답변 작성 */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-base mb-2">
                            답변 내용
                        </label>
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="여기에 답변을 작성하세요."
                            className="w-full px-4 py-2 border-[1px] border-black rounded-lg focus:outline-none focus:ring focus:border-blue-300 h-64"
                            rows="7"
                            required
                        />
                    </div>

                    {/* 버튼 */}
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={() => navigate(-1)} // 이전 페이지로 이동
                            className="px-9 py-2 border border-gray-700 text-gray-700 rounded-full hover:bg-gray-100 transition"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-9 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
                        >
                            등록
                        </button>
                    </div>
                </form>
            </div>
            <FooterBlack />
        </div>
    );
};

export default AnswerCreatePage;