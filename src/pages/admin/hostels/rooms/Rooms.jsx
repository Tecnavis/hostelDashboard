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
  useGetAllroomQuery,
} from "@/app/service/room";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminHostelsRooms() {
  const [isAddHostelOpen, setIsAddHostelOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [features, setFeatures] = useState([""]);
  const [currentOccupancy, setCurrentOccupancy] = useState("");
  const [price, setPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { id } = useParams();

  const { data, isError, isLoading, refetch } = useGetAllroomQuery();
  const [deleteroom, { isLoading: isDeleting }] = useDeleteroomMutation();
  const [blockroom] = useBlockroomMutation();
  const [addNewroom, { isLoading: isPosting }] = useAddNewroomMutation();

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

    features.forEach((a, i) => {
      if (a.trim() !== "") {
        formData.append(`features[${i}]`, a);
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
        refetch();
      }
    } catch (error) {
      console.error("Room create failed:", error);
    }
  };
  // delete admin

  const handleDelete = async (roomId) => {
    try {
      const { status } = await deleteroom({id: roomId, hostelId: id}).unwrap();
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
                Manage Hostels
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
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New Hostel</DialogTitle>
                    </DialogHeader>
                    {/* <div className="grid gap-4 py-4"> */}
                    <div
                      className="overflow-y-auto pr-2 mt-2 space-y-4"
                      style={{ maxHeight: "calc(90vh - 130px)" }}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="roomNumber">Room Number</Label>
                          <Input
                            id="roomNumber"
                            placeholder="Enter room number"
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="capacity">Capacity</Label>
                          <Input
                            id="capacity"
                            placeholder="Enter room capacity"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            required
                          />
                        </div>
                        
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentOccupancy">
                            Current Occupancy
                          </Label>

                          <Input
                            id="currentOccupancy"
                            placeholder="Enter number of people currently in the room"
                            value={currentOccupancy}
                            onChange={(e) =>
                              setCurrentOccupancy(e.target.value)
                            }
                            required
                          />
                        </div>
                         <div className="space-y-2">
                          <Label htmlFor="price">
                            Price
                          </Label>

                          <Input
                            id="price"
                            placeholder="Enter room price"
                            value={price}
                            onChange={(e) =>
                              setPrice(e.target.value)
                            }
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Features</Label>
                          {features.map((link, index) => (
                            <div
                              key={index}
                              className="flex gap-2 items-center"
                            >
                              <Input
                                value={link}
                                onChange={(e) =>
                                  handleFeatures(index, e.target.value)
                                }
                                placeholder={`Enter feature ${index + 1}`}
                              />
                              {features.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFeatures(index)}
                                >
                                  ✕
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addFeatures}
                          >
                            + Add Feature
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="images">Upload Images</Label>
                        <label className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2 cursor-pointer">
                          <ImagePlus className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload
                          </p>
                          <Upload className="h-4 w-4" />

                          <Input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files) {
                                setSelectedImages((prevImages) => [
                                  ...prevImages,
                                  ...Array.from(e.target.files),
                                ]);
                              }
                            }}
                          />
                        </label>

                        {selectedImages.length > 0 && (
                          <div className="grid gap-2 mt-4">
                            <Label>Preview</Label>
                            <div className="grid grid-cols-2 gap-2">
                              {selectedImages.map((file, index) => (
                                <img
                                  key={index}
                                  src={URL.createObjectURL(file)}
                                  alt="preview"
                                  className="w-full h-32 object-cover rounded-md"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddHostelOpen(false)}
                        className={"cursor-pointer"}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-rose-600 hover:bg-rose-700 cursor-pointer"
                        onClick={handleSubmit}
                      >
                        {isPosting ? "Creating..." : "Create"}
                      </Button>
                    </DialogFooter>
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
                      <CardTitle>All Hostels</CardTitle>
                      <CardDescription>
                        Manage and monitor all registered admins
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
                                  <Building className="h-5 w-5 text-gray-500" />
                                </div>
                                <span className="font-medium">
                                  {room.roomNumber}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              {room.capacity}
                            </td>
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

                            <td className="py-3 px-4">{room.currentOccupancy}</td>

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
