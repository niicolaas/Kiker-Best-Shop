import { ChatMessageProps } from "./ChatMessageProps";

export function ChatMessageUser({ content }: ChatMessageProps) {
    return (
      <div className="flex justify-end">
        <div className="w-full max-w-5xl flex items-end gap-2">
          <div className="rounded-2xl rounded-br-sm bg-gray-800 text-white px-4 py-3 text-sm shadow-sm">
            {content}
          </div>
          <div className="h-7 w-7 rounded-full border border-purple-700 bg-purple-800 flex items-center justify-center text-[11px] text-purple-100">
            EU
          </div>
        </div>
      </div>
    )
  }