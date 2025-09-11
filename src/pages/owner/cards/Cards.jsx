// AdminAdmins.tsx
"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

import { Sidebar } from "@/components/Sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { TableSkeleton } from "@/common/TableSkeleton";
import {  useGetAllOwnerhostelQuery } from "@/app/service/hostel";
import { useState } from "react";

export default function OwnerCards() {
  const [searchTerm, setSearchTerm] = useState("");

const owner = JSON.parse(localStorage.getItem("owner"));
  const ownerId =
    owner?.ownerDetails?.role == "staff"
      ? owner?.ownerDetails?.ownerId
      : owner?.ownerDetails?._id;

  const { data, isError, isLoading } =
    useGetAllOwnerhostelQuery(ownerId);
  

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = data?.filter(
    (hostel) =>
      hostel?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hostel?.location?.place.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mt-10">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                Manage Hostels
              </h1>
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
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>All Hostels</CardTitle>
                        <CardDescription>
                          Manage and monitor all registered hostels
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
                          placeholder="Search hostels..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                      {paginatedUsers?.map((hostel) => (
                        <Card key={hostel._id} className="overflow-hidden">
                          <img
                            src={hostel?.photos[0] || "/placeholder.svg"}
                            alt={hostel.name}
                            className="w-full h-40  object-cover"
                          />
                          <CardContent className="p-4">
                            <h3 className="font-bold text-lg">
                              {hostel?.name}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              {hostel?.location?.place}
                            </p>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center">
                                <span className="text-amber-500">★</span>
                                <span className="ml-1 font-medium">{hostel?.rating?.average}</span>
                              </div>
                                 <div className="text-sm text-gray-600">
                                {hostel?.roomsId?.length} rooms
                              </div>
                              <div className="text-sm text-gray-600">
                                {hostel?.bookingCount} bookings
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {filteredUsers.length > 0 && (
                      <div className="flex items-center justify-between mt-4">
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
                          >
                            <ChevronLeft className="h-4 w-4" />
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
                          >
                            <ChevronRight className="h-4 w-4" />
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
    </div>
  );
}
