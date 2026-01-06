import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "../../../hooks/use-debounce";
import type { ProjectList } from "../types";
import { getProjectList } from "../api";

export interface SearchProjects {
    currQuery: string,
    setCurrQuery: () => void,
    results: ProjectList[] | [],
    isFetching: boolean
}

export function useSearchProjects(): SearchProjects {
    const [currQuery, setCurrQuery] = useState("");
    const debouncedQuery = useDebounce(currQuery);

    const { data, isFetching } = useQuery({
        queryKey: ["projects", "search", debouncedQuery],
        queryFn: () => getProjectList({ search: debouncedQuery }),
        enabled: debouncedQuery.length > 0,
    })

    return {
        currQuery,
        setCurrQuery,
        results: data,
        isFetching
    }
}