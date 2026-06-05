
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateFriendRequest(profileId) {
  const queryClient = useQueryClient();

  const { mutate: updateFriendRequest, isLoading } = useMutation({
    mutationFn: ({ requestId, action }) =>
      fetch('/api/friendRequUpdate.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ request_id: requestId, action }),
      }).then(r => r.json()),

    onSuccess: () => {
      // refetch friend status after update
       queryClient.invalidateQueries({ queryKey: ['friendStatus', profileId] });
    queryClient.invalidateQueries({ queryKey: ['friendRequests'] });
    queryClient.invalidateQueries({ queryKey: ['friendList'] });
    },

    onError: (err) => console.error('Friend request update error:', err)
  });

  return { updateFriendRequest, isLoading };
}