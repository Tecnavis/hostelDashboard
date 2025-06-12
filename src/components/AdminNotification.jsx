// AdminNotifications.jsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Check, Clock, X } from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  useGetAllnotficationAdminUnReadQuery,
  useUpdatenotficationAdminMutation,
} from "@/app/service/notification";

export function AdminNotifications({ variant = "admin" }) {
  const admin = JSON.parse(localStorage.getItem("admin"));

  const superAdminId =
    admin?.adminDetails?.role == "admin"
      ? admin?.adminDetails?.superAdminId
      : admin?.adminDetails?._id;

  const {
    data: rawNotifications = [],
    isError,
    isLoading,
    refetch,
  } = useGetAllnotficationAdminUnReadQuery(superAdminId, {
    refetchOnMountOrArgChange: true, // trigger refetch on page visit
  });

  const [updateNotification] = useUpdatenotficationAdminMutation();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !Array.isArray(rawNotifications))
    return <h1>Oops! Something went wrong.</h1>;

  const notifications = rawNotifications.map((noti) => ({
    id: noti._id,
    title: "Notification",
    description: noti.message,
    time: new Date(noti.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    read: noti.adminIsRead,
    type: "info",
  }));

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = async (id) => {
    try {
      await updateNotification({ id }).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
      await Promise.all(
        unreadIds.map((id) => updateNotification({ id }).unwrap())
      );
      refetch();
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span
              className={cn(
                "absolute -top-1 -right-1 h-4 w-4 rounded-full text-[10px] font-medium text-white flex items-center justify-center",
                variant === "admin" ? "bg-rose-600" : "bg-orange-600"
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
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs"
              onClick={handleMarkAllAsRead}
            >
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
                  onMarkAsRead={handleMarkAsRead}
                  variant={variant}
                />
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              No notifications
            </div>
          )}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer justify-center p-3 text-center font-medium"
          onClick={() => {
            handleMarkAllAsRead();
          }}
          asChild
        >
          <NavLink to={`/admin/notifications`}>View all notifications</NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationItem({ notification, onMarkAsRead, variant = "admin" }) {
  const [isHovered, setIsHovered] = useState(false);

  const getTypeStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-600";
      case "warning":
        return "bg-amber-100 text-amber-600";
      case "error":
        return "bg-red-100 text-red-600";
      default:
        return variant === "admin"
          ? "bg-rose-100 text-rose-600"
          : "bg-orange-100 text-orange-600";
    }
  };

  return (
    <div
      className={cn(
        "relative flex cursor-pointer gap-4 p-4 hover:bg-gray-50",
        !notification.read && "bg-gray-50",
        isHovered && "pr-12"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="flex-shrink-0">
        <div
          className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center",
            getTypeStyles(notification.type)
          )}
        >
          {notification.type === "success" && <Check className="h-5 w-5" />}
          {notification.type === "info" && <Bell className="h-5 w-5" />}
          {notification.type === "warning" && <Clock className="h-5 w-5" />}
          {notification.type === "error" && <X className="h-5 w-5" />}
        </div>
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{notification.title}</p>
          {!notification.read && (
            <Badge
              variant="outline"
              className={cn(
                "ml-2 h-auto border-none px-2 py-0.5 text-xs font-normal",
                variant === "admin"
                  ? "bg-rose-50 text-rose-600"
                  : "bg-orange-50 text-orange-600"
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
                e.stopPropagation();
                onMarkAsRead(notification.id);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
