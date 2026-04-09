import { cn, getStatusStyle, getStatusLabel } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        getStatusStyle(status),
        className
      )}
    >
      {getStatusLabel(status)}
    </span>
  );
}
