import PropTypes from "prop-types"; // PropTypes 임포트

export default function NoticeHeader({ title, sub }) {
    return (
        <div>
            {/* 공지사항 헤더 */}
            <div
                className="bg-white pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-20 lg:pb-24 px-4 sm:px-8 lg:px-16"
                style={{ marginTop: "-4rem" }} // Navbar 크기만큼 조정
            >
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold text-neutral-800 text-left">
                        {title}
                    </h1>
                    <p className="text-lg text-blue-950 mt-4 text-left">{sub}</p>
                </div>
            </div>

            {/* 구분선 */}
            <div className="container mx-auto">
                <hr className="border-t border-gray-300" />
            </div>
        </div>
    );
}

// PropTypes 정의
NoticeHeader.propTypes = {
    title: PropTypes.string.isRequired,
    sub: PropTypes.string.isRequired,
};