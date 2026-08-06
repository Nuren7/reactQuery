import { infiniteQueryOptions } from "@tanstack/react-query"
import { getUsers } from "../api"

export default function createUsersInfiniteQueryOptions() {
  return infiniteQueryOptions({
    queryKey: ["users", "infinite"],
    queryFn: ({ pageParam }) => getUsers({ page: pageParam, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore
        ? lastPage.pagination.currentPage + 1
        : undefined
    },
  })
}
