import { useEffect, useId, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";

function cx(...c) { return c.filter(Boolean).join(" "); }

/**
 * SearchInput
 * - 축소(아이콘만) ↔ 확장(입력창) 전환
 * - Enter 제출, Esc 초기화/접기, 값 있을 때 X(클리어) 표시
 * - aria 라벨, 포커스 트랩 최소화
 */
export default function SearchInput({
                                        open,                  // boolean: 외부에서 열림/닫힘 제어
                                        setOpen,               // function: open 상태 갱신
                                        value,                 // string: 검색어
                                        onChange,              // function(e): 값 변경
                                        onSubmit,              // function(): 제출 핸들러
                                        placeholder = "검색",
                                        className,
                                    }) {
    const id = useId();
    const inputRef = useRef(null);

    useEffect(() => {
        if (open && inputRef.current) inputRef.current.focus();
    }, [open]);

    return (
        <div className={cx("relative flex items-center", className)}>
            {/* 확장된 입력창 */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="search-bar"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "12rem" }}     // sm: 12rem, 필요 시 조정
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
                                className={cx(
                                    "w-full rounded-xl border border-gray-300 bg-white",
                                    "pl-9 pr-8 py-2 text-sm shadow-sm outline-none",
                                    "placeholder:text-gray-400",
                                    "focus:border-blue-500"
                                )}
                            />
                            {/* 좌측 검색 아이콘(데코) */}
                            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                            {/* 클리어 버튼 */}
                            {value && (
                                <button
                                    type="button"
                                    aria-label="검색어 지우기"
                                    onClick={() => onChange({ target: { value: "" } })}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 토글/제출 버튼 (아이콘) */}
            <button
                type="button"
                aria-label={open ? "검색 실행" : "검색 열기"}
                className="p-2 rounded-full text-blue-900 hover:bg-blue-100 transition"
                onClick={() => {
                    if (open) onSubmit();
                    else setOpen(true);
                }}
            >
                <FaSearch className="text-lg" />
            </button>
        </div>
    );
}
