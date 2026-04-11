/*  * Reusable card component
    * can customize style
    * padding, shadow and rounded has default values
    * content is passed as child element
  */
export default function Card({
  children,
  className = "",
  padding = "lg",
  shadow = "lg",
  rounded = "xl",
  border = true,
}) {
  const baseClasses = `bg-white ${border ? "border border-slate-200" : ""}`;

  const paddingClasses = {
    none: "p-0",
    sm: "p-4",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-8 lg:p-10",
    xl: "p-8 sm:p-10 lg:p-12",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-xl shadow-slate-200/70",
    xl: "shadow-2xl shadow-slate-200/80",
  };

  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-xl",
    md: "rounded-2xl",
    lg: "rounded-3xl",
    xl: "rounded-[28px]",
  };

  return (
    <div
      className={`${baseClasses} ${paddingClasses[padding]} ${
        shadowClasses[shadow]
      } ${roundedClasses[rounded]} ${className}`}
    >
      {children}
    </div>
  );
}