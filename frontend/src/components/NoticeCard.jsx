import PropTypes from "prop-types";
import {useEffect, useState} from "react"; // PropTypes 임포트
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import { motion } from "framer-motion"; // Framer Motion 임포트
import apiClient from "../api/axiosClient.js";

// components/NoticeCard.jsx
export default function NoticeCard({ id, category, title, excerpt, admin_id, created_at, url }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // navigate 훅 사용

    // 삭제 요청 함수
    const handleDelete = async (e) => {
        // 이벤트 버블링 방지: 버튼 클릭 시 상위 링크 등으로 이벤트 전달 차단
        e.stopPropagation();
        try {
            // DELETE 요청 보내기
            await apiClient.delete(`/notices/${id}/delete`);
            alert("삭제 성공했습니다.");
            window.location.reload();
        } catch (error) {
            console.error("삭제 실패:", error);
            alert("삭제에 실패했습니다. 다시 시도해주세요.");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // 카테고리 색상 설정
    const categoryBgColor =
        category === "총학"
            ? `bg-연보라 text-white`
            : `bg-밝은파랑 text-white`;

    return (
        <div className="relative bg-white p-6 py-6 rounded-lg shadow-md hover:drop-shadow-lg transition-shadow">
            {/* 카드 전체를 감싸는 링크 */}
            <a
                href={`/notices/${id}`} // 상세 페이지 링크
                className="absolute inset-0 z-0"
                style={{ textDecoration: "none" }}
            ></a>

            {/* 카드 내용 */}
            <div className="relative pointer-events-none">
                <div className="flex items-center justify-between mb-3">
                    {/* 왼쪽: 카테고리와 제목 */}
                    <div className="flex items-center">
                        <span
                            className={`text-sm font-semibold px-3 py-1 rounded ${categoryBgColor} whitespace-nowrap flex-shrink-0`}
                        >
                            {category}
                        </span>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 ml-2.5 leading-snug">
                            {title}
                        </h2>
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
                                    navigate(`/notices/new-notice/${id}`); // 수정 페이지로 이동
                                }}
                            >
                                수정
                            </button>
                        </div>
                    )}
                </div>

                {/* 내용 요약 */}
                <p className="text-gray-600 text-sm">{excerpt}</p>

                {/* 작성자 및 날짜 */}
                <div className="text-blue-900 text-xs mt-4">
                    <div className="mb-1">
                        <span className="font-semibold">AUTHOR:</span> {admin_id}
                    </div>
                    <div>
                        <span className="font-semibold">DATE:</span> {created_at.split("T")[0]}
                    </div>
                </div>
            </div>

            {/* 신청하기 버튼 */}
            {url && (
                <motion.a
                    href={
                        url.startsWith("http://") || url.startsWith("https://")
                            ? url
                            : `https://${url}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 mt-4 inline-block text-blue-700 font-semibold pointer-events-auto"
                    whileHover={{
                        scale: [1, 1.05, 0.95, 1.02, 1],
                        transition: {duration: 0.5, ease: "easeOut"},
                    }}
                >
                    신청하기 →
                </motion.a>
            )}
        </div>
    );
}

// PropTypes 정의
NoticeCard.propTypes = {
    category: PropTypes.string.isRequired, // 반드시 문자열이어야 함
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired, // 새로 추가된 요약 필드
    admin_id: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired, // 날짜 추가
    url: PropTypes.string.isRequired,
};