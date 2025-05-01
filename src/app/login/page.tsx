"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormdata((perv) => ({
      ...perv,
      [id]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://147.93.96.111:3000/api/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic " + btoa(`${formData.email}:${formData.password}`),
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        const token =
          response.headers.get("authorization") ||
          response.headers.get("Authorization");

        if (token) {
          // ✅ Set cookie client-side
          document.cookie = `token=${token}; path=/; secure; samesite=strict`;
          toast.success("Login successful!");
          
          // Redirect to dashboard
          router.push("/dashboard");
          console.log("redirect")
        } else {
          console.error("No token received.");
        }
      } else {
        console.error("Login failed:", data);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Somthing went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-sm shadow-lg rounded-2xl">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Login to your account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                onChange={handleChange}
              />
            </div>
            <Button className="w-full bg-black hover:bg-gray-800" type="submit">
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          {/* <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="#" className="text-[#04d104] hover:underline">
              Sign up
            </a>
          </p> */}
        </CardFooter>
      </Card>
    </div>
  );
}
