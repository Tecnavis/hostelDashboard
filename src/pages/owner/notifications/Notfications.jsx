"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Check, CheckCheck, Clock, Search, Trash2, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Sidebar } from "@/components/Sidebar"


const mockNotifications = [
  {
    id: "1",
    title: "New Hostel Registration",
    description: "Mountain View Lodge has submitted registration documents for approval.",
    time: "2 minutes ago",
    date: "2024-01-15",
    read: false,
    type: "info",
    category: "system",
    priority: "high",
  },
  {
    id: "2",
    title: "Payment Dispute",
    description: "A payment dispute has been raised for booking #B-5678 at Downtown Backpackers.",
    time: "15 minutes ago",
    date: "2024-01-15",
    read: false,
    type: "warning",
    category: "payment",
    priority: "high",
  },
  {
    id: "3",
    title: "New Owner Account",
    description: "Sarah Wilson has created a new hostel owner account and is awaiting verification.",
    time: "1 hour ago",
    date: "2024-01-15",
    read: false,
    type: "info",
    category: "user",
    priority: "medium",
    avatar: "/placeholder.svg?height=40&width=40",
    avatarFallback: "SW",
  },
  {
    id: "4",
    title: "System Maintenance Complete",
    description: "Scheduled system maintenance has been completed successfully.",
    time: "3 hours ago",
    date: "2024-01-15",
    read: true,
    type: "success",
    category: "system",
    priority: "low",
  },
  {
    id: "5",
    title: "Booking Cancellation",
    description: "Booking #B-9012 at Seaside Hostel has been cancelled by the guest.",
    time: "5 hours ago",
    date: "2024-01-15",
    read: true,
    type: "warning",
    category: "booking",
    priority: "medium",
  },
  {
    id: "6",
    title: "Monthly Report Generated",
    description: "Your monthly analytics report for December 2023 is now available.",
    time: "Yesterday",
    date: "2024-01-14",
    read: true,
    type: "info",
    category: "system",
    priority: "low",
  },
  {
    id: "7",
    title: "New Review Alert",
    description: "City Center Hostel received a 1-star review that requires attention.",
    time: "2 days ago",
    date: "2024-01-13",
    read: false,
    type: "error",
    category: "review",
    priority: "high",
  },
]

export default function OwnerNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [selectedNotifications, setSelectedNotifications] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || notification.type === filterType
    const matchesCategory = filterCategory === "all" || notification.category === filterCategory
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "unread" && !notification.read) ||
      (activeTab === "read" && notification.read)

    return matchesSearch && matchesType && matchesCategory && matchesTab
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (ids) => {
    setNotifications((prev) =>
      prev.map((notification) => (ids.includes(notification.id) ? { ...notification, read: true } : notification)),
    )
  }

  const markAsUnread = (ids) => {
    setNotifications((prev) =>
      prev.map((notification) => (ids.includes(notification.id) ? { ...notification, read: false } : notification)),
    )
  }

  const deleteNotifications = (ids) => {
    setNotifications((prev) => prev.filter((notification) => !ids.includes(notification.id)))
    setSelectedNotifications([])
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const toggleSelectNotification = (id) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id],
    )
  }

  const selectAllVisible = () => {
    const visibleIds = filteredNotifications.map((n) => n.id)
    setSelectedNotifications(visibleIds)
  }

  const clearSelection = () => {
    setSelectedNotifications([])
  }

  const getTypeStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-600 border-green-200"
      case "warning":
        return "bg-amber-100 text-amber-600 border-amber-200"
      case "error":
        return "bg-red-100 text-red-600 border-red-200"
      default:
        return "bg-rose-100 text-rose-600 border-rose-200"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-amber-500"
      default:
        return "bg-green-500"
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">Manage all your notifications</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-200">
                {unreadCount} unread
              </Badge>
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                <CheckCheck className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  All Notifications
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search notifications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="booking">Booking</SelectItem>
                      <SelectItem value="payment">Payment</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
                    <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
                    <TabsTrigger value="read">Read ({notifications.length - unreadCount})</TabsTrigger>
                  </TabsList>

                  {selectedNotifications.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{selectedNotifications.length} selected</span>
                      <Button size="sm" variant="outline" onClick={() => markAsRead(selectedNotifications)}>
                        <Check className="h-4 w-4 mr-1" />
                        Mark as read
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => markAsUnread(selectedNotifications)}>
                        <Clock className="h-4 w-4 mr-1" />
                        Mark as unread
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteNotifications(selectedNotifications)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                      <Button size="sm" variant="ghost" onClick={clearSelection}>
                        Clear
                      </Button>
                    </div>
                  )}
                </div>

                <TabsContent value={activeTab} className="mt-0">
                  {filteredNotifications.length > 0 && (
                    <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                      <Checkbox
                        checked={selectedNotifications.length === filteredNotifications.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            selectAllVisible()
                          } else {
                            clearSelection()
                          }
                        }}
                      />
                      <span className="text-sm text-gray-600">Select all visible notifications</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer ${
                            !notification.read ? "bg-gray-50 border-l-4 border-l-rose-500" : "bg-white"
                          } ${selectedNotifications.includes(notification.id) ? "ring-2 ring-rose-200" : ""}`}
                          onClick={() => toggleSelectNotification(notification.id)}
                        >
                          <div className="flex items-start gap-4">
                            <Checkbox
                              checked={selectedNotifications.includes(notification.id)}
                              onCheckedChange={() => toggleSelectNotification(notification.id)}
                              onClick={(e) => e.stopPropagation()}
                            />

                            <div className="flex-shrink-0">
                              {notification.avatar ? (
                                <Avatar>
                                  <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{notification.avatarFallback}</AvatarFallback>
                                </Avatar>
                              ) : (
                                <div
                                  className={`h-10 w-10 rounded-full flex items-center justify-center ${getTypeStyles(notification.type)}`}
                                >
                                  {notification.type === "success" && <Check className="h-5 w-5" />}
                                  {notification.type === "info" && <Bell className="h-5 w-5" />}
                                  {notification.type === "warning" && <Clock className="h-5 w-5" />}
                                  {notification.type === "error" && <X className="h-5 w-5" />}
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3
                                      className={`font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
                                    >
                                      {notification.title}
                                    </h3>
                                    <div
                                      className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`}
                                    />
                                    {!notification.read && (
                                      <Badge
                                        variant="outline"
                                        className="bg-rose-50 text-rose-600 border-rose-200 text-xs"
                                      >
                                        New
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">{notification.description}</p>
                                  <div className="flex items-center gap-4 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {notification.time}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      {notification.category}
                                    </Badge>
                                    <Badge variant="outline" className={`text-xs ${getTypeStyles(notification.type)}`}>
                                      {notification.type}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      markAsRead([notification.id])
                                    }}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteNotifications([notification.id])
                                    }}
                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                        <p className="text-gray-600">Try adjusting your filters or search query.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
