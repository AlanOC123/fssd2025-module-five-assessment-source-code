import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "../../../hooks/use-debounce";
import type { ProjectListItem } from "../types";
import { getProjectList } from "../services";
import { LIST_PROJECTS_QUERY_KEY } from "./keys";

export interface SearchProjects {
    currQuery: string;
    setCurrQuery: (curr: string) => void;
    results: ProjectListItem[];
    isFetching: boolean;
}

export function useSearchProjects(): SearchProjects {
    const [currQuery, setCurrQuery] = useState("");
    const debouncedQuery = useDebounce(currQuery);

    const { data, isFetching } = useQuery({
        queryKey: LIST_PROJECTS_QUERY_KEY({ query: debouncedQuery }),

        queryFn: () => getProjectList(debouncedQuery),

        enabled: debouncedQuery.length > 0,

        placeholderData: (previousData) => previousData,
    });

    return {
        currQuery,
        setCurrQuery,
        results: data ?? [],
        isFetching,
    };
}
