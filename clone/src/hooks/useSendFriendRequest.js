
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSendFriendRequest(profileId) {
  const queryClient = useQueryClient();

  const { mutate: sendFriendRequest, isLoading } = useMutation({
    mutationFn: (receiverId) =>
      fetch('/api/friendRequ.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ receiver_id: receiverId }),
      }).then(r => r.json()),

    onSuccess: () => {
      // invalidate so useFriendStatus refetches automatically
      queryClient.invalidateQueries({ queryKey: ['friendStatus', profileId] });
    },

    onError: (err) => console.error('Friend request error:', err)
  });

  return { sendFriendRequest, isLoading };
}