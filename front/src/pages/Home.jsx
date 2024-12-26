import NavbarWhite from "../components/NavbarWhite.jsx";
import FooterWhite from "../components/FooterWhite.jsx"; // FooterWhite 컴포넌트 임포트

function Home() {
    return (
        <div className="relative bg-black">
            {/* 배경 이미지 (고정) */}
            <div
                className="fixed inset-0 bg-cover bg-center pointer-events-none"
                style={{
                    backgroundImage: "url('/images/pub1.jpg')", // 원하는 배경 이미지 경로
                    backgroundSize: "cover", // 화면을 가득 채움
                }}
            >
                {/* 어두운 오버레이 */}
                <div className="absolute inset-0 bg-blue-900 bg-opacity-30"></div>
            </div>

            {/* 콘텐츠 영역 */}
            <div className="relative z-10">
                {/* 네비게이션 바 */}
                <NavbarWhite />

                {/* 메인 콘텐츠 */}
                <div className="flex items-center justify-center min-h-screen -mt-24 text-white">
                    {/* -mt-24로 네비게이션 높이 보정 */}
                    <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold flex items-center">
                        KWU x Computer Science
                        <span className="ml-2 animate-blink pb-2">|</span>
                    </h1>
                </div>
            </div>

            {/* FooterWhite */}
            <div className="relative z-20">
                <FooterWhite />
            </div>
        </div>
    );
}

export default Home;