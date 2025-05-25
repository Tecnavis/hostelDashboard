"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Hotel, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useLoginAdminMutation } from "@/app/service/admin"
import { useLoginOwnerMutation } from "@/app/service/owner"

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const defaultRole = searchParams.get("role") || "admin"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [currentRole, setCurrentRole] = useState(defaultRole)

  const [loginAdmin, { isLoading: isAdminLoading }] = useLoginAdminMutation()
  const [loginOwner, { isLoading: isOwnerLoading }] = useLoginOwnerMutation()

  const isLoading = isAdminLoading || isOwnerLoading

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return

    try {
      const loginFn = currentRole === "admin" ? loginAdmin : loginOwner
      const response = await loginFn({ email, password })

      if (response?.data?.status === 200) {
        localStorage.setItem(currentRole, JSON.stringify(response.data))
        setEmail("")
        setPassword("")
        navigate(`/${currentRole}/dashboard`)
      }
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  const renderLoginForm = (role) => (
    <form onSubmit={handleLogin}>
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle>{role === "admin" ? "Admin Login" : "Hostel Owner Login"}</CardTitle>
          <CardDescription>
            {role === "admin"
              ? "Login to access the admin dashboard and manage all hostels."
              : "Login to manage your hostel properties and bookings."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${role}-email`}>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id={`${role}-email`}
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${role}-password`}>Password</Label>
            <div className="relative">
              <Input
                id={`${role}-password`}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className={`w-full ${role === "admin" ? "bg-rose-600 hover:bg-rose-700" : "bg-orange-600 hover:bg-orange-700"}`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : `Login as ${role === "admin" ? "Admin" : "Hostel Owner"}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )

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
        <Tabs defaultValue={defaultRole} className="w-full" onValueChange={(val) => setCurrentRole(val)}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="owner">Hostel Owner</TabsTrigger>
          </TabsList>

          <TabsContent value="admin">{renderLoginForm("admin")}</TabsContent>
          <TabsContent value="owner">{renderLoginForm("owner")}</TabsContent>
        </Tabs>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-gray-600 text-center"
      >
        Don&apos;t have an account? Contact the administrator. <Link to="/signup" className="text-rose-600 underline">Signup</Link>
      </motion.p>
    </div>
  )
}
