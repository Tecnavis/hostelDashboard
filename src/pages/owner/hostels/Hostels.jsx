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
  Star,
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
import { Textarea } from "@/components/ui/textarea";
import { useGetAllownerQuery } from "@/app/service/owner";
import {
  useAddNewhostelMutation,
  useBlockhostelMutation,
  useDeletehostelMutation,
  useGetAllOwnerhostelQuery,
} from "@/app/service/hostel";
import { useNavigate } from "react-router-dom";
import { HostelsPOST, HostelsPUT, ShowImagesIcon } from "./HostelAU";

export default function OwnerHostels() {
  const [isAddHostelOpen, setIsAddHostelOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState({
    street: "",
    place: "",
    pincode: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [amenities, setAmenities] = useState([""]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  // const [ownerId, setOwnerId] = useState("");
  const [accommodationType, setAccommodationType] = useState("");
  const [price, setPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedStreet, setSelectedStreet] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [open, setOpen] = useState(false);

  const owner = JSON.parse(localStorage.getItem("owner"));
  const ownerId =
    owner?.ownerDetails?.role == "staff"
      ? owner?.ownerDetails?.ownerId
      : owner?.ownerDetails?._id;

  const { data, isError, isLoading, refetch } =
    useGetAllOwnerhostelQuery(ownerId);
  const [deletehostel, { isLoading: isDeleting }] = useDeletehostelMutation();
  const [blockhostel] = useBlockhostelMutation();
  const [addNewhostel, { isLoading: isPosting }] = useAddNewhostelMutation();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !Array.isArray(data))
    return <h1>Oops! Something went wrong.</h1>;

  const places = [...new Set(data?.map((h) => h.location.place))];

  const streetsByPlace = (place) => [
    ...new Set(
      data
        ?.filter((h) => h.location.place === place)
        .map((h) => h.location.street)
    ),
  ];

  // searching

  const filteredUsers = data
    ?.filter(
      (hostel) =>
        hostel?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hostel?.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hostel?.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hostel?.ownerId?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        hostel?.location?.place.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.filter((user) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "active") return user.isActive;
      if (statusFilter === "inactive") return !user.isActive;
      return true;
    })
    ?.filter((user) => {
      // Apply place and street filter
      if (selectedPlace && user.location.place !== selectedPlace) return false;
      if (selectedStreet && user.location.street !== selectedStreet)
        return false;
      return true;
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFacilities = (index, value) => {
    const newAmenities = [...amenities];
    newAmenities[index] = value;
    setAmenities(newAmenities);
  };

  const addFacilities = () => {
    setAmenities([...amenities, ""]);
  };

  const removeFacilities = (index) => {
    const newAmenities = amenities.filter((_, i) => i !== index);
    setAmenities(newAmenities);
  };

  // create  hostel

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      category.trim() === "" ||
      selectedImages.length === 0 ||
      ownerId.trim() === "" ||
      description.trim() === "" ||
      name.trim() === "" ||
      phone.trim() === "" ||
      location.street.trim() === "" ||
      location.place.trim() === "" ||
      location.pincode.trim() === "" ||
      accommodationType.trim() === "" ||
      price.trim() === ""
    ) {
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("ownerId", ownerId);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("accommodationType", accommodationType);
    formData.append("price", price);
    formData.append("location[street]", location.street);
    formData.append("location[place]", location.place);
    formData.append("location[pincode]", location.pincode);
    amenities.forEach((a, i) => {
      if (a.trim() !== "") {
        formData.append(`amenities[${i}]`, a);
      }
    });
    selectedImages.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await addNewhostel(formData).unwrap();
      if (response?.status === 201) {
        // Reset form state
        setCategory("");
        setName("");
        setPhone("");
        setSelectedImages([]);
        setAmenities([""]);
        setDescription("");
        setPrice("");
        setAccommodationType("");
        setLocation({ street: "", place: "", pincode: "" });
        setIsAddHostelOpen(false);
        refetch();
      }
    } catch (error) {
      console.error("Hostel create failed:", error);
    }
  };
  // delete admin

  const handleDelete = async (id) => {
    try {
      const { status } = await deletehostel(id).unwrap();
      if (status === 200) {
        refetch();
      }
    } catch (error) {
      console.error("Failed to delete admin:", error);
    }
  };

  //  block & unblock admin
  const handleBlocUnblock = async (id) => {
    try {
      const { status } = await blockhostel(id).unwrap();
      if (status === 200) {
        refetch();
      }
    } catch (error) {
      console.error("Failed to block admin:", error);
    }
  };

  const hostels = [
    {
      id: 1,
      name: "Sunset Beach Hostel",
      location: "Miami, FL",
      address: "123 Ocean Drive, Miami, FL 33139",
      description:
        "A beautiful beachfront hostel with stunning ocean views. Perfect for travelers looking to enjoy the sun and surf of Miami Beach.",
      image: "/placeholder.svg?height=300&width=500",
      rooms: 18,
      occupancy: "78%",
      rating: 4.8,
      status: "Active",
      amenities: [
        "Free Wi-Fi",
        "Breakfast Included",
        "Air Conditioning",
        "Lockers",
        "Common Kitchen",
        "Laundry",
      ],
      priceRange: "$30-$120",
      created: "Jan 15, 2025",
    },
    {
      id: 2,
      name: "Downtown Backpackers",
      location: "New York, NY",
      address: "456 Broadway, New York, NY 10013",
      description:
        "Located in the heart of Manhattan, this hostel offers easy access to all major attractions. Modern facilities with a social atmosphere.",
      image: "/placeholder.svg?height=300&width=500",
      rooms: 14,
      occupancy: "92%",
      rating: 4.6,
      status: "Active",
      amenities: [
        "Free Wi-Fi",
        "24/7 Reception",
        "Lockers",
        "Common Room",
        "Bike Rental",
        "Tours",
      ],
      priceRange: "$25-$90",
      created: "Feb 3, 2025",
    },
    {
      id: 3,
      name: "Mountain View Lodge",
      location: "Denver, CO",
      address: "789 Mountain Road, Denver, CO 80202",
      description:
        "A cozy mountain retreat with breathtaking views of the Rockies. Perfect base for hiking and outdoor adventures.",
      image: "/placeholder.svg?height=300&width=500",
      rooms: 10,
      occupancy: "65%",
      rating: 4.7,
      status: "Active",
      amenities: [
        "Free Wi-Fi",
        "Breakfast Included",
        "Fireplace",
        "Hiking Trails",
        "Parking",
        "Shuttle Service",
      ],
      priceRange: "$35-$110",
      created: "Mar 10, 2025",
    },
  ];

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

                  <HostelsPOST
                    isPosting={isPosting}
                    name={name}
                    phone={phone}
                    price={price}
                    accommodationType={accommodationType}
                    location={location}
                    description={description}
                    amenities={amenities}
                    category={category}
                    selectedImages={selectedImages}
                    setName={setName}
                    setPhone={setPhone}
                    setPrice={setPrice}
                    setAccommodationType={setAccommodationType}
                    setLocation={setLocation}
                    setDescription={setDescription}
                    handleFacilities={handleFacilities}
                    addFacilities={addFacilities}
                    removeFacilities={removeFacilities}
                    setCategory={setCategory}
                    setSelectedImages={setSelectedImages}
                    handleSubmit={handleSubmit}
                    onCancel={oncancel}
                  />
                </Dialog>

                <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Admin</DialogTitle>
                    </DialogHeader>
                    <HostelsPUT
                      hostel={selectedHostel}
                      onClose={() => setOpenEditDialog(false)}
                      onUpdated={refetch}
                    />
                  </DialogContent>
                </Dialog>

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Hostel Images</DialogTitle>
                    </DialogHeader>
                    <ShowImagesIcon
                      images={selectedHostel?.photos}
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

                      <div className="flex flex-wrap gap-2 items-center">
                        {/* Place Dropdown */}
                        <select
                          value={selectedPlace}
                          onChange={(e) => {
                            setSelectedPlace(e.target.value);
                            setSelectedStreet(""); // reset street
                          }}
                          className="border rounded p-1"
                        >
                          <option value="">Select Place</option>
                          {places.map((place) => (
                            <option key={place} value={place}>
                              {place}
                            </option>
                          ))}
                        </select>

                        {/* Street Dropdown */}
                        {selectedPlace && (
                          <select
                            value={selectedStreet}
                            onChange={(e) => setSelectedStreet(e.target.value)}
                            className="border rounded p-1"
                          >
                            <option value="">Select Street</option>
                            {streetsByPlace(selectedPlace).map((street) => (
                              <option key={street} value={street}>
                                {street}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>

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
                            Name
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Owner
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Phone
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Location
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Facilities
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Accommodation
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Price
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Category
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
                        {paginatedUsers?.map((hostel) => (
                          <tr key={hostel._id} className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                  <Building
                                    className="h-5 w-5 text-gray-500 cursor-pointer"
                                    onClick={() => {
                                      setOpen(true);
                                      setSelectedHostel(hostel);
                                    }}
                                  />
                                </div>
                                <span
                                  className="font-medium cursor-pointer"
                                  onClick={() =>
                                    navigate(
                                      `/owner/hostels/rooms/${hostel._id}`
                                    )
                                  }
                                >
                                  {hostel.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              {hostel?.ownerId?.name}
                            </td>
                            <td className="py-3 px-4">{hostel.phone}</td>
                            <td className="py-3 px-4">
                              {hostel?.location?.place}
                            </td>
                            <td className="py-3 px-4 space-x-2">
                              {hostel?.amenities?.map((a, i) => (
                                <span
                                  key={i}
                                  className="bg-gray-100 px-2 py-1 rounded text-sm"
                                >
                                  {a}
                                </span>
                              ))}
                            </td>
                            <td className="py-3 px-4">
                              {hostel?.accommodationType}
                            </td>
                            <td className="py-3 px-4">{hostel?.price}</td>

                            <td className="py-3 px-4">{hostel?.category}</td>

                            <td className="py-3 px-4">
                              <Badge
                                variant={
                                  hostel.isActive ? "success" : "secondary"
                                }
                              >
                                {hostel.isActive ? "Active" : "Inactive"}
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
                                      handleBlocUnblock(hostel._id)
                                    }
                                  >
                                    {hostel.isActive ? (
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
                                      setSelectedHostel(hostel);
                                      setOpenEditDialog(true);
                                    }}
                                  >
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600 cursor-pointer"
                                    onClick={() => handleDelete(hostel._id)}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Hostel Performance</CardTitle>
                  <CardDescription>
                    Overview of your hostel properties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Hostel
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Occupancy
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Revenue (Monthly)
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Bookings
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Rating
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {hostels.map((hostel) => (
                          <tr key={hostel.id} className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-md overflow-hidden">
                                  <img
                                    src={hostel.image || "/placeholder.svg"}
                                    alt={hostel.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <span className="font-medium">
                                  {hostel.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-full max-w-[100px] h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-orange-500 rounded-full"
                                    style={{ width: hostel.occupancy }}
                                  ></div>
                                </div>
                                <span>{hostel.occupancy}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-medium">
                              {hostel.id === 1
                                ? "$4,250"
                                : hostel.id === 2
                                ? "$3,180"
                                : hostel.id === 3
                                ? "$2,815"
                                : "$0"}
                            </td>
                            <td className="py-3 px-4">
                              {hostel.id === 1
                                ? "56"
                                : hostel.id === 2
                                ? "42"
                                : hostel.id === 3
                                ? "28"
                                : "0"}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-amber-500" />
                                <span>{hostel.rating}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant="success">{hostel.status}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
