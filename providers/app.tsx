"use client"

import { store } from "@/store"
import { ReactNode } from "react"
import { Provider } from "react-redux"

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>
}
