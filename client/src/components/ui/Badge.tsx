type BadgeProps = {
    label: string
    colorClass: string
    dotClass: string
}

const Badge: React.FC<BadgeProps> = ({ label, colorClass, dotClass }) => (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
        {label}
    </span>
)

export default Badge