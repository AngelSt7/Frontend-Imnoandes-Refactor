interface InputLabelProps {
  htmlFor: string;
  label?: string;
  variant: "default" | "floating";
  errorMessage?: unknown;
  isTextArea?: boolean;
}

export function InputLabel({ htmlFor, label, variant, errorMessage, isTextArea }: InputLabelProps) {
  if (!label) return null;

  if (variant === "default") {
    return (
      <label
        htmlFor={htmlFor}
        className="select-none capitalize overflow-hidden whitespace-nowrap text-ellipsis text-base font-semibold text-[#202021] dark:text-[#c5c5c7]"
      >
        {label}:
      </label>
    );
  }

  const floatingClasses = `
    absolute text-gray-500 dark:text-gray-400 duration-300 transform 
    ${isTextArea ? "top-6" : "top-4"} -translate-y-4 z-10 origin-[0] left-3 scale-75
    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
    ${isTextArea ? "peer-placeholder-shown:top-6" : "peer-placeholder-shown:top-1/2"}
    peer-focus:scale-75 ${isTextArea ? "peer-focus:top-2" : "peer-focus:top-4"} 
    ${isTextArea ? "peer-focus:-translate-y-0" : "peer-focus:-translate-y-4"}
    ${errorMessage ? "text-[#d10b30] peer-focus:text-[#d10b30]" : ""}
    pointer-events-none select-none
  `;

  return (
    <label htmlFor={htmlFor} className={floatingClasses}>
      {label}
    </label>
  );
}
