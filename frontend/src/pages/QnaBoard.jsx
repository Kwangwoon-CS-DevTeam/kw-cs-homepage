import { useState, useRef } from "react";
import NavbarBlack from "../components/NavbarBlack.jsx";
import FooterBlack from "../components/FooterBlack.jsx";
import NoticeHeader from "../components/NoticeHeader.jsx";
import { ChevronUpIcon, ChevronDownIcon } from "../components/icons/Chevron";

export default function QnaBoard() {
    const questions = Array.from({ length: 16 }, (_, index) => ({
        id: 2250 + index,
        content: `질문 내용 ${index + 1}`,
        date: `2024.12.${(index + 1).toString().padStart(2, "0")}`,
        answer: index % 2 === 0 ? "답변 내용입니다." : "", // 짝수 ID는 답변이 있음
    }));

    const [openIndex, setOpenIndex] = useState(null);
    const [isWriting, setIsWriting] = useState(false); // 질문 작성 중인지 여부
    const [newQuestion, setNewQuestion] = useState(""); // 새 질문 내용
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 7;
    const listRef = useRef(null); // 질문 리스트 참조

    // 현재 페이지 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentQuestions = questions.slice(indexOfFirstItem, indexOfLastItem);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(questions.length / itemsPerPage);

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleWriteClick = () => {
        setIsWriting((prev) => !prev); // 작성 중 상태 토글
    };

    const handleSubmit = () => {
        if (newQuestion.trim() === "") {
            alert("질문 내용을 입력해주세요.");
            return;
        }

        alert(`질문 제출됨: ${newQuestion}`);
        setNewQuestion(""); // 입력 필드 초기화
        setIsWriting(false); // 작성 상태 종료
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (listRef.current) {
            listRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative bg-white min-h-screen">
            <NavbarBlack />

            <NoticeHeader title={"Q&A"} sub={"궁금한 것들을 자유롭게 물어보세요:)"} />

            {/* 질문 리스트 */}
            <div ref={listRef} className="container mx-auto px-4 py-8 relative">
                {currentQuestions.map((q, index) => (
                    <div
                        key={q.id}
                        className="border border-neutral-200 rounded-lg p-4 mb-4"
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex space-x-4 items-center">
                                <span className="text-sm text-neutral-400">{q.id}</span>
                                <span className="text-base font-medium">{q.content}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">{q.date}</span>
                                <button
                                    onClick={() => toggleAnswer(index)}
                                    className="text-blue-500 px-4 py-1 rounded transition flex items-center hover:text-blue-700"
                                >
                                    {openIndex === index ? (
                                        <ChevronUpIcon className="w-5 h-5" />
                                    ) : (
                                        <ChevronDownIcon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                        {openIndex === index && (
                            <div className="mt-4 text-gray-700">
                                {q.answer ? (
                                    <p className="text-blue-900">{q.answer}</p>
                                ) : (
                                    <span className="font-semibold text-neutral-400">답변을 기다리고있어요!</span>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {/* 페이지네이션 */}
                <div className="container mx-auto px-4 py-4 pb-16 flex justify-center">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`mx-1 px-3 py-1 rounded-lg ${
                                currentPage === index + 1
                                    ? "bg-blue-900 text-white"
                                    : "text-gray-500 bg-gray-200 hover:bg-gray-300"
                            }`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                {/* 질문하기 버튼과 작성 영역 */}
                {isWriting ? (
                    <div className="border border-blue-500 rounded-lg p-4 mt-8">
                        <textarea
                            className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            placeholder="질문 내용을 입력하세요..."
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2 bg-blue-900 text-white font-medium rounded-lg shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                제출
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={handleWriteClick}
                        className="px-6 py-2 bg-blue-900 text-white font-medium rounded-lg shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        질문하기
                    </button>
                )}
            </div>

            <FooterBlack />
        </div>
    );
}