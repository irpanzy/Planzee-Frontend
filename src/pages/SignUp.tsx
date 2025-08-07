import z from "zod";
import { SignUpSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useDocumentTitle } from "@/components/hooks/useDocumentTitle";
import { toast } from "sonner";

type SignUpFormData = z.infer<typeof SignUpSchema>;

export default function SignUp() {
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
    console.log("Registering with:", data);
    toast.success("Registration successful!");
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
    />
  );
}
