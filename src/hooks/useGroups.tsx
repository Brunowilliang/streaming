import { pb } from "@/lib/api";
import { Collections, GroupsResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export default function useGroups() {
  const queryResult = useQuery<GroupsResponse[]>({
    queryKey: ['groups'],
    queryFn: () => getGroups(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const {
    data: groups,
    isLoading: groupsLoading,
    isFetching: groupsFetching,
    isRefetching: groupsRefetching,
    ...rest
  } = queryResult;

  return {
    groups,
    groupsLoading,
    groupsFetching,
    groupsRefetching,
    ...rest
  }
}

async function getGroups() {
  try {
    const response = await pb.collection(Collections.Groups).getFullList({
      filter: 'visible = true',
      sort: 'order'
    });
    return response as any
  } catch (error) {
    console.log(error)
    return [];
  }
}

