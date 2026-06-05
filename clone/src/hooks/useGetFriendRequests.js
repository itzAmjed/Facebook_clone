import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from './useAuth'

export function useGetFriendRequests() {
    const { user } = useAuth();

    const { data: requests = [], isLoading, error } = useQuery({
        queryKey: ['friendRequests'],
        queryFn: () => fetch('/api/getFriendRequ.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ receiver_id: user.id }),
            credentials: 'include'
        }).then(res => res.json())
        .then(data => data.requests || []),
        enabled: !!user
    })


    return { requests, isLoading, error }
}