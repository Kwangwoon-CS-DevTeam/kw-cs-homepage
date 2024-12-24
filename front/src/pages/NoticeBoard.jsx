import NavbarBlack from "../components/NavbarBlack.jsx";

function NoticeBoard() {
    return (
        <div className="relative bg-white min-h-screen">
            {/* 네비게이션 바 */}
            <NavbarBlack/>

            {/* 공지사항 헤더 */}
            <div
                className="bg-white pt-24 sm:pt-32 lg:pt-48 pb-16 sm:pb-24 lg:pb-28 px-4 sm:px-8 lg:px-16"> {/* 반응형 여백 */}
                <div className="container mx-auto">
                    {/* 제목 */}
                    <h1 className="text-4xl font-extrabold text-neutral-800 text-left"> {/* 왼쪽 정렬 */}
                        공지사항
                    </h1>
                    {/* 서브텍스트 */}
                    <p className="text-lg text-blue-950 mt-4 text-left"> {/* 왼쪽 정렬 */}
                        학과의 중요한 소식과 공지사항을 확인하세요.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <hr className="border-t border-gray-300"/>
            </div>

            {/* 공지사항 리스트 영역 (추후 추가 가능) */}
            <div className="container mx-auto px-4 py-8">
                {/* 여기에 공지사항 리스트나 내용이 들어갈 수 있습니다 */}
                <p className="text-gray-300">여기에 공지사항 내용이 추가될 예정입니다.</p>
            </div>
        </div>
    );
}

export default NoticeBoard;