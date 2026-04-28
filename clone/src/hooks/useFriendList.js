
import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';

export function useFriendList() {
  const { user } = useAuth();

  const { data: friends = [], isLoading, error } = useQuery({
    queryKey: ['friendList', user?.id],
    queryFn: () =>
      fetch('/api/friendList.php', {
        method: 'GET',
        credentials: 'include',
      })
        .then(r => r.json())
        .then(data => data.friends || []),
    enabled: !!user?.id, // only fetch when user is available
  });

  return { friends, isLoading, error };
}