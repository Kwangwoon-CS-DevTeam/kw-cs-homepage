import Navbar from "../components/Navbar.jsx";

function Home() {
    return (
        <div className="relative min-h-screen bg-black">
            {/* 배경 이미지 컨테이너 */}
            <div
                className="absolute inset-0 bg-cover bg-center animate-bg-zoom-in pointer-events-none"
                style={{
                    backgroundImage: "url('/images/pub1.jpg')", // 원하는 배경 이미지 경로
                }}
            >
                {/* 어두운 오버레이 */}
                <div className="absolute inset-0 bg-blue-900 bg-opacity-30"></div>
            </div>

            {/* 네비게이션 바 */}
            <Navbar />

            {/* 추가 콘텐츠 */}
            <div className="relative flex items-center justify-center h-screen text-white">
                <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold flex items-center">
                    KWU x Computer Science
                    <span className="ml-2 animate-blink pb-2">|</span>
                </h1>
            </div>
        </div>
    );
}

export default Home;