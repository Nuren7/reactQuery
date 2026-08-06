import { queryOptions, UseQueryOptions } from "@tanstack/react-query"
import { GetUsersOptions, GetUsersResponse } from "../types"
import { getUsers } from "../api"

export default function createUsersQueryOptions<
  TData = GetUsersResponse,
  TError = Error
>(
  params?: GetUsersOptions,
  options?: Omit<
    UseQueryOptions<GetUsersResponse, TError, TData>,
    "queryKey" | "queryFn"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  })
}
