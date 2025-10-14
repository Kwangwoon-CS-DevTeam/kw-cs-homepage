import { motion } from "framer-motion";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import cieClient from "../api/cieClient";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const VERIFY_PATH = import.meta.env.VITE_CIE_VERIFY_PATH || "/students/exists";

export default function StudentVerify() {
    const [entryYear, setEntryYear] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const years = ["25", "24", "23", "22", "21", "20", "19"];

    const onSubmit = async (e) => {
        e.preventDefault();

        // 입력 값 검증
        if (!entryYear) {
            toast.error("입학년도를 선택하세요. (19~25)");
            return;
        }
        if (!name) {
            toast.error("이름을 입력하세요.");
            return;
        }
        if (name.length < 2) {
            toast.error("이름은 최소 2자 이상 입력하세요.");
            return;
        }
        if (loading) return;

        setLoading(true);

        try {
            const { data } = await cieClient.post(VERIFY_PATH, {
                entryYear: Number(entryYear),
                name: name.trim(),
            });

            const message = data?.message || "해당 학생 정보가 존재합니다.";
            toast.success(message);
        } catch (err) {
            const status = err?.response?.status;
            if (status === 404) {
                toast.warning("해당 학생 정보가 없습니다.");
            } else if (status === 400) {
                const msg = err?.response?.data?.message || "요청 형식이 올바르지 않습니다.";
                toast.error(msg);
            } else {
                toast.error("서버 요청 중 문제가 발생했습니다. 잠시 후 다시 시도하세요.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <Toaster richColors position="top-center" />

            {/* 배경 요소들은 그대로 유지 */}
            <div
                className="absolute inset-0 -z-20 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/pub1.jpg')" }}
                aria-hidden
            />
            <div
                className="absolute inset-0 -z-10 opacity-70"
                aria-hidden
                style={{
                    background:
                        "radial-gradient(60% 60% at 50% 20%, rgba(99,102,241,0.35) 0%, rgba(168,85,247,0.22) 35%, rgba(236,72,153,0.12) 60%, rgba(0,0,0,0.0) 100%)",
                }}
            />
            <div className="absolute inset-0 -z-10 bg-black/35 backdrop-blur-[2px]" />
            <div className="pointer-events-none absolute inset-0 -z-10 shadow-[inset_0_0_120px_60px_rgba(0,0,0,0.45)]" />
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/4 top-1/3 size-2 rounded-full bg-white/70 animate-pulse-slow" />
                <div className="absolute left-3/4 top-1/4 size-1.5 rounded-full bg-white/60 animate-pulse-slower" />
                <div className="absolute left-2/3 top-2/3 size-1 rounded-full bg-white/50 animate-pulse-slow" />
            </div>

            {/* --- 🌟 반응형 수정 POINT 1 --- */}
            {/* 중앙 카드 컨테이너: 화면 너비에 따라 좌우 패딩 조정 */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 22, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    // --- 🌟 반응형 수정 POINT 2 ---
                    // 카드 내부 패딩 조정
                    className="w-full max-w-lg rounded-3xl border border-white/20 bg-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
                >
                    {/* 타이틀 */}
                    <div className="mb-8 text-center">
                        {/* --- 🌟 반응형 수정 POINT 3 --- */}
                        {/* 타이틀 폰트 크기 조정 */}
                        <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide text-white">
                            학생 회비 납부여부
                        </h1>
                        <p className="mt-2 text-sm text-white/70">
                            입학년도(19~25)와 이름을 입력하면 납부여부 확인이 가능합니다.
                        </p>
                    </div>

                    {/* 폼 */}
                    <form onSubmit={onSubmit} className="space-y-6">
                        {/* 입학년도 셀렉트 */}
                        <div className="relative group">
                            <Listbox value={entryYear} onChange={setEntryYear}>
                                <div className="relative">
                                    <Listbox.Button
                                        className="group w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-4 pr-14 text-left text-white outline-none backdrop-blur-sm transition hover:border-white/30 focus:border-indigo-300/70 focus:ring-2 focus:ring-indigo-300/40"
                                    >
                                        <span className={`block truncate ${entryYear ? "text-white" : "text-white/60"}`}>
                                            {entryYear ? `${entryYear} 학번` : "입학년도 선택 (19~25)"}
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <span
                                                aria-hidden
                                                className="absolute right-2 h-7 w-7 rounded-xl bg-gradient-to-br from-indigo-400/25 via-fuchsia-400/20 to-pink-400/15 blur-[6px] opacity-0 group-hover:opacity-70 group-focus:opacity-90 transition"
                                            />
                                            <ChevronUpDownIcon className="relative h-5 w-5 text-white/85 drop-shadow-[0_1px_4px_rgba(0,0,0,.35)] transition-transform duration-300 group-data-[headlessui-state='open']:rotate-180" />
                                        </span>
                                    </Listbox.Button>
                                    <Transition
                                        enter="transition ease-out duration-150"
                                        enterFrom="opacity-0 scale-95 translate-y-1"
                                        enterTo="opacity-100 scale-100 translate-y-0"
                                        leave="transition ease-in duration-120"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Listbox.Options
                                            className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-2xl border border-white/30 bg-black/75 p-1.5 text-sm text-white/95 shadow-2xl backdrop-blur-2xl ring-1 ring-white/20 focus:outline-none"
                                        >
                                            <div className="px-2 py-2 text-xs text-white/70">입학년도 선택</div>
                                            {years.map((y) => (
                                                <Listbox.Option
                                                    key={y}
                                                    value={y}
                                                    className={({ active, selected }) =>
                                                        `relative cursor-pointer select-none rounded-xl px-3 py-2.5 ${active ? "bg-gradient-to-r from-indigo-500/25 via-fuchsia-500/20 to-pink-500/15 ring-1 ring-white/20" : ""} ${selected ? "bg-white/15" : ""}`
                                                    }
                                                >
                                                    {({ selected }) => (
                                                        <div className="flex items-center gap-2">
                                                            <span className={`transition ${selected ? "opacity-100" : "opacity-0"}`}>
                                                                <CheckIcon className="h-4 w-4 text-indigo-200" />
                                                            </span>
                                                            <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                                                {y} 학번
                                                            </span>
                                                        </div>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>
                            <span
                                aria-hidden
                                className="pointer-events-none absolute right-11 top-1/2 -translate-y-1/2 h-7 w-px bg-white/20 group-hover:bg-white/30 group-focus-within:bg-white/30 transition"
                            />
                            <span
                                aria-hidden
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-400/25 via-fuchsia-400/20 to-pink-400/15 blur-[6px] opacity-0 group-hover:opacity-70 group-focus-within:opacity-90 transition"
                            />
                        </div>

                        {/* 이름 */}
                        <div className="relative">
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder=" "
                                className="peer w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-4 text-white placeholder-transparent outline-none backdrop-blur-sm transition focus:border-indigo-300/70 focus:ring-2 focus:ring-indigo-300/40 hover:border-white/30"
                                autoComplete="off"
                            />
                            <label
                                htmlFor="name"
                                className="pointer-events-none absolute left-4 top-4 text-white/70 transition-all peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-200 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
                            >
                                이름 (예: 홍길동)
                            </label>
                        </div>

                        {/* 버튼 */}
                        <motion.button
                            whileHover={{ scale: !loading ? 1.02 : 1 }}
                            whileTap={{ scale: !loading ? 0.98 : 1 }}
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full overflow-hidden rounded-2xl px-5 py-3.5 font-medium text-white shadow-2xl transition ${
                                !loading
                                    ? "bg-gradient-to-r from-indigo-400 via-fuchsia-500 to-pink-500"
                                    : "bg-white/20 cursor-not-allowed"
                            }`}
                        >
                            <span className="relative z-10">{loading ? "확인 중…" : "납부여부 확인"}</span>
                            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent blur-sm transition-transform duration-700 group-hover:translate-x-full" />
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            <style>{`
                @keyframes pulse-slow { 0%, 100% { opacity: .5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.15); } }
                @keyframes pulse-slower { 0%, 100% { opacity: .4; transform: scale(1); } 50% { opacity: .9; transform: scale(1.1); } }
                .animate-pulse-slow { animation: pulse-slow 5s ease-in-out infinite; }
                .animate-pulse-slower { animation: pulse-slower 7.5s ease-in-out infinite; }
            `}</style>
        </div>
    );
}