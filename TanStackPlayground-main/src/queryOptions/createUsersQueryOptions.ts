import { queryOptions, UseQueryOptions } from "@tanstack/react-query"
import { GetUsersOptions, GetUsersResponse } from "../types"
import { getUsers } from "../api"

export default function createUsersQueryOptions<
TData = GetUsersResponse, TError = Error
>(
  params?: GetUsersOptions, 
  options?: Omit<UseQueryOptions<GetUsersResponse, TError, TData>, "queryKey" | "queryFn"
  >
) {
  return queryOptions({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    ...options,
    select: (data) => {
      return data.users
    },
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  })
}
