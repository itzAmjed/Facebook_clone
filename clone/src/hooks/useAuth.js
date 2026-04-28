
import { useQuery } from '@tanstack/react-query';

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['authUser'],
    queryFn: () =>
      fetch('/api/currentUser.php', {
        method: 'GET',
        credentials: 'include'
      })
        .then(r => r.text())
        .then(text => {
          const data = JSON.parse(text);
          if (data.success) return data.user;
          return null;
        }),
  });

  return { user, isLoading, error };
}