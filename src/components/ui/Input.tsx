"use client";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl text-slate-200 placeholder-slate-600 text-sm transition-all duration-200",
              "focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.12)]",
              "hover:border-white/[0.14]",
              icon ? "pl-10 pr-4 py-3" : "px-4 py-3",
              error && "border-red-500/50 focus:border-red-500/70",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl text-slate-200 placeholder-slate-600 text-sm transition-all duration-200 resize-none",
            "focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.12)]",
            "hover:border-white/[0.14]",
            "px-4 py-3",
            error && "border-red-500/50",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            "w-full bg-[#0d1526] border border-white/[0.08] rounded-xl text-slate-200 text-sm transition-all duration-200 appearance-none cursor-pointer",
            "focus:outline-none focus:border-amber-500/50 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.12)]",
            "hover:border-white/[0.14]",
            "px-4 py-3",
            error && "border-red-500/50",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
