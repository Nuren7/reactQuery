import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { createUser } from "./api";
import { User } from "./types";
import createUsersQueryOptions from "./queryOptions/createUsersQueryOptions";
import Card from "./Card";
import { useState } from "react";
import { createUsersInfiniteQueryOptions } from "./queryOptions/createUsersInfiniteQueryOptions";

function App() {
  const [state, setState] = useState(true);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      createUsersInfiniteQueryOptions(undefined, { enabled: state }),
    );

  const { data: users } = useQuery(
    createUsersQueryOptions(undefined, { enabled: state }),
  );

  const { mutate } = useMutation({
    mutationFn: (user: Omit<User, "_id">) => createUser(user),
  });

  const queryClient = useQueryClient();

  const handleCreate = async () => {
    const user = {
      name: "Austin",
      email: `${Math.random().toString(36).substring(2)}@gmail.com`,
      age: 27,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    };
    mutate(user, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: createUsersQueryOptions().queryKey,
        });
        console.log(data);
      },
      onError: (error) => {
        console.error("An error occured: ", error);
      },
      onSettled: (data, error, vars, context) => {
        console.log({ data, error, vars, context });
      },
    });
  };

  const users = data?.pages.flatMap((page) => page.users);

  // data.pages[pageNumber - 1]

  return (
    <div className="flex flex-col gap-4">
      {users?.users.map((user) => (
        <Card user={user} key={user._id} />
      ))}
      <button
        onClick={handleCreate}
        className="rounded-lg bg-green-500 p-2 hover:cursor-pointer"
      >
        Create New User
      </button>
      <button
        onClick={() => fetchNextPage()}
        className="rounded-lg bg-green-500 p-2 hover:cursor-pointer"
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading" : "Load More"}
      </button>
    </div>
  );
}

export default App;
