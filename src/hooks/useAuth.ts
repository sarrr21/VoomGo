import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi, logout as logoutApi } from "../services/auth.service";
import { useAuthStore } from "../stores/auth.store";

export function useAuth() {
  const queryClient = useQueryClient();
  const { setAuth, clearAuth, accessToken, isAuthenticated, user, hydrate, userId } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setAuth({ accessToken: data.accessToken, refreshToken: data.refreshToken }, data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => logoutApi({ userId: userId as string }),
    onSettled: () => {
      clearAuth();
      queryClient.clear();
    },
  });

  return {
    user,
    isAuthenticated,
    accessToken,
    hydrate,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
    userId,
  };
}


