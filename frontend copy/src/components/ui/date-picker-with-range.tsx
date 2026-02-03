import {
    Popover,
    Calendar,
    PopoverContent,
    PopoverTrigger,
    Button
} from "@/components";

import { format } from "date-fns";
import { type DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";

import { Calendar1 } from "lucide-react";

export function DatePickerWithRange({
    className,
    calendarClassName,
    date,
    setDate,
}: {
    className?: string;
    calendarClassName?: string;
    date: DateRange | undefined;
    setDate: (date: DateRange | undefined) => void;
}) {
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <Calendar1 className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Select Date Range</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={cn(calendarClassName)} align="start">
                    <Calendar
                        mode="range"
                        defaultMonth={date?.from}       
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={1}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
