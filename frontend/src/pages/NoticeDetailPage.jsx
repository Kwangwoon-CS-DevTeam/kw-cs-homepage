import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarBlack from "../components/NavbarBlack.jsx";
import FooterBlack from "../components/FooterBlack.jsx";

function NoticeDetailPage() {
    const { id } = useParams();
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/notices/${id}`);
                if (!response.ok) {
                    throw new Error("공지사항을 가져오지 못했습니다.");
                }
                const data = await response.json();
                setNotice(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchNotice();
    }, [id]);

    if (!notice) {
        return <p>로딩 중이거나, 해당 공지사항을 찾을 수 없습니다.</p>;
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString("ko-KR");
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* 상단 Navbar */}
            <NavbarBlack />

            {/* 메인 콘텐츠 래퍼: 적당한 너비와 패딩 */}
            <div className="flex-grow w-full max-w-[950px] mx-auto p-4">
                {/* 제목 */}
                <h1 className="text-3xl font-semibold text-[#737373] mb-4">
                    {notice.title}
                </h1>

                {/* 작성자/수정일 */}
                <div className="mb-3 text-[#555] text-sm">
                    <span>작성자: {notice.admin_id}</span>
                    <span className="mx-2">|</span>
                    <span>작성일: {formatDate(notice.created_at)}</span>
                </div>

                <hr className="border-t border-gray-300 mb-6"/>

                {/* 내용 (HTML 렌더링) */}
                <div
                    className="leading-[1.6] mb-16"
                    dangerouslySetInnerHTML={{__html: notice.content}}
                />
            </div>

            {/* 하단 Footer */}
            <FooterBlack />
        </div>
    );
}

export default NoticeDetailPage;