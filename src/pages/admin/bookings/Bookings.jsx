"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
  Trash2,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Sidebar } from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetAllAdminbookingQuery,
  useGetAllbookingQuery,
  useUpdatebookingMutation,
} from "@/app/service/bookings";
import { TableSkeleton } from "@/common/TableSkeleton";

const bookingsByDayData = [
  { day: "Mon", bookings: 12 },
  { day: "Tue", bookings: 8 },
  { day: "Wed", bookings: 15 },
  { day: "Thu", bookings: 18 },
  { day: "Fri", bookings: 25 },
  { day: "Sat", bookings: 32 },
  { day: "Sun", bookings: 20 },
];

export default function AdminBookings() {
  const [isViewBookingOpen, setIsViewBookingOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [date, setDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // const handleViewBooking = (booking) => {
  //   setSelectedBooking(booking);
  //   setIsViewBookingOpen(true);
  // };

  const { data, isError, isLoading, refetch } = useGetAllbookingQuery();
  const [updatebooking, { isLoading: isPosting }] = useUpdatebookingMutation();

  // searching

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = date ? new Date(date) : today;
  selectedDate.setHours(0, 0, 0, 0);

  const nextDate = new Date(selectedDate);
  nextDate.setDate(nextDate.getDate() + 1);

  const filteredUsers = data
    ?.filter(
      (booking) =>
        booking.hostelId?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        booking.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.roomId?.roomType
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    ?.filter((booking) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "pending") return booking.status === "pending";
      if (statusFilter === "confirmed") return booking.status === "confirmed";
      if (statusFilter === "cancelled") return booking.status === "cancelled";
      return true;
    })
    ?.filter((booking) => {
      const created = new Date(booking.createdAt);
      return created >= selectedDate && created < nextDate;
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredUsers?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  //  block & unblock admin
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
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mt-10">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                Manage Bookings
              </h1>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {date ? date.toLocaleDateString() : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {isLoading || isError || !Array.isArray(data) ? (
              <TableSkeleton
                columns={[
                  "Name",
                  "Email",
                  "Phone",
                  "Role",
                  "Status",
                  "Actions",
                ]}
                rows={6}
              />
            ) : (
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
                        <CardDescription>
                          Manage all bookings across all hostels
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                          type="search"
                          placeholder="Search staffs..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                          }}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 w-full sm:w-auto"
                        >
                          <Filter className="h-4 w-4" />
                          Filter
                          <ChevronDown className="h-3 w-3 opacity-50" />
                        </Button>

                        <Tabs
                          value={statusFilter}
                          onValueChange={setStatusFilter}
                        >
                          <TabsList className="w-full sm:w-auto">
                            <TabsTrigger
                              className="cursor-pointer w-full sm:w-auto"
                              value="all"
                            >
                              All
                            </TabsTrigger>
                            <TabsTrigger
                              className="cursor-pointer w-full sm:w-auto"
                              value="pending"
                            >
                              Pending
                            </TabsTrigger>
                            <TabsTrigger
                              className="cursor-pointer w-full sm:w-auto"
                              value="confirmed"
                            >
                              Confirmed
                            </TabsTrigger>
                            <TabsTrigger
                              className="cursor-pointer w-full sm:w-auto"
                              value="cancelled"
                            >
                              Cancelled
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                    </div>
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
                              Room Type
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">
                              Check In
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">
                              Check Out
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">
                              Amount
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
                          {paginatedBookings?.map((booking) => (
                            <tr key={booking._id} className="border-b">
                              <td className="py-3 px-4">
                                {booking?.userId?.name}
                              </td>
                              <td className="py-3 px-4">
                                {booking?.hostelId?.name}
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
                              <td className="py-3 px-4">
                                {new Date(
                                  booking?.checkOutDate
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </td>
                              <td className="py-3 px-4 font-medium">
                                {booking?.roomId.price}
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
                                  {/* <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleViewBooking(booking)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button> */}
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
                                        {isPosting ? "Canceling..." : "Cancel"}
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

                    {/* Pagination */}
                    {filteredUsers.length > 0 && (
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Showing{" "}
                          <span className="font-medium">{startIndex + 1}</span>{" "}
                          to{" "}
                          <span className="font-medium">
                            {Math.min(
                              startIndex + itemsPerPage,
                              filteredUsers.length
                            )}
                          </span>{" "}
                          of{" "}
                          <span className="font-medium">
                            {filteredUsers.length}
                          </span>{" "}
                          admins
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                            className={"cursor-pointer"}
                          >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Previous page</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                              )
                            }
                            disabled={currentPage === totalPages}
                            className={"cursor-pointer"}
                          >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next page</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {selectedBooking && (
        <Dialog open={isViewBookingOpen} onOpenChange={setIsViewBookingOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>
                Booking ID: {selectedBooking.id}
              </DialogDescription>
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
              <Button
                variant="outline"
                onClick={() => setIsViewBookingOpen(false)}
              >
                Close
              </Button>
              <Button className="bg-rose-600 hover:bg-rose-700">
                Edit Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
