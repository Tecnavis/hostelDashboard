"use client"

import { TabsContent } from "@/components/ui/tabs"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bed, ChevronDown, Edit, Filter, ImagePlus, MoreHorizontal, Plus, Search, Trash2, Users } from "lucide-react"

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
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function OwnerRooms() {
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [isViewRoomOpen, setIsViewRoomOpen] = useState(false)

  const rooms = [
    {
      id: 1,
      name: "Deluxe Private Double",
      hostel: "Sunset Beach Hostel",
      type: "Private",
      capacity: 2,
      beds: "1 Queen Bed",
      price: 85,
      status: "Available",
      amenities: ["En-suite Bathroom", "Air Conditioning", "Sea View", "TV", "Mini Fridge"],
      description: "Spacious private room with a queen-sized bed and en-suite bathroom. Features a beautiful sea view.",
      image: "/placeholder.svg?height=200&width=300",
      occupancy: "75%",
      bookings: 42,
    },
    {
      id: 2,
      name: "Standard Private Single",
      hostel: "Sunset Beach Hostel",
      type: "Private",
      capacity: 1,
      beds: "1 Single Bed",
      price: 65,
      status: "Available",
      amenities: ["Shared Bathroom", "Air Conditioning", "Desk", "Locker"],
      description: "Cozy private room with a single bed. Shared bathroom facilities.",
      image: "/placeholder.svg?height=200&width=300",
      occupancy: "80%",
      bookings: 38,
    },
    {
      id: 3,
      name: "4-Bed Mixed Dorm",
      hostel: "Sunset Beach Hostel",
      type: "Dorm",
      capacity: 4,
      beds: "4 Single Beds",
      price: 30,
      status: "Available",
      amenities: ["Shared Bathroom", "Air Conditioning", "Lockers", "Reading Lights"],
      description: "Comfortable 4-bed mixed dorm with individual lockers and reading lights for each bed.",
      image: "/placeholder.svg?height=200&width=300",
      occupancy: "90%",
      bookings: 65,
    },
    {
      id: 4,
      name: "6-Bed Female Dorm",
      hostel: "Sunset Beach Hostel",
      type: "Dorm",
      capacity: 6,
      beds: "6 Single Beds",
      price: 25,
      status: "Available",
      amenities: ["Shared Bathroom", "Air Conditioning", "Lockers", "Reading Lights", "Female Only"],
      description: "Female-only dorm with 6 single beds, individual lockers, and reading lights.",
      image: "/placeholder.svg?height=200&width=300",
      occupancy: "85%",
      bookings: 58,
    },
    {
      id: 5,
      name: "Premium Private Double",
      hostel: "Downtown Backpackers",
      type: "Private",
      capacity: 2,
      beds: "1 Queen Bed",
      price: 75,
      status: "Available",
      amenities: ["En-suite Bathroom", "Air Conditioning", "City View", "TV"],
      description: "Modern private room with a queen-sized bed and en-suite bathroom. Features a city view.",
      image: "/placeholder.svg?height=200&width=300",
      occupancy: "85%",
      bookings: 45,
    },
    {
      id: 6,
      name: "8-Bed Mixed Dorm",
      hostel: "Downtown Backpackers",
      type: "Dorm",
      capacity: 8,
      beds: "8 Single Beds",
      price: 22,
      status: "Available",
      amenities: ["Shared Bathroom", "Air Conditioning", "Lockers", "Reading Lights"],
      description: "Spacious 8-bed mixed dorm with individual lockers and reading lights for each bed.",
      image: "/placeholder.svg?height=200&width=300",
      occupancy: "95%",
      bookings: 72,
    },
    {
      id: 7,
      name: "Mountain View Suite",
      hostel: "Mountain View Lodge",
      type: "Private",
      capacity: 2,
      beds: "1 King Bed",
      price: 95,
      status: "Available",
      amenities: ["En-suite Bathroom", "Fireplace", "Mountain View", "TV", "Mini Kitchen"],
      description:
        "Luxurious private suite with a king-sized bed, en-suite bathroom, and a fireplace. Features a stunning mountain view.",
      image: "/placeholder.svg?height=200&width=300",
      occupancy: "70%",
      bookings: 32,
    },
    {
      id: 8,
      name: "4-Bed Mixed Dorm",
      hostel: "Mountain View Lodge",
      type: "Dorm",
      capacity: 4,
      beds: "4 Single Beds",
      price: 35,
      status: "Available",
      amenities: ["Shared Bathroom", "Heating", "Lockers", "Reading Lights"],
      description: "Cozy 4-bed mixed dorm with individual lockers and reading lights for each bed.",
      image: "/placeholder.svg?height=200&width=300",
      occupancy: "60%",
      bookings: 28,
    },
  ]

  const handleViewRoom = (room) => {
    setSelectedRoom(room)
    setIsViewRoomOpen(true)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="owner" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Manage Rooms</h1>
              <div className="flex items-center gap-2">
                <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700 gap-2">
                      <Plus className="h-4 w-4" />
                      Add New Room
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New Room</DialogTitle>
                      <DialogDescription>Create a new room for your hostel.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="room-name">Room Name</Label>
                          <Input id="room-name" placeholder="Enter room name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hostel">Hostel</Label>
                          <Select>
                            <SelectTrigger id="hostel">
                              <SelectValue placeholder="Select hostel" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sunset">Sunset Beach Hostel</SelectItem>
                              <SelectItem value="downtown">Downtown Backpackers</SelectItem>
                              <SelectItem value="mountain">Mountain View Lodge</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="room-type">Room Type</Label>
                          <Select>
                            <SelectTrigger id="room-type">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="private">Private</SelectItem>
                              <SelectItem value="dorm">Dorm</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="capacity">Capacity</Label>
                          <Input id="capacity" type="number" min="1" placeholder="0" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="beds">Beds</Label>
                          <Input id="beds" placeholder="e.g. 1 Queen Bed, 4 Single Beds" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Price per Night ($)</Label>
                          <Input id="price" type="number" min="0" placeholder="0" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Enter room description" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amenities">Amenities</Label>
                        <Input
                          id="amenities"
                          placeholder="e.g. En-suite Bathroom, Air Conditioning (comma separated)"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="image">Room Image</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                          <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                          <Input id="image" type="file" className="hidden" />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddRoomOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setIsAddRoomOpen(false)}>
                        Create Room
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
                      <CardTitle>All Rooms</CardTitle>
                      <CardDescription>Manage rooms across all your hostels</CardDescription>
                    </div>
                    <Tabs defaultValue="all" className="w-[400px]">
                      <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="private">Private</TabsTrigger>
                        <TabsTrigger value="dorm">Dorm</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search rooms..." className="pl-8" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                        <ChevronDown className="h-3 w-3 opacity-50" />
                      </Button>
                      <Select defaultValue="hostel">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Group by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hostel">Group by Hostel</SelectItem>
                          <SelectItem value="type">Group by Type</SelectItem>
                          <SelectItem value="price">Sort by Price</SelectItem>
                          <SelectItem value="occupancy">Sort by Occupancy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Room</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Hostel</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Type</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Capacity</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Price</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Occupancy</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rooms.map((room) => (
                          <tr key={room.id} className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-md overflow-hidden">
                                  <img
                                    src={room.image || "/placeholder.svg"}
                                    alt={room.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <span className="font-medium">{room.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{room.hostel}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant="outline"
                                className={
                                  room.type === "Private"
                                    ? "bg-blue-50 text-blue-600 border-blue-200"
                                    : "bg-purple-50 text-purple-600 border-purple-200"
                                }
                              >
                                {room.type}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span>{room.capacity}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-medium">${room.price}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-full max-w-[60px] h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-orange-500 rounded-full"
                                    style={{ width: room.occupancy }}
                                  ></div>
                                </div>
                                <span>{room.occupancy}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant="success">{room.status}</Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleViewRoom(room)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleViewRoom(room)}>
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Edit Room</DropdownMenuItem>
                                    <DropdownMenuItem>View Bookings</DropdownMenuItem>
                                    <DropdownMenuItem>Set Availability</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete Room
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-500">Showing 8 of 42 rooms</div>
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Room Availability</CardTitle>
                  <CardDescription>Quick availability management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rooms.slice(0, 5).map((room) => (
                      <div key={room.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bed className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium">{room.name}</div>
                            <div className="text-sm text-gray-500">{room.hostel}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Available</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Room Performance</CardTitle>
                  <CardDescription>Top performing rooms by bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rooms
                      .sort((a, b) => b.bookings - a.bookings)
                      .slice(0, 5)
                      .map((room, index) => (
                        <div key={room.id} className="flex items-center gap-4 p-3 border rounded-lg">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-600 font-medium">
                            {index + 1}
                          </div>
                          <div className="h-12 w-12 rounded-md overflow-hidden">
                            <img
                              src={room.image || "/placeholder.svg"}
                              alt={room.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{room.name}</div>
                            <div className="text-sm text-gray-500">{room.hostel}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{room.bookings} bookings</div>
                            <div className="text-sm text-gray-500">${room.price} / night</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>

      {selectedRoom && (
        <Dialog open={isViewRoomOpen} onOpenChange={setIsViewRoomOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{selectedRoom.name}</DialogTitle>
              <DialogDescription>{selectedRoom.hostel}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="rounded-md overflow-hidden h-[200px]">
                <img
                  src={selectedRoom.image || "/placeholder.svg"}
                  alt={selectedRoom.name}
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
                    <p className="mt-1">{selectedRoom.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-500">Room Type</Label>
                      <p className="mt-1">{selectedRoom.type}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500">Price per Night</Label>
                      <p className="mt-1 font-medium">${selectedRoom.price}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-gray-500">Capacity</Label>
                      <p className="mt-1">{selectedRoom.capacity} guests</p>
                    </div>
                    <div>
                      <Label className="text-gray-500">Beds</Label>
                      <p className="mt-1">{selectedRoom.beds}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500">Status</Label>
                      <p className="mt-1">
                        <Badge variant="success">{selectedRoom.status}</Badge>
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="amenities" className="mt-4">
                  <div className="grid grid-cols-2 gap-2">
                    {selectedRoom.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="stats" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-500">Occupancy Rate</Label>
                      <p className="text-2xl font-bold">{selectedRoom.occupancy}</p>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{ width: selectedRoom.occupancy }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-500">Total Bookings</Label>
                      <p className="text-2xl font-bold">{selectedRoom.bookings}</p>
                      <p className="text-sm text-green-600">+8% from last month</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-500">Average Stay</Label>
                      <p className="text-2xl font-bold">{selectedRoom.id % 2 === 0 ? "2.5" : "3.2"} days</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-500">Revenue (Monthly)</Label>
                      <p className="text-2xl font-bold">
                        $
                        {(selectedRoom.price * selectedRoom.bookings * (selectedRoom.id % 2 === 0 ? 2.5 : 3.2)).toFixed(
                          0,
                        )}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewRoomOpen(false)}>
                Close
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700">Edit Room</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
