import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";

function cx(...c) { return c.filter(Boolean).join(" "); }

export default function SearchInput({
                                        open, setOpen, value, onChange, onSubmit,
                                        placeholder = "검색", className,
                                        fluid = false,
                                    }) {
    const id = useId();
    const inputRef = useRef(null);
    const [isSmUp, setIsSmUp] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 640px)");
        const handle = () => setIsSmUp(mq.matches);
        handle();
        mq.addEventListener("change", handle);
        return () => mq.removeEventListener("change", handle);
    }, []);

    useEffect(() => {
        if (open && inputRef.current) inputRef.current.focus();
    }, [open]);

    return (
        // ✅ justify-end: 내부 요소(검색창, 아이콘)를 오른쪽으로 밀어냅니다.
        <div className={cx("relative flex items-center justify-end min-w-0", className)}>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="search-bar"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{
                            opacity: 1,
                            // ✅ fluid가 아닐 때 clamp로 너비 조절 (이 값이 실제 너비가 됩니다)
                            // 모바일: 최소 80px, 기본 화면의 40%, 최대 160px
                            width: fluid
                                ? "100%"
                                : (isSmUp ? "clamp(8rem, 28vw, 14rem)" : "clamp(5rem, 40vw, 6rem)"),
                        }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15 }}
                        className="mr-1 overflow-hidden"
                    >
                        <div className="relative">
                            <input
                                id={`search-${id}`}
                                ref={inputRef}
                                type="text"
                                value={value}
                                onChange={onChange}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") onSubmit();
                                    if (e.key === "Escape") {
                                        if (value) onChange({ target: { value: "" } });
                                        setOpen(false);
                                    }
                                }}
                                placeholder={placeholder}
                                aria-label="자료 검색"
                                // ✅ w-full: motion.div의 크기에 항상 꽉 차도록 설정
                                className="w-full rounded-lg border border-gray-300 bg-white pr-7 py-1.5 text-xs sm:text-sm sm:py-2 shadow-sm outline-none placeholder:text-gray-400 focus:border-blue-600"
                            />
                            {value && (
                                <button
                                    type="button"
                                    aria-label="검색어 지우기"
                                    onClick={() => onChange({ target: { value: "" } })}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-1.5 py-0.5 text-[11px] text-gray-600 hover:bg-gray-100"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                type="button"
                aria-label={open ? "검색 실행" : "검색 열기"}
                className="p-1.5 rounded-full text-blue-900 hover:bg-blue-100 transition"
                onClick={() => {
                    if (open) onSubmit();
                    else setOpen(true);
                }}
            >
                <FaSearch className="text-base" />
            </button>
        </div>
    );
}