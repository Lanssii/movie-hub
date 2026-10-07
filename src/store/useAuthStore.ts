import { create } from "zustand";
import { z } from "zod";
import type { User } from "../types";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "At least 6 characters"),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "At least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "At least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    avatar: z
      .any()
      .optional()
      .refine(
        (files) =>
          !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
        "Max image size is 2MB"
      )
      .refine(
        (files) =>
          !files ||
          files.length === 0 ||
          ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
        "Only .jpg, .png and .webp formats are supported"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  // mocked data for user
  // user: {
  //   id: 1,
  //   username: "Lana",
  //   email: "lana@example.com",
  //   avatar: null,
  //   fullName: "Lana Shotashvili",
  //   mobileNumber: "599123456",
  //   dateOfBirth: "2005-02-01",
  //   age: 21,
  //   preferredVenue: null,
  //   profileComplete: false,
  // },
  //  isAuthenticated: true,
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
