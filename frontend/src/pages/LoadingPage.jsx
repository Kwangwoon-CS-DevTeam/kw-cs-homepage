import { PuffLoader } from 'react-spinners';
import NavbarBlack from "../components/NavbarBlack.jsx";

export const LoadingPage = () => {
    return (
        <>
            {/* 네비게이션 바는 상단에 고정 */}
            <NavbarBlack />

            {/* 스피너는 화면 중앙에 배치 */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh', // 전체 화면 높이
                    backgroundColor: '#ffffff', // 배경색 지정 (선택 사항)
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '-90px', // 네비게이션 바 높이를 상쇄
                    }}
                >
                    <PuffLoader
                        color="#102fc2"
                        speedMultiplier={1}
                    />
                </div>
            </div>
        </>
    );
}

export default LoadingPage;