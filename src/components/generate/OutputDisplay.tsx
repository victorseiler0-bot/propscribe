"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface OutputDisplayProps {
  description: string;
  onRegenerate: () => void;
  isLoading: boolean;
}

export default function OutputDisplay({ description, onRegenerate, isLoading }: OutputDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(description);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([editedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "property-description.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const wordCount = editedText.trim().split(/\s+/).length;
  const charCount = editedText.length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-medium text-white">Description Generated</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-600">
          <span>{wordCount} words</span>
          <span>{charCount} chars</span>
        </div>
      </div>

      {/* Output */}
      <div className="relative rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
        {/* Shine */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

        {editMode ? (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full bg-transparent text-slate-200 text-sm leading-relaxed p-6 resize-none focus:outline-none min-h-[200px]"
            rows={10}
            autoFocus
          />
        ) : (
          <div className="p-6">
            <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{editedText}</p>
          </div>
        )}
      </div>

      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="primary"
          size="sm"
          onClick={handleCopy}
          className={cn(copied && "bg-emerald-500 hover:bg-emerald-400")}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 4V3a1 1 0 00-1-1H3a1 1 0 00-1 1v6a1 1 0 001 1h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Copy to Clipboard
            </>
          )}
        </Button>

        <Button variant="secondary" size="sm" onClick={handleDownload}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v7M4 6l3 3 3-3M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Download .txt
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setEditMode(!editMode)}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2.5l2.5 2.5-7 7H2v-2.5l7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {editMode ? "Done Editing" : "Edit"}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onRegenerate}
          loading={isLoading}
          className="ml-auto text-slate-400 hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M12 2v4H8M2 12V8h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 6A5 5 0 102 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Regenerate
        </Button>
      </div>
    </div>
  );
}
