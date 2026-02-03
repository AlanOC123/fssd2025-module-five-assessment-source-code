import { Search } from "lucide-react";
import { Input } from "@/components";
import type { TaskSearchProps } from "../types";

export function TaskSearch({ value, onChange }: TaskSearchProps) {
    return (
        <div className="relative w-full sm:w-72">
            <div className="absolute left-2.5 top-2.5 text-muted-foreground">
                <Search className="h-4 w-4" />
            </div>
            <Input
                placeholder="Search tasks..."
                className="pl-9 bg-background"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
