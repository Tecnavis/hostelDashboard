"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bed,
  Building,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAddNewroomMutation,
  useBlockroomMutation,
  useDeleteroomMutation,
  useGetAllHostelRoomQuery,
} from "@/app/service/room";
import { useParams } from "react-router-dom";
import { RoomsPOST, RoomsPUT, ShowImagesIcon } from "./RoomAU";
import { TableSkeleton } from "@/common/TableSkeleton";
import { iconMap, ShowMorFacility } from "../HostelAU";

export default function OwnerHostelsRooms() {
  // const rooms = [
  //   {
  //     id: 1,
  //     name: "Deluxe Private Double",
  //     hostel: "Sunset Beach Hostel",
  //     type: "Private",
  //     capacity: 2,
  //     beds: "1 Queen Bed",
  //     price: 85,
  //     status: "Available",
  //     amenities: [
  //       "En-suite Bathroom",
  //       "Air Conditioning",
  //       "Sea View",
  //       "TV",
  //       "Mini Fridge",
  //     ],
  //     description:
  //       "Spacious private room with a queen-sized bed and en-suite bathroom. Features a beautiful sea view.",
  //     image: "/placeholder.svg?height=200&width=300",
  //     occupancy: "75%",
  //     bookings: 42,
  //   },
  //   {
  //     id: 2,
  //     name: "Standard Private Single",
  //     hostel: "Sunset Beach Hostel",
  //     type: "Private",
  //     capacity: 1,
  //     beds: "1 Single Bed",
  //     price: 65,
  //     status: "Available",
  //     amenities: ["Shared Bathroom", "Air Conditioning", "Desk", "Locker"],
  //     description:
  //       "Cozy private room with a single bed. Shared bathroom facilities.",
  //     image: "/placeholder.svg?height=200&width=300",
  //     occupancy: "80%",
  //     bookings: 38,
  //   },
  //   {
  //     id: 3,
  //     name: "4-Bed Mixed Dorm",
  //     hostel: "Sunset Beach Hostel",
  //     type: "Dorm",
  //     capacity: 4,
  //     beds: "4 Single Beds",
  //     price: 30,
  //     status: "Available",
  //     amenities: [
  //       "Shared Bathroom",
  //       "Air Conditioning",
  //       "Lockers",
  //       "Reading Lights",
  //     ],
  //     description:
  //       "Comfortable 4-bed mixed dorm with individual lockers and reading lights for each bed.",
  //     image: "/placeholder.svg?height=200&width=300",
  //     occupancy: "90%",
  //     bookings: 65,
  //   },
  //   {
  //     id: 4,
  //     name: "6-Bed Female Dorm",
  //     hostel: "Sunset Beach Hostel",
  //     type: "Dorm",
  //     capacity: 6,
  //     beds: "6 Single Beds",
  //     price: 25,
  //     status: "Available",
  //     amenities: [
  //       "Shared Bathroom",
  //       "Air Conditioning",
  //       "Lockers",
  //       "Reading Lights",
  //       "Female Only",
  //     ],
  //     description:
  //       "Female-only dorm with 6 single beds, individual lockers, and reading lights.",
  //     image: "/placeholder.svg?height=200&width=300",
  //     occupancy: "85%",
  //     bookings: 58,
  //   },
  //   {
  //     id: 5,
  //     name: "Premium Private Double",
  //     hostel: "Downtown Backpackers",
  //     type: "Private",
  //     capacity: 2,
  //     beds: "1 Queen Bed",
  //     price: 75,
  //     status: "Available",
  //     amenities: ["En-suite Bathroom", "Air Conditioning", "City View", "TV"],
  //     description:
  //       "Modern private room with a queen-sized bed and en-suite bathroom. Features a city view.",
  //     image: "/placeholder.svg?height=200&width=300",
  //     occupancy: "85%",
  //     bookings: 45,
  //   },
  //   {
  //     id: 6,
  //     name: "8-Bed Mixed Dorm",
  //     hostel: "Downtown Backpackers",
  //     type: "Dorm",
  //     capacity: 8,
  //     beds: "8 Single Beds",
  //     price: 22,
  //     status: "Available",
  //     amenities: [
  //       "Shared Bathroom",
  //       "Air Conditioning",
  //       "Lockers",
  //       "Reading Lights",
  //     ],
  //     description:
  //       "Spacious 8-bed mixed dorm with individual lockers and reading lights for each bed.",
  //     image: "/placeholder.svg?height=200&width=300",
  //     occupancy: "95%",
  //     bookings: 72,
  //   },
  //   {
  //     id: 7,
  //     name: "Mountain View Suite",
  //     hostel: "Mountain View Lodge",
  //     type: "Private",
  //     capacity: 2,
  //     beds: "1 King Bed",
  //     price: 95,
  //     status: "Available",
  //     amenities: [
  //       "En-suite Bathroom",
  //       "Fireplace",
  //       "Mountain View",
  //       "TV",
  //       "Mini Kitchen",
  //     ],
  //     description:
  //       "Luxurious private suite with a king-sized bed, en-suite bathroom, and a fireplace. Features a stunning mountain view.",
  //     image: "/placeholder.svg?height=200&width=300",
  //     occupancy: "70%",
  //     bookings: 32,
  //   },
  //   {
  //     id: 8,
  //     name: "4-Bed Mixed Dorm",
  //     hostel: "Mountain View Lodge",
  //     type: "Dorm",
  //     capacity: 4,
  //     beds: "4 Single Beds",
  //     price: 35,
  //     status: "Available",
  //     amenities: ["Shared Bathroom", "Heating", "Lockers", "Reading Lights"],
  //     description:
  //       "Cozy 4-bed mixed dorm with individual lockers and reading lights for each bed.",
  //     image: "/placeholder.svg?height=200&width=300",
  //     occupancy: "60%",
  //     bookings: 28,
  //   },
  // ];

  const [isAddHostelOpen, setIsAddHostelOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  // const [features, setFeatures] = useState([""]);
  const [currentOccupancy, setCurrentOccupancy] = useState("");
  const [roomType, setRoomType] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { id } = useParams();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [open, setOpen] = useState(false);

  const { data, isError, isLoading, refetch } = useGetAllHostelRoomQuery(id);
  const [deleteroom, { isLoading: isDeleting }] = useDeleteroomMutation();
  const [blockroom] = useBlockroomMutation();
  const [addNewroom, { isLoading: isPosting }] = useAddNewroomMutation();
    const [selectedData, setSelectedData] = useState(null);
    const [show, setShow] = useState(false);
      const [withFood, setWithFood] = useState("");
      const [withoutFood, setWithoutFood] = useState("");
      const [selectedAmenities, setSelectedAmenities] = useState([]);

  // searching

  const filteredUsers = data
    ?.filter((room) => {
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
  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // const handleFeatures = (index, value) => {
  //   const newFeatures = [...features];
  //   newFeatures[index] = value;
  //   setFeatures(newFeatures);
  // };

  // const addFeatures = () => {
  //   setFeatures([...features, ""]);
  // };

  // const removeFeatures = (index) => {
  //   const newFeatures = features.filter((_, i) => i !== index);
  //   setFeatures(newFeatures);
  // };


  const toggleAmenity = (amenity) => {
    const exists = selectedAmenities?.find((a) => a?.name === amenity?.name);
    if (exists) {
      setSelectedAmenities((prev) =>
        prev?.filter((a) => a?.name !== amenity?.name)
      );
    } else {
      setSelectedAmenities((prev) => [...prev, amenity]);
    }
  };

  // create  hostel

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      roomNumber.trim() === "" ||
      selectedImages.length === 0 ||
      capacity.trim() === "" ||
      currentOccupancy.trim() === "" ||
      withFood.trim() === "" ||
      withoutFood.trim() === ""
    ) {
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("hostelId", id);
    formData.append("roomNumber", roomNumber);
    formData.append("capacity", capacity);
    formData.append("currentOccupancy", currentOccupancy);
    formData.append("roomType", roomType);
    formData.append("withFood", withFood);
    formData.append("withoutFood", withoutFood);
    selectedAmenities.forEach((a, i) => {
      if (a.name.trim() !== "") {
        formData.append(`amenities[${i}][name]`, a.name);
        formData.append(`amenities[${i}][icon]`, a.icon);
      }
    });

    // features.forEach((a, i) => {
    //   if (a.trim() !== "") {
    //     formData.append(`features[${i}]`, a);
    //   }
    // });

    selectedImages.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await addNewroom(formData).unwrap();
      if (response?.status === 201) {
        // Reset form state
        setRoomNumber("");
        setCapacity("");
        // setFeatures([""]);
        setCurrentOccupancy("");
        setSelectedImages([]);
        setIsAddHostelOpen(false);
        setRoomType("");
        setWithFood("");
        setWithoutFood("");
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
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar role="owner" />
  
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
                        Add Room
                      </Button>
                    </DialogTrigger>
                    <RoomsPOST
                      isPosting={isPosting}
                      roomNumber={roomNumber}
                      setRoomNumber={setRoomNumber}
                      capacity={capacity}
                      setCapacity={setCapacity}
                      currentOccupancy={currentOccupancy}
                      setCurrentOccupancy={setCurrentOccupancy}
                      roomType={roomType}
                      setRoomType={setRoomType}
                      selectedImages={selectedImages}
                      setSelectedImages={setSelectedImages}
                      handleSubmit={handleSubmit}
                      setIsAddHostelOpen={setIsAddHostelOpen}
                      withFood={withFood}
                      setWithFood={setWithFood}
                      withoutFood={withoutFood}
                      setWithoutFood={setWithoutFood}
                      toggleAmenity={toggleAmenity}
                      amenities={selectedAmenities}
                    />
                  </Dialog>
  
                  <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Room</DialogTitle>
                      </DialogHeader>
                      <RoomsPUT
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
  
                  <Dialog open={show} onOpenChange={setShow}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{selectedData?.name}</DialogTitle>
                      </DialogHeader>
                      <ShowMorFacility
                        facility={selectedData}
                        onClose={() => setShow(false)}
                      />
                    </DialogContent>
                  </Dialog>
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
                                Room Type
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">
                                Facilities
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-gray-500">
                                With Food
                              </th>{" "}
                              <th className="text-left py-3 px-4 font-medium text-gray-500">
                                Without Food
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
                                        className="h-5 w-5 text-gray-500 cursor-pointer"
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
                                {/* <td className="py-3 px-4 space-x-2">
                                  {room?.features?.map((a, i) => (
                                    <span
                                      key={i}
                                      className="bg-gray-100 px-2 py-1 rounded text-sm"
                                    >
                                      {a}
                                    </span>
                                  ))}
                                </td> */}
                                <td className="py-3 px-4">{room?.roomType}</td>
                                <td className="py-3 px-4">
                                  {room?.amenities?.length > 0 &&
                                    (() => {
                                      const a = room.amenities[0];
                                      const Icon = iconMap[a.icon];
                                      return (
                                        <div className="flex items-center gap-2">
                                          <span
                                            onClick={() => {
                                              setShow(true);
                                              setSelectedData({
                                                name: "Amenties",
                                                data: room.amenities,
                                              });
                                            }}
                                            className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm cursor-pointer"
                                          >
                                            {Icon && <Icon className="w-4 h-4" />}
                                            {a.name}
                                          </span>
  
                                          {/* Show +X if more amenities exist */}
                                          {room.amenities.length > 1 && (
                                            <span className="text-gray-500 text-sm">
                                              +{room.amenities.length - 1}
                                            </span>
                                          )}
                                        </div>
                                      );
                                    })()}
                                </td>
                                <td className="py-3 px-4">{room.withFood}</td>
                                <td className="py-3 px-4">{room.withoutFood}</td>
  
                                <td className="py-3 px-4">
                                  {room?.currentOccupancy}
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
                                        onClick={() =>
                                          handleBlocUnblock(room._id)
                                        }
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
              )}
            </div>
          </main>
        </div>
      </div>
  );
}
