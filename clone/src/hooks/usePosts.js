import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function usePosts() {
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['posts'], 
    queryFn: () =>
      fetch('/api/GetPost.php', {
        credentials: 'include'
      }).then(r => r.json()),
    select: (data) => data.posts || []
  });

  const { mutate: deletePost } = useMutation({
    mutationFn: (postId) =>
      fetch('/api/delete.php', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: postId })
      }).then(r => r.json()),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] }); 
    }
  });

  const {mutate : post } = useMutation({
    mutationFn : (FormData) => fetch('/api/Post.php' , {
        method : 'POST' ,
        credentials : 'include' ,
        body : FormData,
       
    }).then(r => r.json()) ,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  return { posts, isLoading, error, deletePost, post };
}