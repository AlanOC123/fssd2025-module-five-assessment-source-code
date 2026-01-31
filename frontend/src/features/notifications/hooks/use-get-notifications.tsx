import { getNotifications } from "../services";
import { useQuery } from "@tanstack/react-query";
import { NOTIFICATION_KEYS } from "./keys";

export function useNotifications() {
    return useQuery({
        queryKey: NOTIFICATION_KEYS.all,
        queryFn: getNotifications,
        refetchInterval: 10000,
    })
}