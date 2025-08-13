import { useQuery, useMutation, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import { activateUser, getUsers, suspendUser } from "../services/users.service";
import type { UsersListQuery, UsersListResponse } from "../types/user";

export const usersKeys = {
  list: (params: UsersListQuery) => ["users", "list", params] as const,
};

export function useUsersList(params: UsersListQuery): UseQueryResult<UsersListResponse, unknown> {
  return useQuery<UsersListResponse, unknown>({
    queryKey: usersKeys.list(params),
    queryFn: () => getUsers(params),
  });
}

export function useSuspendUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, reason, duration, suspensionType }: { userId: string; reason: string; duration?: number; suspensionType: "temporary" | "permanent" }) =>
      suspendUser(userId, { reason, duration, suspensionType }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useActivateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, reason }: { userId: string; reason: string }) => activateUser(userId, reason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}


