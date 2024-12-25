import NavbarBlack from "../components/NavbarBlack.jsx";
import NoticeCard from "../components/NoticeCard.jsx"; // NoticeCard 컴포넌트 임포트
import FooterBlack from "../components/FooterBlack.jsx";
import { useState, useRef } from "react";

const notices = [
    { id: 1, category: "important", title: "공지사항 제목 1", excerpt: "이곳에 공지 내용의 요약이 들어갑니다.", author: "작성자 1", date: "2024-12-01", link: "#" },
    { id: 2, category: "important", title: "공지사항 제목 2", excerpt: "공지 내용 요약을 적으면 목록에서 더 보기 좋습니다.", author: "작성자 2", date: "2024-12-02", link: "#" },
    { id: 3, category: "events", title: "공지사항 제목 3", excerpt: "행사에 대한 공지 요약이 들어갑니다.", author: "작성자 3", date: "2024-12-03", link: "#" },
    { id: 4, category: "important", title: "공지사항 제목 4", excerpt: "추가 공지 내용 요약", author: "작성자 4", date: "2024-12-04", link: "#" },
    { id: 5, category: "important", title: "공지사항 제목 5", excerpt: "추가 중요 공지 내용 요약", author: "작성자 5", date: "2024-12-05", link: "#" },
    { id: 6, category: "events", title: "공지사항 제목 6", excerpt: "행사 공지 요약 내용", author: "작성자 6", date: "2024-12-06", link: "#" },
    { id: 7, category: "important", title: "공지사항 제목 7", excerpt: "추가 최신 공지 내용", author: "작성자 7", date: "2024-12-07", link: "#" },
    { id: 8, category: "events", title: "공지사항 제목 8", excerpt: "공지사항 내용 요약", author: "작성자 8", date: "2024-12-08", link: "#" },
    { id: 9, category: "important", title: "공지사항 제목 9", excerpt: "새로운 공지 내용이 여기에 추가됩니다.", author: "작성자 9", date: "2024-12-09", link: "#" },
    { id: 10, category: "events", title: "공지사항 제목 10", excerpt: "중요 공지 내용 요약이 추가됩니다.", author: "작성자 10", date: "2024-12-10", link: "#" },
    { id: 11, category: "events", title: "공지사항 제목 11", excerpt: "또 다른 행사 공지 요약이 추가됩니다.", author: "작성자 11", date: "2024-12-11", link: "#" },
    { id: 12, category: "important", title: "공지사항 제목 12", excerpt: "최신 공지 내용 요약이 여기에 추가됩니다.", author: "작성자 12", date: "2024-12-12", link: "#" },
    { id: 13, category: "important", title: "공지사항 제목 13", excerpt: "중요한 공지 내용 요약을 확인하세요.", author: "작성자 13", date: "2024-12-13", link: "#" },
    { id: 14, category: "events", title: "공지사항 제목 14", excerpt: "행사 공지 요약이 또 추가되었습니다.", author: "작성자 14", date: "2024-12-14", link: "#" },
    { id: 15, category: "important", title: "공지사항 제목 15", excerpt: "최신 공지사항 요약이 이곳에 추가됩니다.", author: "작성자 15", date: "2024-12-15", link: "#" },
    { id: 16, category: "events", title: "공지사항 제목 16", excerpt: "중요 공지 내용 요약 마지막 항목입니다.", author: "작성자 16", date: "2024-12-16", link: "#" },
];

export default function NoticeBoard() {
    const [selectedCategory, setSelectedCategory] = useState("latest");
    const [currentPage, setCurrentPage] = useState(1);
    const categoryRef = useRef(null);

    const itemsPerPage = 7;

    // 현재 선택된 카테고리에 따라 필터링된 공지사항
    const filteredNotices = notices.filter((notice) =>
        selectedCategory === "latest" ? true : notice.category === selectedCategory
    );

    // 현재 페이지에 표시할 공지사항 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNotices = filteredNotices.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 수 계산
    const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);

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

            {/* 공지사항 헤더 */}
            <div className="bg-white pt-24 sm:pt-32 lg:pt-48 pb-16 sm:pb-24 lg:pb-28 px-4 sm:px-8 lg:px-16">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold text-neutral-800 text-left">공지사항</h1>
                    <p className="text-lg text-blue-950 mt-4 text-left">
                        학과의 중요한 소식과 공지사항을 확인하세요.
                    </p>
                </div>
            </div>

            {/* 구분선 */}
            <div className="container mx-auto px-4">
                <hr className="border-t border-gray-300" />
            </div>

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
                        onClick={() => setSelectedCategory("latest")}
                    >
                        최신
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg font-semibold ${
                            selectedCategory === "important"
                                ? "bg-blue-900 text-white"
                                : "text-gray-500 hover:bg-blue-100"
                        }`}
                        onClick={() => setSelectedCategory("important")}
                    >
                        중요
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg font-semibold ${
                            selectedCategory === "events"
                                ? "bg-blue-900 text-white"
                                : "text-gray-500 hover:bg-blue-100"
                        }`}
                        onClick={() => setSelectedCategory("events")}
                    >
                        행사
                    </button>
                </div>
            </div>

            {/* 공지사항 리스트 */}
            <div className="container mx-auto px-4 lg:px-16 py-8 grid gap-4">
                {currentNotices.map((notice, index) => (
                    <NoticeCard key={index} {...notice} />
                ))}
            </div>

            {/* 페이지네이션 */}
            <div className="container mx-auto px-4 py-4 flex justify-center">
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