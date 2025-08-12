import { useContext } from "react";
import { AuthContext } from "@/provider/AuthContext";
import { useMutation } from "@tanstack/react-query";
import type { SignUpFormData } from "@/pages/SignUp";
import { postData } from "@/api/auth";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (data: SignUpFormData) => {
      // Create registration data without confirmPassword
      const registrationData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      return postData("/auth/register", registrationData);
    },
    onError: (error: Error) => {
      console.error("Registration failed:", error);
    },
  });
};

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return postData<{
        token: string;
        user: {
          id: string;
          email: string;
          name: string;
        };
        message: string;
      }>("/auth/login", data);
    },
    onError: (error: Error) => {
      console.error("Login failed:", error);
    },
  });
};
