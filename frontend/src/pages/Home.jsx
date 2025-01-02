import NavbarWhite from "../components/NavbarWhite.jsx";
import FooterWhite from "../components/FooterWhite.jsx"; // FooterWhite 컴포넌트 임포트
import { useState, useEffect, useRef } from "react";

function Home() {
    const [text, setText] = useState(""); // 출력할 텍스트
    const fullText = "KWU x Computer Science"; // 전체 텍스트
    const typingSpeed = 100; // 타이핑 속도(ms)
    const textRef = useRef(""); // 현재 텍스트 상태를 저장

    useEffect(() => {
        let index = 0; // 문자열 인덱스 초기화
        const typingInterval = setInterval(() => {
            if (index < fullText.length) {
                textRef.current = textRef.current + fullText.charAt(index); // 직접 업데이트
                setText(textRef.current); // 최신 값을 React 상태로 반영
                index++;
            } else {
                clearInterval(typingInterval); // 타이핑 완료 시 정리
            }
        }, typingSpeed);

        return () => clearInterval(typingInterval); // 언마운트 시 정리
    }, []);


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
                <div className="flex flex-col items-center justify-center min-h-screen -mt-24 text-white">
                    {/* -mt-24로 네비게이션 높이 보정 */}
                    <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold flex items-center">
                        {text}
                        <h1
                            className= "animate-blink delay-[2000ms] ml-1"
                            style={{ animationDelay: "2.5s" }}
                        >|</h1> {/* 커서 애니메이션 */}
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