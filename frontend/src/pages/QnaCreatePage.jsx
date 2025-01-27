import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarBlack from "../components/NavbarBlack.jsx";
import FooterBlack from "../components/FooterBlack.jsx";

const QnaCreatePage = () => {
    const [title, setTitle] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [question, setQuestion] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            // 비밀번호 유효성 검사
            if (password.length != 4) {
                alert("비밀번호 4자리를 입력해주세요.");
                return;
            }

            if (isNaN(password)) {
                alert("비밀번호는 숫자여야 합니다.");
                return;
            }

            // 서버로 POST 요청 보내기
            await axios.post(`${import.meta.env.VITE_API_URL}/qna/new-question`, {
                title,
                nickname,
                password,
                question,
            });
            alert("질문이 등록되었습니다.");
            // 성공 시 /qna로 이동
            navigate("/qna");
        } catch (error) {
            console.error("Error submitting question:", error);
            alert("질문 등록에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleCancel = () => {
        // /qna로 이동
        navigate("/qna");
    };

    return (
        <div>
            <NavbarBlack />
            <div className="container mx-auto mt-10 px-4 border-t">

                <h1 className="text-3xl font-bold mb-6 mt-6 max-w-3xl mx-auto">1:1 질문하기</h1>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-gray-300 rounded-3xl p-6 max-w-3xl mx-auto"
                >
                    <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
                        <span>모든 질문은 공개입니다 :)</span>
                        <span>모든 항목 필수</span>
                    </div>
                    <div className="border-t border-black border-[1px] mb-6"></div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">
                            제목
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목을 입력하세요."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">
                            작성자
                        </label>
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="에: 다니엘"
                            className="w-24 sm:w-1/4 px-2 py-2 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">
                            비밀번호 (수정용)
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="예: 1234"
                            className="w-24 sm:w-1/4 px-2 py-2 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm mb-2">
                            질문 내용
                        </label>
                        <textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="실명 혹은 누구인지 특정 지을 수 있는 정보는 포함시키지 마세요."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 h-64"
                            rows="7"
                            maxLength="300"
                            required
                        />
                        <div className="text-sm text-gray-500 mt-1">
                            {`${question.length} / 300`}
                        </div>
                    </div>
                    <div className="flex justify-center space-x-4 mt-20">
                        <button
                            type="button"
                            onClick={handleCancel}
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
            <FooterBlack/>
        </div>
    );
};

export default QnaCreatePage;