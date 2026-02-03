import { CommandItem } from "@/components";
import type { ProjectListItem } from "../types";

export function SearchProjectCard({
    project,
    handleSelect,
}: {
    project: ProjectListItem;
    handleSelect: (value: string) => void;
}) {
    return (
        <CommandItem
            key={project.id}
            value={project.id.toString()}
            onSelect={handleSelect}
        >
            <span>{project.title}</span>
        </CommandItem>
    );
}
