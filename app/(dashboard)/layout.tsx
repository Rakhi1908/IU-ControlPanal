// "use client"

// import type React from "react"
// import { useEffect } from "react"
// import { useRouter, usePathname } from "next/navigation"
// import { SidebarProvider } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
// import { useAuth } from "@/components/auth-provider"

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const { isAuthenticated, loading } = useAuth()
//   const router = useRouter()
//   const pathname = usePathname()

//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//       router.push("/auth/login")
//     }
//   }, [loading, isAuthenticated, router])

//   // Show loading state while checking authentication
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-white">Loading...</div>
//       </div>
//     )
//   }

//   // If not authenticated, don't render the dashboard
//   if (!isAuthenticated) {
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-black">
//       <SidebarProvider>
//         <div className="flex w-full">
//           <AppSidebar />
//           <main className="flex-1 w-full overflow-hidden">{children}</main>
//         </div>
//       </SidebarProvider>
//     </div>
//   )
// }


// "use client"

// import type React from "react"
// import { useEffect } from "react"
// import { useRouter, usePathname } from "next/navigation"
// import { SidebarProvider } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
// import { MobileHeader } from "@/components/mobile-header"
// import { useAuth } from "@/components/auth-provider"

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const { isAuthenticated, loading } = useAuth()
//   const router = useRouter()
//   const pathname = usePathname()

//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//       router.push("/auth/login")
//     }
//   }, [loading, isAuthenticated, router])

//   // Show loading state while checking authentication
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-white">Loading...</div>
//       </div>
//     )
//   }

//   // If not authenticated, don't render the dashboard
//   if (!isAuthenticated) {
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-black overflow-hidden">
//       <SidebarProvider defaultOpen={false}>
//         {/* Mobile Header with Burger Menu - Only visible on mobile */}
//         <MobileHeader />

//         <div className="flex w-full min-h-screen">
//           <AppSidebar />
          // <main className="flex-1 w-full min-w-0 overflow-hidden">
          //   {/* Add top padding on mobile to account for mobile header */}
          //   <div className="h-full w-full overflow-y-auto pt-16 md:pt-0">
          //     <div className="p-4 md:p-6">{children}</div>
          //   </div>
          // </main>
//         </div>
//       </SidebarProvider>
//     </div>
//   )
// }



"use client"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { MobileHeader } from "@/components/mobile-header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-screen overflow-hidden bg-black">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content container */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Mobile Header */}
          <MobileHeader />

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 pt-16 md:pt-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
