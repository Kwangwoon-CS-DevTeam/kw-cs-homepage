import { footer } from "../messages/Footer.js"; // 데이터 참조

export default function Footer() {
    return (
        <footer
            className="relative backdrop-blur bg-opacity-60 text-gray-300 py-8"
        >
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                {/* 왼쪽 영역 */}
                <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold text-blue-950 mb-2 p-1 rounded">
                        {footer.left.title}
                    </h2>
                    <p className="text-sm text-blue-950">{footer.left.president}</p>
                    <p className="text-sm text-blue-950">{footer.left.vicePresident}</p>
                </div>

                {/* 오른쪽 영역 */}
                <div className="text-center md:text-right mt-4 md:mt-0">
                    <p className="text-sm font-semibold text-blue-950">{footer.right.contact}</p>
                    <div className="flex justify-center md:justify-end mt-2">
                        <img
                            src={footer.right.logoSrcBlack}
                            alt={footer.right.logoAlt}
                            className="h-10"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}