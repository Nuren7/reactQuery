import { useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "./api"
import { User } from "./types"
import createUsersQueryOptions from "./queryOptions/createUsersQueryOptions"

type CardProps = {
  user: User
}

export default function Card({ user }: CardProps) {
  const { _id, name, email, createdAt } = user
  const queryClient = useQueryClient()
  const handleDelete = async (id: string) => {
    await deleteUser(id)
    queryClient.invalidateQueries({
      queryKey: createUsersQueryOptions().queryKey,
    })
  }

  return (
    <div className="bg-white rounded-xl relative w-144">
      <button
        onClick={() => handleDelete(user._id)}
        className="absolute top-0 right-0 p-2 rounded-full hover:bg-red-50 hover:cursor-pointer transition-colors duration-200"
        aria-label="Delete user"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <span className="text-sm text-gray-500">ID: {_id}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {email}
          </div>
          <div className="flex items-center text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
}
