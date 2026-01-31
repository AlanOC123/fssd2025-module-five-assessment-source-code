import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getComments } from '../services';
import { COMMENTS_KEYS } from './keys';

export function useGetComments(projectId: number) {
    return useQuery({
        queryKey: COMMENTS_KEYS.byProject(projectId),
        queryFn: () => getComments({ projectId }),
        refetchInterval: 5000
    })
}