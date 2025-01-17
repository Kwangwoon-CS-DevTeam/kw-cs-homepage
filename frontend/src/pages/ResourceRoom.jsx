import NavbarBlack from "../components/NavbarBlack.jsx";
import ResourceCard from "../components/ResourceCard.jsx"; // ResourceCard 컴포넌트 임포트
import FooterBlack from "../components/FooterBlack.jsx";
import NoticeHeader from "../components/NoticeHeader.jsx";
import { useState, useRef } from "react";

const resources = [
    { id: 1, category: "전공", title: "자료 제목 1", excerpt: "이 자료는 전공 수업과 관련이 있습니다.", provider: "교수 A", subject: "컴퓨터공학", date: "2024-12-01", link: "#" },
    { id: 2, category: "교양", title: "자료 제목 2", excerpt: "교양 수업에 활용할 수 있는 자료입니다.", provider: "교수 B", subject: "심리학", date: "2024-12-02", link: "#" },
    { id: 3, category: "전공", title: "자료 제목 3", excerpt: "전공 프로젝트에 유용한 자료입니다.", provider: "교수 C", subject: "소프트웨어공학", date: "2024-12-03", link: "#" },
    { id: 4, category: "교양", title: "자료 제목 4", excerpt: "교양 수업 발표에 적합한 자료입니다.", provider: "교수 D", subject: "문학", date: "2024-12-04", link: "#" },
    { id: 5, category: "전공", title: "자료 제목 5", excerpt: "자료의 요약 설명을 입력합니다.", provider: "교수 E", subject: "알고리즘", date: "2024-12-05", link: "#" },
    { id: 6, category: "교양", title: "자료 제목 6", excerpt: "자료 설명이 여기에 들어갑니다.", provider: "교수 F", subject: "철학", date: "2024-12-06", link: "#" },
    { id: 7, category: "전공", title: "자료 제목 7", excerpt: "전공 자료 설명이 여기에 들어갑니다.", provider: "교수 G", subject: "데이터베이스", date: "2024-12-07", link: "#" },
    { id: 8, category: "교양", title: "자료 제목 8", excerpt: "교양 자료 설명입니다.", provider: "교수 H", subject: "경제학", date: "2024-12-08", link: "#" },
    { id: 9, category: "전공", title: "자료 제목 9", excerpt: "컴퓨터 비전 연구와 관련된 자료입니다.", provider: "교수 I", subject: "컴퓨터 비전", date: "2024-12-09", link: "#" },
    { id: 10, category: "교양", title: "자료 제목 10", excerpt: "대중 문화에 대한 흥미로운 자료입니다.", provider: "교수 J", subject: "대중문화", date: "2024-12-10", link: "#" },
    { id: 11, category: "전공", title: "자료 제목 11", excerpt: "AI 기반의 데이터 분석에 관한 자료입니다.", provider: "교수 K", subject: "인공지능", date: "2024-12-11", link: "#" },
    { id: 12, category: "교양", title: "자료 제목 12", excerpt: "현대 예술과 문화적 영향에 관한 자료입니다.", provider: "교수 L", subject: "현대 예술", date: "2024-12-12", link: "#" },
    { id: 13, category: "전공", title: "자료 제목 13", excerpt: "네트워크 보안 및 암호화에 관한 자료입니다.", provider: "교수 M", subject: "네트워크 보안", date: "2024-12-13", link: "#" },
    { id: 14, category: "교양", title: "자료 제목 14", excerpt: "심리학 연구 자료입니다.", provider: "교수 N", subject: "심리학", date: "2024-12-14", link: "#" },
    { id: 15, category: "전공", title: "자료 제목 15", excerpt: "디지털 마케팅 전략에 관한 자료입니다.", provider: "교수 O", subject: "디지털 마케팅", date: "2024-12-15", link: "#" },
    { id: 16, category: "교양", title: "자료 제목 16", excerpt: "세계사와 관련된 흥미로운 자료입니다.", provider: "교수 P", subject: "세계사", date: "2024-12-16", link: "#" },
];

export default function ResourceBoard() {
    const [selectedCategory, setSelectedCategory] = useState("latest");
    const [currentPage, setCurrentPage] = useState(1);
    const categoryRef = useRef(null);

    const itemsPerPage = 5;

    const filteredResources = resources.filter((resource) =>
        selectedCategory === "latest" ? true : resource.category_id === selectedCategory
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentResources = filteredResources.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (categoryRef.current) {
            categoryRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // 페이지를 첫 번째로 초기화
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
                <div className="flex justify-start space-x-2.5">
                    <button
                        className={`px-6 py-2 rounded-lg font-semibold ${
                            selectedCategory === "latest"
                                ? "bg-blue-900 text-white"
                                : "text-gray-500 hover:bg-blue-100"
                        }`}
                        onClick={() => handleCategoryChange("latest")}
                    >
                        최신
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg font-semibold ${
                            selectedCategory === "전공"
                                ? "bg-pink-400 text-white"
                                : "text-gray-500 hover:bg-pink-200"
                        }`}
                        onClick={() => handleCategoryChange("전공")}
                    >
                        전공
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg font-semibold ${
                            selectedCategory === "교양"
                                ? "bg-blue-200 text-blue-800"
                                : "text-gray-500 hover:bg-blue-100"
                        }`}
                        onClick={() => handleCategoryChange("교양")}
                    >
                        교양
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-16 py-8 grid gap-6">
                {currentResources.map((resource) => (
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