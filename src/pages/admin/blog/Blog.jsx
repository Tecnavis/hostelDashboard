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
import { AdminPOST, AdminPUT } from "./BlogAU";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAddNewblogMutation, useDeleteblogMutation, useGetAllblogQuery } from "@/app/service/blog";

export default function Blogs() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

  const  [ sections, setSections] = useState([
    {
      heading: "",
      apartment: "",
      house: "",
      winner: "" 
    }
  ]);
    const [selectedImages, setSelectedImages] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const admin = JSON.parse(localStorage.getItem("admin"));

  const { data, isError, isLoading, refetch } =    useGetAllblogQuery();
  const [deleteblog, { isLoading: isDeleting }] =  useDeleteblogMutation();
  const [blockblog] =   useBlockblogMutation();
  const [addNewblog, { isLoading: isPosting }] =  useAddNewblogMutation();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !Array.isArray(data)) return <h1>Oops! Something went wrong.</h1>;

  const filteredUsers = data
    .filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    )
    .filter((blog) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "active") return blog.isActive;
      if (statusFilter === "inactive") return !blog.isActive;
      return true;
    });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !data || !sections) return;
        selectedImages.forEach((file) => {
      formData.append("images", file);
    });
    try {
      const { status } = await addNewblog({
        title,
        description,
        date,
        sections,
        superAdminId: admin?.adminDetails?._id,
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
      const { status } = await deleteblog(id).unwrap();
      if (status === 200) refetch();
    } catch (error) {
      console.error("Failed to delete admin:", error);
    }
  };

  const handleBlocUnblock = async (id) => {
    try {
      const { status } = await blockblog(id).unwrap();
      if (status === 200) refetch();
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
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Manage Blogs</h1>
              <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2 bg-rose-600 hover:bg-rose-700">
                    <Plus className="h-4 w-4" /> Add Blog
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Blog</DialogTitle>
                  </DialogHeader>
                  <AdminPOST
                    isPosting={isPosting}
                    title={title}
                    description={description}
                    sections={sections}
                    date={date}
                    selectedImages = {selectedAdmin} setSelectedImages = {setSelectedImages}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    setDate={setDate}
                    setSections={setSections}
                    handleSubmit={handleSubmit}
                  />
                </DialogContent>
              </Dialog>

              <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Blog</DialogTitle>
                  </DialogHeader>
                  <AdminPUT
                    admin={selectedAdmin}
                    onClose={() => setOpenEditDialog(false)}
                    onUpdated={refetch}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>All Blogs</CardTitle>
                      <CardDescription>Manage and monitor all Blogs</CardDescription>
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
                      <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
                        <Filter className="h-4 w-4" /> Filter
                        <ChevronDown className="h-3 w-3 opacity-50" />
                      </Button>
                      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
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
                          <th className="text-left py-3 px-4">Title</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-left py-3 px-4">Description</th>
                          <th className="text-left py-3 px-4">Features</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedUsers.map((blog) => (
                          <tr key={blog._id} className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                  <Building className="h-5 w-5 text-gray-500" />
                                </div>
                                <span className="font-medium">{blog.title}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{blog.date}</td>
                            <td className="py-3 px-4">{blog.description}</td>
                            <td className="py-3 px-4">{blog.sections}</td>
                            <td className="py-3 px-4">
                              <Badge variant={admin.isActive ? "success" : "secondary"}>
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
                                  <DropdownMenuItem onClick={() => handleBlocUnblock(blog._id)}>
                                    {admin.isActive ? (
                                      <>
                                        <UserX className="h-4 w-4 mr-2" /> Block
                                      </>
                                    ) : (
                                      <>
                                        <UserCheck className="h-4 w-4 mr-2 text-green-600" /> Unblock
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
                                  <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(admin._id)}>
                                    <Trash2 className="h-4 w-4 mr-2" /> {isDeleting ? "Deleting..." : "Delete"}
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
                        Showing <span className="font-medium">{startIndex + 1}</span> to {" "}
                        <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredUsers.length)}</span> of {" "}
                        <span className="font-medium">{filteredUsers.length}</span> admins
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
          </div>
        </main>
      </div>
    </div>
  );
}
