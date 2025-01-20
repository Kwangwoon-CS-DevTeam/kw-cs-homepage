import NavbarBlack from "../components/NavbarBlack.jsx";
import NoticeCard from "../components/NoticeCard.jsx";
import FooterBlack from "../components/FooterBlack.jsx";
import NoticeHeader from "../components/NoticeHeader.jsx";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axiosClient"; // axiosClient를 import

export default function NoticeBoard() {
    const [notices, setNotices] = useState([]); // 공지사항 데이터
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
    const navigate = useNavigate(); // React Router 네비게이션 훅
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const categoryRef = useRef(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") || "1", 10); // 기본값 1
    const itemsPerPage = parseInt(searchParams.get("size") || "7", 10); // 기본값 7

    // 로그인 상태 확인
    useEffect(() => {
        const token = localStorage.getItem("jwt"); // 토큰 확인
        setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
    }, []);

    // Fetch Notices 부분 수정
    const fetchNotices = async () => {
        const category = searchParams.get("category");
        // 카테고리 쿼리 생성 (null일 경우 제외)
        const categoryQuery = category ? `&category=${category}` : "";
        const url = `${import.meta.env.VITE_API_URL}/notices?page=${currentPage}&size=${itemsPerPage}${categoryQuery}`;

        try {
            const response = await fetch(url);
            if (response.ok) {
                // axiosClient로 API 호출
                const response = await apiClient.get(url);
                const data = response.data;

                setNotices(data.notices || []);
                setTotalPages(Math.ceil(data.total / data.size));
            } else {
                console.error("Failed to fetch notices.");
            }
        } catch (error) {
            console.error("Failed to fetch notices:", error);
        }
    };

    // 선택된 카테고리 또는 페이지 변경 시 데이터 가져오기
    useEffect(() => {
        fetchNotices();
    }, [searchParams]); // searchParams가 변경될 때 fetchNotices 실행

    // 페이지 버튼 클릭 핸들러
    const handlePageChange = (pageNumber) => {
        setSearchParams({ page: pageNumber, size: itemsPerPage }); // URL에 쿼리 업데이트
        if (categoryRef.current) {
            categoryRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative bg-white min-h-screen">
            {/* 네비게이션 바 */}
            <NavbarBlack />

            <NoticeHeader title={"공지사항"} sub={"학과의 중요한 소식과 공지사항을 확인하세요."} />

            {/* 카테고리 버튼 */}
            <div
                ref={categoryRef}
                className="container mx-auto px-4 pt-8 sm:pt-12 lg:pt-8 pb-4 sm:pb-8 lg:pb-16"
            >
                <div className="flex justify-between items-center space-x-2.5">
                    {/* 카테고리 버튼 */}
                    <div className="flex space-x-2.5">
                        <button
                            className={`px-6 py-2 rounded-lg font-semibold ${
                                !searchParams.get("category")
                                    ? "bg-blue-900 text-white"
                                    : "text-gray-500 hover:bg-blue-100"
                            }`}
                            onClick={() => {
                                setSearchParams({page: 1, size: itemsPerPage}); // 쿼리 업데이트
                                navigate(`?page=1&size=${itemsPerPage}`); // URL 이동
                            }}
                        >
                            최신
                        </button>

                        <button
                            className={`px-6 py-2 rounded-lg font-semibold ${
                                searchParams.get("category") === "important"
                                    ? "bg-pink-400 text-white"
                                    : "text-gray-500 hover:bg-pink-200"
                            }`}
                            onClick={() => {
                                setSearchParams({page: 1, size: itemsPerPage, category: "important"});
                                navigate(`?page=1&size=${itemsPerPage}&category=important`);
                            }}
                        >
                            중요
                        </button>

                        <button
                            className={`px-6 py-2 rounded-lg font-semibold ${
                                searchParams.get("category") === "event"
                                    ? "bg-blue-200 text-blue-800"
                                    : "text-gray-500 hover:bg-blue-100"
                            }`}
                            onClick={() => {
                                setSearchParams({page: 1, size: itemsPerPage, category: "event"});
                                navigate(`?page=1&size=${itemsPerPage}&category=event`);
                            }}
                        >
                            행사
                        </button>
                    </div>

                    {/* 글쓰기 버튼 */}
                    {isLoggedIn && (
                        <button
                            className="ml-auto px-6 py-2 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600"
                            onClick={() => navigate("/notices/new-notice")}
                        >
                            글쓰기
                        </button>
                    )}
                </div>


            </div>

            {/* 공지사항 리스트 */}
            <div className="container mx-auto px-4 lg:px-16 py-8 grid gap-4">
                {notices.length > 0 ? (
                    notices.map((notice) => (
                        <NoticeCard key={notice.id} {...notice} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">공지사항이 없습니다.</p>
                )}
            </div>

            {/* 페이지네이션 */}
            <div className="container mx-auto px-4 py-4 pb-16 flex justify-center">
                {Array.from({length: totalPages}, (_, index) => (
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

            {/* Footer */}
            <FooterBlack/>
        </div>
    );
}