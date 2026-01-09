import { getProjectList } from "../services";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { LIST_PROJECTS_QUERY_KEY } from "./keys";

export function useGetProjectList(enableSearch: boolean = false) {
    const [searchParams] = useSearchParams();

    const search = enableSearch ? searchParams.get("search") : null;

    const query = search || undefined;

    return useQuery({
        queryKey: LIST_PROJECTS_QUERY_KEY({ query }),
        queryFn: () => getProjectList(query),
    });
}
