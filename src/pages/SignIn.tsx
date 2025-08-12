import z from "zod";
import { SignInSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm } from "@/components/auth/LoginForm";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { toast } from "sonner";
import { useSignInMutation } from "@/hooks/useAuth";

type SignInFormData = z.infer<typeof SignInSchema>;

interface AxiosError extends Error {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
}

export default function SignIn() {
  const { mutate, isPending } = useSignInMutation();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = (values: SignInFormData) => {
    mutate(values, {
      onSuccess: (response) => {
        console.log("Login successful:", response);
        
        // Store token if provided
        if (response?.token) {
          localStorage.setItem("token", response.token);
        }
        
        toast.success("Login successful!");
        // Optional: redirect to dashboard
        // navigate("/dashboard");
      },
      onError: (error: Error) => {
        console.error("Login failed:", error);
        
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          toast.error("Invalid email or password.");
        } else if (axiosError.response?.status === 403) {
          toast.error("Account not verified. Please check your email.");
        } else if (axiosError.response?.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("Login failed. Please try again.");
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

  useDocumentTitle("Sign In | Planzee");

  return (
    <LoginForm
      form={form}
      onSubmit={form.handleSubmit(handleOnSubmit, handleInvalidSubmit)}
      isLoading={isPending}
    />
  );
}
