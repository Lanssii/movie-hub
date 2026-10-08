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

export const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email(),
  mobileNumber: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^5\d{8}$/, "Enter valid Georgian mobile number (5XXXXXXXX)"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  preferredVenue: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  updateProfile: (updatedData: Partial<User>) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  updateProfile: (updatedData) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, ...updatedData, profileComplete: true }
        : null,
    })),

  logout: () => set({ user: null, isAuthenticated: false }),
}));
