import { useQuery } from "@tanstack/react-query";
import { getProjectChat } from "../services";
import { CHAT_KEYS } from "./keys";

export function useGetChat(projectId?: number) {
    return useQuery({
        queryKey: CHAT_KEYS.byProject(projectId as number),
        queryFn: () => getProjectChat({ projectId: projectId as number }),
        enabled: !!projectId,
        refetchInterval: 5000,
        placeholderData: (previousData) => previousData,
    });
}
