export default function Footer() {
    return (
        <footer
            className="relative backdrop-blur bg-opacity-60 text-gray-300 py-8"
        >
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                {/* 왼쪽 영역 */}
                <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold text-white mb-2">컴퓨터정보공학과</h2>
                    <p className="text-sm">
                        회장 최우진
                    </p>
                    <p className="text-sm">
                        부회장 서영민
                    </p>
                </div>

                {/* 중앙 영역 */}
                <div className="text-center mt-4 md:mt-0">
                    <p className="text-sm">
                        우리의 이야기는 여기서 시작됩니다
                    </p>
                </div>

                {/* 오른쪽 영역 */}
                <div className="text-center md:text-right mt-4 md:mt-0">
                    <p className="text-sm font-semibold">mobile : 010 1234 5678 </p>
                    <div className="flex justify-center md:justify-end mt-2">
                        <img
                            src="/images/logo.png" // 로고 이미지 경로
                            alt="Logo"
                            className="h-10"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}