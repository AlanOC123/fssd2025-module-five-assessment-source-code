import { differenceInDays, isPast, isToday, format } from "date-fns";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DatePickerWithRange } from "@/components";
import type { DateRange } from "react-day-picker";
import type { ProjectTimelineProps } from "../types";

export function ProjectTimeline({
    startDate,
    endDate,
    isOwner,
    onUpdate,
}: ProjectTimelineProps) {
    const dateRange: DateRange | undefined = startDate
        ? {
              from: new Date(startDate),
              to: endDate ? new Date(endDate) : undefined,
          }
        : undefined;

    // 2. Handle updates from the picker
    const handleRangeUpdate = (range: DateRange | undefined) => {
        // Convert Date objects back to YYYY-MM-DD strings for the API
        const start = range?.from
            ? format(range.from, "yyyy-MM-dd")
            : undefined;
        const end = range?.to ? format(range.to, "yyyy-MM-dd") : undefined;

        // Only update if something changed
        onUpdate(start, end);
    };

    let statusColor = "text-muted-foreground";
    let statusText = "No deadline set";
    let showStatus = false;

    if (endDate) {
        showStatus = true;
        const end = new Date(endDate);
        const daysLeft = differenceInDays(end, new Date());

        if (isPast(end) && !isToday(end)) {
            statusColor = "text-red-600";
            statusText = `Overdue by ${Math.abs(daysLeft)} days`;
        } else if (isToday(end)) {
            statusColor = "text-orange-600";
            statusText = "Due Today";
        } else {
            statusColor = "text-green-600";
            statusText = `Due in ${daysLeft} days`;
        }
    }

    if (!isOwner) {
        return (
            <div className="rounded-lg border bg-card p-4 space-y-3">
                {showStatus && (
                    <div className="flex items-center gap-2">
                        {statusColor.includes("red") ? (
                            <AlertCircle className="w-4 h-4 text-red-600" />
                        ) : (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                        )}
                        <span
                            className={cn("font-medium text-sm", statusColor)}
                        >
                            {statusText}
                        </span>
                    </div>
                )}
                <div className="text-sm text-muted-foreground">
                    {startDate
                        ? format(new Date(startDate), "MMM d, yyyy")
                        : "Start TBD"}
                    {" - "}
                    {endDate
                        ? format(new Date(endDate), "MMM d, yyyy")
                        : "End TBD"}
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-lg border bg-card p-4 space-y-4">
            {showStatus && (
                <div className="flex items-center gap-2 mb-2">
                    {statusColor.includes("red") ? (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                    ) : (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                    )}
                    <span className={cn("font-medium text-sm", statusColor)}>
                        {statusText}
                    </span>
                </div>
            )}

            <div className="space-y-1">
                <label className="text-[10px] uppercase text-muted-foreground font-semibold">
                    Duration
                </label>
                <DatePickerWithRange
                    date={dateRange}
                    setDate={handleRangeUpdate}
                    className="w-full"
                />
            </div>
        </div>
    );
}
