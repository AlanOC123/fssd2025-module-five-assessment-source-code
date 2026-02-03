import { CommandDialog } from "@/components";
import { SearchProjectInput } from "./search-project-input";
import { SearchProjectResults } from "./search-projects-results";
import { useSearchProjects } from "../hooks";
import type { SearchProjectModalProps } from "../types";

export function SearchProjectModal({
    open,
    onOpenChange,
}: SearchProjectModalProps) {
    const { currQuery, setCurrQuery, results, isFetching } =
        useSearchProjects();

    return (
        <CommandDialog
            shouldFilter={false}
            open={open}
            onOpenChange={onOpenChange}
        >
            <SearchProjectInput query={currQuery} setQuery={setCurrQuery} />

            <SearchProjectResults
                results={results}
                isFetching={isFetching}
                onSelect={() => onOpenChange(false)}
            />
        </CommandDialog>
    );
}
