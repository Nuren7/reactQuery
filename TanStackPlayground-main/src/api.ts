import { GetUsersOptions, responseSchema, userSchema, type User } from "./types"

const BASE_URL = "http://localhost:3000/api"

export const getUsers = async (options?: GetUsersOptions) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const { page, limit } = options ? options : {}
  const queryParams = new URLSearchParams()

  if (limit) queryParams.append("limit", limit.toString())
  if (page) queryParams.append("page", page.toString())
  const queryString = queryParams.toString()

  const response = await fetch(
    `${BASE_URL}/users${queryString ? `?${queryString}` : ""}`
  )
  const data = await response.json()
  return responseSchema.parse(data)
}

export const createUser = async (user: Omit<User, "_id">) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }
  const res = await fetch(`${BASE_URL}/users`, options)
  const data = await res.json()
  return userSchema.parse(data)
}

export const deleteUser = async (id: string) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }
  await fetch(`${BASE_URL}/users/${id}`, options)
}

// DELETE --> /rest/user/${id}
// POST --> /rest/users (name & email in body)
// GET --> /rest/users
