
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import api from "@/lib/api";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Form validation schema using zod
const registerFormSchema = z.object({
  fname: z.string().min(1, "First name is required"),
  lname: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Phone number is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/\d/, "Password must contain at least one number"),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);

    try {
      // Log form data being sent
      console.log('Sending registration data:', {
        email: data.email,
        password1: data.password,
        password2: data.password,
        first_name: data.fname,
        last_name: data.lname,
        phone_number: data.phone,
      });

      // ✅ Make API request to Django backend (corrected URL & payload format)
      const response = await api.post('/auth/registration/', {
        email: data.email,
        password1: data.password,
        password2: data.password,
        first_name: data.fname,
        last_name: data.lname,
        phone_number: data.phone,
      });

      // Handle successful registration
      if (response.status === 201) {
        console.log('Registration successful:', response.data);

        // Store user in localStorage for local testing
        const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        users.push({
          firstName: data.fname,
          lastName: data.lname,
          email: data.email,
          phoneNo: data.phone,
          password: data.password,
        });
        localStorage.setItem("registeredUsers", JSON.stringify(users));

        toast({
          title: "Registration successful",
          description: "Your account has been created. Please log in.",
          variant: "default",
        });

        if (onSuccess) {
          onSuccess();
        } else {
          navigate("/login");
        }
      }
    } catch (error: any) {
      console.error('Registration error:', error);

      if (error.response?.data) {
        const apiErrors = error.response.data;

        if (apiErrors.email) {
          form.setError("email", { message: apiErrors.email[0] });
        }
        if (apiErrors.first_name) {
          form.setError("fname", { message: apiErrors.first_name[0] });
        }
        if (apiErrors.last_name) {
          form.setError("lname", { message: apiErrors.last_name[0] });
        }
        if (apiErrors.phone_number) {
          form.setError("phone", { message: apiErrors.phone_number[0] });
        }
        if (apiErrors.password1) {
          form.setError("password", { message: apiErrors.password1[0] });
        }

        if (!Object.keys(apiErrors).some(key =>
          ['email', 'first_name', 'last_name', 'phone_number', 'password1'].includes(key))) {
          toast({
            title: "Registration failed",
            description: "Please check your information and try again.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Connection error",
          description: "Could not connect to the server. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <FormField
            control={form.control}
            name="fname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  First Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                Email
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                Phone Number
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <Lock className="h-4 w-4" />
                Password
              </FormLabel>
              <div className="relative">
                <FormControl>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password" 
                    {...field} 
                  />
                </FormControl>
                <button 
                  type="button"
                  className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full bg-[#5C5470] hover:bg-[#352F44] text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
