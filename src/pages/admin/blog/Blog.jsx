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
import { BlogPUT, BlogPOST, ShowImagesIcon } from "./BlogAU";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  useAddNewblogMutation,
  useBlockblogMutation,
  useDeleteblogMutation,
  useGetAllblogQuery,
} from "@/app/service/blog";
import { useGetAllownerQuery } from "@/app/service/owner";
import { TableSkeleton } from "@/common/TableSkeleton";

export default function Blogs() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [sections, setSections] = useState([
    {
      heading: "",
      apartment: "",
      house: "",
      winner: "",
    },
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [ownerId, setOwnerId] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const admin = JSON.parse(localStorage.getItem("admin"));

  const { data, isError, isLoading, refetch } = useGetAllblogQuery();
  const [deleteblog, { isLoading: isDeleting }] = useDeleteblogMutation();
  const [blockblog] = useBlockblogMutation();
  const { data: owners = [] } = useGetAllownerQuery();
  const [addNewblog, { isLoading: isPosting }] = useAddNewblogMutation();

  const filteredUsers = data
    ?.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.sections.some((section) =>
          section.heading.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        blog.sections.some((section) =>
          section.apartment.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        blog.sections.some((section) =>
          section.house.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        blog.sections.some((section) =>
          section.winner.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        blog.ownerId.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((blog) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "active") return blog.isActive;
      if (statusFilter === "inactive") return !blog.isActive;
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
    if (!title || !description || !data || !sections) return;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("description", description);
    formData.append("sections", JSON.stringify(sections));
    formData.append("ownerId", ownerId);

    selectedImages.forEach((file) => {
      formData.append("images", file);
    });
    try {
      const { status } = await addNewblog(formData).unwrap();
      if (status === 201) {
        setTitle("");
        setDate("");
        setDescription("");
        setSections([
          {
            heading: "",
            apartment: "",
            house: "",
            winner: "",
          },
        ]);
        setSelectedImages([]);
        setOpenAddDialog(false);
        refetch();
      }
    } catch (error) {
      console.error("Blog create failed:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { status } = await deleteblog(id).unwrap();
      if (status === 200) refetch();
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  const handleBlocUnblock = async (id) => {
    try {
      const { status } = await blockblog(id).unwrap();
      if (status === 200) refetch();
    } catch (error) {
      console.error("Failed to block blog:", error);
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
                Manage Blogs
              </h1>
              <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="gap-2 bg-rose-600 hover:bg-rose-700"
                  >
                    <Plus className="h-4 w-4" /> Add Blog
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Blog</DialogTitle>
                  </DialogHeader>
                  <BlogPOST
                    isPosting={isPosting}
                    title={title}
                    description={description}
                    sections={sections}
                    date={date}
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    setDate={setDate}
                    setSections={setSections}
                    handleSubmit={handleSubmit}
                    owners={owners}
                    setOwnerId={setOwnerId}
                    ownerId={ownerId}
                    onClose={() => setOpenAddDialog(false)}
                  />
                </DialogContent>
              </Dialog>

              <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Blog</DialogTitle>
                  </DialogHeader>
                  <BlogPUT
                    blog={selectedBlog}
                    owners={owners}
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
                    images={selectedBlog?.photos}
                    onClose={() => setOpen(false)}
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
                        <CardTitle>All Blogs</CardTitle>
                        <CardDescription>
                          Manage and monitor all Blogs
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
                            <th className="text-left py-3 px-4">Title</th>
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Owner</th>
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
                                    <Building
                                      className="h-5 w-5 text-gray-500 cursor-pointer"
                                      onClick={() => {
                                        setOpen(true);
                                        setSelectedBlog(blog);
                                      }}
                                    />{" "}
                                  </div>
                                  <span className="font-medium">
                                    {blog.title}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                {new Date(blog.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </td>
                              <td className="py-3 px-4">
                                {blog?.ownerId?.name}
                              </td>
                              <td className="py-3 px-4">{blog.description}</td>
                              <td className="py-3 px-4">
                                {blog.sections?.map((section, index) => (
                                  <div key={index} className="mb-2">
                                    <p>
                                      <strong>Heading:</strong>{" "}
                                      {section.heading}
                                    </p>
                                    <p>
                                      <strong>Apartment:</strong>{" "}
                                      {section.apartment}
                                    </p>
                                    <p>
                                      <strong>House:</strong> {section.house}
                                    </p>
                                    <p>
                                      <strong>Winner:</strong> {section.winner}
                                    </p>
                                    <hr className="my-1" />
                                  </div>
                                ))}
                              </td>
                              <td className="py-3 px-4">
                                <Badge
                                  variant={
                                    admin?.isActive ? "success" : "secondary"
                                  }
                                >
                                  {admin?.isActive ? "Active" : "Inactive"}
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
                                        handleBlocUnblock(blog._id)
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
                                        setSelectedBlog(blog);
                                        setOpenEditDialog(true);
                                      }}
                                    >
                                      <Pencil className="h-4 w-4 mr-2" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() => handleDelete(blog._id)}
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
