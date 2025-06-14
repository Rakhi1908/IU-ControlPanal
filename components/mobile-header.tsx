"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Globe, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function MobileHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950 border-b border-gray-800 md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Burger Menu + Logo */}
        <div className="flex items-center space-x-3">
          <SidebarTrigger className="h-8 w-8 bg-transparent border-none text-white hover:bg-gray-800 transition-colors duration-200" />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">IdharUdhar</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Right side - Notifications */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Bell className="h-5 w-5 text-gray-400" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-red-600 text-white text-xs flex items-center justify-center">
              3
            </Badge>
          </div>
        </div>
      </div>
    </header>
  )
}
