import NAVBAR from '../messages/Navbar.js';
'use client';

import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function NavbarBlack() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [menuClosing, setMenuClosing] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const currentPath = window.location.pathname;

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

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // 활성화된 링크 스타일링 함수
    const getNavLinkClass = (path) => {
        if (currentPath === `${path}/` || currentPath === path) {
            return "bg-blue-200 bg-opacity-30 hover:default"; // 활성화된 링크 배경색, hover 비활성화
        }
        return "hover:bg-blue-200 hover:bg-opacity-15"; // 기본 hover 스타일
    };

    return (
        <header className="relative top-0 left-0 w-full z-10 bg-white">
            <nav
                aria-label="Global"
                className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-2 lg:py-6 lg:px-8"
            >
                <div className="flex lg:flex-1 transition-all duration-300 ease-in-out">
                    <a href="/" className="-m-1.5 p-1.5">
                        <img
                            alt="Custom Logo"
                            src="/images/logo_lightblue.png"
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
                                className={`absolute h-6 w-6 text-black transition-transform duration-300 ${
                                    mobileMenuOpen ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'
                                }`}
                            />
                            <XMarkIcon
                                aria-hidden="true"
                                className={`absolute h-6 w-6 text-black transition-transform duration-300 ${
                                    mobileMenuOpen ? 'rotate-0 opacity-100' : 'rotate-45 opacity-0'
                                }`}
                            />
                        </div>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-1">
                    <a
                        href={NAVBAR.first.url}
                        className={`relative text-base text-black font-base px-4 py-2 rounded-lg ${getNavLinkClass(NAVBAR.first.url)}`}
                    >
                        {NAVBAR.first.title}
                    </a>
                    <a
                        href={NAVBAR.second.url}
                        className={`relative text-base text-black font-base px-4 py-2 rounded-lg ${getNavLinkClass(NAVBAR.second.url)}`}
                    >
                        {NAVBAR.second.title}
                    </a>
                    <a
                        href={NAVBAR.third.url}
                        className={`relative text-base text-black font-base px-4 py-2 rounded-lg ${getNavLinkClass(NAVBAR.third.url)}`}
                    >
                        {NAVBAR.third.title}
                    </a>
                    <a
                        href={NAVBAR.forth.url}
                        className={`relative text-base text-black font-base px-4 py-2 rounded-lg ${getNavLinkClass(NAVBAR.forth.url)}`}
                    >
                        {NAVBAR.forth.title}
                    </a>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {isLoggedIn ? (
                        <button
                            onClick={() => {
                                localStorage.removeItem('jwt');
                                setIsLoggedIn(false);
                                window.location.reload();
                            }}
                            className="relative text-base text-black font-base px-3 py-2 rounded-lg hover:bg-blue-100 hover:bg-opacity-50"
                        >
                            Log out
                        </button>
                    ) : (
                        <a
                            href={NAVBAR.fifth.url}
                            className="relative text-base text-black font-base px-3 py-2 rounded-lg hover:bg-blue-100 hover:bg-opacity-50"
                        >
                            {NAVBAR.fifth.title} <span aria-hidden="true">&rarr;</span>
                        </a>
                    )}
                </div>
            </nav>
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
                            className={`block text-sm font-base text-gray-900 rounded-lg px-4 py-2 ${getNavLinkClass(NAVBAR.first.url)}`}
                        >
                            {NAVBAR.first.title}
                        </a>
                    </li>
                    <li>
                        <a
                            href={NAVBAR.second.url}
                            className={`block text-sm font-base text-gray-900 rounded-lg px-4 py-2 ${getNavLinkClass(NAVBAR.second.url)}`}
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
                            className={`block text-sm font-base text-gray-900 rounded-lg px-4 py-2 ${getNavLinkClass(NAVBAR.forth.url)}`}
                        >
                            {NAVBAR.forth.title}
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    );
}