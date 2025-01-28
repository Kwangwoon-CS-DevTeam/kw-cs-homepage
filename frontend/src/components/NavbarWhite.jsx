import {useState, useEffect, useRef} from 'react';
import NAVBAR from '../messages/Navbar.js';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function NavbarWhite() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [menuClosing, setMenuClosing] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 메뉴 영역을 참조할 ref
    const menuRef = useRef(null);
    // 스크롤 여부 상태
    const [scrolled, setScrolled] = useState(false);

    const currentPath = window.location.pathname;

    useEffect(() => {
        // 브라우저 세션에 토큰이 있는지 확인
        const token = localStorage.getItem('jwt'); // 'jwt' 키로 변경
        if (token) {
            setIsLoggedIn(true); // 로그인 상태로 설정
        }
    }, []);

    // 스크롤 이벤트 핸들링
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    useEffect(() => {
        // 메뉴 영역 밖을 클릭하면 닫힘을 유도하는 함수
        const handleClickOutside = (e) => {
            // 현재 메뉴가 열려있고, 메뉴 영역이 존재하며, 그 영역을 벗어난 곳을 클릭했다면
            if (
                mobileMenuOpen &&
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                toggleMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // 컴포넌트가 언마운트되거나 mobileMenuOpen이 바뀔 때 이벤트를 정리
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    const toggleMenu = () => {
        if (mobileMenuOpen) {
            setMenuClosing(true);
            setTimeout(() => {
                setMobileMenuOpen(false);
                setMenuClosing(false);
            }, 450);
        } else {
            setMobileMenuOpen(true);
        }
    };

    // 활성화된 링크 스타일링 함수
    const getNavLinkClass = (path) => {
        if (currentPath === `${path}/` || currentPath === path) {
            return "bg-blue-200 bg-opacity-30 hover:default"; // 활성화된 링크 배경색, hover 비활성화
        }
        return "hover:bg-blue-100 hover:bg-opacity-15"; // 기본 hover 스타일
    };

    return (
        <header
            ref={menuRef}
            className={`
                sticky -top-1 left-0 w-full z-50
                transition-all duration-300 ease-in-out
                ${scrolled ? ' backdrop-blur-sm' : 'bg-transparent backdrop-blur-none'}
            `}
        >
            <nav
                aria-label="Global"
                className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-2 lg:py-6 lg:px-8 bg-transparent"
            >
                <div className="flex lg:flex-1 transition-all duration-300 ease-in-out">
                    <a href="/" className="-m-1.5 p-1.5">
                        <img
                            alt="Custom Logo"
                            src="/images/logo.png"
                            className="h-14 w-auto transition-all duration-300 ease-in-out"
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={toggleMenu}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">
                            {mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
                        </span>
                        <div className="relative h-6 w-6">
                            <Bars3Icon
                                aria-hidden="true"
                                className={`absolute h-6 w-6 text-white transition-transform duration-300 ${
                                    mobileMenuOpen ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'
                                }`}
                            />
                            <XMarkIcon
                                aria-hidden="true"
                                className={`absolute h-6 w-6 text-white transition-transform duration-300 ${
                                    mobileMenuOpen ? 'rotate-0 opacity-100' : 'rotate-45 opacity-0'
                                }`}
                            />
                        </div>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-1">
                    <a
                        href={NAVBAR.first.url}
                        className="relative text-base text-white font-base px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-15"
                    >
                        {NAVBAR.first.title}
                    </a>
                    <a
                        href={NAVBAR.second.url}
                        className="relative text-base text-white font-base px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-15"
                    >
                        {NAVBAR.second.title}
                    </a>
                    <a
                        href={NAVBAR.third.url}
                        className={`relative text-base text-white font-base px-4 py-2 rounded-lg ${getNavLinkClass(NAVBAR.third.url)}`}
                    >
                        {NAVBAR.third.title}
                    </a>
                    <a
                        href={NAVBAR.forth.url}
                        className="relative text-base text-white font-base px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-15"
                    >
                        {NAVBAR.forth.title}
                    </a>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {isLoggedIn ? (
                        // 로그아웃 버튼
                        <button
                            onClick={() => {
                                localStorage.removeItem('jwt'); // 세션에서 토큰 삭제
                                setIsLoggedIn(false); // 상태 업데이트
                                window.location.reload();
                            }}
                            className="relative text-base text-white font px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-50"
                        >
                            Log out
                        </button>
                    ) : (
                        // 로그인 버튼
                        <a
                            href={NAVBAR.fifth.url}
                            className="relative text-base text-white font px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-50"
                        >
                            {NAVBAR.fifth.title} <span aria-hidden="true">&rarr;</span>
                        </a>
                    )}
                </div>
            </nav>
            {/* 모바일 메뉴 */}
            <div
                className={`absolute top-full left-0 w-full bg-white shadow-lg overflow-hidden transition-[max-height] duration-[450ms] ${
                    mobileMenuOpen && !menuClosing
                        ? 'max-h-[500px] ease-[cubic-bezier(0.55, 0.055, 0.675, 0.19)]'
                        : 'max-h-0 ease-[cubic-bezier(0.215, 0.61, 0.355, 1)]'
                }`}
            >
                <ul className="flex flex-col space-y-2 p-2">
                    <li>
                        <a
                            href={NAVBAR.first.url}
                            className="block text-sm font-base text-gray-900 hover:bg-gray-100 rounded-lg px-4 py-2"
                        >
                            {NAVBAR.first.title}
                        </a>
                    </li>
                    <li>
                        <a
                            href={NAVBAR.second.url}
                            className="block text-sm font-base text-gray-900 hover:bg-gray-100 rounded-lg px-4 py-2"
                        >
                            {NAVBAR.second.title}
                        </a>
                    </li>
                    <li>
                        <a
                            href={NAVBAR.third.url}
                            className={`block text-sm font-base text-gray-900 rounded-lg px-4 py-2 ${getNavLinkClass(NAVBAR.third.url)}`}
                        >
                            {NAVBAR.third.title}
                        </a>
                    </li>
                    <li>
                        <a
                            href={NAVBAR.forth.url}
                            className="block text-sm font-base text-gray-900 hover:bg-gray-100 rounded-lg px-4 py-2"
                        >
                            {NAVBAR.forth.title}
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    );
}