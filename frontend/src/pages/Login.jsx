import NavbarWhite from "../components/NavbarWhite.jsx";
import FooterWhite from "../components/FooterWhite.jsx";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            id: formData.get("id"),
            password: formData.get("password"),
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("로그인에 실패했습니다.");
            }

            const result = await response.json();

            // JWT 저장
            if (result.token) {
                localStorage.setItem("jwt", result.token);
                console.log("JWT 저장 완료:", result.token);
            } else {
                throw new Error("토큰이 응답에 포함되어 있지 않습니다.");
            }

            // 페이지 이동
            navigate("/");
        } catch (error) {
            console.error("로그인 오류:", error);
        }
    };

    return (
        <div className="relative">
            {/* 배경 이미지 */}
            <div
                className="fixed inset-0 bg-cover bg-center pointer-events-none"
                style={{
                    backgroundImage: "url('/images/pub1.jpg')",
                    backgroundSize: "cover",
                }}
            ></div>

            {/* 콘텐츠 영역 */}
            <div className="relative z-10">
                <NavbarWhite/>

                <div className="flex items-center justify-center h-screen" style={{ marginTop: "-4rem" }}>
                    {/* 로그인 컨테이너 */}
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-xl p-8"
                    >
                        {/* 헤더 */}
                        <h2 className="text-2xl font-bold text-center text-white mb-6">Login</h2>

                        {/* 아이디 입력 */}
                        <div className="mb-4">
                            <label htmlFor="id" className="block text-sm font-medium text-white mb-1">
                                아이디
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="id"
                                    id="id"
                                    placeholder="kwcs_dev"
                                    className="block w-full px-4 py-2 text-gray-800 rounded-lg border border-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* 비밀번호 입력 */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                                비밀번호
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="block w-full px-4 py-2 text-gray-800 rounded-lg border border-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Remember me & Forget Password */}
                        <div className="flex justify-between items-center mb-6">
                            <label className="flex items-center text-sm text-white">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-purple-600 rounded border-gray-300"
                                />
                                <span className="ml-2">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-purple-400 hover:underline">
                                Forgot Password?
                            </a>
                        </div>

                        {/* 로그인 버튼 */}
                        <button
                            type="submit"
                            className="block w-full py-2 text-center bg-blue-950 text-white font-medium rounded-lg shadow hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>

                        {/* Footer 안내 */}
                        <div className="mt-4 text-center">
                            <span className="text-sm text-white">
                                관리자 인증을 위해 로그인해주세요
                            </span>
                        </div>
                    </form>
                </div>
            </div>

            <FooterWhite/>
        </div>
    );
}

export default Home;