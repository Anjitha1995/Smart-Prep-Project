import { useId } from "react";

/*  * Reusable customized input component
    * Styled using generic styles and has an option to recieve custom styles
    * default type is text
*/
export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder = "",
  error = "",
  hint = "",
  className = "",
  inputClassName = "",
  labelClassName = "",
  required = false,
  disabled = false,
  autoComplete = "on"
}) {
  const wrapperClasses = `w-full ${className}`;

  const baseInputClasses =
    "mt-2 w-full rounded-2xl border px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 sm:px-5 sm:py-4 sm:text-lg";

  const normalStateClasses =
    "border-slate-200 bg-slate-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

  const errorStateClasses =
    "border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100";
const generatedId = useId();
const inputId = `${name}-${generatedId}`;
  return (
    <div className={wrapperClasses}>
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-base font-semibold text-slate-800 sm:text-lg ${labelClassName}`}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`${baseInputClasses} ${
          error ? errorStateClasses : normalStateClasses
        } ${inputClassName}`}
      />

      {hint && !error && (
        <p className="mt-2 text-xs text-slate-500 sm:text-sm">{hint}</p>
      )}

      {error && (
        <div className="mt-2 text-xs text-red-500 sm:text-sm">
          {Array.isArray(error) ? (
            <ul className="list-disc space-y-1 pl-5">
              {error.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="font-medium">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}