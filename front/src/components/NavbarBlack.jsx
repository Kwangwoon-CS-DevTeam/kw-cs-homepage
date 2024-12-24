import navbar from '../messages/navbar.js'
'use client'

import { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function NavbarBlack() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [menuClosing, setMenuClosing] = useState(false)

    const toggleMenu = () => {
        if (mobileMenuOpen) {
            setMenuClosing(true)
            setTimeout(() => {
                setMobileMenuOpen(false)
                setMenuClosing(false)
            }, 450)
        } else {
            setMobileMenuOpen(true)
        }
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && mobileMenuOpen) {
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
                            src="/images/logo_black.png"
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
                        href="#"
                        className="relative text-base text-black font-base px-4 py-2 rounded-lg hover:bg-gray-200 hover:bg-opacity-15"
                    >
                        {navbar.first}
                    </a>
                    <a
                        href="#"
                        className="relative text-base text-black font-base px-4 py-2 rounded-lg hover:bg-gray-200 hover:bg-opacity-15"
                    >
                        {navbar.second}
                    </a>
                    <a
                        href="#"
                        className="relative text-base text-black font-base px-4 py-2 rounded-lg hover:bg-gray-200 hover:bg-opacity-15"
                    >
                        {navbar.third}
                    </a>
                    <a
                        href="#"
                        className="relative text-base text-black font-base px-4 py-2 rounded-lg hover:bg-gray-200 hover:bg-opacity-15"
                    >
                        {navbar.forth}
                    </a>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a
                        href="#"
                        className="relative text-base text-black font-semibold px-3 py-2 rounded-lg hover:bg-gray-200 hover:bg-opacity-50"
                    >
                        {navbar.fifth} <span aria-hidden="true">&rarr;</span>
                    </a>
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
                            href="#"
                            className="block text-sm font-base text-black hover:bg-gray-100 rounded-lg px-4 py-2"
                        >
                            {navbar.first}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block text-sm font-base text-black hover:bg-gray-100 rounded-lg px-4 py-2"
                        >
                            {navbar.second}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block text-sm font-base text-black hover:bg-gray-100 rounded-lg px-4 py-2"
                        >
                            {navbar.third}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block text-sm font-base text-black hover:bg-gray-100 rounded-lg px-4 py-2"
                        >
                            {navbar.forth}
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    )
}