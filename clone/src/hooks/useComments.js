import {useQuery , useMutation , useQueryClient} from '@tanstack/react-query'

export function useComments(postId) {
    const queryClient = useQueryClient() ;
    const {data : comments = [] , isLoading , error} = useQuery({
        queryKey : ['comments' , postId] ,
        queryFn : () => fetch(`/api/GetComments.php?post_id=${postId}` , {
            method : 'GET' ,
            credentials : 'include'
        }).then(res => res.json()),
        select : (data) => data.comments || [],
        enabled : !!postId
    })

  const { mutate: postComment } = useMutation({
  mutationFn: (newComment) =>
    fetch('/api/comments.php', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment) 
    }).then(r => r.json()),

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['comments', postId] });
  }
});

    return {comments , isLoading , error , postComment } 
}