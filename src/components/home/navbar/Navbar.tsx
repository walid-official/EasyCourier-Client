"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X, User } from "lucide-react"

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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
            <a
              href="#home"
              className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 font-medium"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 font-medium"
            >
              About
            </a>
            <a
              href="#services"
              className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 font-medium"
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 font-medium"
            >
              Contact
            </a>
          </div>

          {/* Desktop Login Button */}
          <div className="hidden md:flex">
            <Button
              variant="outline"
              className="bg-transparent border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-200"
            >
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
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
              <a
                href="#home"
                className="block px-3 py-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-md transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-md transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#services"
                className="block px-3 py-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-md transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-md transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="px-3 py-2">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
