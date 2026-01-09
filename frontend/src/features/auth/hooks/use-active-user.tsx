import { useQuery } from "@tanstack/react-query";
import { activeUser} from "../services";
import { USER_QUERY_KEY } from "./keys";
import { type User } from "../types";

export function useActiveUser() {
    return useQuery<User, Error> ({
        queryKey: USER_QUERY_KEY,
        queryFn: activeUser,
        retry: false,
        staleTime: Infinity
    }) 
}