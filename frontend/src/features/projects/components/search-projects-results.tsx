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
import { APP_PATHS } from "@/router";

export function SearchProjectResults({ results, isFetching }) {
    const { closeSearch } = useApp();

    console.log(results);

    const navigate = useNavigate();

    const handleSelect = (projectId: number) => {
        closeSearch();
        navigate(APP_PATHS.utils.projectDetails(projectId));
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
