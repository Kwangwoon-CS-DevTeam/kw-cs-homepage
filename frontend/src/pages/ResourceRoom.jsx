import NavbarBlack from "../components/NavbarBlack.jsx";
import ResourceCard from "../components/ResourceCard.jsx";
import FooterBlack from "../components/FooterBlack.jsx";
import NoticeHeader from "../components/NoticeHeader.jsx";
import LoadingPage from "./LoadingPage.jsx";
import { animate, motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

export default function ResourceBoard() {
    const [resources, setResources] = useState([]); // 서버에서 가져온 데이터를 저장
    const [selectedCategory, setSelectedCategory] = useState("latest");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [searchParams, setSearchParams] = useSearchParams(); // 쿼리 매개변수 상태
    const navigate = useNavigate(); // URL 이동 함수
    const categoryRef = useRef(null);
    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
    const itemsPerPage = 5;

    const [showSearchInput, setShowSearchInput] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const searchContainerRef = useRef(null);
    const searchInputRef = useRef(null);
    const searchButtonRef = useRef(null);

    // 로그인 상태 확인
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        setIsLoggedIn(!!token);
    }, []);

    // URL(쿼리 파라미터)로부터 카테고리와 페이지 정보 설정
    useEffect(() => {
        const catFromUrl = searchParams.get("category") || "latest";
        setSelectedCategory(catFromUrl);

        const pageFromUrl = Number(searchParams.get("page")) || 1;
        setCurrentPage(pageFromUrl);
    }, [searchParams]);

    // 서버에서 자료 가져오기
    useEffect(() => {
        const fetchResources = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/resources`,
                    {
                        params: {
                            page: currentPage,
                            limit: itemsPerPage,
                            category: selectedCategory === "latest" ? undefined : selectedCategory,
                            keyword: searchParams.get("keyword") || undefined
                        },
                    }
                );


                setResources(response.data.resources);
                setTotalPages(Math.ceil(response.data.total / itemsPerPage));
                setIsLoading(false);
            } catch (error) {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchResources();
    }, [currentPage, selectedCategory, searchParams]);

    useEffect(() => {
        if (showSearchInput && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showSearchInput]);

    // 검색 실행 함수: 쿼리 파라미터에 keyword 추가
    const handleSearch = () => {
        // 기존의 쿼리 파라미터를 객체로 변환
        const params = Object.fromEntries(searchParams.entries());
        // 입력값이 있으면 keyword 추가, 없으면 keyword 속성 제거
        if (searchKeyword && searchKeyword.trim() !== "") {
            params.keyword = searchKeyword;
        } else {
            delete params.keyword;
        }
        params.page = 1;
        setSearchParams(params);
        if(!searchKeyword){
            setShowSearchInput(false);
        }
    };

    // 페이지 변경 시 스크롤 애니메이션 적용
    const handlePageChange = (pageNumber) => {
        setIsLoading(true);
        setCurrentPage(pageNumber);
        if (categoryRef.current) {
            const targetPosition = categoryRef.current.offsetTop;
            animate(window.scrollY, targetPosition, {
                duration: 0.2,
                onUpdate: (latest) => window.scrollTo(0, latest),
            });
        }
    };

    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <div className="relative bg-white min-h-screen">
                    <NavbarBlack />
                    <NoticeHeader title={"자료실"} sub={"학과의 소중한 자료를 공유하고 활용하세요."} />

                    {/* 카테고리 및 버튼 영역 */}
                    <div
                        ref={categoryRef}
                        className="container mx-auto px-4 lg:px-16 pt-8 sm:pt-12 lg:pt-8 pb-4 sm:pb-8 lg:pb-16 overflow-x-auto"
                    >
                        <div className="flex justify-between items-center flex-nowrap">
                            {/* 카테고리 버튼들 */}
                            <div
                                className="flex flex-wrap justify-center lg:justify-start space-x-1 sm:space-x-2 lg:space-x-2 flex-nowrap">
                                <button
                                    className={`px-4 py-1 text-sm lg:px-6 lg:py-2 lg:text-base rounded-md font-medium flex-shrink-0 ${
                                        !searchParams.get("category")
                                            ? "bg-blue-900 text-white"
                                            : "text-gray-500 hover:bg-blue-100"
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
                                        searchParams.get("category") === "학업"
                                            ? "bg-밝은파랑 text-white"
                                            : "text-gray-500 hover:bg-연한파랑 hover:text-white hover:opacity-50"
                                    }`}
                                    onClick={() => {
                                        setSearchParams({
                                            page: 1,
                                            size: itemsPerPage,
                                            category: "학업",
                                        });
                                        navigate(`?page=1&size=${itemsPerPage}&category=학업`);
                                    }}
                                >
                                    학업
                                </button>
                                <button
                                    className={`px-4 py-1 text-sm lg:px-6 lg:py-2 lg:text-base rounded-md font-medium flex-shrink-0 ${
                                        searchParams.get("category") === "기타"
                                            ? "bg-연보라 text-white"
                                            : "text-gray-500 hover:bg-연보라 hover:text-white hover:opacity-50"
                                    }`}
                                    onClick={() => {
                                        setSearchParams({
                                            page: 1,
                                            size: itemsPerPage,
                                            category: "기타",
                                        });
                                        navigate(`?page=1&size=${itemsPerPage}&category=기타`);
                                    }}
                                >
                                    기타
                                </button>
                            </div>

                            <div className="flex items-center" ref={searchContainerRef}>
                                {/* 검색 input과 아이콘 그룹 (간격 좁게) */}
                                <div className="flex flex-rowitems-centerspace-x-1">
                                    <AnimatePresence>
                                        {showSearchInput && (
                                            <motion.input
                                                ref={searchInputRef}
                                                key="searchInput"
                                                initial={{opacity: 0, x: 0}}
                                                animate={{opacity: 1, x: 0}}
                                                exit={{opacity: 0, x: 0}}
                                                transition={{duration: 0.1}}
                                                type="text"
                                                placeholder="검색"
                                                value={searchKeyword}
                                                onChange={(e) => setSearchKeyword(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleSearch();
                                                    }
                                                }}
                                                className="border-b border-gray-400 outline-none px-2 py-1 w-24 sm:w-48 z-10"
                                            />
                                        )}
                                    </AnimatePresence>
                                    <button
                                        ref={searchButtonRef}
                                        className="p-2 rounded-full text-blue-900 hover:bg-blue-100 transition"
                                        onClick={() => {
                                            if (showSearchInput) {
                                                // input 창이 보일 때는 검색 실행
                                                handleSearch();
                                            } else {
                                                // input 창이 안 보이면 나타나도록 함
                                                setShowSearchInput(true);
                                            }
                                        }}
                                    >
                                        <FaSearch className="text-lg"/>
                                    </button>
                                </div>

                                {/* 글쓰기 버튼과의 간격을 위한 별도 마진 */}
                                {isLoggedIn && (
                                    <button
                                        className="ml-4 px-4 py-1 text-sm lg:px-6 lg:py-2 lg:text-base rounded-md font-medium bg-white border border-blue-900 text-blue-900 hover:bg-blue-100 transition"
                                        onClick={() => navigate("/resources/new-resource")}
                                    >
                                        글 작성
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 자료 목록 영역 */}
                    <div className="container mx-auto px-3 lg:px-16 py-8 grid gap-6">
                        {resources.length > 0 ? (
                            resources.map((resource) => (
                                <ResourceCard key={resource.id} {...resource} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">자료가 없습니다.</p>
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

                    <FooterBlack/>
                </div>
            )}
        </>
    );
}