// AdminAdmins.tsx
"use client";

import { motion } from "framer-motion";
import {
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
  useAddNewAdminMutation,
  useBlockAdminMutation,
  useDeleteAdminMutation,
  useGetAllAdminQuery,
} from "@/app/service/admin";
import { AdminPOST, AdminPUT } from "./AdminAU";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TableSkeleton } from "@/common/TableSkeleton";

export default function AdminAdmins() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const admin = JSON.parse(localStorage.getItem("admin"));

  const { data, isError, isLoading, refetch } = useGetAllAdminQuery(
    admin?.adminDetails?._id
  );
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();
  const [blockAdmin] = useBlockAdminMutation();
  const [addNewAdmin, { isLoading: isPosting }] = useAddNewAdminMutation();


  const filteredUsers = data?.filter(
      (admin) =>
        admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.phone.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((admin) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "active") return admin.isActive;
      if (statusFilter === "inactive") return !admin.isActive;
      return true;
    });

  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !phone || !name) return;
    try {
      const { status } = await addNewAdmin({
        email,
        password,
        name,
        phone,
        superAdminId: admin?.adminDetails?._id,
        role: "admin",
      }).unwrap();
      if (status === 201) {
        setEmail("");
        setPassword("");
        setName("");
        setPhone("");
        setOpenAddDialog(false);
        refetch();
      }
    } catch (error) {
      console.error("Admin create failed:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { status } = await deleteAdmin(id).unwrap();
      if (status === 200) refetch();
    } catch (error) {
      console.error("Failed to delete admin:", error);
    }
  };

  const handleBlocUnblock = async (id) => {
    try {
      const { status } = await blockAdmin(id).unwrap();
      if (status === 200) refetch();
    } catch (error) {
      console.error("Failed to block admin:", error);
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
                Manage Admins
              </h1>
              <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="gap-2 bg-rose-600 hover:bg-rose-700 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Add Admin
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Admin</DialogTitle>
                  </DialogHeader>
                  <AdminPOST
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
                    onClose={() => setOpenAddDialog(false)}
                  />
                </DialogContent>
              </Dialog>

              <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Admin</DialogTitle>
                  </DialogHeader>
                  <AdminPUT
                    admin={selectedAdmin}
                    onClose={() => setOpenEditDialog(false)}
                    onUpdated={refetch}
                  />
                </DialogContent>
              </Dialog>
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
                        <CardTitle>All Admins</CardTitle>
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
                          placeholder="Search admins..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 w-full sm:w-auto"
                        >
                          <Filter className="h-4 w-4" /> Filter
                          <ChevronDown className="h-3 w-3 opacity-50" />
                        </Button>
                        <Tabs
                          value={statusFilter}
                          onValueChange={setStatusFilter}
                        >
                          <TabsList className="w-full sm:w-auto">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="active">Active</TabsTrigger>
                            <TabsTrigger value="inactive">Inactive</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Name</th>
                            <th className="text-left py-3 px-4">Email</th>
                            <th className="text-left py-3 px-4">Phone</th>
                            <th className="text-left py-3 px-4">Role</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedUsers.map((admin) => (
                            <tr key={admin._id} className="border-b">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                    <Building className="h-5 w-5 text-gray-500" />
                                  </div>
                                  <span className="font-medium">
                                    {admin.name}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4">{admin.email}</td>
                              <td className="py-3 px-4">{admin.phone}</td>
                              <td className="py-3 px-4">{admin.role}</td>
                              <td className="py-3 px-4">
                                <Badge
                                  variant={
                                    admin.isActive ? "success" : "secondary"
                                  }
                                >
                                  {admin.isActive ? "Active" : "Inactive"}
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
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleBlocUnblock(admin._id)
                                      }
                                    >
                                      {admin.isActive ? (
                                        <>
                                          <UserX className="h-4 w-4 mr-2" />{" "}
                                          Block
                                        </>
                                      ) : (
                                        <>
                                          <UserCheck className="h-4 w-4 mr-2 text-green-600" />{" "}
                                          Unblock
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedAdmin(admin);
                                        setOpenEditDialog(true);
                                      }}
                                    >
                                      <Pencil className="h-4 w-4 mr-2" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() => handleDelete(admin._id)}
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />{" "}
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
