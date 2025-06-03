"use client"

import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, Bell, Building, Calendar, DollarSign, Hotel, Search, Users } from "lucide-react"
import { Area, Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sidebar } from "@/components/Sidebar"

const bookingData = [
  { name: "Jan", bookings: 65, revenue: 4200, occupancy: 72 },
  { name: "Feb", bookings: 59, revenue: 3800, occupancy: 67 },
  { name: "Mar", bookings: 80, revenue: 5100, occupancy: 78 },
  { name: "Apr", bookings: 81, revenue: 5200, occupancy: 79 },
  { name: "May", bookings: 90, revenue: 6000, occupancy: 82 },
  { name: "Jun", bookings: 103, revenue: 7200, occupancy: 85 },
  { name: "Jul", bookings: 110, revenue: 8000, occupancy: 88 },
  { name: "Aug", bookings: 115, revenue: 8500, occupancy: 90 },
  { name: "Sep", bookings: 102, revenue: 7800, occupancy: 86 },
  { name: "Oct", bookings: 95, revenue: 7000, occupancy: 84 },
  { name: "Nov", bookings: 85, revenue: 6200, occupancy: 80 },
  { name: "Dec", bookings: 78, revenue: 5800, occupancy: 76 },
]

const hostelDistribution = [
  { name: "Miami", value: 8 },
  { name: "New York", value: 6 },
  { name: "Los Angeles", value: 5 },
  { name: "San Francisco", value: 4 },
  { name: "Chicago", value: 3 },
  { name: "Denver", value: 3 },
  { name: "Other", value: 7 },
]




      const admin = JSON.parse(localStorage.getItem("admin"));
    const  superAdminId = admin?.adminDetails;

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-white flex items-center justify-between px-6">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search..." className="pl-8" />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-600 text-[10px] font-medium text-white flex items-center justify-center">
                3
              </span>
            </Button>

            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>{superAdminId?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <div className="text-sm font-medium">{superAdminId?.name}</div>
                <div className="text-xs text-gray-500">{superAdminId.email}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Dashboard Overview</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Last 30 days
                </Button>
                <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
                  Generate Report
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
                      <p className="text-sm font-medium text-gray-500">Total Hostels</p>
                      <h3 className="text-3xl font-bold mt-1">24</h3>
                    </div>
                    <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center">
                      <Building className="h-6 w-6 text-rose-600" />
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

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Rooms</p>
                      <h3 className="text-3xl font-bold mt-1">342</h3>
                    </div>
                    <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Hotel className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <Badge variant="outline" className="gap-1 text-green-600 border-green-200 bg-green-50">
                      <ArrowUp className="h-3 w-3" />
                      8%
                    </Badge>
                    <span className="text-gray-500 ml-2">Since last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Active Bookings</p>
                      <h3 className="text-3xl font-bold mt-1">156</h3>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <Badge variant="outline" className="gap-1 text-red-600 border-red-200 bg-red-50">
                      <ArrowDown className="h-3 w-3" />
                      3%
                    </Badge>
                    <span className="text-gray-500 ml-2">Since last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                      <h3 className="text-3xl font-bold mt-1">$42,389</h3>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <Badge variant="outline" className="gap-1 text-green-600 border-green-200 bg-green-50">
                      <ArrowUp className="h-3 w-3" />
                      18%
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
                  <CardTitle>Booking & Revenue Overview</CardTitle>
                  <CardDescription>Monthly booking and revenue trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={bookingData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            border: "none",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="bookings"
                          fill="rgba(236, 72, 153, 0.1)"
                          stroke="#ec4899"
                          yAxisId="left"
                        />
                        <Bar dataKey="revenue" barSize={20} fill="#82ca9d" yAxisId="right" />
                        <Line
                          type="monotone"
                          dataKey="occupancy"
                          stroke="#ff7300"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          yAxisId="left"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hostel Distribution</CardTitle>
                  <CardDescription>Hostels by location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        layout="vertical"
                        data={hostelDistribution}
                        margin={{ top: 20, right: 20, bottom: 20, left: 60 }}
                      >
                        <CartesianGrid stroke="#f0f0f0" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" scale="band" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            border: "none",
                          }}
                        />
                        <Bar dataKey="value" barSize={20} fill="#ec4899" radius={[0, 4, 4, 0]} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Tabs defaultValue="recent">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="recent">Recent Bookings</TabsTrigger>
                    <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
                    <TabsTrigger value="popular">Popular Hostels</TabsTrigger>
                  </TabsList>

                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>

                <TabsContent value="recent" className="m-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Recent Bookings</CardTitle>
                      <CardDescription>Latest bookings across all hostels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium text-gray-500">Booking ID</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">Guest</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">Hostel</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">Check In</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">Check Out</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                id: "B-1234",
                                guest: "John Smith",
                                hostel: "Sunset Hostel",
                                checkIn: "May 10, 2025",
                                checkOut: "May 15, 2025",
                                status: "Confirmed",
                                amount: "$320",
                              },
                              {
                                id: "B-1235",
                                guest: "Emma Johnson",
                                hostel: "City Central",
                                checkIn: "May 12, 2025",
                                checkOut: "May 14, 2025",
                                status: "Pending",
                                amount: "$180",
                              },
                              {
                                id: "B-1236",
                                guest: "Michael Brown",
                                hostel: "Beachside Inn",
                                checkIn: "May 15, 2025",
                                checkOut: "May 20, 2025",
                                status: "Confirmed",
                                amount: "$450",
                              },
                              {
                                id: "B-1237",
                                guest: "Sarah Wilson",
                                hostel: "Mountain View",
                                checkIn: "May 18, 2025",
                                checkOut: "May 25, 2025",
                                status: "Confirmed",
                                amount: "$560",
                              },
                              {
                                id: "B-1238",
                                guest: "David Lee",
                                hostel: "Urban Stay",
                                checkIn: "May 20, 2025",
                                checkOut: "May 22, 2025",
                                status: "Pending",
                                amount: "$210",
                              },
                            ].map((booking, index) => (
                              <tr key={booking.id} className="border-b">
                                <td className="py-3 px-4">{booking.id}</td>
                                <td className="py-3 px-4">{booking.guest}</td>
                                <td className="py-3 px-4">{booking.hostel}</td>
                                <td className="py-3 px-4">{booking.checkIn}</td>
                                <td className="py-3 px-4">{booking.checkOut}</td>
                                <td className="py-3 px-4">
                                  <Badge variant={booking.status === "Confirmed" ? "success" : "outline"}>
                                    {booking.status}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4 font-medium">{booking.amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="pending" className="m-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Pending Approvals</CardTitle>
                      <CardDescription>Hostels waiting for admin approval</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium text-gray-500">Hostel Name</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">Owner</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">Location</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">Rooms</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">Submitted</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                name: "Riverside Hostel",
                                owner: "James Wilson",
                                location: "San Francisco, CA",
                                rooms: 12,
                                submitted: "May 8, 2025",
                              },
                              {
                                name: "Golden Gate Inn",
                                owner: "Lisa Chen",
                                location: "San Francisco, CA",
                                rooms: 8,
                                submitted: "May 7, 2025",
                              },
                              {
                                name: "Traveler's Rest",
                                owner: "Robert Johnson",
                                location: "Los Angeles, CA",
                                rooms: 15,
                                submitted: "May 6, 2025",
                              },
                            ].map((hostel, index) => (
                              <tr key={index} className="border-b">
                                <td className="py-3 px-4 font-medium">{hostel.name}</td>
                                <td className="py-3 px-4">{hostel.owner}</td>
                                <td className="py-3 px-4">{hostel.location}</td>
                                <td className="py-3 px-4">{hostel.rooms}</td>
                                <td className="py-3 px-4">{hostel.submitted}</td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-2">
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                      Approve
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                                      Reject
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="popular" className="m-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Popular Hostels</CardTitle>
                      <CardDescription>Most booked hostels this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                          {
                            name: "Sunset Hostel",
                            location: "Miami, FL",
                            image: "/placeholder.svg?height=200&width=300",
                            rating: 4.8,
                            bookings: 124,
                          },
                          {
                            name: "City Central",
                            location: "New York, NY",
                            image: "/placeholder.svg?height=200&width=300",
                            rating: 4.7,
                            bookings: 112,
                          },
                          {
                            name: "Beachside Inn",
                            location: "San Diego, CA",
                            image: "/placeholder.svg?height=200&width=300",
                            rating: 4.6,
                            bookings: 98,
                          },
                        ].map((hostel, index) => (
                          <Card key={index} className="overflow-hidden">
                            <img
                              src={hostel.image || "/placeholder.svg"}
                              alt={hostel.name}
                              className="w-full h-40 object-cover"
                            />
                            <CardContent className="p-4">
                              <h3 className="font-bold text-lg">{hostel.name}</h3>
                              <p className="text-gray-500 text-sm">{hostel.location}</p>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center">
                                  <span className="text-amber-500">★</span>
                                  <span className="ml-1 font-medium">{hostel.rating}</span>
                                </div>
                                <div className="text-sm text-gray-600">{hostel.bookings} bookings</div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
