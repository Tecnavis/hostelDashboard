"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  ImagePlus,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  Upload,
  UserCheck,
  UserX,
} from "lucide-react";

import { Sidebar } from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAddNewroomMutation,
  useBlockroomMutation,
  useDeleteroomMutation,
  useGetAllHostelRoomQuery,
} from "@/app/service/room";
import { useParams } from "react-router-dom";
import { RoomPOST, RoomPUT, ShowImagesIcon } from "./RoomAU";

export default function AdminHostelsRooms() {
  const [isAddHostelOpen, setIsAddHostelOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [features, setFeatures] = useState([""]);
  const [currentOccupancy, setCurrentOccupancy] = useState("");
  const [price, setPrice] = useState("");
  const [roomType, setRoomType] = useState("");
  const [payment, setPayment] = useState("");
  const [charge, setCharge] = useState("");
  const [gardianInfo, setGardianInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [visitTimes, setVisitTimes] = useState([""]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { id } = useParams();

  const { data, isError, isLoading, refetch } = useGetAllHostelRoomQuery(id);
  const [deleteroom, { isLoading: isDeleting }] = useDeleteroomMutation();
  const [blockroom] = useBlockroomMutation();
  const [addNewroom, { isLoading: isPosting }] = useAddNewroomMutation();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [open, setOpen] = useState(false);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !Array.isArray(data))
    return <h1>Oops! Something went wrong.</h1>;

  // searching

  const filteredUsers = data
    .filter((room) => {
      const price = String(room?.price || "").toLowerCase();
      const roomNumber = String(room?.roomNumber || "").toLowerCase();
      const hostelName = String(room?.hostelId?.name || "").toLowerCase();
      const capacity = String(room?.capacity || "").toLowerCase();

      return (
        price.includes(searchTerm.toLowerCase()) ||
        roomNumber.includes(searchTerm.toLowerCase()) ||
        hostelName.includes(searchTerm.toLowerCase()) ||
        capacity.includes(searchTerm.toLowerCase())
      );
    })
    ?.filter((user) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "active") return user.isActive;
      if (statusFilter === "inactive") return !user.isActive;
      return true;
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFeatures = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeatures = () => {
    setFeatures([...features, ""]);
  };

  const removeFeatures = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  const handleVisitTime = (index, value) => {
    const newVisitTime = [...visitTimes];
    newVisitTime[index] = value;
    setVisitTimes(newVisitTime);
  };

  const addVisitTime = () => {
    setVisitTimes([...visitTimes, ""]);
  };

  const removeVisitTime = (index) => {
    const newVisitTime = visitTimes.filter((_, i) => i !== index);
    setVisitTimes(newVisitTime);
  };

  // create  hostel

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      roomNumber.trim() === "" ||
      selectedImages.length === 0 ||
      price.trim() === "" ||
      capacity.trim() === "" ||
      currentOccupancy.trim() === ""
    ) {
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("hostelId", id);
    formData.append("roomNumber", roomNumber);
    formData.append("capacity", capacity);
    formData.append("price", price);
    formData.append("currentOccupancy", currentOccupancy);
    formData.append("gardianInfo[name]", gardianInfo.name);
    formData.append("gardianInfo[email]", gardianInfo.email);
    formData.append("gardianInfo[phone]", gardianInfo.phone);
    formData.append("roomType", roomType);
    formData.append("payment", payment);
    formData.append("charge", charge);

    features.forEach((a, i) => {
      if (a.trim() !== "") {
        formData.append(`features[${i}]`, a);
      }
    });
    visitTimes.forEach((a, i) => {
      if (a.trim() !== "") {
        formData.append(`visitTimes[${i}]`, a);
      }
    });
    selectedImages.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await addNewroom(formData).unwrap();
      if (response?.status === 201) {
        // Reset form state
        setRoomNumber("");
        setCapacity("");
        setFeatures([""]);
        setCurrentOccupancy("");
        setSelectedImages([]);
        setPrice("");
        setIsAddHostelOpen(false);
        setGardianInfo({
          name: "",
          email: "",
          phone: "",
        });
        setRoomType("");
        setPayment("");
        setCharge("");
        setVisitTimes([""]);
        refetch();
      }
    } catch (error) {
      console.error("Room create failed:", error);
    }
  };
  // delete admin

  const handleDelete = async (roomId) => {
    try {
      const { status } = await deleteroom({
        id: roomId,
        hostelId: id,
      }).unwrap();
      if (status === 200) {
        refetch();
      }
    } catch (error) {
      console.error("Failed to delete room:", error);
    }
  };

  //  block & unblock admin
  const handleBlocUnblock = async (id) => {
    try {
      const { status } = await blockroom(id).unwrap();
      if (status === 200) {
        refetch();
      }
    } catch (error) {
      console.error("Failed to block room:", error);
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
                Manage Rooms
              </h1>
              <div className="flex items-center gap-2">
                <Dialog
                  open={isAddHostelOpen}
                  onOpenChange={setIsAddHostelOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-rose-600 hover:bg-rose-700 gap-2 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Add hostel
                    </Button>
                  </DialogTrigger>
                  <RoomPOST
                    isPosting={isPosting}
                    roomNumber={roomNumber}
                    setRoomNumber={setRoomNumber}
                    capacity={capacity}
                    setCapacity={setCapacity}
                    price={price}
                    setPrice={setPrice}
                    currentOccupancy={currentOccupancy}
                    setCurrentOccupancy={setCurrentOccupancy}
                    roomType={roomType}
                    setRoomType={setRoomType}
                    payment={payment}
                    setPayment={setPayment}
                    charge={charge}
                    setCharge={setCharge}
                    gardianInfo={gardianInfo}
                    setGardianInfo={setGardianInfo}
                    features={features}
                    handleFeatures={handleFeatures}
                    addFeatures={addFeatures}
                    removeFeatures={removeFeatures}
                    visitTimes={visitTimes}
                    handleVisitTime={handleVisitTime}
                    addVisitTime={addVisitTime}
                    removeVisitTime={removeVisitTime}
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    handleSubmit={handleSubmit}
                    setIsAddHostelOpen={setIsAddHostelOpen}
                  />
                </Dialog>

                <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Admin</DialogTitle>
                    </DialogHeader>
                    <RoomPUT
                      room={selectedRoom}
                      onClose={() => setOpenEditDialog(false)}
                      onUpdated={refetch}
                    />
                  </DialogContent>
                </Dialog>

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Room Images</DialogTitle>
                    </DialogHeader>
                    <ShowImagesIcon
                      images={selectedRoom?.photos}
                      onClose={() => setOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>All Rooms</CardTitle>
                      <CardDescription>
                        Manage and monitor all registered rooms
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
                            value="active"
                          >
                            Active
                          </TabsTrigger>
                          <TabsTrigger
                            className="cursor-pointer w-full sm:w-auto"
                            value="inactive"
                          >
                            Inactive
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
                            Room No
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Capacity
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Price
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Features
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Room Type
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Charge
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Payment
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Occupancy
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
                        {paginatedUsers?.map((room) => (
                          <tr key={room._id} className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                  <Building
                                    className="h-5 w-5 text-gray-500"
                                    onClick={() => {
                                      setOpen(true);
                                      setSelectedRoom(room);
                                    }}
                                  />
                                </div>
                                <span className="font-medium">
                                  {room.roomNumber}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{room.capacity}</td>
                            <td className="py-3 px-4">{room.price}</td>
                            <td className="py-3 px-4 space-x-2">
                              {room?.features?.map((a, i) => (
                                <span
                                  key={i}
                                  className="bg-gray-100 px-2 py-1 rounded text-sm"
                                >
                                  {a}
                                </span>
                              ))}
                            </td>
                            <td className="py-3 px-4">{room?.roomType}</td>
                            <td className="py-3 px-4">{room?.charge}</td>
                            <td className="py-3 px-4">{room?.payment}</td>
                            <td className="py-3 px-4">
                              {room.currentOccupancy}
                            </td>
                            <td className="py-3 px-4">
                              <Badge
                                variant={
                                  room.isActive ? "success" : "secondary"
                                }
                              >
                                {room.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className={"cursor-pointer"}
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    className={"cursor-pointer"}
                                    onClick={() => handleBlocUnblock(room._id)}
                                  >
                                    {room.isActive ? (
                                      <>
                                        <UserX className="h-4 w-4 mr-2" />
                                        Block
                                      </>
                                    ) : (
                                      <>
                                        <UserCheck className="h-4 w-4 mr-2 text-green-600" />
                                        Unblock
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className={"cursor-pointer"}
                                    onClick={() => {
                                      setSelectedRoom(room);
                                      setOpenEditDialog(true);
                                    }}
                                  >
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600 cursor-pointer"
                                    onClick={() => handleDelete(room._id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    {isDeleting ? "Deleting..." : "Delete"}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
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
                        <span className="font-medium">{startIndex + 1}</span> to{" "}
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
                        hostels
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
          </div>
        </main>
      </div>
    </div>
  );
}
