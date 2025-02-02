import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {useEffect, useState} from "react"; // PropTypes 임포트
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axiosClient.js"; // useNavigate 임포트

// components/ResourceCard.jsx
export default function ResourceCard({id, category, subject, title, content, provider, created_at, file_url }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // navigate 훅 사용

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // handleDelete 핸들러 정의
    const handleDelete = async () => {
        try {
            await apiClient.delete(`/resources/${id}/delete`);
            alert("삭제되었습니다.");
            window.location.reload();
        } catch (error) {
            console.error('요청 중 에러 발생:', error);
        }
    };

    const categoryBgColor =
        category === "교양"
            ? "bg-연보라 text-white"
            : "bg-밝은파랑 text-white";

    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:drop-shadow-lg transition-shadow">
            {/* 카드 내용 */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    {/* 왼쪽: 카테고리와 제목 */}
                    <div className="flex items-center">
                        <span className={`text-sm font-semibold px-3 py-1 rounded ${categoryBgColor}`}>
                            {category}
                        </span>
                        <h2 className="text-xl font-bold text-gray-800 ml-2.5">{title}</h2>
                    </div>

                    {/* 오른쪽: 삭제 및 수정 버튼 */}
                    {isLoggedIn && (
                        <div className="flex space-x-2 pointer-events-auto">
                            <button
                                className="text-sm text-red-500 hover:underline"
                                onClick={handleDelete}
                            >
                                삭제
                            </button>
                            <button
                                className="text-sm text-blue-500 hover:underline"
                                onClick={(e) => {
                                    e.stopPropagation(); // 이벤트 버블링 방지
                                    navigate(`/resources/new-resource/${id}`); // 수정 페이지로 이동 (경로는 실제 프로젝트에 맞게 수정)
                                }}
                            >
                                수정
                            </button>
                        </div>
                    )}
                </div>


                {/* 내용 요약 */}
                <p className="text-gray-600 text-sm mb-4">{content}</p>

                {/* 제공자 및 과목, 날짜 */}
                <div className="text-blue-900 text-xs">
                    <div className="mb-1">
                        <span className="font-semibold">제공자:</span> {provider}
                    </div>
                    <div className="mb-1">
                        <span className="font-semibold">과목:</span> {subject}
                    </div>
                    <div>
                        <span className="font-semibold">DATE:</span> {created_at.split("T")[0]}
                    </div>
                </div>
            </div>

            {/* 다운받기 버튼 */}
            <motion.a
                href={file_url} // 다운로드 링크
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 -ml-0.5 inline-flex items-center bg-blue-900 text-white font-medium px-2.5 py-1.5 text-sm rounded shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                whileHover="hover" // 부모 hover 상태를 "hover"로 지정
            >
                다운받기
                <motion.img
                    src="/images/downloadIconWhite.png"
                    alt="다운로드 아이콘"
                    className="w-4 h-4 ml-2"
                    initial={{rotate: 0}} // 초기 상태 지정
                    variants={{
                        hover: {
                            // 시소처럼 회전하는 애니메이션
                            rotate: [0, -15, 15, -15, 0],
                            transition: {duration: 0.5, ease: "easeInOut"}
                        }
                    }}
                />
            </motion.a>
        </div>
    );
}

// PropTypes 정의
ResourceCard.propTypes = {
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired, // 새로 추가된 요약 필드
    provider: PropTypes.string.isRequired, // 제공자
    subject: PropTypes.string.isRequired, // 과목
    created_at: PropTypes.string.isRequired, // 날짜 추가
    file_url: PropTypes.string.isRequired, // 링크 추가
};