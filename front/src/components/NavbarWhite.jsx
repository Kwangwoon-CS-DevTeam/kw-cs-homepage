import NAVBAR from '../messages/Navbar.js'
'use client'

import { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function NavbarWhite() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [menuClosing, setMenuClosing] = useState(false)

    const toggleMenu = () => {
        if (mobileMenuOpen) {
            // 메뉴 닫기 애니메이션 동기화
            setMenuClosing(true)
            setTimeout(() => {
                setMobileMenuOpen(false)
                setMenuClosing(false)
            }, 450) // 메뉴 애니메이션 지속 시간과 동일
        } else {
            setMobileMenuOpen(true)
        }
    }

    // 화면 크기 변경 시 메뉴 닫기
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && mobileMenuOpen) {
                // 데스크탑 크기 이상에서 메뉴가 열려 있다면 닫기
                setMobileMenuOpen(false)
                setMenuClosing(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [mobileMenuOpen])

    return (
        <header className="absolute top-0 left-0 w-full z-10">
            <nav
                aria-label="Global"
                className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-2 lg:py-6 lg:px-8 bg-transparent"
            >
                <div className="flex lg:flex-1 transition-all duration-300 ease-in-out">
                    <a href="#" className="-m-1.5 p-1.5">
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
                        className="relative text-base text-white font-base px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-15"
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
                    <a
                        href={NAVBAR.fifth.url}
                        className="relative text-base text-white font-semibold px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-50"
                    >
                        {NAVBAR.fifth.title} <span aria-hidden="true">&rarr;</span>
                    </a>
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
                            className="block text-sm font-base text-gray-900 hover:bg-gray-100 rounded-lg px-4 py-2"
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
    )
}