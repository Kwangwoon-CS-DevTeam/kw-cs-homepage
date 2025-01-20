import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // 환경 변수에서 API URL 가져오기
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt"); // 로컬 스토리지에서 JWT 가져오기
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더 추가
        }
        return config;
    },
    (error) => {
        // 요청 에러 처리
        return Promise.reject(error);
    }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 만료된 토큰 처리 등 추가 로직 구현 가능
        if (error.response?.status === 401) {
            console.error("인증 실패: 다시 로그인하세요.");
            // 로그아웃 처리 또는 로그인 페이지로 리다이렉트 가능
        }
        return Promise.reject(error);
    }
);

export default apiClient;