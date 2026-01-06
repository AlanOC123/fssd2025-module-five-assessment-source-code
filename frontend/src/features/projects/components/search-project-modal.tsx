import {
    CommandDialog,
} from "@/components";

import { SearchProjectInput } from "./search-project-input";
import { SearchProjectResults } from "./search-projects-results";

import { useApp } from "@/hooks";
import { useSearchProjects } from "../hooks";
import { useNavigate } from "react-router";

export function SearchProjectModal() {
    const { currQuery, setCurrQuery, results, isFetching } = useSearchProjects()
    const { isSearchOpen, toggleSearch } = useApp();

    return (
        <CommandDialog shouldFilter={false} open={isSearchOpen} onOpenChange={toggleSearch}>
            <SearchProjectInput query={currQuery} setQuery={setCurrQuery} />
            <SearchProjectResults results={results} isFetching={isFetching} />
        </CommandDialog>
    )
}