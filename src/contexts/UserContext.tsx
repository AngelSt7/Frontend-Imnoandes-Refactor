"use client";
import { createContext, useContext } from "react";
import { User } from "@/src/types";

const UserContext = createContext<any>(null);

export const UserProvider = ({ user, children }: { user: User, children: any }) => (
  <UserContext.Provider value={user}>{children}</UserContext.Provider>
);

export const useUser  = () => useContext<User>(UserContext);
