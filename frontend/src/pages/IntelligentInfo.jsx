import NavbarWhite from "../components/NavbarWhite.jsx";
import FooterWhite from "../components/FooterWhite.jsx";
import { useEffect, useRef } from 'react';

export default function IntelligentInfo() {
    const firstH2Ref = useRef(null);
    const secondH2Ref = useRef(null);
    const cardsRef = useRef([]);
    const requirementsRef = useRef(null); // 이수요건 섹션 ref 추가



    // 이수요건 섹션 애니메이션 설정
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-slide-up");
                    entry.target.classList.remove("opacity-0"); // opacity-0 제거
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );


        if (requirementsRef.current) observer.observe(requirementsRef.current);

        return () => {
            if (requirementsRef.current) observer.unobserve(requirementsRef.current);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-slide-up");
                    entry.target.classList.remove("opacity-0");
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (firstH2Ref.current) observer.observe(firstH2Ref.current);

        return () => {
            if (firstH2Ref.current) observer.unobserve(firstH2Ref.current);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-slide-up");
                    entry.target.classList.remove("opacity-0");
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (secondH2Ref.current) observer.observe(secondH2Ref.current);

        return () => {
            if (secondH2Ref.current) observer.unobserve(secondH2Ref.current);
        };
    }, []);

    // 카드 이미지 애니메이션 설정
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-card-appear");
                        entry.target.classList.remove("opacity-0"); // opacity-0 제거
                        entry.target.style.animationDelay = `${index * 0.1}s`; // 딜레이 설정
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            cardsRef.current.forEach((card) => {
                if (card) observer.unobserve(card);
            });
        };
    }, []);

    return (
        <div className="relative">
            {/* 배경 이미지 */}
            <div
                className="fixed inset-0 bg-cover bg-center pointer-events-none"
                style={{
                    backgroundImage: "url('/images/pub1.jpg')",
                    backgroundSize: "cover",
                    filter: "blur(0px)",
                }}
            ></div>

            <NavbarWhite/>

            {/* 콘텐츠 영역 */}
            <div className="relative flex flex-col items-center justify-center -mt-20 mb-6 min-h-screen text-white">
                <h1 className="text-4xl sm:text-5xl font-bold animate-fade-up mb-12">
                    지능정보
                </h1>
            </div>

            {/* 카드 섹션 */}
            <div className="relative pb-16 mb-36 bg-transparent">
                <h2
                    ref={firstH2Ref}
                    className="text-2xl sm:text-3xl font-bold text-center text-gray-200 mb-16 opacity-0"
                >
                    지능형 데이터 처리와 네트워크 기술
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 mx-auto">
                    {/* 첫 번째 카드 */}
                    <div
                        ref={(el) => (cardsRef.current[0] = el)}
                        className="flex flex-col items-start text-left opacity-0 transition-opacity duration-1000"
                    >
                        <img
                            src="/images/ii_1.jpg"
                            alt="example1"
                            className="rounded-lg shadow-lg object-cover w-full h-48"
                        />
                        <p className="text-sm mt-2 text-gray-300 text-left">
                            대량의 데이터를 효과적으로 수집, 분석 및 시각화하여 지능형 정보 시스템을 설계할 수 있는 인재 양성
                        </p>
                    </div>
                    {/* 두 번째 카드 */}
                    <div
                        ref={(el) => (cardsRef.current[1] = el)}
                        className="flex flex-col items-start text-left opacity-0 transition-opacity duration-1000"
                    >
                        <img
                            src="/images/ii_2.jpg"
                            alt="example2"
                            className="rounded-lg shadow-lg object-cover w-full h-48"
                        />
                        <p className="text-sm mt-2 text-gray-300 text-left">
                            정보 관리와 데이터 분석 능력을 통해, 데이터 기반 의사결정을 지원하는 시스템 개발 역량을 기름
                        </p>
                    </div>
                    {/* 세 번째 카드 */}
                    <div
                        ref={(el) => (cardsRef.current[2] = el)}
                        className="flex flex-col items-start text-left opacity-0 transition-opacity duration-1000"
                    >
                        <img
                            src="/images/ii_3.jpg"
                            alt="example3"
                            className="rounded-lg shadow-lg object-cover w-full h-48"
                        />
                        <p className="text-sm mt-2 text-gray-300 text-left">
                            데이터 통신, 네트워크, 데이터베이스 기술을 기반으로 한 지능형 정보 시스템의 구축 및 유지 관리 능력 배양
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative pb-16 bg-transparent">
                <h2
                    ref={secondH2Ref}
                    className="text-2xl sm:text-3xl font-bold text-center text-gray-200 mb-16 opacity-0"
                >
                    세부전공 이수 교과목
                </h2>
                <div className="overflow-x-auto">
                    <table
                        className="w-full sm:max-w-[90%] md:max-w-[80%] mx-auto text-left text-sm text-gray-200 border-collapse border border-gray-500"
                    >
                        <thead className="bg-gray-800 bg-opacity-80">
                        <tr>
                            <th className="px-4 py-2 border border-gray-600">학년</th>
                            <th className="px-4 py-2 border border-gray-600">공통</th>
                            <th className="px-4 py-2 border border-gray-600">지능컴퓨팅시스템전공</th>
                            <th className="px-4 py-2 border border-gray-600">지능정보전공</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="bg-gray-700 bg-opacity-60 align-top">
                            <td className="px-4 py-2 border border-gray-600 align-top">3</td>
                            <td className="px-4 py-2 border border-gray-600 align-top">
                                신호및시스템<br/>
                                디지털신호처리<br/>
                                알고리즘<br/>
                                인공지능
                            </td>
                            <td className="px-4 py-2 border border-gray-600 align-top">마이크로프로세서</td>
                            <td className="px-4 py-2 border border-gray-600 align-top">
                                소프트웨어프로젝트<br/>
                                데이터통신
                            </td>
                        </tr>
                        <tr className="bg-gray-800 bg-opacity-60 align-top">
                            <td className="px-4 py-2 border border-gray-600 align-top">4</td>
                            <td className="px-4 py-2 border border-gray-600 align-top">
                                머신러닝<br/>
                                컴퓨터비전<br/>
                                산학협력캡스톤설계<br/>
                                지능IT특론
                            </td>
                            <td className="px-4 py-2 border border-gray-600 align-top">
                                GPU컴퓨팅<br/>
                                임베디드시스템S/W설계<br/>
                                인공지능프로그래밍
                            </td>
                            <td className="px-4 py-2 border border-gray-600 align-top">
                                무선모바일네트워크<br/>
                                소프트웨어공학<br/>
                                데이터베이스및데이터시각화
                            </td>
                        </tr>
                        <tr className="bg-gray-700 bg-opacity-60">
                            <td className="px-4 py-2 border border-gray-600">과목수</td>
                            <td className="px-4 py-2 border border-gray-600">8</td>
                            <td className="px-4 py-2 border border-gray-600">4</td>
                            <td className="px-4 py-2 border border-gray-600">5</td>
                        </tr>
                        </tbody>
                    </table>
                    {/* 추가 내용 */}
                    <div
                        ref={requirementsRef} // 이수요건 섹션 ref 추가
                        className="mt-8 px-4 sm:px-6 md:px-8 mb-32 text-gray-300 w-full sm:max-w-[90%] md:max-w-[80%] mx-auto text-left duration-1000"
                    >
                        <h3 className="text-xl font-bold mb-4">이수요건</h3>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>공통 교과목을 포함하여 총 30학점 이상 이수</li>
                            <li>본인 세부전공 두 과목 이상 이수</li>
                            <li>타 세부전공 한 과목 이상 이수</li>
                        </ul>
                        <p className="mt-4 text-sm text-gray-400">
                            컴퓨터정보공학부 개설 교과목만 인정(타 학과(부) 동일교과목 인정 불가)
                        </p>
                    </div>
                </div>

                {/*<div className="relative pb-16 mb-36 bg-transparent">*/}
                {/*    <h2*/}
                {/*        ref={h2Ref}*/}
                {/*        className="text-2xl sm:text-3xl font-bold text-center text-gray-200 mb-16 duration-1000 animate-fade-up"*/}
                {/*    >*/}
                {/*        이수체계도*/}
                {/*    </h2>*/}
                {/*    <p> 미구현 </p>*/}


                {/*</div>*/}


            </div>

            <FooterWhite/>
        </div>
    );
}