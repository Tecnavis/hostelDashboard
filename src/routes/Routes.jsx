import AdminAdmins from "@/pages/admin/admins/Admins";
import AdminAnalytics from "@/pages/admin/analytics/Analytics";
import AdminBookings from "@/pages/admin/bookings/Bookings";
import AdminDashboard from "@/pages/admin/dashboard/Dashboard";
import AdminHostels from "@/pages/admin/hostels/Hostels";
import AdminHostelsRooms from "@/pages/admin/hostels/rooms/Rooms";
import AdminMessages from "@/pages/admin/messages/Messages";
import AdminOwners from "@/pages/admin/owners/Owners";
import AdminOwnersStaffs from "@/pages/admin/owners/ownersStaff/OwnersStaff";
import AdminUsers from "@/pages/admin/user/User";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/login/Login";
import OwnerAnalytics from "@/pages/owner/analytics/Analytics";
import OwnerBookings from "@/pages/owner/bookings/Bookings";
import OwnerDashboard from "@/pages/owner/dashboard/Dashboard";
import OwnerHostels from "@/pages/owner/hostels/Hostels";
import OwnerMessages from "@/pages/owner/messages/Messages";
import OwnerRooms from "@/pages/owner/rooms/Rooms";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* admin dashboard */}

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/hostels" element={<AdminHostels />} />
      <Route path="/admin/hostels/rooms/:id" element={<AdminHostelsRooms />} />
      <Route path="/admin/analytics" element={<AdminAnalytics />} />
      <Route path="/admin/owners" element={<AdminOwners />} />
      <Route path="/admin/owners/staffs/:id" element={<AdminOwnersStaffs />} />
      <Route path="/admin/messages" element={<AdminMessages />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
      <Route path="/admin/admins" element={<AdminAdmins />} />
      <Route path="/admin/users" element={<AdminUsers />} />


      {/* owner dashboard */}

      <Route path="/owner/dashboard" element={<OwnerDashboard />} />
      <Route path="/owner/hostels" element={<OwnerHostels />} />
      <Route path="/owner/analytics" element={<OwnerAnalytics />} />
      <Route path="/owner/rooms" element={<OwnerRooms />} />
      <Route path="/owner/messages" element={<OwnerMessages />} />
      <Route path="/owner/bookings" element={<OwnerBookings />} />
    </Routes>
  );
}
