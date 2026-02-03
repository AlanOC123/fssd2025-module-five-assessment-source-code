import { CommandEmpty, CommandGroup, CommandList, Spinner } from "@/components"; // Adjust imports to your barrel file
import { SearchProjectCard } from "./search-project-card";
import { useNavigate } from "react-router";
import { APP_PATHS } from "@/router";
import type { ProjectListItem } from "../types";

interface SearchProjectResultsProps {
    results: ProjectListItem[] | undefined;
    isFetching: boolean;
    onSelect: () => void; // New prop to replace useApp
}

export function SearchProjectResults({
    results,
    isFetching,
    onSelect,
}: SearchProjectResultsProps) {
    const navigate = useNavigate();

    const handleSelect = (projectId: number) => {
        onSelect();
        navigate(APP_PATHS.app.project(projectId));
    };

    return (
        <CommandList>
            {isFetching && (
                <CommandEmpty className="py-6 flex flex-col items-center gap-2 text-muted-foreground">
                    <Spinner className="h-6 w-6" />
                    <span className="text-sm">Searching library...</span>
                </CommandEmpty>
            )}

            {!isFetching && results?.length === 0 && (
                <CommandEmpty className="py-6 text-muted-foreground">
                    No projects found.
                </CommandEmpty>
            )}

            {results && results.length > 0 && (
                <CommandGroup heading="Projects">
                    {results.map((project) => (
                        <SearchProjectCard
                            key={project.id}
                            project={project}
                            // Pass the wrapped handler
                            handleSelect={() => handleSelect(project.id)}
                        />
                    ))}
                </CommandGroup>
            )}
        </CommandList>
    );
}
