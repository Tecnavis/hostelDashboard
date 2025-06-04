"use client"

import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, Building, Calendar, DollarSign, Hotel, Plus, Search, Users } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Sidebar } from "@/components/Sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import   { OwnerNotifications }  from "@/components/OwnerNotification"

const revenueData = [
  { name: "Jan", revenue: 2100 },
  { name: "Feb", revenue: 1800 },
  { name: "Mar", revenue: 2400 },
  { name: "Apr", revenue: 2700 },
  { name: "May", revenue: 3200 },
  { name: "Jun", revenue: 3800 },
  { name: "Jul", revenue: 4200 },
  { name: "Aug", revenue: 4500 },
  { name: "Sep", revenue: 4000 },
  { name: "Oct", revenue: 3600 },
  { name: "Nov", revenue: 3100 },
  { name: "Dec", revenue: 2800 },
]

const occupancyData = [
  { name: "Mon", occupancy: 65 },
  { name: "Tue", occupancy: 59 },
  { name: "Wed", occupancy: 80 },
  { name: "Thu", occupancy: 81 },
  { name: "Fri", occupancy: 90 },
  { name: "Sat", occupancy: 95 },
  { name: "Sun", occupancy: 88 },
]

const roomTypeData = [
  { name: "Private Double", value: 45 },
  { name: "Private Single", value: 20 },
  { name: "4-Bed Dorm", value: 15 },
  { name: "6-Bed Dorm", value: 10 },
  { name: "8-Bed Dorm", value: 10 },
]

const COLORS = ["#ec4899", "#f97316", "#8b5cf6", "#06b6d4", "#10b981"]

 const owner = JSON.parse(localStorage.getItem("owner"));
    const  ownerId = owner?.ownerDetails;

export default function OwnerDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="owner" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-white flex items-center justify-between px-6">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search..." className="pl-8" />
          </div>

          <div className="flex items-center gap-4">
            <OwnerNotifications variant="owner" />

        <div className="flex items-center gap-3">
               <Avatar>
                 <AvatarImage src="/placeholder.svg?height=40&width=40" />
                 <AvatarFallback>{ownerId.name?.charAt(0)}</AvatarFallback>
               </Avatar>
               <div className="hidden md:block">
                 <div className="text-sm font-medium">{ownerId?.name}</div>
                 <div className="text-xs text-gray-500">{ownerId?.email}</div>
               </div>
             </div>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Owner Dashboard</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Last 30 days
                </Button>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Hostel
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">My Hostels</p>
                      <h3 className="text-3xl font-bold mt-1">3</h3>
                    </div>
                    <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Building className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <Badge variant="outline" className="gap-1 text-green-600 border-green-200 bg-green-50">
                      <ArrowUp className="h-3 w-3" />1
                    </Badge>
                    <span className="text-gray-500 ml-2">Since last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Rooms</p>
                      <h3 className="text-3xl font-bold mt-1">42</h3>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Hotel className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <Badge variant="outline" className="gap-1 text-green-600 border-green-200 bg-green-50">
                      <ArrowUp className="h-3 w-3" />8
                    </Badge>
                    <span className="text-gray-500 ml-2">Since last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Current Bookings</p>
                      <h3 className="text-3xl font-bold mt-1">18</h3>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <Badge variant="outline" className="gap-1 text-red-600 border-red-200 bg-red-50">
                      <ArrowDown className="h-3 w-3" />2
                    </Badge>
                    <span className="text-gray-500 ml-2">Since last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                      <h3 className="text-3xl font-bold mt-1">$8,245</h3>
                    </div>
                    <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <Badge variant="outline" className="gap-1 text-green-600 border-green-200 bg-green-50">
                      <ArrowUp className="h-3 w-3" />
                      12%
                    </Badge>
                    <span className="text-gray-500 ml-2">Since last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue across all hostels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            border: "none",
                          }}
                          formatter={(value) => [`$${value}`, "Revenue"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#f97316"
                          fill="rgba(249, 115, 22, 0.2)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Room Type Distribution</CardTitle>
                  <CardDescription>Breakdown by room type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={roomTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {roomTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            border: "none",
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Occupancy Rate</CardTitle>
                  <CardDescription>Average occupancy by day of week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={occupancyData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            border: "none",
                          }}
                          formatter={(value) => [`${value}%`, "Occupancy"]}
                        />
                        <Bar dataKey="occupancy" fill="#f97316" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest guest reservations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        guest: "Emma Johnson",
                        hostel: "Sunset Beach Hostel",
                        dates: "May 12-15, 2025",
                        amount: "$240",
                        status: "Confirmed",
                      },
                      {
                        guest: "Michael Brown",
                        hostel: "Downtown Backpackers",
                        dates: "May 15-18, 2025",
                        amount: "$320",
                        status: "Pending",
                      },
                      {
                        guest: "Sarah Wilson",
                        hostel: "Mountain View Lodge",
                        dates: "May 20-25, 2025",
                        amount: "$450",
                        status: "Confirmed",
                      },
                      {
                        guest: "David Lee",
                        hostel: "Sunset Beach Hostel",
                        dates: "May 22-24, 2025",
                        amount: "$180",
                        status: "Pending",
                      },
                      {
                        guest: "Jennifer Garcia",
                        hostel: "Downtown Backpackers",
                        dates: "May 25-28, 2025",
                        amount: "$270",
                        status: "Confirmed",
                      },
                    ].map((booking, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{booking.guest}</div>
                          <div className="text-sm text-gray-500">{booking.hostel}</div>
                          <div className="text-xs text-gray-400">{booking.dates}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{booking.amount}</div>
                          <Badge variant={booking.status === "Confirmed" ? "success" : "outline"} className="mt-1">
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>My Hostels</CardTitle>
                  <CardDescription>Manage your hostel properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {[
                      {
                        name: "Sunset Beach Hostel",
                        location: "Miami, FL",
                        image: "/placeholder.svg?height=200&width=300",
                        rooms: 18,
                        occupancy: "78%",
                        rating: 4.8,
                      },
                      {
                        name: "Downtown Backpackers",
                        location: "New York, NY",
                        image: "/placeholder.svg?height=200&width=300",
                        rooms: 14,
                        occupancy: "92%",
                        rating: 4.6,
                      },
                      {
                        name: "Mountain View Lodge",
                        location: "Denver, CO",
                        image: "/placeholder.svg?height=200&width=300",
                        rooms: 10,
                        occupancy: "65%",
                        rating: 4.7,
                      },
                    ].map((hostel, index) => (
                      <div key={index} className="flex gap-4 p-4 border rounded-lg">
                        <img
                          src={hostel.image || "/placeholder.svg"}
                          alt={hostel.name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold">{hostel.name}</h3>
                          <p className="text-sm text-gray-500">{hostel.location}</p>
                          <div className="flex items-center gap-6 mt-2">
                            <div className="flex items-center gap-1">
                              <Hotel className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{hostel.rooms} rooms</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{hostel.occupancy} occupied</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-amber-500">★</span>
                              <span className="text-sm">{hostel.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
