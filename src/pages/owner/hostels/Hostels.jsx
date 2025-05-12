"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Building, Edit, ImagePlus, MapPin, MoreHorizontal, Plus, Star, Trash2, Users, Check } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function OwnerHostels() {
  const [isAddHostelOpen, setIsAddHostelOpen] = useState(false)
  const [selectedHostel, setSelectedHostel] = useState(null)
  const [isViewHostelOpen, setIsViewHostelOpen] = useState(false)

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
      amenities: ["Free Wi-Fi", "Breakfast Included", "Air Conditioning", "Lockers", "Common Kitchen", "Laundry"],
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
      amenities: ["Free Wi-Fi", "24/7 Reception", "Lockers", "Common Room", "Bike Rental", "Tours"],
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
      amenities: ["Free Wi-Fi", "Breakfast Included", "Fireplace", "Hiking Trails", "Parking", "Shuttle Service"],
      priceRange: "$35-$110",
      created: "Mar 10, 2025",
    },
  ]

  const handleViewHostel = (hostel) => {
    setSelectedHostel(hostel)
    setIsViewHostelOpen(true)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="owner" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">My Hostels</h1>
              <div className="flex items-center gap-2">
                <Dialog open={isAddHostelOpen} onOpenChange={setIsAddHostelOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700 gap-2">
                      <Plus className="h-4 w-4" />
                      Add New Hostel
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New Hostel</DialogTitle>
                      <DialogDescription>Create a new hostel property to manage.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="hostel-name">Hostel Name</Label>
                        <Input id="hostel-name" placeholder="Enter hostel name" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" placeholder="City, State" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" placeholder="Full address" />
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
                      <div className="space-y-2">
                        <Label htmlFor="amenities">Amenities</Label>
                        <Input id="amenities" placeholder="e.g. Wi-Fi, Breakfast, Air Conditioning (comma separated)" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="image">Hostel Image</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                          <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                          <Input id="image" type="file" className="hidden" />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddHostelOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setIsAddHostelOpen(false)}>
                        Create Hostel
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {hostels.map((hostel) => (
                <Card key={hostel.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={hostel.image || "/placeholder.svg"}
                      alt={hostel.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="success" className="bg-white text-green-600 border-green-200">
                        {hostel.status}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{hostel.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
                          {hostel.location}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewHostel(hostel)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Hostel
                          </DropdownMenuItem>
                          <DropdownMenuItem>Manage Rooms</DropdownMenuItem>
                          <DropdownMenuItem>View Bookings</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Hostel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{hostel.rooms} rooms</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{hostel.occupancy} occupied</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-500" />
                        <span className="text-sm">{hostel.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{hostel.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {hostel.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-50">
                          {amenity}
                        </Badge>
                      ))}
                      {hostel.amenities.length > 3 && (
                        <Badge variant="outline" className="bg-gray-50">
                          +{hostel.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <div className="text-sm text-gray-500">Price range: {hostel.priceRange}</div>
                      <Button variant="outline" size="sm" onClick={() => handleViewHostel(hostel)}>
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Hostel Performance</CardTitle>
                  <CardDescription>Overview of your hostel properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Hostel</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Occupancy</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Revenue (Monthly)</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Bookings</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Rating</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
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
                                <span className="font-medium">{hostel.name}</span>
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
                              {hostel.id === 1 ? "56" : hostel.id === 2 ? "42" : hostel.id === 3 ? "28" : "0"}
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

      {selectedHostel && (
        <Dialog open={isViewHostelOpen} onOpenChange={setIsViewHostelOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{selectedHostel.name}</DialogTitle>
              <DialogDescription>{selectedHostel.location}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="rounded-md overflow-hidden h-[200px]">
                <img
                  src={selectedHostel.image || "/placeholder.svg"}
                  alt={selectedHostel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="stats">Statistics</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 mt-4">
                  <div>
                    <Label className="text-gray-500">Description</Label>
                    <p className="mt-1">{selectedHostel.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-500">Address</Label>
                      <p className="mt-1">{selectedHostel.address}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500">Price Range</Label>
                      <p className="mt-1">{selectedHostel.priceRange}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-gray-500">Total Rooms</Label>
                      <p className="mt-1">{selectedHostel.rooms}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500">Occupancy</Label>
                      <p className="mt-1">{selectedHostel.occupancy}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500">Rating</Label>
                      <p className="mt-1 flex items-center">
                        <Star className="h-4 w-4 text-amber-500 mr-1" />
                        {selectedHostel.rating}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="amenities" className="mt-4">
                  <div className="grid grid-cols-2 gap-2">
                    {selectedHostel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="stats" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-500">Monthly Revenue</Label>
                      <p className="text-2xl font-bold">
                        {selectedHostel.id === 1
                          ? "$4,250"
                          : selectedHostel.id === 2
                            ? "$3,180"
                            : selectedHostel.id === 3
                              ? "$2,815"
                              : "$0"}
                      </p>
                      <p className="text-sm text-green-600">+12% from last month</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-500">Monthly Bookings</Label>
                      <p className="text-2xl font-bold">
                        {selectedHostel.id === 1
                          ? "56"
                          : selectedHostel.id === 2
                            ? "42"
                            : selectedHostel.id === 3
                              ? "28"
                              : "0"}
                      </p>
                      <p className="text-sm text-green-600">+8% from last month</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-500">Average Stay</Label>
                      <p className="text-2xl font-bold">
                        {selectedHostel.id === 1
                          ? "3.2"
                          : selectedHostel.id === 2
                            ? "2.8"
                            : selectedHostel.id === 3
                              ? "4.5"
                              : "0"}{" "}
                        days
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-500">Repeat Guests</Label>
                      <p className="text-2xl font-bold">
                        {selectedHostel.id === 1
                          ? "18%"
                          : selectedHostel.id === 2
                            ? "22%"
                            : selectedHostel.id === 3
                              ? "15%"
                              : "0%"}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewHostelOpen(false)}>
                Close
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700">Edit Hostel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
