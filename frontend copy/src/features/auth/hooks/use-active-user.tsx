import { useQuery } from "@tanstack/react-query";
import { activeUser} from "../services";
import { AUTH_KEYS } from "./keys";
import { type User } from "../types";

export function useActiveUser() {
    return useQuery<User, Error> ({
        queryKey: AUTH_KEYS.user(),
        queryFn: activeUser,
        retry: false,
        staleTime: Infinity
    }) 
}