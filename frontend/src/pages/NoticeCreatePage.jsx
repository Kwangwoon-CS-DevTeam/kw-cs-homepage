import NavbarBlack from "../components/NavbarBlack.jsx";
import FooterBlack from "../components/FooterBlack.jsx";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import {useEffect, useState} from "react";
import CategorySelector from "../components/button/CategorySelector.jsx";
import apiClient from "../api/axiosClient.js";
import { useCheckAuth } from "../api/auth";

const NewNoticePage = () => {
    const [title, setTitle] = useState(null); // 제목
    const [url, setUrl] = useState(null); // 신청 URL
    const [content, setContent] = useState(null); // 공지 내용
    const navigate = useNavigate(); // useNavigate 훅 초기화
    const [excerpt, setExcerpt] = useState(null); // 요약 상태
    const [category, setCategory] = useState("important"); // 기본값 "important"
    const [maxParticipants, setMaxParticipants] = useState(null);

    const checkAuth = useCheckAuth(); // useCheckAuth 훅 호출

    useEffect(() => {
        checkAuth(); // 인증 확인
    }, []);

    const handleEditorChange = (content) => {
        setContent(content); // 에디터 내용 업데이트
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 요청에 보낼 데이터
        const requestData = {
            title,
            url,
            content,
            excerpt,
            max_participants: maxParticipants,
            category
        };

        if(url == null || url.length == 0){
            delete requestData.url;
            delete requestData.max_participants;
        }

        try {
            const response = await apiClient.post("/notices/new-notice", requestData);

            if (response.status === 200 || response.status === 201) {

                alert("공지사항이 등록되었습니다!");

                // 저장 성공 시 /notices 페이지로 이동
                navigate("/notices");
            } else {
                console.log("에러 발생 in front:", response.data);
                alert("공지사항 등록 중 에러가 발생했습니다.");
            }
        } catch (error) {
            console.error("서버 요청 실패:", error);
            alert("서버와의 통신에 실패했습니다.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* 네비게이션 바 */}
            <NavbarBlack />

            {/* 메인 컨텐츠 */}
            <div className="flex flex-col flex-grow px-48 py-12 border-t">
                <form className="flex flex-col flex-grow" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="title" className="block font-medium mb-2 sr-only">
                            제목
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="제목을 입력하세요."
                            className="w-full px-4 py-2 border-b rounded-lg text-2xl focus:outline-none"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="url" className="block font-medium mb-2 sr-only">
                            신청 URL
                        </label>
                        <input
                            type="text"
                            id="url"
                            placeholder="구글 폼 URL 을 입력하세요.(선택)"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    <div className="mb-6 ">
                        <label htmlFor="max_participants" className="block text-sm mb-2 font-medium text-gray-700">
                            최대 인원
                        </label>
                        <input
                            type="number"
                            id="max_participants"
                            placeholder="최대 참가자 수를 입력하세요."
                            className="w-1/4 px-4 py-2 border rounded-lg"
                            value={maxParticipants}
                            onChange={(e) => setMaxParticipants(e.target.value)}
                        />
                    </div>

                    <CategorySelector category={category} setCategory={setCategory}/>

                    <div className="flex-grow mb-6">
                        <label htmlFor="content" className="block font-medium mb-2 sr-only">
                            공지 내용
                        </label>
                        <Editor
                            id="content"
                            apiKey="sy6aa0rd1w6jksim904zlqeuan53xj3lr1cjt69gxy1q0387"
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    "advlist autolink lists link image charmap preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste help wordcount",
                                    "textcolor",
                                    "lineheight",
                                    "image", // 이미지 업로드 플러그인
                                ],
                                toolbar:
                                    "formatselect | bold forecolor backcolor image | \
                                    alignleft aligncenter alignright alignjustify lineheight | \
                                    bullist numlist outdent indent | removeformat | help",
                                content_style: `
                body {
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 0.5;
                    margin: 0;
                    padding: 10px;
                    border: none;
                }
            `,
                                setup: (editor) => {
                                    editor.on("init", () => {
                                        console.log("Editor initialized");
                                    });

                                    // 에디터 내용 변경 로그
                                    editor.on("change", () => {
                                        console.log("Editor content changed:", editor.getContent());
                                    });
                                },
                                file_picker_callback: (callback) => {
                                    const input = document.createElement("input");
                                    input.setAttribute("type", "file");
                                    input.setAttribute("accept", "image/*");

                                    input.addEventListener("change", (e) => {
                                        const file = e.target.files[0];

                                        if (file) {
                                            const formData = new FormData();
                                            formData.append("file", file);

                                            fetch(`${import.meta.env.VITE_API_URL}/notices/new-notice/upload`, {
                                                method: "POST",
                                                body: formData,
                                            })
                                                .then((response) => {
                                                    if (!response.ok) {
                                                        throw new Error("Upload failed");
                                                    }
                                                    return response.json();
                                                })
                                                .then((data) => {
                                                    console.log("Uploaded URL:", data.location);
                                                    callback(data.location, {title: file.name}); // TinyMCE에 이미지 삽입
                                                })
                                                .catch((error) => {
                                                    console.error("Image upload failed:", error);
                                                });
                                        }
                                    });

                                    input.click();
                                },
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="excerpt" className="block font-medium mb-2">
                            요약
                        </label>
                        <textarea
                            id="excerpt"
                            placeholder="공지 요약을 작성하세요. (선택 사항)"
                            className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4" // 필드 높이를 설정
                            value={excerpt} // 요약 상태 값
                            onChange={(e) => setExcerpt(e.target.value)} // 요약 상태 업데이트
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-4 px-6 py-2 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                        >
                            등록
                        </button>
                    </div>
                </form>
            </div>

            {/* 푸터 */}
            <FooterBlack/>
        </div>
    );
};

export default NewNoticePage;