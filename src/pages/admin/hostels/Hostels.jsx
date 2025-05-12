"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Building, ChevronDown, Download, Filter, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

import { Sidebar } from "@/components/Sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function AdminHostels() {
  const [isAddHostelOpen, setIsAddHostelOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Manage Hostels</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Dialog open={isAddHostelOpen} onOpenChange={setIsAddHostelOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-rose-600 hover:bg-rose-700 gap-2">
                      <Plus className="h-4 w-4" />
                      Add Hostel
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New Hostel</DialogTitle>
                      <DialogDescription>Create a new hostel and assign it to an owner.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="hostel-name">Hostel Name</Label>
                          <Input id="hostel-name" placeholder="Enter hostel name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="owner">Assign Owner</Label>
                          <Select>
                            <SelectTrigger id="owner">
                              <SelectValue placeholder="Select owner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="john">John Smith</SelectItem>
                              <SelectItem value="lisa">Lisa Chen</SelectItem>
                              <SelectItem value="robert">Robert Johnson</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" placeholder="City, State" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select defaultValue="active">
                            <SelectTrigger id="status">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="pending">Pending Approval</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Enter hostel description" />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="rooms">Total Rooms</Label>
                          <Input id="rooms" type="number" min="1" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price-min">Min Price ($)</Label>
                          <Input id="price-min" type="number" min="0" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price-max">Max Price ($)</Label>
                          <Input id="price-max" type="number" min="0" placeholder="0" />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddHostelOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-rose-600 hover:bg-rose-700" onClick={() => setIsAddHostelOpen(false)}>
                        Create Hostel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>All Hostels</CardTitle>
                      <CardDescription>Manage and monitor all registered hostels</CardDescription>
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
                      <Input placeholder="Search hostels..." className="pl-8" />
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
                          <SelectItem value="rooms-high">Most Rooms</SelectItem>
                          <SelectItem value="rooms-low">Least Rooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Hostel Name</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Owner</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Location</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Rooms</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Price Range</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "Sunset Beach Hostel",
                            owner: "John Smith",
                            location: "Miami, FL",
                            rooms: 18,
                            priceRange: "$30-$120",
                            status: "Active",
                          },
                          {
                            name: "Downtown Backpackers",
                            owner: "Lisa Chen",
                            location: "New York, NY",
                            rooms: 24,
                            priceRange: "$25-$90",
                            status: "Active",
                          },
                          {
                            name: "Mountain View Lodge",
                            owner: "Robert Johnson",
                            location: "Denver, CO",
                            rooms: 15,
                            priceRange: "$35-$110",
                            status: "Active",
                          },
                          {
                            name: "Riverside Hostel",
                            owner: "James Wilson",
                            location: "San Francisco, CA",
                            rooms: 12,
                            priceRange: "$40-$150",
                            status: "Pending",
                          },
                          {
                            name: "Golden Gate Inn",
                            owner: "Lisa Chen",
                            location: "San Francisco, CA",
                            rooms: 8,
                            priceRange: "$45-$130",
                            status: "Pending",
                          },
                          {
                            name: "Traveler's Rest",
                            owner: "Robert Johnson",
                            location: "Los Angeles, CA",
                            rooms: 20,
                            priceRange: "$30-$100",
                            status: "Inactive",
                          },
                          {
                            name: "City Central",
                            owner: "John Smith",
                            location: "Chicago, IL",
                            rooms: 16,
                            priceRange: "$28-$95",
                            status: "Active",
                          },
                          {
                            name: "Beachside Inn",
                            owner: "James Wilson",
                            location: "San Diego, CA",
                            rooms: 14,
                            priceRange: "$32-$115",
                            status: "Active",
                          },
                        ].map((hostel, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                  <Building className="h-5 w-5 text-gray-500" />
                                </div>
                                <span className="font-medium">{hostel.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{hostel.owner}</td>
                            <td className="py-3 px-4">{hostel.location}</td>
                            <td className="py-3 px-4">{hostel.rooms}</td>
                            <td className="py-3 px-4">{hostel.priceRange}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant={
                                  hostel.status === "Active"
                                    ? "success"
                                    : hostel.status === "Pending"
                                      ? "outline"
                                      : "destructive"
                                }
                              >
                                {hostel.status}
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
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Hostel</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Hostel
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
                    <div className="text-sm text-gray-500">Showing 8 of 24 hostels</div>
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
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
