import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import DifferentComponent from "./App.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DifferentComponent />
    </QueryClientProvider>
  </StrictMode>
)
