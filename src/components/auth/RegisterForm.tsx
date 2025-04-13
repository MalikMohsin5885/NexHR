
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Eye, EyeOff, Building, Users, Check } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";

// Form validation schema using zod
const registerFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(7, "Phone number is required"),
  companyName: z.string().min(1, "Company name is required"),
  employees: z.string().min(1, "Number of employees is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/\d/, "Password must contain at least one number"),
  privacyPolicy: z.boolean().refine(value => value === true, {
    message: "You must agree to the privacy policy",
  }),
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
      fullName: "",
      phone: "",
      companyName: "",
      employees: "",
      email: "",
      password: "",
      privacyPolicy: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    console.log("Form data submitted:", data);

    try {
      // Extract first and last name from full name
      const nameParts = data.fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      console.log("Sending registration data to API:", {
        firstName,
        lastName,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName,
        employees: data.employees,
        password: data.password
      });

      // Make API request to Django backend with adjusted payload
      const response = await api.post('http://127.0.0.1:8000/api/auth/register/', {
        fname: firstName,
        lname: lastName,
        email: data.email,
        phone: data.phone,
        company_name: data.companyName,
        employees_count: data.employees,
        password: data.password,
      });

      console.log("Registration response:", response);

      if (response.status === 201) {
        // Also store in localStorage for testing/demo purposes
        const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        users.push({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          companyName: data.companyName,
          employees: data.employees,
        });
        localStorage.setItem("registeredUsers", JSON.stringify(users));

        toast({
          title: "Success",
          description: "Account created! Please verify your email.",
        });

        if (onSuccess) onSuccess();
        else navigate("/login");
      }
    } catch (error: any) {
      console.error('Registration error:', error);

      const apiErrors = error.response?.data;
      console.log("API Errors received:", apiErrors);

      // Handle field-specific errors
      if (apiErrors?.email) form.setError("email", { message: apiErrors.email[0] });
      if (apiErrors?.fname || apiErrors?.lname) form.setError("fullName", { 
        message: apiErrors.fname?.[0] || apiErrors.lname?.[0] || "Name error" 
      });
      if (apiErrors?.phone) form.setError("phone", { message: apiErrors.phone[0] });
      if (apiErrors?.company_name) form.setError("companyName", { message: apiErrors.company_name[0] });
      if (apiErrors?.employees_count) form.setError("employees", { message: apiErrors.employees_count[0] });
      if (apiErrors?.password) form.setError("password", { message: apiErrors.password[0] });

      toast({
        title: "Registration Failed",
        description: error.response?.data?.detail || "Please fix the errors and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1 text-gray-700">
                  <User className="h-4 w-4" />
                  FULL NAME
                </FormLabel>
                <FormControl>
                  <Input placeholder="ENTER FULL NAME" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1 text-gray-700">
                  <Phone className="h-4 w-4" />
                  PHONE NUMBER
                </FormLabel>
                <FormControl>
                  <Input placeholder="ENTER PHONE NUMBER" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1 text-gray-700">
                  <Building className="h-4 w-4" />
                  COMPANY NAME
                </FormLabel>
                <FormControl>
                  <Input placeholder="ENTER YOUR COMPANY NAME" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Number of Employees */}
          <FormField
            control={form.control}
            name="employees"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1 text-gray-700">
                  <Users className="h-4 w-4" />
                  NUMBER OF EMPLOYEES
                </FormLabel>
                <FormControl>
                  <Input placeholder="ENTER NO EMPLOYEES" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1 text-gray-700">
                  <Mail className="h-4 w-4" />
                  EMAIL ADDRESS
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="ENTER YOUR EMAIL" {...field} />
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
                <FormLabel className="flex items-center gap-1 text-gray-700">
                  <Lock className="h-4 w-4" />
                  PASSWORD
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="ENTER YOUR PASSWORD" 
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
        </div>

        {/* Privacy Policy Checkbox */}
        <FormField
          control={form.control}
          name="privacyPolicy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
              <FormControl>
                <Checkbox 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm text-gray-700">
                  I AGREE WITH PRIVACY STATEMENT AND DISCLAIMER
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full bg-[#5C5470] hover:bg-[#352F44] text-white uppercase"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Registering...
              </>
            ) : (
              "REGISTER"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
