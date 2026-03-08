import type { Priority, Size, Status } from "../types/todo"

export const priorityConfig: Record<Priority, { label: string; color: string; dot: string }> = {
    low: { label: "Low", color: "bg-green-50 text-green-600", dot: "bg-green-500" },
    medium: { label: "Medium", color: "bg-amber-50 text-amber-600", dot: "bg-amber-500" },
    high: { label: "High", color: "bg-red-50 text-red-600", dot: "bg-red-500" },
}

export const statusConfig: Record<Status, { label: string; dot: string; text: string }> = {
    todo: { label: "Todo", dot: "bg-slate-300", text: "text-slate-400" },
    in_progress: { label: "In Progress", dot: "bg-blue-500", text: "text-blue-500" },
    done: { label: "Done", dot: "bg-green-500", text: "text-green-500" },
}

export const sizeConfig: Record<Size, string> = {
    xs: "XS", s: "S", m: "M", l: "L", xl: "XL",
}