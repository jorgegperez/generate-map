"use client";

import { useQuery } from "@tanstack/react-query";
import { getFileByOwnerId } from "@/app/actions/files";

export function useUserFile(ownerId?: string) {
  const {
    data: file,
    isLoading,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["files", ownerId],
    queryFn: () => getFileByOwnerId(ownerId!),
    enabled: !!ownerId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    file,
    isLoading: isLoading || isPending,
    isError,
  };
}
