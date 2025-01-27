import NavbarBlack from "../components/NavbarBlack.jsx";
import NoticeCard from "../components/NoticeCard.jsx";
import FooterBlack from "../components/FooterBlack.jsx";
import NoticeHeader from "../components/NoticeHeader.jsx";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage.jsx";
import apiClient from "../api/axiosClient"; // axiosClient를 import

export default function NoticeBoard() {
    const [notices, setNotices] = useState([]); // 공지사항 데이터
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
    const navigate = useNavigate(); // React Router 네비게이션 훅
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const categoryRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태

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
                setIsLoading(false);
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
        <>
            {isLoading ? (
                <LoadingPage /> // 로딩 상태일 때 로딩 페이지 표시
            ) : (
                <div className="relative bg-white min-h-screen">
                    {/* 네비게이션 바 */}
                    <NavbarBlack/>

                    <NoticeHeader title={"공지사항"} sub={"학과의 중요한 소식과 공지사항을 확인하세요."}/>

                    <div
                        ref={categoryRef}
                        className="container ml-3 md:px-10 lg:px-4 pt-8 sm:pt-12 lg:pt-8 lg:ml-8 pb-4 sm:pb-8 lg:pb-16 overflow-x-auto"
                    >
                        <div
                            className="flex justify-between items-center space-x-2 flex-nowrap"
                        >
                            <div
                                className="flex flex-wrap justify-center lg:justify-start space-x-1 sm:space-x-2 lg:space-x-2 flex-nowrap"
                            >
                                <button
                                    className={`px-4 py-1 text-sm lg:px-6 lg:py-2 lg:text-base rounded-md font-medium flex-shrink-0 ${
                                        !searchParams.get("category")
                                            ? `bg-blue-900 text-white`
                                            : `text-gray-500 hover:bg-blue-100`
                                    }`}
                                    onClick={() => {
                                        setSearchParams({page: 1, size: itemsPerPage});
                                        navigate(`?page=1&size=${itemsPerPage}`);
                                    }}
                                >
                                    전체
                                </button>

                                <button
                                    className={`px-4 py-1 text-sm lg:px-6 lg:py-2 lg:text-base rounded-md font-medium flex-shrink-0 ${
                                        searchParams.get("category") === "학과"
                                            ? `bg-밝은파랑 text-white`
                                            : `text-gray-500 hover:bg-연한파랑 hover:text-white hover:opacity-50`
                                    }`}
                                    onClick={() => {
                                        setSearchParams({
                                            page: 1,
                                            size: itemsPerPage,
                                            category: "학과",
                                        });
                                        navigate(`?page=1&size=${itemsPerPage}&category=학과`);
                                    }}
                                >
                                    학과
                                </button>

                                <button
                                    className={`px-4 py-1 text-sm lg:px-6 lg:py-2 lg:text-base rounded-md font-medium flex-shrink-0 ${
                                        searchParams.get("category") === "총학"
                                            ? `bg-연보라 text-white`
                                            : `text-gray-500 hover:bg-연보라 hover:text-white hover:opacity-50`
                                    }`}
                                    onClick={() => {
                                        setSearchParams({
                                            page: 1,
                                            size: itemsPerPage,
                                            category: "총학",
                                        });
                                        navigate(`?page=1&size=${itemsPerPage}&category=총학`);
                                    }}
                                >
                                    총학
                                </button>
                            </div>

                            {isLoggedIn && (
                                <button
                                    className="ml-auto px-4 py-1 text-sm lg:px-6 lg:py-2 lg:text-base rounded-md font-medium bg-white border-[1px] text-blue-900 hover:bg-blue-100 transition"
                                    onClick={() => navigate("/notices/new-notice")}
                                >
                                    글 작성
                                </button>
                            )}
                        </div>
                    </div>

                    {/* 공지사항 리스트 */}
                    <div className="container mx-auto px-3 lg:px-16 py-8 grid gap-6">
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
            )}
        </>

    );
}