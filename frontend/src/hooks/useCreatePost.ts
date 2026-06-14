import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, uploadImage } from "@/api/postApi";
import type { CreatePostData } from "@/api/postApi";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostData) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: (file: File) => uploadImage(file),
  });
};
