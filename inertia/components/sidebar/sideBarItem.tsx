import { ComponentType, SVGProps } from "react"

type SidebarItemProps = {
    icon: ComponentType<SVGProps<SVGSVGElement>>
    label: string
    active?: boolean
    onClick?: () => void
  }

export function SidebarItem({ icon: Icon, label, active, onClick }: SidebarItemProps) {
    return (
      <button
        className={[
          "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-[13px] transition-colors",
          active
            ? "bg-purple-700 text-white font-semibold shadow-sm"
            : "text-gray-300 hover:bg-gray-700 hover:text-white",
        ].join(" ")}
        onClick={onClick}
      >
        <span
          className={[
            "inline-flex h-7 w-7 items-center justify-center rounded-lg border bg-gray-800",
            active
              ? "border-purple-400 text-purple-100"
              : "border-gray-700 text-gray-400",
          ].join(" ")}
        >
          <Icon className="h-4 w-4" />
        </span>
        <span>{label}</span>
      </button>
    )
  }