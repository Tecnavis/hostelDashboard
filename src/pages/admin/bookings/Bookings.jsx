"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarIcon, ChevronDown, Download, Eye, Filter, MoreHorizontal, Search, Trash2 } from "lucide-react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Sidebar } from "@/components/Sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const bookingsByDayData = [
  { day: "Mon", bookings: 12 },
  { day: "Tue", bookings: 8 },
  { day: "Wed", bookings: 15 },
  { day: "Thu", bookings: 18 },
  { day: "Fri", bookings: 25 },
  { day: "Sat", bookings: 32 },
  { day: "Sun", bookings: 20 },
]

export default function AdminBookings() {
  const [isViewBookingOpen, setIsViewBookingOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [date, setDate] = useState(new Date())

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking)
    setIsViewBookingOpen(true)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Manage Bookings</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
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
                  <CardTitle className="text-2xl">156</CardTitle>
                  <CardDescription>Active Bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-green-600 font-medium">+12% from last month</div>
                </CardContent>
              </Card>

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
              <Card>
                <CardHeader>
                  <CardTitle>Bookings by Day</CardTitle>
                  <CardDescription>Number of bookings per day this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bookingsByDayData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            border: "none",
                          }}
                        />
                        <Bar dataKey="bookings" fill="#ec4899" radius={[4, 4, 0, 0]} />
                      </BarChart>
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
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>All Bookings</CardTitle>
                      <CardDescription>Manage all bookings across all hostels</CardDescription>
                    </div>
                    <Tabs defaultValue="all" className="w-[400px]">
                      <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search bookings..." className="pl-8" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                        <ChevronDown className="h-3 w-3 opacity-50" />
                      </Button>
                      <Select defaultValue="newest">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="check-in">Check-in Date</SelectItem>
                          <SelectItem value="check-out">Check-out Date</SelectItem>
                          <SelectItem value="price-high">Price (High to Low)</SelectItem>
                          <SelectItem value="price-low">Price (Low to High)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Booking ID</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Guest</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Hostel</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Room Type</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Check In</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Check Out</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            id: "B-1234",
                            guest: "John Smith",
                            email: "john.smith@example.com",
                            phone: "+1 (555) 123-4567",
                            hostel: "Sunset Hostel",
                            roomType: "Private Double",
                            checkIn: "May 10, 2025",
                            checkOut: "May 15, 2025",
                            status: "Confirmed",
                            amount: "$320",
                            paymentMethod: "Credit Card",
                            specialRequests: "Late check-in",
                          },
                          {
                            id: "B-1235",
                            guest: "Emma Johnson",
                            email: "emma.johnson@example.com",
                            phone: "+1 (555) 234-5678",
                            hostel: "City Central",
                            roomType: "4-Bed Dorm",
                            checkIn: "May 12, 2025",
                            checkOut: "May 14, 2025",
                            status: "Pending",
                            amount: "$180",
                            paymentMethod: "PayPal",
                            specialRequests: "None",
                          },
                          {
                            id: "B-1236",
                            guest: "Michael Brown",
                            email: "michael.brown@example.com",
                            phone: "+1 (555) 345-6789",
                            hostel: "Beachside Inn",
                            roomType: "Private Single",
                            checkIn: "May 15, 2025",
                            checkOut: "May 20, 2025",
                            status: "Confirmed",
                            amount: "$450",
                            paymentMethod: "Credit Card",
                            specialRequests: "Early check-in",
                          },
                          {
                            id: "B-1237",
                            guest: "Sarah Wilson",
                            email: "sarah.wilson@example.com",
                            phone: "+1 (555) 456-7890",
                            hostel: "Mountain View",
                            roomType: "Private Double",
                            checkIn: "May 18, 2025",
                            checkOut: "May 25, 2025",
                            status: "Confirmed",
                            amount: "$560",
                            paymentMethod: "Credit Card",
                            specialRequests: "None",
                          },
                          {
                            id: "B-1238",
                            guest: "David Lee",
                            email: "david.lee@example.com",
                            phone: "+1 (555) 567-8901",
                            hostel: "Urban Stay",
                            roomType: "6-Bed Dorm",
                            checkIn: "May 20, 2025",
                            checkOut: "May 22, 2025",
                            status: "Pending",
                            amount: "$210",
                            paymentMethod: "PayPal",
                            specialRequests: "Bottom bunk",
                          },
                          {
                            id: "B-1239",
                            guest: "Jennifer Garcia",
                            email: "jennifer.garcia@example.com",
                            phone: "+1 (555) 678-9012",
                            hostel: "Sunset Hostel",
                            roomType: "Private Double",
                            checkIn: "May 22, 2025",
                            checkOut: "May 28, 2025",
                            status: "Cancelled",
                            amount: "$480",
                            paymentMethod: "Credit Card",
                            specialRequests: "None",
                          },
                          {
                            id: "B-1240",
                            guest: "Robert Johnson",
                            email: "robert.johnson@example.com",
                            phone: "+1 (555) 789-0123",
                            hostel: "City Central",
                            roomType: "8-Bed Dorm",
                            checkIn: "May 25, 2025",
                            checkOut: "May 30, 2025",
                            status: "Confirmed",
                            amount: "$250",
                            paymentMethod: "PayPal",
                            specialRequests: "None",
                          },
                        ].map((booking, index) => (
                          <tr key={booking.id} className="border-b">
                            <td className="py-3 px-4 font-medium">{booking.id}</td>
                            <td className="py-3 px-4">{booking.guest}</td>
                            <td className="py-3 px-4">{booking.hostel}</td>
                            <td className="py-3 px-4">{booking.roomType}</td>
                            <td className="py-3 px-4">{booking.checkIn}</td>
                            <td className="py-3 px-4">{booking.checkOut}</td>
                            <td className="py-3 px-4 font-medium">{booking.amount}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant={
                                  booking.status === "Confirmed"
                                    ? "success"
                                    : booking.status === "Pending"
                                      ? "outline"
                                      : "destructive"
                                }
                              >
                                {booking.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleViewBooking(booking)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                                    <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Cancel Booking
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-500">Showing 7 of 156 bookings</div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" className="bg-gray-100">
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        2
                      </Button>
                      <Button variant="outline" size="sm">
                        3
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>

      {selectedBooking && (
        <Dialog open={isViewBookingOpen} onOpenChange={setIsViewBookingOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>Booking ID: {selectedBooking.id}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500">Guest</Label>
                  <div className="font-medium">{selectedBooking.guest}</div>
                </div>
                <div>
                  <Label className="text-gray-500">Email</Label>
                  <div>{selectedBooking.email}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500">Phone</Label>
                  <div>{selectedBooking.phone}</div>
                </div>
                <div>
                  <Label className="text-gray-500">Hostel</Label>
                  <div>{selectedBooking.hostel}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500">Room Type</Label>
                  <div>{selectedBooking.roomType}</div>
                </div>
                <div>
                  <Label className="text-gray-500">Amount</Label>
                  <div className="font-medium">{selectedBooking.amount}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500">Check In</Label>
                  <div>{selectedBooking.checkIn}</div>
                </div>
                <div>
                  <Label className="text-gray-500">Check Out</Label>
                  <div>{selectedBooking.checkOut}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500">Payment Method</Label>
                  <div>{selectedBooking.paymentMethod}</div>
                </div>
                <div>
                  <Label className="text-gray-500">Status</Label>
                  <div>
                    <Badge
                      variant={
                        selectedBooking.status === "Confirmed"
                          ? "success"
                          : selectedBooking.status === "Pending"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {selectedBooking.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-gray-500">Special Requests</Label>
                <div>{selectedBooking.specialRequests || "None"}</div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewBookingOpen(false)}>
                Close
              </Button>
              <Button className="bg-rose-600 hover:bg-rose-700">Edit Booking</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
