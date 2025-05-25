"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Hotel, Lock, Mail, Eye, EyeOff, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAddNewAdminMutation } from "@/app/service/admin";
import { useAddNewownerMutation } from "@/app/service/owner";

export default function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") || "admin";

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [addNewAdmin] = useAddNewAdminMutation();
  const [addNewowner] = useAddNewownerMutation();

  const handleSignup = async (role) => {
    if (!name || !phone || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      if (role === "admin") {
        await addNewAdmin({ name, phone, email, password , role: "super-admin" }).unwrap();
        navigate("/admin/dashboard");
      } else {
        await addNewowner({ name, phone, email, password, role: "owner" }).unwrap();
        navigate("/owner/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Signup failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = (role) => (
    <Card className="border-0 shadow-xl">
      <CardHeader>
        <CardTitle>{role === "admin" ? "Admin" : "Hostel Owner"} Sign Up</CardTitle>
        <CardDescription>
          {role === "admin"
            ? "Signup to access the admin dashboard and manage all hostels."
            : "Signup to manage your hostel properties and bookings."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Your Name"
              className="pl-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="you@example.com"
              type="email"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="+1234567890"
              type="tel"
              className="pl-10"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full ${
            role === "admin" ? "bg-rose-600 hover:bg-rose-700" : "bg-orange-600 hover:bg-orange-700"
          }`}
          onClick={() => handleSignup(role)}
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : `Sign up as ${role === "admin" ? "Admin" : "Owner"}`}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-8"
      >
        <Hotel className="h-8 w-8 text-rose-600" />
        <span className="text-2xl font-bold text-rose-600">HostelHub</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md"
      >
        <Tabs defaultValue={defaultRole} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="owner">Hostel Owner</TabsTrigger>
          </TabsList>

          <TabsContent value="admin">{renderForm("admin")}</TabsContent>
          <TabsContent value="owner">{renderForm("owner")}</TabsContent>
        </Tabs>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-gray-600 text-center"
      >
        Already have an account?{" "}
        <Link to="/login" className="text-rose-600 font-semibold underline">
          Login
        </Link>
      </motion.p>
    </div>
  );
}
