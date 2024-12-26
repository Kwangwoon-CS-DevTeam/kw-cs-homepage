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
                    filter: "blur(0px)", // 블러 효과 추가
                }}
            ></div>

            <NavbarWhite className="pb-20"/>

            {/* 콘텐츠 영역 */}
            <div className="relative mb-32 z-10 block overflow-visible">
                <div className="text-center mt-4 mb-20 px-4 z-20">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        세부전공
                    </h1>
                    <p className="text text-neutral-400 max-w-3xl mx-auto">
                        디지털 시대의 혁신은 세부전공에서 시작됩니다. 여러분의 흥미와 능력을 극대화할 수 있는 전공을 선택하세요.
                    </p>
                </div>

                <div
                    className="container mx-auto mb-20 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center mt-8 px-4">
                    {/* 텍스트 영역 */}
                    <div className="text-center lg:text-left flex flex-col justify-center h-full">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">지능컴퓨팅시스템</h2>
                            <p className="text text-neutral-100">
                                지능형 시스템 설계를 위한 하드웨어와 소프트웨어 통합 역량을 배양하며,
                                임베디드 시스템 설계와 제어 능력을 함양하는 전문가를 양성합니다.
                            </p>
                        </div>
                        {/* 버튼을 아래로 이동 */}
                        <div className="mt-6">
                            <a
                                href="#" // 세부 전공의 상세 페이지 링크
                                className="inline-block backdrop-blur bg-opacity-10 bg-blue-950 text-white px-6 py-2 rounded-lg transition-all duration-300 transform group border-[1px] border-neutral-300 hover:border-2 hover:border-white" // 테두리 추가
                            >
                                <span className="text-base font-medium transition-transform duration-300">
                                    자세히 보기
                                </span>
                                <span
                                    className="inline-block ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    →
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* 이미지 영역 */}
                    <div className="flex justify-center items-center">
                        <img
                            src="/images/major_1.jpg" // 이미지를 저장한 경로로 수정
                            alt="Laptop sleeve"
                            className="rounded-lg shadow-lg w-[700px] h-[300px] object-cover"
                        />
                    </div>
                </div>

                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mt-12 px-4">
                    {/* 이미지 영역 */}
                    <div className="flex justify-center items-center order-2 lg:order-1">
                        <img
                            src="/images/major_2.jpg" // 이미지를 저장한 경로로 수정
                            alt="Specialization"
                            className="rounded-lg shadow-lg w-[700px] h-[300px] object-cover"
                        />
                    </div>

                    {/* 텍스트 영역 */}
                    <div
                        className="text-center lg:text-left flex flex-col justify-center h-full order-1 lg:pl-6 lg:order-2">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">지능정보</h2>
                            <p className="text text-neutral-100">
                                대량의 데이터를 효과적으로 다루고, 정보 시스템 설계 및 유지 관리 역량을 갖춘 전문가를 양성합니다.
                                데이터 기반 의사결정 지원과 지능형 시스템 개발을 목표로 합니다.
                            </p>
                        </div>
                        {/* 버튼을 아래로 이동 */}
                        <div className="mt-6">
                            <a
                                href="#" // 세부 전공의 상세 페이지 링크
                                className="inline-block backdrop-blur bg-opacity-10 bg-blue-950 text-white px-6 py-2 rounded-lg transition-all duration-300 transform group border-[1px] border-neutral-300 hover:border-2 hover:border-white" // 테두리 추가
                            >
                                <span className="text-base font-medium transition-transform duration-300">
                                    자세히 보기
                                </span>
                                <span
                                    className="inline-block ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    →
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>


            <FooterWhite/>
        </div>
    );
}