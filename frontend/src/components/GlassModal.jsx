// src/components/GlassModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
export default function GlassModal({ open, title, message, onClose }) {
      const okRef = useRef(null);

          // 모달 열릴 때: Enter 키 누르면 확인(닫기)
              useEffect(() => {
                    if (!open) return;
                    const onKey = (e) => {
                          if (e.key === "Enter") {
                                e.preventDefault();
                                onClose?.();
                              }
                        };
                    window.addEventListener("keydown", onKey);
                    // 열리자마자 확인 버튼에 포커스
                        okRef.current?.focus?.();
                    return () => window.removeEventListener("keydown", onKey);
                  }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-40 flex items-center justify-center p-4 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} // cubic-bezier
                    style={{ willChange: "opacity" }}
                    onClick={onClose} // 바깥 클릭 닫기
                    aria-modal="true" role="dialog"
                >
                    {/* 암막 + 블러 */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-lg" />
                    {/* 모달 카드 */}
                       <div
                         className="relative z-10 w-full max-w-md rounded-3xl border border-white/25 bg-white/15 backdrop-blur-2xl p-6 sm:p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,.7)]"
                         onClick={(e) => e.stopPropagation()}
                       >

                        <h3 className="text-xl font-semibold text-green-300">{title}</h3>
                        {message && <p className="mt-2 text-sm text-white/85">{message}</p>}

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={onClose}
                                className="rounded-xl px-4 py-2 text-white/95 bg-white/15 border border-white/25
                           hover:bg-white/25 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/35"
                            >
                                확인
                            </button>
                        </div>
                       </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
