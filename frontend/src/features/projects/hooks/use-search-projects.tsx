import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "../../../hooks/use-debounce";
import type { SearchProjectsProps } from "../types";
import { getProjectList } from "../services";
import { PROJECTS_KEYS } from "./keys";

export function useSearchProjects(): SearchProjectsProps {
    const [currQuery, setCurrQuery] = useState("");
    const debouncedQuery = useDebounce(currQuery);

    const { data, isFetching } = useQuery({
        queryKey: PROJECTS_KEYS.list({ search: debouncedQuery }),

        queryFn: () => getProjectList({ search: debouncedQuery }),

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
