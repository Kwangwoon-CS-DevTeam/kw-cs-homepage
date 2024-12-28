import { useState } from "react";
import NavbarBlack from "../components/NavbarBlack.jsx";
import FooterBlack from "../components/FooterBlack.jsx";
import NoticeHeader from "../components/NoticeHeader.jsx";
import { ChevronUpIcon, ChevronDownIcon } from '../components/icons/Chevron';

export default function QnaBoard() {
    const questions = [
        {
            id: 2261,
            content: "오발송 문자건",
            date: "2024.12.26",
            answer: "문자 관련하여 문제를 확인 중입니다.",
        },
        {
            id: 2260,
            content: "갑자기 입학취소 문자",
            date: "2024.12.26",
            answer: "",
        },
        {
            id: 2259,
            content: "문자",
            date: "2024.12.26",
            answer: "해당 내용은 담당 부서에 전달되었습니다.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);
    const [isWriting, setIsWriting] = useState(false); // 질문 작성 중인지 여부
    const [newQuestion, setNewQuestion] = useState(""); // 새 질문 내용

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

    return (
        <div className="relative bg-white min-h-screen">
            <NavbarBlack />

            <NoticeHeader title={"Q&A"} sub={"궁금한 것들을 자유롭게 물어보세요:)"} />

            <div className="container mx-auto px-4 py-8 relative">
                {questions.map((q, index) => (
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

                {/* 질문하기 버튼과 작성 영역 */}
                {isWriting ? (
                    <div
                        className={` rounded-lg p-4 ${
                            isWriting ? "animate-borderGradient" : ""
                        }`}
                    >
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

            <FooterBlack/>
        </div>
    );
}