"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  Building,
  Calendar,
  DollarSign,
  Hotel,
  Search,
  Users,
  MoreHorizontal,
  CheckCircle,
  Trash2,
} from "lucide-react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Sidebar } from "@/components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminNotifications } from "@/components/AdminNotification";
import {
  useGetAllbookingQuery,
  useUpdatebookingMutation,
} from "@/app/service/bookings";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useGetAllhostelQuery } from "@/app/service/hostel";
import { useGetAllroomQuery } from "@/app/service/room";

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
];

const hostelDistribution = [
  { name: "Miami", value: 8 },
  { name: "New York", value: 6 },
  { name: "Los Angeles", value: 5 },
  { name: "San Francisco", value: 4 },
  { name: "Chicago", value: 3 },
  { name: "Denver", value: 3 },
  { name: "Other", value: 7 },
];

const admin = JSON.parse(localStorage.getItem("admin"));
const superAdminId = admin?.adminDetails;

export default function AdminDashboard() {
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetAllbookingQuery();
  const [updatebooking, { isLoading: isPosting }] = useUpdatebookingMutation();
  const { data: hostel } = useGetAllhostelQuery();
  const { data: room } =  useGetAllroomQuery();

  

  const handleBooking = async (id, status) => {
    try {
      const response = await updatebooking({
        id,
        updatebooking: { status },
      }).unwrap();
      if (response?.status === 200) {
        refetch();
      }
    } catch (error) {
      console.error("Failed to bookin status:", error);
    }
  };

  

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-white flex items-center justify-between px-6">
          <div className="relative w-64 ml-7">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search..." className="pl-8" />
          </div>

          <div className="flex items-center gap-4">
            <AdminNotifications variant="admin" />

            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>{superAdminId?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <div className="text-sm font-medium">{superAdminId?.name}</div>
                <div className="text-xs text-gray-500">
                  {superAdminId?.email}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Dashboard Overview</h1>
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
                      <p className="text-sm font-medium text-gray-500">
                        Total Hostels
                      </p>
                      <h3 className="text-3xl font-bold mt-1">
                        {hostel?.length ?? 0}
                      </h3>
                    </div>
                    <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center">
                      <Building className="h-6 w-6 text-rose-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <Badge
                      variant="outline"
                      className="gap-1 text-green-600 border-green-200 bg-green-50"
                    >
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
                      <p className="text-sm font-medium text-gray-500">
                        Total Rooms
                      </p>
                      <h3 className="text-3xl font-bold mt-1">{room?.length ?? 0}</h3>
                    </div>
                    <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Hotel className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <Badge
                      variant="outline"
                      className="gap-1 text-green-600 border-green-200 bg-green-50"
                    >
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
                      <p className="text-sm font-medium text-gray-500">
                        Active Bookings
                      </p>
                      <h3 className="text-3xl font-bold mt-1">
                        {data?.length ?? 0}
                      </h3>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <Badge
                      variant="outline"
                      className="gap-1 text-red-600 border-red-200 bg-red-50"
                    >
                      <ArrowDown className="h-3 w-3" />
                      3%
                    </Badge>
                    <span className="text-gray-500 ml-2">Since last month</span>
                  </div>
                </CardContent>
              </Card>

              {/* <Card>
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
              </Card> */}
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
                  <CardDescription>
                    Monthly booking and revenue trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={bookingData}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis
                          yAxisId="left"
                          orientation="left"
                          stroke="#8884d8"
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          stroke="#82ca9d"
                        />
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
                        <Bar
                          dataKey="revenue"
                          barSize={20}
                          fill="#82ca9d"
                          yAxisId="right"
                        />
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
                        <Bar
                          dataKey="value"
                          barSize={20}
                          fill="#ec4899"
                          radius={[0, 4, 4, 0]}
                        />
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
                    <TabsTrigger className={"cursor-pointer"} value="recent">Recent Bookings</TabsTrigger>
                    <TabsTrigger className={"cursor-pointer"} value="popular">Hostels</TabsTrigger>
                  </TabsList>

                  {/* <Button
                    variant="outline"
                    size="sm"
                    className={"cursor-pointer"}
                    onClick={() => navigate("/admin/bookings")}
                  >
                    View All
                  </Button> */}
                </div>

                <TabsContent value="recent" className="m-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Recent Bookings</CardTitle>
                      <CardDescription>
                        Latest bookings across all hostels
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium text-gray-500">
                                Guest
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">
                                Hostel
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">
                                Room Name
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">
                                Room Type
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">
                                Check In
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">
                                With Food
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">
                                Without Food
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">
                                Status
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.map((booking) => (
                              <tr key={booking._id} className="border-b">
                                <td className="py-3 px-4">
                                  {booking?.userId?.name}
                                </td>
                                <td className="py-3 px-4">
                                  {booking?.hostelId?.name}
                                </td>
                                <td className="py-3 px-4">
                                  {booking?.roomId?.roomNumber}
                                </td>
                                <td className="py-3 px-4">
                                  {booking?.roomId?.roomType}
                                </td>
                                <td className="py-3 px-4">
                                  {new Date(
                                    booking.checkInDate
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </td>

                                <td className="py-3 px-4 font-medium">
                                  {booking?.roomId?.withFood}
                                </td>
                                <td className="py-3 px-4 font-medium">
                                  {booking?.roomId?.withoutFood}
                                </td>
                                <td className="py-3 px-4">
                                  <Badge
                                    className={`px-2 py-1 rounded text-sm font-medium ${
                                      booking.status === "confirmed"
                                        ? "bg-green-100 text-green-800"
                                        : booking.status === "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {booking.status.charAt(0).toUpperCase() +
                                      booking.status.slice(1)}
                                  </Badge>
                                </td>

                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8"
                                        >
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                          onClick={() =>
                                            handleBooking(
                                              booking?._id,
                                              "confirmed"
                                            )
                                          }
                                        >
                                          <CheckCircle />
                                          {isPosting
                                            ? "  Confirming..."
                                            : "Confirmed"}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          className="text-red-600"
                                          onClick={() =>
                                            handleBooking(
                                              booking?._id,
                                              "cancelled"
                                            )
                                          }
                                        >
                                          <Trash2 className="h-4 w-4 mr-2" />
                                          {isPosting
                                            ? "Canceling..."
                                            : "Cancel"}
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
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="popular" className="m-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Hostels</CardTitle>
                      {/* <CardDescription>
                        Most booked hostels this month
                      </CardDescription> */}
                    </CardHeader>
                    <CardContent>


                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {hostel?.slice(0, 6).map((hostel) => (
    <Card 
      key={hostel._id} 
      className="overflow-hidden flex flex-col h-full"
    >
      <img
        src={hostel?.photos[0] || "/placeholder.svg"}
        alt={hostel.name}
        className="w-full h-40 object-cover block"
      />
      <CardContent className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-base line-clamp-1">{hostel?.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-1">
          {hostel?.location?.place}
        </p>

        {/* Info Section */}
        <div className="mt-auto pt-3 space-y-2 md:space-y-0 md:flex md:items-center md:justify-between">
          {/* Rating */}
          <div className="flex items-center">
            <span className="text-amber-500">★</span>
            <span className="ml-1 font-medium">{hostel?.rating?.average}</span>
          </div>

          {/* Rooms */}
          <div className="text-sm text-gray-600">
            {hostel?.roomsId?.length} rooms
          </div>

          {/* Bookings */}
          <div className="text-sm text-gray-600">
            {hostel?.bookingCount} bookings
          </div>
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
  );
}
