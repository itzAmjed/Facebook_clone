import { useQueryClient, useMutation } from '@tanstack/react-query'

export function useEditPost() {
    const queryClient = useQueryClient(); 

    const editPostMutation = useMutation({
        mutationFn: (formData) => fetch(`/api/EditPost.php`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        }
    })

    return { editPostMutation }
}