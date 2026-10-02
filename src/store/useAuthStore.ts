import { create } from "zustand";
import type { User } from "../types";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 1,
    username: "Lana",
    email: "lana@example.com",
    avatar: null,
    fullName: "Lana Shotashvili",
    mobileNumber: "599123456",
    dateOfBirth: "2003-05-15",
    age: 21,
    preferredVenue: null,
    profileComplete: false,
  },
  isAuthenticated: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
