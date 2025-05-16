"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  Filter,
  Mail,
  MoreHorizontal,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
  UserCheck,
  UserX,
  X,
} from "lucide-react";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAddNewownerMutation,
  useBlockownerMutation,
  useDeleteownerMutation,
  useGetAllownerQuery,
} from "@/app/service/owner";
import { useNavigate } from "react-router-dom";

export default function AdminOwners() {
  const [isAddOwnerOpen, setIsAddOwnerOpen] = useState(false);

  const [isAddHostelOpen, setIsAddHostelOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showPassword, setShowPassword] = useState(false);
  const [ownerName, setOwnerName] = useState("");
  const [hostelName, setHostelName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [hostelPhone, setHostelPhone] = useState("");
  const [location, setLocation] = useState({
    street: "",
    place: "",
    pincode: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const { data, isError, isLoading, refetch } = useGetAllownerQuery();
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteownerMutation();
  const [blockAdmin] = useBlockownerMutation();
  const [addNewAdmin, { isLoading: isPosting }] = useAddNewownerMutation();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !Array.isArray(data))
    return <h1>Oops! Something went wrong.</h1>;

  // searching

  const filteredUsers = data
    ?.filter(
      (owner) =>
        owner.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.ownerPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.hostelPhone.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.filter((owner) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "active") return owner.isActive;
      if (statusFilter === "inactive") return !owner.isActive;
      return true;
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      hostelName.trim() === "" ||
      ownerName.trim() === "" ||
      hostelPhone.trim() === "" ||
      ownerPhone.trim() === "" ||
      location.street.trim() === "" ||
      location.place.trim() === "" ||
      location.pincode.trim() === ""
    )
      return;

    try {
      const { status } = await addNewAdmin({
        email,
        password,
        hostelName,
        ownerName,
        hostelPhone,
        ownerPhone,
        role: "owner",
        location, // ⬅️ added here
      }).unwrap();

      if (status === 201) {
        setEmail("");
        setPassword("");
        setOwnerName("");
        setHostelName("");
        setOwnerPhone("");
        setHostelPhone("");
        setLocation({ street: "", place: "", pincode: "" });
        setIsAddHostelOpen(false);
        refetch();
      }
    } catch (error) {
      console.error("Admin create failed:", error);
    }
  };

  // delete admin

  const handleDelete = async (id) => {
    try {
      const { status } = await deleteAdmin(id).unwrap();
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
      const { status } = await blockAdmin(id).unwrap();
      if (status === 200) {
        refetch();
      }
    } catch (error) {
      console.error("Failed to block admin:", error);
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
                Manage Owners
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
                      Add owner
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New Owner</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="owner-name">Owner Name</Label>
                          <Input
                            id="owner-name"
                            placeholder="Enter admin name"
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hostel-name">Hostel Name</Label>
                          <Input
                            id="hostel-name"
                            placeholder="Enter admin email"
                            value={hostelName}
                            onChange={(e) => setHostelName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            placeholder="Enter admin email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>

                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground cursor-pointer" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground cursor-pointer" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="owner-phone">Owner Phone</Label>
                          <Input
                            id="owner-phone"
                            placeholder="+91 0000000"
                            value={ownerPhone}
                            onChange={(e) => setOwnerPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hostel-phone">Hostel Phone</Label>
                          <Input
                            id="hostel-phone"
                            placeholder="+91 0000000"
                            value={hostelPhone}
                            onChange={(e) => setHostelPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="street">Street</Label>
                          <Input
                            id="street"
                            placeholder="Enter street"
                            value={location.street}
                            onChange={(e) =>
                              setLocation({
                                ...location,
                                street: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="place">Place</Label>
                          <Input
                            id="place"
                            placeholder="Enter place"
                            value={location.place}
                            onChange={(e) =>
                              setLocation({
                                ...location,
                                place: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pincode">Pincode</Label>
                          <Input
                            id="pincode"
                            placeholder="Enter pincode"
                            value={location.pincode}
                            onChange={(e) =>
                              setLocation({
                                ...location,
                                pincode: e.target.value,
                              })
                            }
                          />
                        </div>
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
                      <CardTitle>All Owners</CardTitle>
                      <CardDescription>
                        Manage and monitor all registered owners
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
                            Owner Name
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Hostel Name
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Email
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Owner Phone
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Hostel Phone
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Location
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Pin Code
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Role
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
                        {paginatedUsers?.map((owner) => (
                          <tr key={owner._id} className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                  <Building className="h-5 w-5 text-gray-500" />
                                </div>
                                <span
                                  className="font-medium cursor-pointer"
                                  onClick={() =>
                                    navigate(`/admin/owners/${owner._id}`)
                                  }
                                >
                                  {owner?.ownerName}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{owner?.hostelName}</td>
                            <td className="py-3 px-4">{owner?.email}</td>
                            <td className="py-3 px-4">{owner?.ownerPhone}</td>
                            <td className="py-3 px-4">{owner?.hostelPhone}</td>
                            <td className="py-3 px-4">
                              {owner?.location?.place}
                            </td>
                            <td className="py-3 px-4">
                              {owner?.location?.pincode}
                            </td>

                            <td className="py-3 px-4">{owner?.role}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant={
                                  owner?.isActive ? "success" : "secondary"
                                }
                              >
                                {owner?.isActive ? "Active" : "Inactive"}
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
                                    onClick={() => handleBlocUnblock(owner._id)}
                                  >
                                    {owner?.isActive ? (
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
                                    onClick={() => handleDelete(owner?._id)}
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
                        owners
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

            {/* <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Manage Hostel Owners</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Dialog open={isAddOwnerOpen} onOpenChange={setIsAddOwnerOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-rose-600 hover:bg-rose-700 gap-2">
                      <Plus className="h-4 w-4" />
                      Add Owner
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New Hostel Owner</DialogTitle>
                      <DialogDescription>Create a new hostel owner account.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" placeholder="Enter first name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" placeholder="Enter last name" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="owner@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="+1 (555) 123-4567" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select defaultValue="active">
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending Verification</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddOwnerOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-rose-600 hover:bg-rose-700" onClick={() => setIsAddOwnerOpen(false)}>
                        Create Owner
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div> */}

            {/* <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>All Hostel Owners</CardTitle>
                      <CardDescription>Manage all registered hostel owners</CardDescription>
                    </div>
                    <Tabs defaultValue="all" className="w-[400px]">
                      <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="inactive">Inactive</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search owners..." className="pl-8" />
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
                          <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                          <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                          <SelectItem value="hostels-high">Most Hostels</SelectItem>
                          <SelectItem value="hostels-low">Least Hostels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Owner</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Phone</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Hostels</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Joined</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "John Smith",
                            email: "john.smith@example.com",
                            phone: "+1 (555) 123-4567",
                            hostels: 3,
                            joined: "Jan 15, 2025",
                            status: "Active",
                            avatar: "/placeholder.svg?height=40&width=40",
                          },
                          {
                            name: "Lisa Chen",
                            email: "lisa.chen@example.com",
                            phone: "+1 (555) 234-5678",
                            hostels: 2,
                            joined: "Feb 3, 2025",
                            status: "Active",
                            avatar: "/placeholder.svg?height=40&width=40",
                          },
                          {
                            name: "Robert Johnson",
                            email: "robert.johnson@example.com",
                            phone: "+1 (555) 345-6789",
                            hostels: 2,
                            joined: "Feb 10, 2025",
                            status: "Active",
                            avatar: "/placeholder.svg?height=40&width=40",
                          },
                          {
                            name: "James Wilson",
                            email: "james.wilson@example.com",
                            phone: "+1 (555) 456-7890",
                            hostels: 2,
                            joined: "Mar 5, 2025",
                            status: "Pending",
                            avatar: "/placeholder.svg?height=40&width=40",
                          },
                          {
                            name: "Maria Garcia",
                            email: "maria.garcia@example.com",
                            phone: "+1 (555) 567-8901",
                            hostels: 1,
                            joined: "Mar 12, 2025",
                            status: "Pending",
                            avatar: "/placeholder.svg?height=40&width=40",
                          },
                          {
                            name: "David Lee",
                            email: "david.lee@example.com",
                            phone: "+1 (555) 678-9012",
                            hostels: 1,
                            joined: "Mar 20, 2025",
                            status: "Inactive",
                            avatar: "/placeholder.svg?height=40&width=40",
                          },
                          {
                            name: "Sarah Wilson",
                            email: "sarah.wilson@example.com",
                            phone: "+1 (555) 789-0123",
                            hostels: 1,
                            joined: "Apr 2, 2025",
                            status: "Active",
                            avatar: "/placeholder.svg?height=40&width=40",
                          },
                          {
                            name: "Michael Brown",
                            email: "michael.brown@example.com",
                            phone: "+1 (555) 890-1234",
                            hostels: 1,
                            joined: "Apr 15, 2025",
                            status: "Active",
                            avatar: "/placeholder.svg?height=40&width=40",
                          },
                        ].map((owner, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={owner.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{owner.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-400" />
                                {owner.email}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-400" />
                                {owner.phone}
                              </div>
                            </td>
                            <td className="py-3 px-4">{owner.hostels}</td>
                            <td className="py-3 px-4">{owner.joined}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant={
                                  owner.status === "Active"
                                    ? "success"
                                    : owner.status === "Pending"
                                      ? "outline"
                                      : "destructive"
                                }
                              >
                                {owner.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                  <DropdownMenuItem>View Hostels</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Account
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-500">Showing 8 of 24 owners</div>
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
            </motion.div> */}

            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Verification Requests</CardTitle>
                  <CardDescription>Pending owner verification requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "James Wilson",
                        email: "james.wilson@example.com",
                        date: "Mar 5, 2025",
                        avatar: "/placeholder.svg?height=40&width=40",
                      },
                      {
                        name: "Maria Garcia",
                        email: "maria.garcia@example.com",
                        date: "Mar 12, 2025",
                        avatar: "/placeholder.svg?height=40&width=40",
                      },
                      {
                        name: "Thomas Anderson",
                        email: "thomas.anderson@example.com",
                        date: "Apr 18, 2025",
                        avatar: "/placeholder.svg?height=40&width=40",
                      },
                    ].map((request, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={request.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{request.name}</div>
                            <div className="text-sm text-gray-500">{request.email}</div>
                            <div className="text-xs text-gray-400">Requested: {request.date}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="outline" className="h-8 w-8 text-green-600">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="outline" className="h-8 w-8 text-red-600">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Top Hostel Owners</CardTitle>
                  <CardDescription>Owners with the most hostels and bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Owner</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Hostels</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Total Rooms</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Bookings (Monthly)</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Revenue</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "John Smith",
                            hostels: 3,
                            rooms: 42,
                            bookings: 156,
                            revenue: "$12,450",
                            rating: 4.8,
                            avatar: "/placeholder.svg?height=40&width=40",
                          },
                          {
                            name: "Lisa Chen",
                            hostels: 2,
                            rooms: 32,
                            bookings: 124,
                            revenue: "$9,870",
                            rating: 4.7,
                            avatar: "/placeholder.svg?height=40&width=40",
                          },
                          {
                            name: "Robert Johnson",
                            hostels: 2,
                            rooms: 35,
                            bookings: 118,
                            revenue: "$8,950",
                            rating: 4.6,
                            avatar: "/placeholder.svg?height=40&width=40",
                          },
                          {
                            name: "Sarah Wilson",
                            hostels: 1,
                            rooms: 24,
                            bookings: 92,
                            revenue: "$7,340",
                            rating: 4.9,
                            avatar: "/placeholder.svg?height=40&width=40",
                          },
                        ].map((owner, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={owner.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{owner.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{owner.hostels}</td>
                            <td className="py-3 px-4">{owner.rooms}</td>
                            <td className="py-3 px-4">{owner.bookings}</td>
                            <td className="py-3 px-4 font-medium">{owner.revenue}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <span className="text-amber-500 mr-1">★</span>
                                <span>{owner.rating}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div> */}
          </div>
        </main>
      </div>
    </div>
  );
}
