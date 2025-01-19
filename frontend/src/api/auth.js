import { useNavigate } from "react-router-dom";

const decodeToken = (token) => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Base64 디코딩
        return payload;
    } catch (error) {
        console.error("JWT 디코딩 실패:", error);
        return null;
    }
};

const isTokenExpired = (token) => {
    const payload = decodeToken(token);
    if (!payload || !payload.exp) {
        return true; // 잘못된 토큰은 만료된 것으로 간주
    }
    const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
    return payload.exp < currentTime;
};

export const useCheckAuth = () => {
    const navigate = useNavigate();

    return () => {
        const token = localStorage.getItem("jwt");

        if (!token) {
            alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
            navigate("/login");
            return false; // 토큰 없음
        }

        if (isTokenExpired(token)) {
            alert("세션이 만료되었습니다. 다시 로그인해주세요.");
            navigate("/login");
            return false; // 토큰 만료
        }

        return true; // 유효한 토큰
    };
};