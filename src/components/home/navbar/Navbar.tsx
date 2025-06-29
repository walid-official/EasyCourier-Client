"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout } from "@/utils/auth";
import { auth, signOut } from "@/auth"; // adjust if needed

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null); // or your session type
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchSession = async () => {
      const s = await auth();
      setSession(s);
    };
    fetchSession();
  }, []);

  const isLoggedIn = isAuthenticated() || session?.user;

  const handleLogin = () => {
    setIsMenuOpen(false);
    router.push("/signin");
  };

  const handleLogout = async () => {
    setIsMenuOpen(false);
    if (session?.user) {
      await signOut(); // Google auth logout
    } else {
      logout() // Clear JWT token or session
    }
    router.push("/"); // Redirect after logout
  };

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-white">EasyCourier</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-slate-300 hover:text-emerald-400 font-medium">Home</a>
            <a href="#about" className="text-slate-300 hover:text-emerald-400 font-medium">About</a>
            <a href="#services" className="text-slate-300 hover:text-emerald-400 font-medium">Services</a>
            <a href="#contact" className="text-slate-300 hover:text-emerald-400 font-medium">Contact</a>
          </div>

          {/* Desktop Login Button */}
          <div className="hidden md:flex">
            <div className="px-3 py-2">
              {isLoggedIn ? (
                <button
                  className="flex items-center px-7 py-3 rounded-md border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                  onClick={handleLogout}
                >
                  <User className="w-4 h-4 mr-2" />
                  Logout
                </button>
              ) : (
                <button
                  className="flex items-center px-7 py-3 rounded-md border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                  onClick={handleLogin}
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-slate-300 hover:text-emerald-400 hover:bg-slate-800"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900">
              {["home", "about", "services", "contact"].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className="block px-3 py-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-md font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
              <div className="px-3 py-2">
                {isLoggedIn ? (
                  <button
                    className="w-full flex items-center px-7 py-3 rounded-md border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                    onClick={handleLogout}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                ) : (
                  <button
                    className="w-full flex items-center px-7 py-3 rounded-md border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                    onClick={handleLogin}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
