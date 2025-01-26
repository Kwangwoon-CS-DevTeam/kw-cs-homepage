import PropTypes from "prop-types"; // PropTypes 임포트

// components/ResourceCard.jsx
export default function ResourceCard({ category, subject, title, content, provider, created_at, file_url }) {
    const categoryBgColor =
        category === "전공"
            ? "bg-pink-400 text-white" // 전공의 경우 핑크 배경
            : "bg-blue-200 text-blue-800"; // 교양의 경우 하늘색 배경

    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:drop-shadow-lg transition-shadow">
            {/* 카드 내용 */}
            <div>
                {/* 카테고리 */}
                <div className="flex items-center mb-4">
                    <span
                        className={`text-sm font-semibold px-3 py-1 rounded ${categoryBgColor}`}
                    >
                        {category}
                    </span>
                </div>

                {/* 제목 */}
                <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>

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
            <a
                href={file_url} // 다운로드 링크
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center bg-blue-900 text-white font-medium px-3 py-1.5 text-sm rounded shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                다운받기
                <img
                    src="/images/downloadIconWhite.png"
                    alt="다운로드 아이콘"
                    className="w-4 h-4 ml-2"
                />
            </a>
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