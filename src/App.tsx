import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Bell, Cog } from "lucide-react";
import { IdeaHub } from "./components/IdeaHub";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Network, Users, Menu, X } from "lucide-react";
import { cn } from "./lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ExpertConsultation } from "./components/ExpertConsultation";
import Dashboard from "./Dashboard";
import Board from "./Board";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";
import { AppContextProvider, useAppContextData } from "./AppContext";

const navigation = [
  { name: "Dashboard", href: "/app", icon: LayoutDashboard },
  { name: "Idea Hub", href: "/app/ideas", icon: Network },
  { name: "Talk to Experts", href: "/app/experts", icon: Users },
];

function MainLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
                    <li>
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
                        onClick={() => {setIsDropdownOpen(false); clearUser();  navigate('/login'); }}
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
            <Route path="/board/:boardId" element={<Board />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          {/* Auth Pages (Separate from Main Layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Main App Pages */}
          <Route path="/*" element={<MainLayout />} />

        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
