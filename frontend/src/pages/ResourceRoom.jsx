import NavbarBlack from "../components/NavbarBlack.jsx";
import ResourceCard from "../components/ResourceCard.jsx";
import FooterBlack from "../components/FooterBlack.jsx";
import NoticeHeader from "../components/NoticeHeader.jsx";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // 추가
import axios from "axios";

export default function ResourceBoard() {
    const [resources, setResources] = useState([]); // 서버에서 가져온 데이터를 저장할 상태
    const [selectedCategory, setSelectedCategory] = useState("latest");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const [searchParams, setSearchParams] = useSearchParams(); // 쿼리 매개변수 상태
    const navigate = useNavigate(); // URL 이동을 위한 함수
    const categoryRef = useRef(null);

    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
    const itemsPerPage = 5;

    // 로그인 상태 확인
    useEffect(() => {
        const token = localStorage.getItem("jwt"); // 토큰 확인
        setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
    }, []);

    // 서버에서 데이터 가져오기
    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/resources`, {
                    params: {
                        page: currentPage,
                        size: itemsPerPage,
                        category: selectedCategory === "latest" ? undefined : selectedCategory,
                    },
                });

                // 서버 응답 처리
                setResources(response.data.resources); // 현재 페이지 데이터 설정
                setTotalPages(Math.ceil(response.data.total / itemsPerPage)); // 총 페이지 수 계산
            } catch (error) {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchResources();
    }, [currentPage, selectedCategory]); // 페이지나 카테고리가 변경될 때마다 데이터 요청

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (categoryRef.current) {
            categoryRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
        setSearchParams({ page: 1, size: itemsPerPage, category }); // 쿼리 업데이트
        if (categoryRef.current) {
            categoryRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative bg-white min-h-screen">
            <NavbarBlack />
            <NoticeHeader title={"자료실"} sub={"학과의 소중한 자료를 공유하고 활용하세요."} />

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
                            onClick={() => handleCategoryChange("latest")}
                        >
                            최신
                        </button>

                        <button
                            className={`px-6 py-2 rounded-lg font-semibold ${
                                searchParams.get("category") === "전공"
                                    ? "bg-pink-400 text-white"
                                    : "text-gray-500 hover:bg-pink-200"
                            }`}
                            onClick={() => handleCategoryChange("전공")}
                        >
                            전공
                        </button>

                        <button
                            className={`px-6 py-2 rounded-lg font-semibold ${
                                searchParams.get("category") === "교양"
                                    ? "bg-blue-200 text-blue-800"
                                    : "text-gray-500 hover:bg-blue-100"
                            }`}
                            onClick={() => handleCategoryChange("교양")}
                        >
                            교양
                        </button>
                    </div>

                    {/* 글쓰기 버튼 */}
                    {isLoggedIn && (
                        <button
                            className="ml-auto px-6 py-2 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600"
                            onClick={() => navigate("/resources/new-resource")}
                        >
                            자료 업로드
                        </button>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-16 py-8 grid gap-6">
                {resources.map((resource) => (
                    <ResourceCard key={resource.id} {...resource} />
                ))}
            </div>

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

            <FooterBlack />
        </div>
    );
}