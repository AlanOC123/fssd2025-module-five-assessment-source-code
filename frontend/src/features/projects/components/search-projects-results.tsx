import {
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    Spinner,
} from "@/components";
import { useSearchProjects } from "../hooks";
import type { ProjectList } from "../types";
import { SearchProjectCard } from "./search-project-card";
import { useNavigate } from "react-router";
import { useApp } from "@/hooks";

export function SearchProjectResults({ results, isFetching }) {
    const { closeSearch } = useApp();

    console.log(results);

    const navigate = useNavigate();

    const handleSelect = (projectId: string) => {
        closeSearch();
        navigate(`/projects/${projectId}`);
    };

    return (
        <CommandList>
            {isFetching && (
                <CommandEmpty>
                    <Spinner />
                    <span>Searching...</span>
                </CommandEmpty>
            )}

            {!isFetching && results?.length === 0 && (
                <CommandEmpty>No projects found.</CommandEmpty>
            )}

            <CommandGroup heading="Projects">
                {results?.map((project) => (
                    <SearchProjectCard
                        project={project}
                        handleSelect={handleSelect}
                    />
                ))}
            </CommandGroup>
        </CommandList>
    );
}
