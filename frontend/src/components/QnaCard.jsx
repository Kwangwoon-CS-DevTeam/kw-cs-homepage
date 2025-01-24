import { Link } from "react-router-dom";

const QnACard = ({ data }) => {
    const { id, title, nickname, created_at, admin_id } = data;

    return (
        <div className="w-full max-w-screen-lg mx-auto px-4">
            <Link
                to={`/qna/${id}`}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between
                 w-full
                 px-3 sm:px-4 lg:px-6
                 py-2.5 sm:py-5 lg:py-6
                 border rounded-lg shadow-sm
                 cursor-pointer hover:shadow-md transition-shadow duration-300"
            >
                {/* 왼쪽 그룹 */}
                <div className="flex flex-row space-x-2 sm:space-x-4 lg:space-x-6 mb-2 sm:mb-0">
                    <span className="text-gray-500 text-sm lg:text-base font-light">#{id}</span>
                    <span className="text-black text-sm lg:text-base font-semibold">
                {title || "제목 없음"}
            </span>
                </div>

                {/* 오른쪽 그룹 */}
                <div
                    className="flex flex-row sm:flex-row sm:items-end sm:justify-end sm:space-x-2 space-x-4 lg:space-x-6 w-full sm:w-auto text-left sm:text-right">
                    <span className="text-gray-500 text-xs lg:text-base font-light mt-1.5 sm:mt-0 sm:mb-1">{nickname}</span>
                    <span className="text-gray-500 text-xs lg:text-base font-light mt-1.5 sm:mt-0 sm:mb-1">
                    {new Date(created_at).toLocaleDateString()}
                    </span>
                    <span
                        className={`px-2 py-1 rounded text-white text-center
                            text-xs lg:text-base ${
                            admin_id ? "bg-blue-800" : "bg-gray-500"
                        }`}
                    >
                        {admin_id ? "답변완료" : "답변대기"}
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default QnACard;