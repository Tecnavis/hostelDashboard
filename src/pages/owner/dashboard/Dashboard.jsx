"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  Building,
  Hotel,
  Search,
  Users,
} from "lucide-react";
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
} from "recharts";



import { Sidebar } from "@/components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { OwnerNotifications } from "@/components/OwnerNotification";
import { useGetAllOwnerhostelQuery } from "@/app/service/hostel";
import { useGetAllHostelRoomOwnerQuery } from "@/app/service/room";
import { useGetAllOwnerbookingQuery } from "@/app/service/bookings";


const COLORS = ["#ec4899", "#f97316", "#8b5cf6", "#06b6d4", "#10b981"];

const owner = JSON.parse(localStorage.getItem("owner"));
const ownerId = owner?.ownerDetails;

export default function OwnerDashboard() {

  
  const { data: hostel } = useGetAllOwnerhostelQuery(ownerId?._id);
  const { data: booking } = useGetAllOwnerbookingQuery(ownerId?._id);
    const { data: room } =    useGetAllHostelRoomOwnerQuery(ownerId?._id);  

  const bookingData = booking?.reduce((acc, val) => {
    // take the checkInDate of the booking
    const month = new Date(val.checkInDate).toLocaleString("default", {
      month: "long",
    });

    // check if this month already exists
    const existing = acc.find((item) => item.name === month);

    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: month, bookings: 1 });
    }

    return acc;
  }, []);

  const hostelDistribution = hostel?.reduce((acc, val) => {
    const place = val.location.place;

    // check if already exists
    const existing = acc.find((item) => item.name === place);

    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: place, value: 1 });
    }

    return acc;
  }, []);


 const roomCount = hostel?.reduce((acc, val) => {
  return acc + val?.roomsId?.length ;
}, 0);


    const roomTypeData = room?.reduce((acc, val) => {
    const roomName = val?.roomNumber;

    // check if already exists
    const existing = acc.find((item) => item.name === roomName );

    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: roomName, value: 1 });
    }

    return acc;
  }, []);

  

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="owner" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-white flex items-center justify-between px-6">
          <div className="relative w-64  ml-7">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search..." className="pl-8" />
          </div>

          <div className="flex items-center gap-4">
            <OwnerNotifications variant="owner" />

            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>{ownerId?.name?.charAt(0)}</AvatarFallback>
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
                        My Hostels
                      </p>
                      <h3 className="text-3xl font-bold mt-1">
                        {hostel?.length ?? 0}
                      </h3>
                    </div>
                    <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Building className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <Badge
                      variant="outline"
                      className="gap-1 text-green-600 border-green-200 bg-green-50"
                    >
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
                      <p className="text-sm font-medium text-gray-500">
                        Total Rooms
                      </p>
                      <h3 className="text-3xl font-bold mt-1">{roomCount ?? 0}</h3>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Hotel className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <Badge
                      variant="outline"
                      className="gap-1 text-green-600 border-green-200 bg-green-50"
                    >
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
                      <p className="text-sm font-medium text-gray-500">
                        Current Bookings
                      </p>
                      <h3 className="text-3xl font-bold mt-1">
                        {booking?.length ?? 0}
                      </h3>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <Badge
                      variant="outline"
                      className="gap-1 text-red-600 border-red-200 bg-red-50"
                    >
                      <ArrowDown className="h-3 w-3" />2
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
                  <CardTitle>Booking Overview</CardTitle>
                  <CardDescription>Monthly booking</CardDescription>
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
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {roomTypeData?.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
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

              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest guest reservations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {booking?.slice(0, 5).map((booking) => (
                      <div
                        key={booking._id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">
                            {booking?.userId?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking?.hostelId?.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(booking.checkInDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={`px-2 py-1 rounded text-sm font-medium ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
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
                  <CardDescription>
                    Manage your hostel properties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* ✅ Responsive grid */}
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {hostel?.slice(0, 3).map((hostel, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg"
                      >
                        <img
                          src={hostel?.photos[0] || "/placeholder.svg"}
                          alt={hostel.name}
                          className="w-full sm:w-24 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold">{hostel.name}</h3>
                          <p className="text-sm text-gray-500">
                            {hostel?.location?.place}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <Hotel className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">
                                {hostel?.roomsId?.length} rooms
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              <span className="text-amber-500">★</span>
                              <span className="text-sm">
                                {hostel?.rating?.average}
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              {hostel?.bookingCount} bookings
                            </div>
                          </div>
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
  );
}
