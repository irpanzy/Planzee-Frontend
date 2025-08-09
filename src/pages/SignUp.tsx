import z from "zod";
import { SignUpSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { toast } from "sonner";
import { useSignUpMutation } from "@/hooks/useAuth";

export type SignUpFormData = z.infer<typeof SignUpSchema>;

export default function SignUp() {
  const { mutate, isPending } = useSignUpMutation();

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
      onSuccess: () => {
        toast.success("Registration successful!");
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
