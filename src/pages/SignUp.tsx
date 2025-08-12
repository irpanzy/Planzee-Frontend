import z from "zod";
import { SignUpSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { toast } from "sonner";
import { useSignUpMutation } from "@/hooks/useAuth";
import { useNavigate } from "react-router";

export type SignUpFormData = z.infer<typeof SignUpSchema>;

interface AxiosError extends Error {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
}

export default function SignUp() {
  const { mutate, isPending } = useSignUpMutation();
  const navigate = useNavigate();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleOnSubmit = (data: SignUpFormData) => {
    mutate(data, {
      onSuccess: (response) => {
        console.log("Registration successful:", response);
        toast.success(
          "Registration successful! Please check your email to verify your account."
        );
        form.reset();
        navigate("/auth/sign-in");
      },
      onError: (error: Error) => {
        console.error("Registration failed:", error);

        // Handle different types of errors
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 400) {
          toast.error(
            axiosError.response.data?.message || "Invalid registration data"
          );
        } else if (axiosError.response?.status === 409) {
          toast.error(
            "Email already exists. Please use a different email address."
          );
        } else if (axiosError.response?.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      },
    });
  };

  const handleInvalidSubmit = () => {
    const firstError = Object.values(form.formState.errors)[0];
    if (firstError?.message) {
      toast.error(firstError.message.toString());
    }
  };

  useDocumentTitle("Sign Up | Planzee");

  return (
    <RegisterForm
      form={form}
      onSubmit={form.handleSubmit(handleOnSubmit, handleInvalidSubmit)}
      isLoading={isPending}
    />
  );
}
