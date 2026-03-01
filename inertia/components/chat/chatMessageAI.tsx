import { MessageCircle } from "lucide-react";
import { ChatMessageProps } from "./ChatMessageProps";

export function ChatMessageAI({ content }: ChatMessageProps) {
    return (
      <div className="flex justify-start">
        <div className="w-full max-w-5xl flex items-start gap-2">
          <div className="h-7 w-7 rounded-full border border-purple-700 bg-purple-500 flex items-center justify-center text-[11px] text-purple-100">
            AI
          </div>
          <div className="rounded-2xl rounded-bl-sm bg-purple-800 border border-purple-700 px-4 py-3 text-sm text-purple-100 shadow-sm">
            <div className="flex items-center gap-1.5 mb-1">
              <MessageCircle className="h-3.5 w-3.5 text-gray-300" />
              <span className="text-[11px] font-medium text-gray-300 uppercase tracking-wide">
                Adonis RAG Assistant
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-gray-100">{content}</p>
          </div>
        </div>
      </div>
    )
  }