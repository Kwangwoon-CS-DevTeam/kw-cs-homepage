import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarBlack from "../components/NavbarBlack.jsx";
import FooterBlack from "../components/FooterBlack.jsx";

const QnaDetailPage = () => {
    const { id } = useParams(); // URL의 {id} 가져오기
    const [question, setQuestion] = useState({});
    const [showPasswordInput, setShowPasswordInput] = useState(null); // null: 입력창 안보임, "delete": 삭제, "edit": 수정
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // 질문 데이터 가져오기
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/qna/${id}`);
                setQuestion(response.data);
            } catch (error) {
                console.error("Error fetching question details:", error);
            }
        };

        fetchQuestion();
    }, [id]);

    // 비밀번호 검증 함수
    const validatePassword = async () => {
        if (password.length <= 3) {
            alert("비밀번호는 최소 4자리 이상이어야 합니다.");
            setShowPasswordInput(null);
            return false;
        }
        if (isNaN(password)) {
            alert("비밀번호는 숫자여야 합니다.");
            setShowPasswordInput(null);
            return false;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/qna/validate-password`, {
                id,
                password,
            });
            return response.status === 200; // 비밀번호 검증 성공 여부 반환
        } catch (error) {
            alert("비밀번호가 올바르지 않습니다.");
            setShowPasswordInput(null);
            return false;
        }
    };

// 질문 삭제 요청
    const handleDelete = async () => {
        if (password.length <= 3) {
            alert("비밀번호는 최소 4자리 이상이어야 합니다.");
            setShowPasswordInput(null);
            return;
        }
        if (isNaN(password)) {
            alert("비밀번호는 숫자여야 합니다.");
            setShowPasswordInput(null);
            return;
        }

        const isValid = await validatePassword();
        if (isValid) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/qna/delete/${id}`, {
                    data: { password }, // 비밀번호 포함
                });
                alert("질문이 성공적으로 삭제되었습니다.");
                navigate("/qna"); // 삭제 후 목록 페이지로 이동
            } catch (error) {
                console.error("Error deleting question:", error);
                alert("삭제에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

// 질문 수정 요청
    const handleEdit = async () => {
        if (password.length <= 3) {
            alert("비밀번호는 최소 4자리 이상이어야 합니다.");
            setShowPasswordInput(null);
            return;
        }
        if (isNaN(password)) {
            alert("비밀번호는 숫자여야 합니다.");
            setShowPasswordInput(null);
            return;
        }

        const isValid = await validatePassword();
        if (isValid) {
            navigate(`/qna/new-question/${id}`); // 비밀번호 검증 후 수정 페이지로 이동
        }
    };

    return (
        <div>
            <NavbarBlack />
            <div className="container mx-auto mt-10 px-4">
                <h1 className="text-3xl font-bold mb-6">Q&A</h1>

                {/* 질문 상세 내용 */}
                <div className="bg-white shadow-[0_0_6px_rgba(0,0,0,0.25)] rounded-lg p-6 mb-6">
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

                {/* 삭제 및 수정 버튼 또는 비밀번호 입력창 */}
                {showPasswordInput === null ? (
                    <div className="flex justify-end space-x-4 mt-4 mb-56">
                        <button
                            className="px-8 py-2 border border-gray-700 text-gray-700 rounded-full hover:bg-gray-100 transition"
                            onClick={() => setShowPasswordInput("delete")}
                        >
                            삭제
                        </button>
                        <button
                            className="px-8 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
                            onClick={() => setShowPasswordInput("edit")}
                        >
                            수정
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-end mt-4 mb-56">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-32 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="비밀번호"
                        />
                        {showPasswordInput === "delete" ? (
                            <button
                                className="ml-4 px-6 py-2 border-black border-[1px] text-black rounded-lg hover:bg-neutral-700 hover:text-white transition"
                                onClick={handleDelete}
                            >
                                확인
                            </button>
                        ) : (
                            <button
                                className="ml-4 px-6 py-2 text-black border-[1px] border-black rounded-lg hover:bg-neutral-700 hover:text-white transition"
                                onClick={handleEdit}
                            >
                                확인
                            </button>
                        )}
                    </div>
                )}
            </div>
            <FooterBlack />
        </div>
    );
};

export default QnaDetailPage;