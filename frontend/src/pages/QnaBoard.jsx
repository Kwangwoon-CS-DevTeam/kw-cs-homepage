import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarBlack from "../components/NavbarBlack.jsx";
import FooterBlack from "../components/FooterBlack.jsx";
import QnACard from "../components/QnaCard.jsx";
import axios from "axios";
import NoticeHeader from "../components/NoticeHeader.jsx";
import LoadingPage from "./LoadingPage.jsx";

const QnAPage = () => {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const pageSize = 10;

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // URL 쿼리에 page와 size 추가
        const searchParams = new URLSearchParams(location.search);
        const currentPage = parseInt(searchParams.get("page")) || 1;
        const currentSize = parseInt(searchParams.get("size")) || pageSize;

        if (!searchParams.has("page") || !searchParams.has("size")) {
            searchParams.set("page", currentPage);
            searchParams.set("size", currentSize);
            navigate(`/qna?${searchParams.toString()}`, { replace: true });
        }

        setPage(currentPage);
    }, [location.search, navigate]);

    useEffect(() => {
        // 서버에서 데이터 가져오기
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/qna`, {
                    params: { page, size: pageSize },
                });
                setQuestions(response.data.questions);
                setTotalPages(Math.ceil(response.data.total / pageSize)); // 전체 페이지 계산
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching Q&A data:", error);
            }
        };

        fetchQuestions();
    }, [page]); // 페이지 변경 시 데이터 가져오기

    const handlePageChange = (newPage) => {
        setPage(newPage);
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", newPage);
        navigate(`/qna?${searchParams.toString()}`);
    };

    const handleNewQuestionClick = () => {
        navigate("/qna/new-question");
    };

    return (
        <>
            {isLoading ? (
                <LoadingPage /> // 로딩 상태일 때 로딩 페이지 표시
            ) : (
                <div>
                    <NavbarBlack/>

                    <NoticeHeader title={"Q&A"} sub={"궁금한 것들을 자유롭게 물어보세요:)"}/>

                    <div className="container mx-auto mt-10">
                        <div className="space-y-3.5 py-4">
                            {questions.length > 0 ? questions.map((q) => (
                                <QnACard key={q.id} data={q}/>
                            )) : (
                                <p className="text-center text-gray-500">질문이 없습니다.</p>
                            )}
                        </div>

                        {/* 글쓰기 버튼 */}
                        <div className="container mx-auto px-4 py-4">
                            <button
                                className="px-4 py-2 bg-blue-900 text-white rounded-lg shadow-lg hover:bg-blue-800"
                                onClick={handleNewQuestionClick}
                            >
                                질문하기
                            </button>
                        </div>

                        {/* 페이지네이션 */}
                        <div className="container mx-auto px-4 py-4 pb-16 flex justify-center">
                            {Array.from({length: totalPages}, (_, index) => (
                                <button
                                    key={index + 1}
                                    className={`mx-1 px-3 py-1 rounded-lg ${
                                        page === index + 1
                                            ? "bg-blue-900 text-white"
                                            : "text-gray-500 bg-gray-200 hover:bg-gray-300"
                                    }`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>


                    <FooterBlack/>
                </div>
            )}
        </>
    );
};

export default QnAPage;