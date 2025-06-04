"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Bell, Check, Clock, X } from "lucide-react"
import { NavLink } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"



export function OwnerNotifications({ variant = "owner", initialNotifications }) {
  const [notifications, setNotifications] = useState(
    initialNotifications || [
      {
        id: "1",
        title: "New Booking",
        description: "John Smith has booked a Private Double room at Sunset Beach Hostel.",
        time: "Just now",
        read: false,
        type: "info",
        avatar: "/placeholder.svg?height=40&width=40",
        avatarFallback: "JS",
      },
      {
        id: "2",
        title: "Booking Confirmed",
        description: "Emma Johnson's booking has been confirmed for Downtown Backpackers.",
        time: "2 hours ago",
        read: false,
        type: "success",
        avatar: "/placeholder.svg?height=40&width=40",
        avatarFallback: "EJ",
      },
      {
        id: "3",
        title: "Payment Received",
        description: "You've received a payment of $240 for booking #B-1234.",
        time: "5 hours ago",
        read: true,
        type: "success",
      },
      {
        id: "4",
        title: "Room Availability Update",
        description: "Your room availability calendar has been updated for next month.",
        time: "Yesterday",
        read: true,
        type: "info",
      },
      {
        id: "5",
        title: "New Review",
        description: "Michael Brown left a 5-star review for Mountain View Lodge.",
        time: "2 days ago",
        read: true,
        type: "info",
        avatar: "/placeholder.svg?height=40&width=40",
        avatarFallback: "MB",
      },
    ],
  )

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span
              className={cn(
                "absolute -top-1 -right-1 h-4 w-4 rounded-full text-[10px] font-medium text-white flex items-center justify-center",
                variant === "admin" ? "bg-rose-600" : "bg-orange-600",
              )}
            >
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px]">
        <div className="flex items-center justify-between p-4">
          <div className="font-medium">Notifications</div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            <div>
              {notifications.slice(0, 5).map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onRemove={removeNotification}
                  variant={variant}
                />
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">No notifications</div>
          )}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer justify-center p-3 text-center font-medium" asChild>
          <NavLink to={`/admin/notifications`}>View all notifications</NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


function NotificationItem({ notification, onMarkAsRead, onRemove, variant = "owner" }) {
  const [isHovered, setIsHovered] = useState(false)

  const getTypeStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-600"
      case "warning":
        return "bg-amber-100 text-amber-600"
      case "error":
        return "bg-red-100 text-red-600"
      default:
        return variant === "admin" ? "bg-rose-100 text-rose-600" : "bg-orange-100 text-orange-600"
    }
  }

  return (
    <div
      className={cn(
        "relative flex cursor-pointer gap-4 p-4 hover:bg-gray-50",
        !notification.read && "bg-gray-50",
        isHovered && "pr-12",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="flex-shrink-0">
        {notification.avatar ? (
          <Avatar>
            <AvatarImage src={notification.avatar || "/placeholder.svg"} />
            <AvatarFallback>{notification.avatarFallback}</AvatarFallback>
          </Avatar>
        ) : (
          <div
            className={cn("h-10 w-10 rounded-full flex items-center justify-center", getTypeStyles(notification.type))}
          >
            {notification.type === "success" && <Check className="h-5 w-5" />}
            {notification.type === "info" && <Bell className="h-5 w-5" />}
            {notification.type === "warning" && <Clock className="h-5 w-5" />}
            {notification.type === "error" && <X className="h-5 w-5" />}
          </div>
        )}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{notification.title}</p>
          {!notification.read && (
            <Badge
              variant="outline"
              className={cn(
                "ml-2 h-auto border-none bg-blue-50 px-2 py-0.5 text-xs font-normal text-blue-600",
                variant === "admin" ? "bg-rose-50 text-rose-600" : "bg-orange-50 text-orange-600",
              )}
            >
              New
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-500">{notification.description}</p>
        <div className="flex items-center text-xs text-gray-400">
          <Clock className="mr-1 h-3 w-3" />
          {notification.time}
        </div>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                onRemove(notification.id)
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function NotificationsSidebar({ variant = "owner" }) {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Booking",
      description: "John Smith has booked a Private Double room at Sunset Beach Hostel.",
      time: "Just now",
      read: false,
      type: "info",
      avatar: "/placeholder.svg?height=40&width=40",
      avatarFallback: "JS",
    },
    {
      id: "2",
      title: "Booking Confirmed",
      description: "Emma Johnson's booking has been confirmed for Downtown Backpackers.",
      time: "2 hours ago",
      read: false,
      type: "success",
      avatar: "/placeholder.svg?height=40&width=40",
      avatarFallback: "EJ",
    },
    {
      id: "3",
      title: "Payment Received",
      description: "You've received a payment of $240 for booking #B-1234.",
      time: "5 hours ago",
      read: true,
      type: "success",
    },
    {
      id: "4",
      title: "Room Availability Update",
      description: "Your room availability calendar has been updated for next month.",
      time: "Yesterday",
      read: true,
      type: "info",
    },
    {
      id: "5",
      title: "New Review",
      description: "Michael Brown left a 5-star review for Mountain View Lodge.",
      time: "2 days ago",
      read: true,
      type: "info",
      avatar: "/placeholder.svg?height=40&width=40",
      avatarFallback: "MB",
    },
  ])

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h2 className="font-medium">Notifications</h2>
          {unreadCount > 0 && (
            <Badge
              className={cn(
                "ml-2",
                variant === "admin" ? "bg-rose-600 hover:bg-rose-700" : "bg-orange-600 hover:bg-orange-700",
              )}
            >
              {unreadCount} new
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" className="h-8" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1">
        {notifications.length > 0 ? (
          <div className="divide-y">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
                onRemove={removeNotification}
                variant={variant}
              />
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">No notifications</div>
        )}
      </ScrollArea>
      <div className="p-4 border-t">
        <Button asChild className="w-full" variant="outline">
          <NavLink to={`/admin/notifications`}>View All Notifications</NavLink>
        </Button>
      </div>
    </div>
  )
}
