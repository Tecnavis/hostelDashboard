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
  useAddNewownerMutation,
  useBlockownerMutation,
  useDeleteownerMutation,
  useGetAllownerStaffQuery,
} from "@/app/service/owner";
import { useParams } from "react-router-dom";
import { OwnerStaffPOST, StaffPUT } from "./OwnerStaffAU";
import { TableSkeleton } from "@/common/TableSkeleton";

export default function AdminOwnersStaffs() {
  const [isAddOwnerOpen, setIsAddOwnerOpen] = useState(false);

  const [isAddHostelOpen, setIsAddHostelOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { id } = useParams();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const admin = JSON.parse(localStorage.getItem("admin"));

  const superAdminId =
    admin?.adminDetails?.role == "admin"
      ? admin?.adminDetails?.superAdminId
      : admin?.adminDetails?._id;

  const { data, isError, isLoading, refetch } = useGetAllownerStaffQuery(id);
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteownerMutation();
  const [blockAdmin] = useBlockownerMutation();
  const [addNewAdmin, { isLoading: isPosting }] = useAddNewownerMutation();

  // searching

  const filteredUsers = data
    ?.filter(
      (staff) =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.phone.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.filter((owner) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "active") return owner.isActive;
      if (statusFilter === "inactive") return !owner.isActive;
      return true;
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      name.trim() === "" ||
      phone.trim() === ""
    )
      return;

    try {
      const { status } = await addNewAdmin({
        email,
        password,
        name,
        phone,
        role: "staff",
        ownerId: id,
        superAdminId,
      }).unwrap();

      if (status === 201) {
        setEmail("");
        setPassword("");
        setName("");
        setPhone("");
        setIsAddHostelOpen(false);
        refetch();
      }
    } catch (error) {
      console.error("Staff create failed:", error);
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
      console.error("Failed to delete staff:", error);
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
      console.error("Failed to block staff:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="admin" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mt-10">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                Manage Owner Staffs
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
                      Add owner Staff
                    </Button>
                  </DialogTrigger>
                  <OwnerStaffPOST
                    isPosting={isPosting}
                    name={name}
                    email={email}
                    password={password}
                    phone={phone}
                    setName={setName}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    setPhone={setPhone}
                    handleSubmit={handleSubmit}
                  />
                </Dialog>

                <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Staff</DialogTitle>
                    </DialogHeader>
                    <StaffPUT
                      staff={selectedStaff}
                      onClose={() => setOpenEditDialog(false)}
                      onUpdated={refetch}
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
                        <CardTitle>All Owner Staffs</CardTitle>
                        <CardDescription>
                          Manage and monitor all registered owner Staffs
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
                              Name
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">
                              Email
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">
                              Phone
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
                                  <span className="font-medium cursor-pointer">
                                    {owner?.name}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4">{owner?.email}</td>
                              <td className="py-3 px-4">{owner?.phone}</td>
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
                                      onClick={() =>
                                        handleBlocUnblock(owner._id)
                                      }
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
                                      onClick={() => {
                                        setSelectedStaff(owner);
                                        setOpenEditDialog(true);
                                      }}
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
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
