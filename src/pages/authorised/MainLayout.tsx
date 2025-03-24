import { Routes, Route, useNavigate } from "react-router-dom";
import { Bell, Cog } from "lucide-react";
import { IdeaHub } from "../../components/IdeaHub";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Network, Users, PhoneCall, Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ExpertConsultation } from "../../components/ExpertConsultation";
import Dashboard from "./Dashboard";
import Board from "./Board";
import Footer from "../../components/Footer";
import { useAppContextData } from "../../lib/AppContext";
import ErrorPage from "./ErrorPage";
import { UserProfile } from "./UserProfile";

const navigation = [
  { name: "Dashboard", href: "/home", icon: LayoutDashboard },
  { name: "Idea Hub", href: "/ideas", icon: Network },
  { name: "Talk to Experts", href: "/experts", icon: PhoneCall },
  { name: "Profile", href: "/profile", icon: Users },
];

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { name, clearUser } = useAppContextData();
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest(".dropdown") === null) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow w-full">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Prosar" className="h-8 w-32" />
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 bg-gray-900 rounded-md text-white md:hidden"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              {name}
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <div className="relative dropdown">
              <button
                onClick={toggleDropdown}
                className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden focus:outline-none"
              >
                <img src="/user.png" alt="User" className="h-full w-full object-cover" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <ul>
                    <li onClick={()=>{navigate("/profile")}}>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setShowLogoutConfirm(true); // Show confirmation modal
                        }}
                      >
                        Logout
                      </button>
                    </li>

                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {isMobile && isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleSidebar}
          />
        )}

        <AnimatePresence>
          {(isOpen || !isMobile) && (
            <motion.div
              initial={{ x: isMobile ? -280 : 0 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "w-64 bg-gray-900 z-40 h-screen flex flex-col",
                isMobile ? "fixed" : "relative"
              )}
            >
              <div className="flex-1 overflow-y-auto px-2 py-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={() => isMobile && setIsOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150",
                          isActive
                            ? "bg-gray-800 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        )
                      }
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </NavLink>
                  );
                })}
              </div>
              <div className="px-2 py-4 border-t border-gray-800">
                <div className="flex items-center px-2 py-2 text-sm font-medium text-gray-300">
                  <Cog className="mr-3 h-5 w-5" />
                  Version 2.0.1
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] overflow-auto">

          <Routes>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/ideas" element={<IdeaHub />} />
            <Route path="/experts" element={<ExpertConsultation />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/board/:boardId" element={<Board />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </div>

        {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
              <p className="mb-6 text-sm text-gray-600">Are you sure you want to logout?</p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm rounded bg-red-500 text-white hover:bg-red-600"
                  onClick={() => {
                    clearUser();
                    navigate("/login");
                    setShowLogoutConfirm(false);
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}


      </div>

      <Footer />
    </div>
  );
}