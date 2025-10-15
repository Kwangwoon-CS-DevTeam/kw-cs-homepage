import { useId, useState } from "react";

function cx(...classes) { return classes.filter(Boolean).join(" "); }

const baseInput =
    "w-full rounded-xl border bg-white px-3 py-2 shadow-sm outline-none transition " +
    "border-gray-300 placeholder:text-gray-400 " +
    "focus:border-black focus:ring-4 focus:ring-gray-300 " +
    "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 read-only:bg-gray-50 " +
    "aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-4 aria-[invalid=true]:ring-red-100";

const sizeMap = { sm: "text-sm py-2", md: "text-base py-2.5", lg: "text-base py-3" };

// eslint-disable-next-line react/prop-types
export function Field({ label, required, hint, error, children, htmlFor }) {
    return (
        <div className={cx("group/field", error && "[&_*]:!ring-red-100")}>
            {label && (
                <label htmlFor={htmlFor} className={cx("mb-1 inline-block text-sm font-medium", error ? "text-red-700" : "text-gray-800")}>
                    {label}{required && <span className="ml-1 text-red-600">*</span>}
                </label>
            )}
            {children}
            {hint && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
            {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
        </div>
    );
}

export function TextInput({
                              // eslint-disable-next-line react/prop-types
                              id, label, required, hint, error, prefix, suffix, size = "md", className, inputClassName, ...props
                          }) {
    const fallbackId = useId();
    const domId = id || `input-${fallbackId}`;
    const isInvalid = Boolean(error);

    return (
        <Field label={label} required={required} hint={hint} error={error} htmlFor={domId}>
            <div className="relative flex items-center">
                {prefix && <div className="pointer-events-none absolute left-3 text-gray-400">{prefix}</div>}
                <input
                    id={domId}
                    aria-invalid={isInvalid}
                    className={cx(baseInput, sizeMap[size], prefix && "pl-9", suffix && "pr-10", className, inputClassName)}
                    {...props}
                />
                {suffix && <div className="absolute right-3 text-gray-400">{suffix}</div>}
            </div>
        </Field>
    );
}

// eslint-disable-next-line react/prop-types
export function PasswordInput({ id, label, required, hint, error, size = "md", ...props }) {
    const [visible, setVisible] = useState(false);
    const fallbackId = useId();
    const domId = id || `pwd-${fallbackId}`;
    const isInvalid = Boolean(error);

    return (
        <Field label={label} required={required} hint={hint} error={error} htmlFor={domId}>
            <div className="relative flex items-center">
                <input
                    id={domId}
                    type={visible ? "text" : "password"}
                    aria-invalid={isInvalid}
                    className={cx(baseInput, sizeMap[size], "pr-10")}
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => setVisible(v => !v)}
                    className="absolute right-2 rounded-lg px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 active:scale-[0.98]"
                    aria-label={visible ? "비밀번호 숨기기" : "비밀번호 표시"}
                >
                    {visible ? "숨김" : "표시"}
                </button>
            </div>
        </Field>
    );
}

export function TextAreaWithCount({
                                      // eslint-disable-next-line react/prop-types
                                      id, label, required, hint, error, maxLength = 300, value = "", onChange, rows = 7, size = "md", ...props
                                  }) {
    const fallbackId = useId();
    const domId = id || `ta-${fallbackId}`;
    const isInvalid = Boolean(error);

    const warn = Math.floor(maxLength * 0.5);
    const danger = Math.floor(maxLength * 0.83);
    const countColor =
        value.length > danger ? "text-red-600" : value.length > warn ? "text-yellow-700" : "text-gray-500";

    return (
        <Field label={label} required={required} hint={hint} error={error} htmlFor={domId}>
      <textarea
          id={domId}
          aria-invalid={isInvalid}
          maxLength={maxLength}
          rows={rows}
          value={value}
          onChange={onChange}
          className={cx(baseInput, sizeMap[size], "min-h-40 resize-y")}
          {...props}
      />
            <div className={cx("mt-1 text-xs", countColor)}>{value.length} / {maxLength}</div>
        </Field>
    );
}
