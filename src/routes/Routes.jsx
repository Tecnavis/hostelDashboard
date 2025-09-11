import AdminAdmins from "@/pages/admin/admins/Admins";
import AdminAnalytics from "@/pages/admin/analytics/Analytics";
import Blogs from "@/pages/admin/blog/Blog";
import AdminBookings from "@/pages/admin/bookings/Bookings";
import AdminCards from "@/pages/admin/cards/Cards";
import AdminDashboard from "@/pages/admin/dashboard/Dashboard";
import AdminHostels from "@/pages/admin/hostels/Hostels";
import AdminHostelsRooms from "@/pages/admin/hostels/rooms/Rooms";
import AdminMessages from "@/pages/admin/messages/Messages";
import AdminNotificationsPage from "@/pages/admin/notifications/Notifications";
import AdminOwners from "@/pages/admin/owners/Owners";
import AdminOwnersStaffs from "@/pages/admin/owners/ownersStaff/OwnersStaff";
import AdminUsers from "@/pages/admin/user/User";
import HomePage from "@/pages/Home";
import AdminLoginPage from "@/pages/login/AdminLogin";
import LoginPage from "@/pages/login/Login";
import SignupPage from "@/pages/login/Signup";
import OwnerAnalytics from "@/pages/owner/analytics/Analytics";
import OwnerBookings from "@/pages/owner/bookings/Bookings";
import OwnerCards from "@/pages/owner/cards/Cards";
import OwnerDashboard from "@/pages/owner/dashboard/Dashboard";
import OwnerHostels from "@/pages/owner/hostels/Hostels";
import OwnerHostelsRooms from "@/pages/owner/hostels/rooms/Rooms";
import OwnerMessages from "@/pages/owner/messages/Messages";
import OwnerNotificationsPage from "@/pages/owner/notifications/Notfications";
import OwnerStaffs from "@/pages/owner/staffs/Staffs";
import OwnerRooms from "@/pages/owner/staffs/Staffs";
import OwnerUsers from "@/pages/owner/user/User";
import ProtectedRoutes from "@/utils/ProtectedRoutes";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin-login" element={<AdminLoginPage />} />

      {/* admin dashboard */}

      <Route element={<ProtectedRoutes />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/hostels" element={<AdminHostels />} />
        <Route
          path="/admin/hostels/rooms/:id"
          element={<AdminHostelsRooms />}
        />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/owners" element={<AdminOwners />} />
        <Route
          path="/admin/owners/staffs/:id"
          element={<AdminOwnersStaffs />}
        />
        {/* <Route path="/admin/messages" element={<AdminMessages />} /> */}
        <Route path="/admin/bookings" element={<AdminBookings />} />
                <Route path="/admin/blogs" element={<Blogs />} />

        <Route path="/admin/admins" element={<AdminAdmins />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route
          path="/admin/notifications"
          element={<AdminNotificationsPage />}
        />
          <Route
          path="/admin/cards"
          element={<AdminCards />}
        />

        {/* owner dashboard */}

        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/users" element={<OwnerUsers />} />
        <Route path="/owner/hostels" element={<OwnerHostels />} />
        <Route
          path="/owner/hostels/rooms/:id"
          element={<OwnerHostelsRooms />}
        />
        <Route path="/owner/analytics" element={<OwnerAnalytics />} />
        <Route path="/owner/staffs" element={<OwnerStaffs />} />
        <Route path="/owner/users" element={<AdminUsers />} />
        {/* <Route path="/owner/messages" element={<OwnerMessages />} /> */}
        <Route path="/owner/bookings" element={<OwnerBookings />} />
             <Route
          path="/owner/notifications"
          element={<OwnerNotificationsPage />}
        />
             <Route
          path="/owner/cards"
          element={<OwnerCards />}
        />
      </Route>
    </Routes>
  );
}
