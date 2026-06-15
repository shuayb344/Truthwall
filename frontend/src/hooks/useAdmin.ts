import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as adminApi from "../api/adminApi";
import { toast } from "react-hot-toast";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: adminApi.getStats,
  });
};

export const useAdminReports = () => {
  return useQuery({
    queryKey: ["admin", "reports"],
    queryFn: adminApi.getReports,
  });
};

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: adminApi.getUsers,
  });
};

export const useResolveReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.resolveReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "reports"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      toast.success("Report resolved");
    },
    onError: () => {
      toast.error("Failed to resolve report");
    },
  });
};

export const useRemovePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.removePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "reports"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      toast.success("Post removed successfully");
    },
    onError: () => {
      toast.error("Failed to remove post");
    },
  });
};

export const useBanUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.banUser,
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: ["admin", "users"] });
      const previousUsers = queryClient.getQueryData(["admin", "users"]);

      queryClient.setQueryData(["admin", "users"], (old: any) => {
        if (!old) return old;
        return old.map((u: any) => 
          u._id === userId ? { ...u, isBanned: true } : u
        );
      });

      return { previousUsers };
    },
    onSuccess: () => {
      toast.success("User banned");
    },
    onError: (_err, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["admin", "users"], context.previousUsers);
      }
      toast.error("Failed to ban user");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
};

export const useUnbanUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.unbanUser,
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: ["admin", "users"] });
      const previousUsers = queryClient.getQueryData(["admin", "users"]);

      queryClient.setQueryData(["admin", "users"], (old: any) => {
        if (!old) return old;
        return old.map((u: any) => 
          u._id === userId ? { ...u, isBanned: false } : u
        );
      });

      return { previousUsers };
    },
    onSuccess: () => {
      toast.success("User unbanned");
    },
    onError: (_err, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["admin", "users"], context.previousUsers);
      }
      toast.error("Failed to unban user");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
};
