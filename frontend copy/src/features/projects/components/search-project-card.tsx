import { CommandItem } from "@/components";
import type { ProjectList } from "../types";

export function SearchProjectCard({
    project,
    handleSelect,
}: {
    project: ProjectList;
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
