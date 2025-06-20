// "use client"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar"
// import { Badge } from "@/components/ui/badge"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import {
//   LayoutDashboard,
//   Car,
//   MapPin,
//   MessageSquareMore,
//   Route,
//   Users,
//   Settings,
//   BarChart3,
//   Globe,
//   CreditCard,
//   HeadphonesIcon,
//   ChevronDown,
//   User,
//   LogOut,
//   Bell,
// } from "lucide-react"
// import { useAuth } from "@/components/auth-provider"
// import { useToast } from "@/hooks/use-toast"

// const menuItems = [
//   {
//     title: "Dashboard",
//     url: "/",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "Fleet Management",
//     url: "/fleet",
//     icon: Car,
//   },
//   {
//     title: "Live Tracking",
//     url: "/tracking",
//     icon: MapPin,
//   },
//   {
//     title: "Complaints",
//     url: "/complaints",
//     icon: MessageSquareMore,
//     badge: "12",
//   },
//   {
//     title: "Rides Management",
//     url: "/rides",
//     icon: Route,
//   },
//   {
//     title: "User Management",
//     url: "/users",
//     icon: Users,
//   },
//   {
//     title: "Payments",
//     url: "/payments",
//     icon: CreditCard,
//   },
//   {
//     title: "Reports",
//     url: "/reports",
//     icon: BarChart3,
//   },
//   {
//     title: "Support",
//     url: "/support",
//     icon: HeadphonesIcon,
//   },
 
// ]

// export function AppSidebar() {
//   const pathname = usePathname()
//   const { logout } = useAuth()
//   const { toast } = useToast()

//   const handleLogout = () => {
//     logout()
//     toast({
//       title: "Logged Out",
//       description: "You have been successfully logged out.",
//     })
//   }

//   return (
//     <Sidebar className="border-r border-gray-800 bg-gray-950" collapsible="offcanvas">
//       <SidebarHeader className="border-b border-gray-800 bg-[#050505]">
//         <div className="flex items-center space-x-3 px-4 py-4">
//           <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
//             <Globe className="h-6 w-6 text-white" />
//           </div>
//           <div className="min-w-0 flex-1">
//             <h2 className="text-xl font-bold text-white truncate">IdharUdhar</h2>
//             <p className="text-xs text-gray-400">Control Panel</p>
//           </div>
//         </div>
//       </SidebarHeader>

//       <SidebarContent className="bg-gray-950">
//         <SidebarGroup>
//           <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider px-4 py-2">
//             Main Navigation
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {menuItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton
//                     asChild
//                     isActive={pathname === item.url}
//                     className="text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:bg-green-600 data-[active=true]:text-white mx-2 rounded-lg transition-all duration-200"
//                   >
//                     <Link href={item.url} className="flex items-center space-x-3 px-3 py-2 min-w-0">
//                       <item.icon className="h-5 w-5 flex-shrink-0" />
//                       <span className="font-medium truncate">{item.title}</span>
//                       {item.badge && (
//                         <Badge className="ml-auto bg-red-600 text-white text-xs px-2 py-0.5 flex-shrink-0">
//                           {item.badge}
//                         </Badge>
//                       )}
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       <SidebarFooter className="border-t border-gray-800 bg-[#050505]">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <SidebarMenuButton className="text-gray-300 hover:text-white hover:bg-gray-800 mx-2 rounded-lg transition-all duration-200">
//                   <div className="flex items-center space-x-3 w-full px-3 py-2 min-w-0">
//                     <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
//                       <User className="h-4 w-4 text-white" />
//                     </div>
//                     <div className="flex-1 text-left min-w-0">
//                       <p className="text-sm font-medium truncate">Admin User</p>
//                       <p className="text-xs text-gray-400 truncate">Super Admin</p>
//                     </div>
//                     <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
//                   </div>
//                 </SidebarMenuButton>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width] bg-gray-800 border-gray-700">
//                 <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200">
//                   <User className="h-4 w-4 mr-2" />
//                   Profile Settings
//                 </DropdownMenuItem>
//                 <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200">
//                   <Bell className="h-4 w-4 mr-2" />
//                   Notifications
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   className="text-red-400 hover:bg-red-600/10 focus:bg-red-600/10 transition-colors duration-200"
//                   onClick={handleLogout}
//                 >
//                   <LogOut className="h-4 w-4 mr-2" />
//                   Sign Out
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   )
// }


"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Car,
  MapPin,
  MessageSquareMore,
  Route,
  Users,
  BarChart3,
  Globe,
  CreditCard,
  HeadphonesIcon,
  ChevronDown,
  User,
  LogOut,
  Bell,
  X,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Fleet Management",
    url: "/fleet",
    icon: Car,
  },
  {
    title: "Live Tracking",
    url: "/tracking",
    icon: MapPin,
  },
  {
    title: "Complaints",
    url: "/complaints",
    icon: MessageSquareMore,
    badge: "12",
  },
  {
    title: "Rides Management",
    url: "/rides",
    icon: Route,
  },
  {
    title: "User Management",
    url: "/users",
    icon: Users,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: CreditCard,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "Support",
    url: "/support",
    icon: HeadphonesIcon,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const { toast } = useToast()
  const { setOpenMobile, isMobile } = useSidebar()

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  // Close sidebar when navigation link is clicked on mobile
  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  // Close sidebar when clicking the X button
  const handleCloseSidebar = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar
      className="border-r border-gray-800 bg-gray-950 transition-transform duration-300 ease-in-out"
      collapsible="offcanvas"
    >
      <SidebarHeader className="border-b border-gray-800 bg-[#050505]">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold text-white truncate">IdharUdhar</h2>
              <p className="text-xs text-gray-400">Control Panel</p>
            </div>
          </div>
          {/* Close button - only visible on mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCloseSidebar}
            className="md:hidden h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gray-950">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider px-4 py-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:bg-green-600 data-[active=true]:text-white mx-2 rounded-lg transition-all duration-200"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center space-x-3 px-3 py-2 min-w-0"
                      onClick={handleNavClick}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium truncate">{item.title}</span>
                      {item.badge && (
                        <Badge className="ml-auto bg-red-600 text-white text-xs px-2 py-0.5 flex-shrink-0">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-800 bg-[#050505]">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="text-gray-300 hover:text-white hover:bg-gray-800 mx-2 rounded-lg transition-all duration-200">
                  <div className="flex items-center space-x-3 w-full px-3 py-2 min-w-0">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-medium truncate">Admin User</p>
                      <p className="text-xs text-gray-400 truncate">Super Admin</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width] bg-gray-800 border-gray-700">
                <DropdownMenuItem
                  className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200"
                  onClick={handleNavClick}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-gray-300 hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200"
                  onClick={handleNavClick}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-400 hover:bg-red-600/10 focus:bg-red-600/10 transition-colors duration-200"
                  onClick={() => {
                    handleLogout()
                    handleNavClick()
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
