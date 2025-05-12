"use client"

import { useState } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Hotel, Lock, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function LoginPage() {
  const router = useNavigate()
 const [searchParams] = useSearchParams();
const defaultRole = searchParams.get("role") || "admin";

  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (role) => {
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      if (role === "admin") {
        router("/admin/dashboard")
      } else {
        router("/owner/dashboard")
      }
      setIsLoading(false)
    }, 1500)
  }

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

          <TabsContent value="admin">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Login to access the admin dashboard and manage all hostels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="admin-email" placeholder="admin@hostelhub.com" type="email" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="admin-password" type="password" className="pl-10" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-rose-600 hover:bg-rose-700"
                  onClick={() => handleLogin("admin")}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login as Admin"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="owner">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Hostel Owner Login</CardTitle>
                <CardDescription>Login to manage your hostel properties and bookings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="owner-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="owner-email" placeholder="owner@example.com" type="email" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="owner-password" type="password" className="pl-10" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  onClick={() => handleLogin("owner")}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login as Hostel Owner"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-gray-600 text-center"
      >
        Don&apos;t have an account? Contact the administrator to create one.
      </motion.p>
    </div>
  )
}
