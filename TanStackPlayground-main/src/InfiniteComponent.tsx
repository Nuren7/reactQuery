import { useInfiniteQuery } from "@tanstack/react-query"
import createUsersInfiniteQueryOptions from "./queryOptions/createUserInfiniteQueryOptions"
import Card from "./Card"

export function InfiniteComponent() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(createUsersInfiniteQueryOptions())
  const users = data?.pages.flatMap((page) => page.users)

  return (
    <div className="flex flex-col gap-4">
      {users?.map((user) => (
        <Card user={user} key={user._id} />
      ))}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        className="rounded-lg bg-green-500 p-2"
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </div>
  )
}
