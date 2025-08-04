import z from "zod";
import { SignInSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm } from "@/components/login-form";
import { toast } from "sonner";
import { useDocumentTitle } from "@/components/hooks/useDocumentTitle";

type SignInFormData = z.infer<typeof SignInSchema>;

export default function SignIn() {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = (values: SignInFormData) => {
    console.log("Form submitted with values:", values);
    toast.success("Login successful!");
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
    />
  );
}
