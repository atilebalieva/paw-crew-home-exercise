import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import * as api from "@/services/api/api";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AuthCard from "./AuthCard";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "@/services/state/authStore";

const LoginSchema = z.object({
  name: z.string().min(3, { message: "Please add name with at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }).min(3, { message: "Email is required" }),
});

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  const { login, logout } = useAuthStore();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const onSubmitForm = async (data: LoginFormData) => {
    try {
      await api.login(data.name, data.email);

      login({ name: data.name, email: data.email });
      navigate("/", { replace: true });
      form.reset();
    } catch (err: any) {
      setError("Login failed");
    }
  };

  return (
    <AuthCard cardTitle={"Login"}>
      <div className="w-full">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmitForm)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@gmail.com" {...field} type="email" />
                  </FormControl>
                  <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          </form>
        </FormProvider>
      </div>
    </AuthCard>
  );
};

export default LoginForm;
