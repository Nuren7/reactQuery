import { useQuery } from "@tanstack/react-query"
import createUsersQueryOptions from "./queryOptions/createUsersQueryOptions"

export default function RandomComponent() {
  const { data } = useQuery(createUsersQueryOptions({ limit: 5 }))

  return <div>{JSON.stringify(data)}</div>
}
