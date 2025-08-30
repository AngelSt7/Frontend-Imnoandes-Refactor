import { DragCursorProps } from "../interfaces";

export default function DragCursor({ isDragOver, multiple, dragPosition }: DragCursorProps) {
  if (!isDragOver || !multiple) return null;
  return (
    <div
      className="fixed w-8 h-8 bg-blue-500 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-80"
      style={{ left: dragPosition.x, top: dragPosition.y }}
    >
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </div>
  )
}
