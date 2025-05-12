"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarIcon, Download } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Sidebar } from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const revenueData = [
  { name: "Jan", revenue: 4200, bookings: 65, occupancy: 72 },
  { name: "Feb", revenue: 3800, bookings: 59, occupancy: 67 },
  { name: "Mar", revenue: 5100, bookings: 80, occupancy: 78 },
  { name: "Apr", revenue: 5200, bookings: 81, occupancy: 79 },
  { name: "May", revenue: 6000, bookings: 90, occupancy: 82 },
  { name: "Jun", revenue: 7200, bookings: 103, occupancy: 85 },
  { name: "Jul", revenue: 8000, bookings: 110, occupancy: 88 },
  { name: "Aug", revenue: 8500, bookings: 115, occupancy: 90 },
  { name: "Sep", revenue: 7800, bookings: 102, occupancy: 86 },
  { name: "Oct", revenue: 7000, bookings: 95, occupancy: 84 },
  { name: "Nov", revenue: 6200, bookings: 85, occupancy: 80 },
  { name: "Dec", revenue: 5800, bookings: 78, occupancy: 76 },
]

const locationData = [
  { name: "Miami", value: 25 },
  { name: "New York", value: 20 },
  { name: "Los Angeles", value: 15 },
  { name: "San Francisco", value: 12 },
  { name: "Chicago", value: 10 },
  { name: "Other", value: 18 },
]

const roomTypeData = [
  { name: "Private Double", value: 45 },
  { name: "Private Single", value: 20 },
  { name: "4-Bed Dorm", value: 15 },
  { name: "6-Bed Dorm", value: 10 },
  { name: "8-Bed Dorm", value: 10 },
]

const bookingSourceData = [
  { name: "Direct Website", value: 35 },
  { name: "Booking.com", value: 25 },
  { name: "Hostelworld", value: 20 },
  { name: "Expedia", value: 10 },
  { name: "Other", value: 10 },
]

const COLORS = ["#ec4899", "#f97316", "#8b5cf6", "#06b6d4", "#10b981", "#a3a3a3"]

export default function AdminAnalytics() {
  const [date, setDate] = useState(new Date())

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {date ? date.toLocaleDateString() : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <Select defaultValue="30">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">$42,389</CardTitle>
                  <CardDescription>Total Revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-green-600 font-medium">+18% from last month</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">156</CardTitle>
                  <CardDescription>Total Bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-green-600 font-medium">+12% from last month</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">78%</CardTitle>
                  <CardDescription>Average Occupancy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-green-600 font-medium">+5% from last month</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Tabs defaultValue="revenue">
                <TabsList className="mb-4">
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
                </TabsList>

                <TabsContent value="revenue" className="m-0">
                  <Card>
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
                              stroke="#ec4899"
                              fill="rgba(236, 72, 153, 0.2)"
                              strokeWidth={2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="bookings" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Booking Trends</CardTitle>
                      <CardDescription>Monthly booking counts across all hostels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={revenueData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
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
                            />
                            <Line
                              type="monotone"
                              dataKey="bookings"
                              stroke="#8b5cf6"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="occupancy" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Occupancy Rates</CardTitle>
                      <CardDescription>Monthly occupancy percentage across all hostels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={revenueData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
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
                            <Bar dataKey="occupancy" fill="#10b981" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Bookings by Location</CardTitle>
                  <CardDescription>Distribution by city</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={locationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {locationData.map((entry, index) => (
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

              <Card>
                <CardHeader>
                  <CardTitle>Bookings by Room Type</CardTitle>
                  <CardDescription>Distribution by room category</CardDescription>
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

              <Card>
                <CardHeader>
                  <CardTitle>Booking Sources</CardTitle>
                  <CardDescription>Where bookings are coming from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={bookingSourceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {bookingSourceData.map((entry, index) => (
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
          </div>
        </main>
      </div>
    </div>
  )
}
