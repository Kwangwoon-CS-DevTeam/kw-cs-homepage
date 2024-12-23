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
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            {/* 네비게이션 바 */}
            <Navbar />

            {/* 추가 콘텐츠 */}
            <div className="relative flex items-center justify-center h-screen text-white">
                <h1 className="text-4xl font-bold">Lunit × Volpara</h1>
            </div>
        </div>
    );
}

export default Home;
