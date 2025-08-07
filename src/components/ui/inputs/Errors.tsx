export default function Errors({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-red-500 font-medium text-xs">{children}</p>
    )
}
