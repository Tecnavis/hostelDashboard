"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Hotel, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useLoginOwnerMutation } from "@/app/service/owner"

export default function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [loginOwner, { isLoading }] = useLoginOwnerMutation()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return

    try {
      const response = await loginOwner({ email, password })
      if (response?.data?.status === 200) {
        localStorage.setItem("owner", JSON.stringify(response.data))
        setEmail("")
        setPassword("")
        navigate("/owner/dashboard")
      }
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-8"
      >
        <Hotel className="h-8 w-8 text-rose-600" />
        <span className="text-2xl font-bold text-rose-600">HostelHub</span>
      </motion.div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md"
      >
        <form onSubmit={handleLogin}>
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Hostel Owner Login</CardTitle>
              <CardDescription>
                Login to manage your hostel properties and bookings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
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
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
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
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login as Hostel Owner"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-gray-600 text-center"
      >
        Don&apos;t have an account? Contact the administrator.{" "}
        <Link to="/signup" className="text-rose-600 underline">
          Signup
        </Link>
      </motion.p>
    </div>
  )
}
