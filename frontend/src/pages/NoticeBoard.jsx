import NavbarBlack from "../components/NavbarBlack.jsx";
import NoticeCard from "../components/NoticeCard.jsx"; // NoticeCard 컴포넌트 임포트
import FooterBlack from "../components/FooterBlack.jsx";
import NoticeHeader from "../components/NoticeHeader.jsx";
import { useState, useRef, useEffect } from "react";

export default function NoticeBoard() {
    const [notices, setNotices] = useState([]); // 공지사항 데이터
    const [selectedCategory, setSelectedCategory] = useState("latest");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
    const categoryRef = useRef(null);

    const itemsPerPage = 7;

    // 공지사항 데이터 가져오기
    const fetchNotices = async () => {
        const categoryQuery = selectedCategory !== "latest" ? `&category=${selectedCategory}` : "";
        const url = `http://localhost:3000/api/notices?page=${currentPage}&size=${itemsPerPage}${categoryQuery}`;

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setNotices(data.notices); // 공지사항 데이터 업데이트
                setTotalPages(data.totalPages); // 총 페이지 수 업데이트
            } else {
                console.error("공지사항 데이터를 가져오는 데 실패했습니다.");
            }
        } catch (error) {
            console.error("서버 요청 실패:", error);
        }
    };

    // 선택된 카테고리 또는 페이지 변경 시 데이터 가져오기
    useEffect(() => {
        fetchNotices();
    }, [selectedCategory, currentPage]);

    // 페이지 버튼 클릭 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                <div className="flex justify-start space-x-2.5">
                    <button
                        className={`px-6 py-2 rounded-lg font-semibold ${
                            selectedCategory === "latest"
                                ? "bg-blue-900 text-white"
                                : "text-gray-500 hover:bg-blue-100"
                        }`}
                        onClick={() => {
                            setSelectedCategory("latest");
                            setCurrentPage(1); // 페이지 초기화
                        }}
                    >
                        최신
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg font-semibold ${
                            selectedCategory === "important"
                                ? "bg-pink-400 text-white"
                                : "text-gray-500 hover:bg-pink-200"
                        }`}
                        onClick={() => {
                            setSelectedCategory("important");
                            setCurrentPage(1); // 페이지 초기화
                        }}
                    >
                        중요
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg font-semibold ${
                            selectedCategory === "events"
                                ? "bg-blue-200 text-blue-800"
                                : "text-gray-500 hover:bg-blue-100"
                        }`}
                        onClick={() => {
                            setSelectedCategory("events");
                            setCurrentPage(1); // 페이지 초기화
                        }}
                    >
                        행사
                    </button>
                </div>
            </div>

            {/* 공지사항 리스트 */}
            <div className="container mx-auto px-4 lg:px-16 py-8 grid gap-4">
                {notices.map((notice) => (
                    <NoticeCard key={notice.id} {...notice} />
                ))}
            </div>

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

            {/* Footer */}
            <FooterBlack />
        </div>
    );
}