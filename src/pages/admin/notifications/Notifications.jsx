"use client";

import { useEffect, useState } from "react";
import { CheckCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/Sidebar";
import {
  useAllnotficationAdminReadQuery,
  useGetAllnotficationAdminUnReadQuery,
  useUpdatenotficationAdminMutation,
} from "@/app/service/notification";
import { data } from "react-router-dom";

export default function AdminNotificationsPage() {
  const [activeTab, setActiveTab] = useState("unread");

  const admin =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("admin"))
      : null;
  const superAdminId =
    admin?.adminDetails?.role === "admin"
      ? admin?.adminDetails?.superAdminId
      : admin?.adminDetails?._id;

  const { data: rawUnread = [], refetch: refetchUnread } =
    useGetAllnotficationAdminUnReadQuery(superAdminId, {
      refetchOnMountOrArgChange: true,
    });

  const { data: rawRead = [], refetch: refetchRead } =
    useAllnotficationAdminReadQuery(superAdminId, {
      refetchOnMountOrArgChange: true,
    });


  const [updateNotification] = useUpdatenotficationAdminMutation();

  useEffect(() => {
    refetchUnread();
    refetchRead();
  }, []);

  const formatNotifications = (data, isRead) =>
    data?.map((n) => ({
      id: n._id,
      title: "Notification",
      description: n.message,
      time: new Date(n.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      read: isRead,
      category: n.category || "system",
    })) || [];

  const unreadNotifications = formatNotifications(rawUnread, false);
  const readNotifications = formatNotifications(rawRead, true);

  const displayedNotifications =
    activeTab === "unread" ? unreadNotifications : readNotifications;

  const handleMarkAsRead = async (ids) => {
    try {
      await Promise.all(ids.map((id) => updateNotification({ id }).unwrap()));
      refetchUnread();
      refetchRead();
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    const ids = unreadNotifications.map((n) => n.id);
    if (ids.length === 0) return;
    await handleMarkAsRead(ids);
  };

  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col overflow-hidden mt-10">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                Notifications
              </h1>
              <p className="text-gray-600">Stay updated with recent activity</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-600 border-blue-200"
              >
                {unreadNotifications.length} unread
              </Badge>
              <Button
                onClick={handleMarkAllAsRead}
                variant="outline"
                size="sm"
                disabled={unreadNotifications.length === 0}
              >
                <CheckCheck className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="mt-4 flex gap-2">
            <Button
              variant={activeTab === "unread" ? "default" : "outline"}
              onClick={() => setActiveTab("unread")}
            >
              Unread
            </Button>
            <Button
              variant={activeTab === "read" ? "default" : "outline"}
              onClick={() => setActiveTab("read")}
            >
              Read
            </Button>
          </div>
        </div>

        {/* Notification List */}
        <div className="p-6 overflow-auto">
          {displayedNotifications.length === 0 ? (
            <p className="text-gray-500 text-center mt-4">
              No {activeTab} notifications found.
            </p>
          ) : (
            displayedNotifications.map((noti) => (
              <div
                key={noti.id}
                className={`border rounded-lg p-4 mb-3 shadow-sm ${
                  noti.read ? "bg-white" : "bg-gray-100"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-medium text-gray-800">{noti.title}</h2>
                    <p className="text-sm text-gray-700">{noti.description}</p>
                    <div className="text-xs text-gray-500 mt-1">
                      <span className="mr-2">Category: {noti.category}</span>
                      <span>{noti.time}</span>
                    </div>
                  </div>
                  {!noti.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMarkAsRead([noti.id])}
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
