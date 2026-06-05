import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useLikes(postId) {
  const queryClient = useQueryClient();
  const {
    data: likeData = { likeCount: 0, liked: false },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["likes", postId],
    queryFn: () =>
      fetch("/api/getLikeCount.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: postId }),
        credentials: "include",
      }).then((res) => res.json()),
    enabled: !!postId,
  });

  const likeMutation = useMutation({
    mutationFn: (newLike) => {
      return fetch("/api/likes.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLike),
        credentials: "include",
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", postId] });
    },
  });

  return { likeData, isLoading, error, likeMutation };
}
