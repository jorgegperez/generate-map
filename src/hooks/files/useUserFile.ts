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
    queryKey: ["files"],
    queryFn: () => getFileByOwnerId(ownerId!),
    enabled: !!ownerId,
  });

  return {
    file,
    isLoading: isLoading || isPending,
    isError,
  };
}
