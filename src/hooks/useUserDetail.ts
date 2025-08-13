import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/users.service";

export const userKeys = {
  detail: (userId: string) => ["users", "detail", userId] as const,
};

export function useUserDetail(userId: string) {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUserById(userId),
    enabled: Boolean(userId),
  });
}


