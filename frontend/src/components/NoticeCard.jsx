import PropTypes from "prop-types"; // PropTypes 임포트

// components/NoticeCard.jsx
export default function NoticeCard({ id, category, title, excerpt, admin_id, created_at, url }) {
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
            <div className="relative z-10 pointer-events-none">
                {/* 카테고리 */}
                <div className="flex items-center mb-3">
                    <span
                        className={`text-sm font-semibold px-3 py-1 rounded ${categoryBgColor}`}
                    >
                        {category}
                    </span>
                    {/* 제목 */}
                    <h2 className="text-xl font-bold text-gray-800 ml-2.5">{title}</h2>
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
                <a
                    href={url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 mt-4 inline-block text-blue-700 font-semibold hover:underline pointer-events-auto"
                >
                    신청하기 →
                </a>
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