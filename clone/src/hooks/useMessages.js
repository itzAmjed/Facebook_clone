import {useQuery , useMutation , useQueryClient} from '@tanstack/react-query'

export function useMessages(friendId) {
    const queryClient = useQueryClient() ;
    const {data : messages = [] , isLoading , error} = useQuery({
        queryKey : ['messages' , friendId] ,
        queryFn : () => fetch(`/api/GetMessages.php?friend_id=${friendId}` , {
            method : 'GET' ,
            credentials : 'include'
        }).then(res => res.json()),
        select : (data) => data.messages || [],
        enabled : !!friendId,
        refetchInterval:3000 // refetch messages every 3 seconds to get new messages in real-time
    })

  const { mutate: postMessage } = useMutation({
  mutationFn: (newMessage) =>
    fetch('/api/sendMessage.php', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage)
    }).then(r => r.json()),

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['messages', friendId] });
  }
});

    return {messages , isLoading , error , postMessage } 
}