/*  * Reusable button component
    * Can customize style, type, color and size
    * Default value for type is button, color as variant is primary, size is md and is not disabled 
    * button text is passed as child element
*/
export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  onClick,
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold leading-none transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]";

  const variantClasses = {
    primary:
      "bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-400",
    ghost:
      "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-400",
    danger:
      "bg-red-600 text-white shadow-md shadow-red-200 hover:bg-red-700 focus:ring-red-500",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-sm sm:text-base",
    lg: "px-6 py-3.5 text-base sm:px-7 sm:py-4 sm:text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${
        sizeClasses[size]
      } ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {leftIcon && (
        <span className="inline-flex shrink-0 items-center justify-center">
          {leftIcon}
        </span>
      )}

      <span className="inline-flex items-center leading-none">
        {children}
      </span>

      {rightIcon && (
        <span className="inline-flex shrink-0 items-center justify-center">
          {rightIcon}
        </span>
      )}
    </button>
  );
}
