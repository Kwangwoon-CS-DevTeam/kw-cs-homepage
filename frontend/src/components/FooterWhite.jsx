import { footer } from "../messages/Footer.js"; // 데이터 참조

export default function FooterWhite() {
    return (
        <footer
            className="relative backdrop-blur bg-opacity-60 text-gray-300 py-8"
        >
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                {/* 왼쪽 영역 */}
                <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold text-white mb-2">
                        {footer.left.title}
                    </h2>
                    <p className="text-sm">{footer.left.president}</p>
                    <p className="text-sm">{footer.left.vicePresident}</p>
                </div>

                {/* 중앙 영역 */}
                <div className="text-center mt-4 md:mt-0">
                    <p className="text-sm">{footer.center.message}</p>
                </div>

                {/* 오른쪽 영역 */}
                <div className="text-center md:text-right mt-4 md:mt-0">
                    <p className="text-sm font-semibold">{footer.right.contact}</p>
                    <div className="flex justify-center md:justify-end mt-2">
                        <img
                            src={footer.right.logoSrcWhite}
                            alt={footer.right.logoAlt}
                            className="h-10"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}