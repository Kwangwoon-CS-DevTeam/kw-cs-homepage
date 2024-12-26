import NavbarWhite from "../components/NavbarWhite.jsx";
import FooterWhite from "../components/FooterWhite.jsx";

export default function Specialization() {
    return (
        <div className="relative">
            {/* 배경 이미지 */}
            <div
                className="fixed inset-0 bg-cover bg-center pointer-events-none"
                style={{
                    backgroundImage: "url('/images/pub1.jpg')", // 배경 이미지 복구
                    backgroundSize: "cover",
                }}
            ></div>

            <NavbarWhite className="pb-20" />

            {/* 콘텐츠 영역 */}
            <div className="relative z-10 block overflow-visible">
                <div className="text-center mt-36 px-4 z-20">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Protect your device
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        As a digital creative, your laptop or tablet is at the center of your work.
                        Keep your device safe with a fabric sleeve that matches in quality and looks.
                    </p>
                </div>
            </div>

            <FooterWhite />
        </div>
    );
}