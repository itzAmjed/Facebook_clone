
import { useQuery } from '@tanstack/react-query';

export function useFriendStatus(profileId) {
  const { data } = useQuery({
    queryKey: ['friendStatus', profileId],
    queryFn: () =>
      fetch('/api/checkFriendRequ.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ profile_id: profileId }),
      }).then(r => r.json()),
    enabled: !!profileId,
    select: (data) => ({
      friendStatus: data.success ? data.status : 'none',
      relation: data.success ? data.relation : null
    })
  });

  return {
    friendStatus: data?.friendStatus || 'none',
    relation: data?.relation || null
  };
}