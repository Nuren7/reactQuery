import { queryOptions } from "@tanstack/react-query"
import { GetUsersOptions } from "../types"
import { getUsers } from "../api"

export default function createUsersQueryOptions(params?: GetUsersOptions) {
  return queryOptions({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  })
}
