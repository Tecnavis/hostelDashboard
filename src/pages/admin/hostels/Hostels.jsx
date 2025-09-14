"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Hotel,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Star,
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
  useGetAllhostelQuery,
  useGetAllSuperAdminhostelQuery,
} from "@/app/service/hostel";
import { useNavigate } from "react-router-dom";
import {
  HostelPOST,
  HostelPUT,
  iconMap,
  nearbyMap,
  ShowImagesIcon,
  transportMap,
  ShowMorFacility,
} from "./HostelAU";
import { TableSkeleton } from "@/common/TableSkeleton";

export default function AdminHostels() {
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
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [ownerId, setOwnerId] = useState("");
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
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedTransport, setSelectdTransport] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantFar, setRestaurantFar] = useState("");
  const [googleMap, setGoogleMap] = useState("");
  const [selectedNearby, setSelectdNearby] = useState([]);
  const [visitorsAllow, setVisitorAllow] = useState(false);
  const [fulltimeWarden, setFulltimeWarden] = useState(false);
   const [registrationFee, setRegistrationFee] = useState("");
    const [refund, setRefund] = useState(false);
  const [noticePeriod, setNoticePeriod] = useState("");
  const [gateOpenTime, setGateOpenTime] = useState("");
  const [gateCloseTime, setGateCloseTime] = useState("");
  const [additionalFee, setAdditionalFee] = useState("");
  const [gardianInfo, setGardianInfo] = useState({
    name: "",
    phone: "",
  });
  const [restrictions, setRestrictions] = useState([""]);

  const [selectedData, setSelectedData] = useState(null);
  const [show, setShow] = useState(false);

  const admin = JSON.parse(localStorage.getItem("admin"));

  const superAdminId =
    admin?.adminDetails?.role == "admin"
      ? admin?.adminDetails?.superAdminId
      : admin?.adminDetails?._id;

  const { data, isError, isLoading, refetch } = useGetAllhostelQuery();
  const [deletehostel, { isLoading: isDeleting }] = useDeletehostelMutation();
  const [blockhostel] = useBlockhostelMutation();
  const [addNewhostel, { isLoading: isPosting }] = useAddNewhostelMutation();
  const { data: owners = [] } = useGetAllownerQuery();

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
  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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

  const toggleTransport = (transport) => {
    const exists = selectedTransport?.find((a) => a?.name === transport?.name);
    if (exists) {
      setSelectdTransport((prev) =>
        prev?.filter((a) => a?.name !== transport?.name)
      );
    } else {
      setSelectdTransport((prev) => [
        ...prev,
        { ...transport, far: "" }, // add `far`
      ]);
    }
  };

  const toggleNearby = (nearby) => {
    const exists = selectedNearby?.find((a) => a?.name === nearby?.name);
    if (exists) {
      setSelectdNearby((prev) => prev?.filter((a) => a?.name !== nearby?.name));
    } else {
      setSelectdNearby((prev) => [
        ...prev,
        { ...nearby, far: "" }, // add `far`
      ]);
    }
  };

  const handleRestrictions = (index, value) => {
    const newRestrictions = [...restrictions];
    newRestrictions[index] = value;
    setRestrictions(newRestrictions);
  };

  const addRestrictions = () => {
    setRestrictions([...restrictions, ""]);
  };

  const removeRestrictions = (index) => {
    const newRestrictions = restrictions.filter((_, i) => i !== index);
    setRestrictions(newRestrictions);
  };

  const addRestaurant = () => {
    if (!restaurantName || !restaurantFar) return;

    const alreadyExists = selectedRestaurants.some(
      (r) => r.name.toLowerCase() === restaurantName.toLowerCase()
    );

    if (alreadyExists) return;

    setSelectedRestaurants((prev) => [
      ...prev,
      { name: restaurantName, far: restaurantFar, icon: "Hotel" },
    ]);

    setRestaurantName("");
    setRestaurantFar("");
  };

  const removeRestaurant = (name) => {
    setSelectedRestaurants((prev) => prev.filter((r) => r.name !== name));
  };

  // create  hostel

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      category.trim() === "" ||
      selectedImages.length === 0 ||
      ownerId.trim() === "" ||
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
    formData.append("googleMap", googleMap);
    formData.append("accommodationType", accommodationType);
    formData.append("price", price);

    formData.append("visitorsAllow", visitorsAllow);
    formData.append("fulltimeWarden", fulltimeWarden);
    formData.append("noticePeriod", noticePeriod);
    formData.append("gateOpenTime", gateOpenTime);
    formData.append("gateCloseTime", gateCloseTime);
    formData.append("additionalFee", additionalFee);
        formData.append("registrationFee", registrationFee);
    formData.append("refund",  refund);

    formData.append("gardianInfo[name]", gardianInfo.name);
    formData.append("gardianInfo[phone]", gardianInfo.phone);

    formData.append("location[street]", location.street);
    formData.append("location[place]", location.place);
    formData.append("location[pincode]", location.pincode);
    formData.append("superAdminId", superAdminId);
    selectedAmenities.forEach((a, i) => {
      if (a.name.trim() !== "") {
        formData.append(`amenities[${i}][name]`, a.name);
        formData.append(`amenities[${i}][icon]`, a.icon);
      }
    });
    selectedTransport.forEach((a, i) => {
      if (a.name.trim() !== "") {
        formData.append(`transportation[${i}][name]`, a.name);
        formData.append(`transportation[${i}][icon]`, a.icon);
        formData.append(`transportation[${i}][far]`, a.far);
      }
    });
    selectedNearby.forEach((a, i) => {
      if (a.name.trim() !== "") {
        formData.append(`nearbyPlaces[${i}][name]`, a.name);
        formData.append(`nearbyPlaces[${i}][icon]`, a.icon);
        formData.append(`nearbyPlaces[${i}][far]`, a.far);
      }
    });
    selectedRestaurants.forEach((a, i) => {
      if (a.name.trim() !== "") {
        formData.append(`restaurants[${i}][name]`, a.name);
        formData.append(`restaurants[${i}][icon]`, a.icon);
        formData.append(`restaurants[${i}][far]`, a.far);
      }
    });
    restrictions.forEach((a, i) => {
      if (a.trim() !== "") {
        formData.append(`restrictions[${i}]`, a);
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
        setOwnerId("");
        setName("");
        setPhone("");
        setSelectedImages([]);
        setSelectedAmenities([]);
        setSelectdTransport([]);
        setSelectedRestaurants([]);
        setSelectdNearby([]);
        setDescription("");
        setPrice("");
        setAccommodationType("");
        setGoogleMap("");
        setLocation({ street: "", place: "", pincode: "" });
        setVisitorAllow(false);
        setFulltimeWarden(false);
        setRegistrationFee("");
        setRefund(false);
        setNoticePeriod("");
        setGateOpenTime("");
        setGateCloseTime("");
        setAdditionalFee("");
        setGardianInfo({
          name: "",
          phone: "",
        });
        setRestrictions([""]);
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
  

  return (
    <div className="flex min-h-screen bg-gray-50 ">
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

                  <HostelPOST
                    isPosting={isPosting}
                    name={name}
                    phone={phone}
                    price={price}
                    accommodationType={accommodationType}
                    location={location}
                    description={description}
                    amenities={selectedAmenities}
                    transport={selectedTransport}
                    category={category}
                    owners={owners}
                    selectedImages={selectedImages}
                    setSelectedTransport={setSelectdTransport}
                    setName={setName}
                    setPhone={setPhone}
                    setPrice={setPrice}
                    setAccommodationType={setAccommodationType}
                    setLocation={setLocation}
                    setDescription={setDescription}
                    setCategory={setCategory}
                    ownerId={ownerId}
                    setOwnerId={setOwnerId}
                    setSelectedImages={setSelectedImages}
                    handleSubmit={handleSubmit}
                    onClose={() => setIsAddHostelOpen(false)}
                    toggleAmenity={toggleAmenity}
                    toggleTransport={toggleTransport}
                    addRestaurant={addRestaurant}
                    restaurantName={restaurantName}
                    setRestaurantName={setRestaurantName}
                    restaurantFar={restaurantFar}
                    setRestaurantFar={setRestaurantFar}
                    selectedRestaurants={selectedRestaurants}
                    setSelectedRestaurants={setSelectedRestaurants}
                    removeRestaurant={removeRestaurant}
                    toggleNearby={toggleNearby}
                    selectedNearby={selectedNearby}
                    setSelectdNearby={setSelectdNearby}
                    googleMap={googleMap}
                    setGoogleMap={setGoogleMap}
                    gardianInfo={gardianInfo}
                    setGardianInfo={setGardianInfo}
                    restrictions={restrictions}
                    handleRestrictions={handleRestrictions}
                    addRestrictions={addRestrictions}
                    removeRestrictions={removeRestrictions}
                    visitorsAllow={visitorsAllow}
                    setVisitorAllow={setVisitorAllow}
                    noticePeriod={noticePeriod}
                    setNoticePeriod={setNoticePeriod}
                    gateOpenTime={gateOpenTime}
                    setGateOpenTime={setGateOpenTime}
                    gateCloseTime={gateCloseTime}
                    setGateCloseTime={setGateCloseTime}
                    additionalFee={additionalFee}
                    setAdditionalFee={setAdditionalFee}
                    fulltimeWarden={fulltimeWarden}
                    setFulltimeWarden={setFulltimeWarden}
                       registrationFee={registrationFee}
                    setRegistrationFee={setRegistrationFee}
                    refund={refund}
                    setRefund={setRefund}
                  />
                </Dialog>

                <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Admin</DialogTitle>
                    </DialogHeader>
                    <HostelPUT
                      owners={owners}
                      hostel={selectedHostel}
                      onClose={() => setOpenEditDialog(false)}
                      onUpdated={refetch}
                      transport={selectedTransport}
                      selectedNearby={selectedNearby}
                      restaurantName={restaurantName}
                      restaurantFar={restaurantFar}
                      addRestaurant={addRestaurant}
                      selectedRestaurants={selectedRestaurants}
                      selectedAmenities={selectedAmenities}
                      toggleAmenity={toggleAmenity}
                      toggleTransport={toggleTransport}
                      toggleNearby={toggleNearby}
                      setRestaurantName={setRestaurantName}
                      setSelectdNearby={setSelectdNearby}
                      setSelectedTransport={setSelectdTransport}
                      setRestaurantFar={setRestaurantFar}
                      removeRestaurant={removeRestaurant}
                      selectedTransport={selectedTransport}
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
                              onChange={(e) =>
                                setSelectedStreet(e.target.value)
                              }
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
                              Transportation
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">
                              Restaurants
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">
                              Nearby
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
                            <th className="text-left py-3 px-4 font-medium text-gray-500 whitespace-nowrap min-w-[150px]">
                              Visitor Allowed
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 whitespace-nowrap min-w-[150px]">
                              Fulltime Warden
                            </th>

                            <th className="text-left py-3 px-4 font-medium text-gray-500 whitespace-nowrap min-w-[150px]">
                              Notice Period
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 whitespace-nowrap min-w-[150px]">
                              Open TM
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 whitespace-nowrap min-w-[150px]">
                              Close TM
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 whitespace-nowrap min-w-[150px]">
                              Caution Deposit
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 whitespace-nowrap min-w-[150px]">
                              Registration Fee
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 whitespace-nowrap min-w-[150px]">
                              Refund
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 whitespace-nowrap min-w-[150px]">
                              Gardian Name
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 whitespace-nowrap min-w-[150px]">
                              Gardian Phone
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">
                              Restrictions
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
                                        `/admin/hostels/rooms/${hostel._id}`
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

                              <td className="py-3 px-4">
                                {hostel?.amenities?.length > 0 &&
                                  (() => {
                                    const a = hostel.amenities[0];
                                    const Icon = iconMap[a.icon];
                                    return (
                                      <div className="flex items-center gap-2">
                                        <span
                                          onClick={() => {
                                            setShow(true);
                                            setSelectedData({
                                              name: "Amenties",
                                              data: hostel.amenities,
                                            });
                                          }}
                                          className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm cursor-pointer"
                                        >
                                          {Icon && <Icon className="w-4 h-4" />}
                                          {a.name}
                                        </span>

                                        {/* Show +X if more amenities exist */}
                                        {hostel.amenities.length > 1 && (
                                          <span className="text-gray-500 text-sm">
                                            +{hostel.amenities.length - 1}
                                          </span>
                                        )}
                                      </div>
                                    );
                                  })()}
                              </td>

                              <td className="py-3 px-4">
                                {hostel?.transportation?.length > 0 &&
                                  (() => {
                                    const a = hostel.transportation[0];
                                    const Icon = transportMap[a.icon];

                                    return (
                                      <div className="flex items-center gap-2">
                                        <span
                                          onClick={() => {
                                            setShow(true);
                                            setSelectedData({
                                              name: "Transportation",
                                              data: hostel?.transportation,
                                            });
                                          }}
                                          className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm cursor-pointer"
                                        >
                                          {Icon && <Icon className="w-4 h-4" />}
                                          {a.name}
                                        </span>

                                        {/* Show +X if more amenities exist */}
                                        {hostel.transportation?.length > 1 && (
                                          <span className="text-gray-500 text-sm">
                                            +{hostel.transportation?.length - 1}
                                          </span>
                                        )}
                                      </div>
                                    ); // first amenity
                                  })()}
                              </td>

                              <td className="py-3 px-4">
                                {hostel?.restaurants?.length > 0 &&
                                  (() => {
                                    const a = hostel.restaurants[0];

                                    return (
                                      <div className="flex items-center gap-2">
                                        <span
                                          onClick={() => {
                                            setShow(true);
                                            setSelectedData({
                                              name: "Restaurants",
                                              data: hostel?.restaurants,
                                            });
                                          }}
                                          className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm cursor-pointer"
                                        >
                                          <Hotel className="w-4 h-4" />
                                          {a.name}
                                        </span>

                                        {/* Show +X if more amenities exist */}
                                        {hostel.restaurants?.length > 1 && (
                                          <span className="text-gray-500 text-sm">
                                            +{hostel.restaurants?.length - 1}
                                          </span>
                                        )}
                                      </div>
                                    );
                                  })()}
                              </td>

                              <td className="py-3 px-4">
                                {hostel?.nearbyPlaces?.length > 0 &&
                                  (() => {
                                    const a = hostel.nearbyPlaces[0];
                                    const Icon = nearbyMap[a.icon];

                                    return (
                                      <div className="flex items-center gap-2">
                                        <span
                                          onClick={() => {
                                            setShow(true);
                                            setSelectedData({
                                              name: "Nearby",
                                              data: hostel?.nearbyPlaces,
                                            });
                                          }}
                                          className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm cursor-pointer"
                                        >
                                          {Icon && <Icon className="w-4 h-4" />}
                                          {a.name}
                                        </span>

                                        {/* Show +X if more amenities exist */}
                                        {hostel.nearbyPlaces?.length > 1 && (
                                          <span className="text-gray-500 text-sm">
                                            +{hostel.nearbyPlaces?.length - 1}
                                          </span>
                                        )}
                                      </div>
                                    );
                                  })()}
                              </td>

                              <td className="py-3 px-4">
                                {hostel?.accommodationType}
                              </td>
                              <td className="py-3 px-4">{hostel?.price}</td>

                              <td className="py-3 px-4">{hostel?.category}</td>
                              <td className="py-3 px-4">
                                {hostel?.visitorsAllow == true
                                  ? "true"
                                  : "false"}
                              </td>
                              <td className="py-3 px-4">
                                {hostel?.fulltimeWarden == true
                                  ? "true"
                                  : "false"}
                              </td>
                              <td className="py-3 px-4">
                                {hostel?.noticePeriod}
                              </td>
                              <td className="py-3 px-4">
                                {hostel?.gateOpenTime} AM
                              </td>
                              <td className="py-3 px-4">
                                {hostel?.gateCloseTime} PM
                              </td>
                              <td className="py-3 px-4">
                                {hostel?.additionalFee}
                              </td>
                              <td className="py-3 px-4">
                                {hostel?.registrationFee}
                              </td>
                              <td className="py-3 px-4">
                                {hostel?.refund == true ? "true" : "false"}
                              </td>
                              <td className="py-3 px-4">
                                {hostel?.gardianInfo?.name}
                              </td>
                              <td className="py-3 px-4">
                                {hostel?.gardianInfo?.phone}
                              </td>
                              <td className="py-3 px-4">
                                {hostel?.restrictions[0]} {}{" "}
                              </td>

                              <td className="py-3 px-4">
                                {hostel?.restrictions?.length > 0 &&
                                  (() => {
                                    const a = hostel?.restrictions[0];

                                    return (
                                      <div className="flex items-center gap-2">
                                        <span
                                          onClick={() => {
                                            setShow(true);
                                            setSelectedData({
                                              name: "Restriction",
                                              data: hostel?.restrictions,
                                            });
                                          }}
                                          className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm cursor-pointer"
                                        >
                                          {a}
                                        </span>

                                        {/* Show +X if more amenities exist */}
                                        {hostel?.restrictions?.length > 1 && (
                                          <span className="text-gray-500 text-sm">
                                            +{hostel?.restrictions?.length - 1}
                                          </span>
                                        )}
                                      </div>
                                    );
                                  })()}
                              </td>

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
