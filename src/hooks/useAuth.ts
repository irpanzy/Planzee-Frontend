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
    mutationFn: (data: SignUpFormData) => postData("/auth/sign-up", data),
  });
};
