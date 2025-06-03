"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Building,
  ChevronLeft,
  Hotel,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Shield,
  Users,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));
  const owner = JSON.parse(localStorage.getItem("owner"));

  const adminNavItems = [
    { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ...(admin?.adminDetails?.role === "super-admin"
      ? [{ title: "Admins", href: "/admin/admins", icon: Shield }]
      : []),
    { title: "Owners", href: "/admin/owners", icon: Users },
    { title: "Hostels", href: "/admin/hostels", icon: Building },
    { title: "Users", href: "/admin/users", icon: User },
    { title: "Bookings", href: "/admin/bookings", icon: Hotel },
    { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { title: "Messages", href: "/admin/messages", icon: MessageSquare },
    // { title: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const ownerNavItems = [
    { title: "Dashboard", href: "/owner/dashboard", icon: LayoutDashboard },
    ...(owner?.ownerDetails?.role === "owner"
      ? [{ title: "Staffs", href: "/owner/staffs", icon: Users }]
      : []),
    { title: "My Hostels", href: "/owner/hostels", icon: Building },
    { title: "Users", href: "/owner/users", icon: User },
    { title: "Bookings", href: "/owner/bookings", icon:  Hotel  },
    { title: "Analytics", href: "/owner/analytics", icon: BarChart3 },
    { title: "Messages", href: "/owner/messages", icon: MessageSquare },
    // { title: "Settings", href: "/owner/settings", icon: Settings },
  ];

  const navItems =
    admin?.adminDetails?.role === "admin" ||
    admin?.adminDetails?.role === "super-admin"
      ? adminNavItems
      : ownerNavItems;

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("owner");

    navigate("/");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <div className="h-full bg-white flex flex-col">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2">
                <Hotel
                  className={cn(
                    "h-6 w-6",
                    admin?.adminDetails?.role === "admin" ||
                      admin?.adminDetails?.role === "super-admin"
                      ? "text-rose-600"
                      : "text-orange-600"
                  )}
                />
                <span className="text-xl font-bold">
                  {admin?.adminDetails?.role === "admin" ||
                  admin?.adminDetails?.role === "super-admin"
                    ? "Admin Panel"
                    : "Owner Panel"}
                </span>
              </div>
            </div>
            <div className="flex-1 py-6 px-4">
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors",
                        pathname === item.href && "bg-gray-100 font-medium"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </div>
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <motion.div
        className="hidden md:flex h-screen flex-col border-r bg-white"
        initial={{ width: 240 }}
        animate={{ width: isCollapsed ? 80 : 240 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 border-b flex items-center justify-between">
          <div
            className={cn(
              "flex items-center gap-2",
              isCollapsed && "justify-center"
            )}
          >
            <Hotel
              className={cn(
                "h-6 w-6 flex-shrink-0",
                admin?.adminDetails?.role === "admin" ||
                  admin?.adminDetails?.role === "super-admin"
                  ? "text-rose-600"
                  : "text-orange-600"
              )}
            />
            {!isCollapsed && (
              <span className="text-xl font-bold whitespace-nowrap">
                {admin?.adminDetails?.role === "admin" ||
                admin?.adminDetails?.role === "super-admin"
                  ? "Admin Panel"
                  : "Owner Panel"}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={isCollapsed ? "ml-0" : ""}
          >
            <ChevronLeft
              className={cn(
                "h-5 w-5 transition-transform",
                isCollapsed && "rotate-180"
              )}
            />
          </Button>
        </div>

        <div className="flex-1 py-6 px-4 overflow-y-auto">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink key={item.href} to={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors",
                    pathname === item.href && "bg-gray-100 font-medium",
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.title}</span>}
                </div>
              </NavLink>
            ))}
          </nav>
        </div>

        <div
          className={cn("p-4 border-t", isCollapsed && "flex justify-center")}
        >
          <Button
            variant="ghost"
            className={cn(
              "text-red-600",
              isCollapsed ? "w-10 h-10 p-0" : "w-full justify-start"
            )}
            onClick={handleLogout}
          >
            <LogOut className={cn("h-5 w-5", !isCollapsed && "mr-2")} />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </motion.div>
    </>
  );
}
