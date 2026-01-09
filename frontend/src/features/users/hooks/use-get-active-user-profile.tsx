import { useQuery } from "@tanstack/react-query";
import { getActiveUserProfile } from "../services";
import { ACTIVE_USER_QUERY_KEY } from "./keys";

export function useGetActiveUserProfile() {
    return useQuery({
        queryKey: ACTIVE_USER_QUERY_KEY,
        queryFn: getActiveUserProfile,
        staleTime: 1000 * 60 * 5
    })
}