"use client";

import { motion } from "framer-motion";
import { Building, Hotel, UserCog, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import banner_img from "@/../public/banner.svg";

export default function HomePage() {
  const router = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Hotel className="h-6 w-6 sm:h-8 sm:w-8 text-rose-600" />
            <span className="text-xl sm:text-2xl font-bold text-rose-600">
              HostelHub
            </span>
          </motion.div>
          <div className="flex items-center gap-1">
            <UserCog className="h-4 w-4 text-rose-600 cursor-pointer" onClick={() => router("/admin-login")} />
            <Button
              variant="ghost"
              className="px-2 py-1 text-sm h-8 cursor-pointer"
              onClick={() => router("/login")}
            >
              Login
            </Button>
            <Button
              variant="default"
              className="bg-rose-600 hover:bg-rose-700 px-3 py-1 text-sm h-8 cursor-pointer"
              onClick={() => router("/login")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Manage Your Hostel Properties with Ease
            </h1>
            <p className="text-xl text-gray-600">
              A complete dashboard solution for hostel owners and administrators
              to manage bookings, rooms, and guests.
            </p>
            {/* <div className="flex gap-4 mt-4">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700" onClick={() => router("/login")}>
                Login as Admin
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-rose-600 text-rose-600 hover:bg-rose-50"
                onClick={() => router("/login?role=owner")}
              >
                Login as Hostel Owner
              </Button>
            </div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <img
              src={banner_img}
              alt="Dashboard Preview"
              className="w-full h-auto"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mt-24"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="h-12 w-12 bg-rose-100 rounded-lg flex items-center justify-center mb-6">
              <Building className="h-6 w-6 text-rose-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Hostel Management</h3>
            <p className="text-gray-600">
              Create and manage multiple hostel properties with detailed
              information and room types.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
              <Hotel className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Room Booking</h3>
            <p className="text-gray-600">
              Manage room availability, bookings, and occupancy with an
              intuitive calendar interface.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Guest Management</h3>
            <p className="text-gray-600">
              Keep track of guest information, check-ins, check-outs, and
              special requests.
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Hotel className="h-6 w-6 text-rose-400" />
              <span className="text-xl font-bold">HostelHub</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 HostelHub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
