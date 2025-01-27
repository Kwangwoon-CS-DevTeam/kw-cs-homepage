import PropTypes from "prop-types"; // PropTypes 임포트

export default function NoticeHeader({ title, sub }) {
    return (
        <div>
            {/* 공지사항 헤더 */}
            <div
                className="bg-white pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-20 lg:pb-24 px-4 sm:px-8 lg:px-16"
                style={{marginTop: "-4rem"}} // Navbar 크기만큼 조정
            >
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold text-neutral-600 text-left">
                        {title}
                    </h1>
                    <p className="text-lg text-neutral-600 mt-4 text-left">{sub}</p>
                </div>
            </div>

            {/* 구분선 */}
            <hr className="border-t border-gray-300 ml-4 mr-4 lg:ml-16 lg:mr-16"/>
        </div>
    );
}

// PropTypes 정의
NoticeHeader.propTypes = {
    title: PropTypes.string.isRequired,
    sub: PropTypes.string.isRequired,
};