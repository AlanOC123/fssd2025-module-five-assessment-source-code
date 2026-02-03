import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
    Button,
    Calendar,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";

interface ProjectTimelineProps {
    startDate: string | null;
    endDate: string | null;
    onUpdate: (field: "start_date" | "end_date", value: string | null) => void;
    isOwner: boolean;
}

export function ProjectTimeline({
    startDate,
    endDate,
    onUpdate,
    isOwner,
}: ProjectTimelineProps) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    return (
        <div className="grid grid-rows-2 gap-2">
            <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground ml-1">
                    Start Date
                </span>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            disabled={!isOwner}
                            className={cn(
                                "w-full justify-start text-left font-normal h-9",
                                !start && "text-muted-foreground",
                            )}
                        >
                            <CalendarIcon className="mr-2 h-3 w-3" />
                            {start ? format(start, "PPP") : "Pick date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={start}
                            onSelect={(date) =>
                                onUpdate(
                                    "start_date",
                                    date?.toISOString() || null,
                                )
                            }
                            // Disable any date AFTER the current end date
                            disabled={(date) => !!end && date > end}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* END DATE */}
            <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground ml-1">
                    End Date
                </span>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            disabled={!isOwner}
                            className={cn(
                                "w-full justify-start text-left font-normal h-9",
                                !end && "text-muted-foreground",
                            )}
                        >
                            <CalendarIcon className="mr-2 h-3 w-3" />
                            {end ? format(end, "PPP") : "Pick date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={end}
                            onSelect={(date) =>
                                onUpdate(
                                    "end_date",
                                    date?.toISOString() || null,
                                )
                            }
                            // Disable any date BEFORE the current start date
                            disabled={(date) => !!start && date < start}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
