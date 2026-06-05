import {  useQuery  } from "@tanstack/react-query";

export function useGetCommentCount(postId) {
    
    const {data : commentCount = 0 , isLoading , error} = useQuery({
        queryKey : ['commentCount' , postId] ,
        queryFn : () => fetch(`/api/GetCommentsCount.php?post_id=${postId}` , {
            method : 'GET' ,
            credentials : 'include'
        }).then(res => res.json()),
        select : (data) => data.count || 0,
        enabled : !!postId
    })
    return {commentCount , isLoading , error}
}