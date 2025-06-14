// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   TrendingUp,
//   Car,
//   Users,
//   DollarSign,
//   CheckCircle,
//   XCircle,
//   MapPin,
//   Phone,
//   MessageSquare,
//   Navigation,
// } from "lucide-react"
// import { LiveTrackingMap } from "@/components/live-tracking-map"

// // Mock data for dashboard
// const dashboardStats = {
//   todayRides: { count: 1247, growth: 12.5 },
//   totalDrivers: { count: 342, weekly: 28 },
//   todayIncome: { amount: 45670, growth: 8.3 },
//   completedRides: { count: 1189, rate: 95.3 },
//   cancelledRides: { count: 58, rate: 4.7 },
// }

// const recentActivities = [
//   { id: 1, type: "Ride", user: "John Doe", time: "2 mins ago", amount: 250, status: "Completed" },
//   { id: 2, type: "Food", user: "Sarah Khan", time: "5 mins ago", amount: 180, status: "In-progress" },
//   { id: 3, type: "Courier", user: "Mike Wilson", time: "8 mins ago", amount: 120, status: "Pending" },
//   { id: 4, type: "Ride", user: "Priya Sharma", time: "12 mins ago", amount: 320, status: "Completed" },
//   { id: 5, type: "Food", user: "Ahmed Ali", time: "15 mins ago", amount: 450, status: "Completed" },
// ]

// const liveDrivers = [
//   {
//     id: 1,
//     name: "Rajesh Kumar",
//     vehicle: "Honda City - DL-01-AB-1234",
//     location: { lat: 28.6139, lng: 77.209, address: "Connaught Place, Delhi" },
//     passenger: "John Doe",
//     tripId: "TR001",
//     eta: "8 mins",
//     status: "En Route",
//     phone: "+91-9876543210",
//   },
//   {
//     id: 2,
//     name: "Amit Singh",
//     vehicle: "Royal Enfield - DL-02-CD-5678",
//     location: { lat: 28.5355, lng: 77.391, address: "Sector 18, Noida" },
//     passenger: "Sarah Khan",
//     tripId: "FD002",
//     eta: "12 mins",
//     status: "Pickup",
//     phone: "+91-9876543211",
//   },
//   {
//     id: 3,
//     name: "Suresh Yadav",
//     vehicle: "Tata Ace - DL-03-EF-9012",
//     location: { lat: 28.4595, lng: 77.0266, address: "Gurgaon Sector 29" },
//     passenger: "Mike Wilson",
//     tripId: "CR003",
//     eta: "15 mins",
//     status: "Delivery",
//     phone: "+91-9876543212",
//   },
// ]

// export default function Dashboard() {
//   const [activeFilter, setActiveFilter] = useState("All")
//   const [currentTime, setCurrentTime] = useState<string | null>(null)
//   const [selectedDriver, setSelectedDriver] = useState<number | null>(null)

//   useEffect(() => {
//     const update = () => setCurrentTime(new Date().toLocaleTimeString())
//     update()
//     const timer = setInterval(update, 1000)
//     return () => clearInterval(timer)
//   }, [])

//   const filteredActivities =
//     activeFilter === "All" ? recentActivities : recentActivities.filter((activity) => activity.type === activeFilter)

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "En Route":
//         return "bg-blue-600"
//       case "Pickup":
//         return "bg-yellow-600"
//       case "Delivery":
//         return "bg-purple-600"
//       case "Drop Off":
//         return "bg-green-600"
//       default:
//         return "bg-gray-600"
//     }
//   }

//   const handleCall = (phone: string, name: string) => {
//     alert(`Calling ${name} at ${phone}`)
//   }

//   const handleChat = (driverId: number, name: string) => {
//     alert(`Opening chat with ${name}`)
//   }

//   const handleTrack = (driverId: number, name: string) => {
//     setSelectedDriver(driverId)
//   }

//   return (
//     <div className="w-full h-full">
//       <div className="p-6 space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
//             <p className="text-gray-400">Welcome back! Here's what's happening with IdharUdhar today.</p>
//           </div>
//           <div className="text-right">
//             <p className="text-sm text-gray-400 mb-1">Current Time</p>
//             <p className="text-xl font-mono text-green-400 font-bold">{currentTime ?? "Loading..."}</p>
//           </div>
//         </div>

//         {/* Live Tracking Section */}
//         <Card className="bg-gray-900/50 border-gray-800">
//           <CardHeader className="pb-4">
//             <CardTitle className="text-white flex items-center text-xl">
//               <MapPin className="h-5 w-5 mr-3 text-green-400" />
//               Live Driver Tracking
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Live Map */}
//               <div className="lg:col-span-2 h-80 bg-gray-800/50 rounded-xl border border-gray-700">
//                 <LiveTrackingMap drivers={liveDrivers} selectedDriver={selectedDriver} />
//               </div>

//               {/* Driver List */}
//               <div className="space-y-3 max-h-80 overflow-y-auto">
//                 {liveDrivers.map((driver) => (
//                   <div
//                     key={driver.id}
//                     className={`p-4 bg-gray-800/70 rounded-xl border transition-all duration-200 ${
//                       selectedDriver === driver.id ? "border-green-500 bg-gray-800" : "border-gray-700"
//                     }`}
//                   >
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex-1">
//                         <h4 className="text-white font-semibold text-base">{driver.name}</h4>
//                         <p className="text-gray-400 text-sm">{driver.vehicle}</p>
//                         <p className="text-gray-300 text-sm mt-1">{driver.location.address}</p>
//                       </div>
//                       <div className="text-right">
//                         <Badge className={`${getStatusColor(driver.status)} text-white text-xs px-2 py-1`}>
//                           {driver.status}
//                         </Badge>
//                         <p className="text-green-400 font-semibold text-sm mt-1">ETA: {driver.eta}</p>
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => handleCall(driver.phone, driver.name)}
//                         className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white text-xs px-3 py-1 h-8"
//                       >
//                         <Phone className="h-3 w-3 mr-1" />
//                         Call
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => handleChat(driver.id, driver.name)}
//                         className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white text-xs px-3 py-1 h-8"
//                       >
//                         <MessageSquare className="h-3 w-3 mr-1" />
//                         Chat
//                       </Button>
//                       <Button
//                         size="sm"
//                         onClick={() => handleTrack(driver.id, driver.name)}
//                         className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 h-8"
//                       >
//                         <Navigation className="h-3 w-3 mr-1" />
//                         Track
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//           <Card className="bg-gray-900/50 border-gray-800">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-400">Today's Rides</CardTitle>
//               <Car className="h-4 w-4 text-green-400" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-white">{dashboardStats.todayRides.count}</div>
//               <div className="flex items-center text-xs text-green-400 mt-1">
//                 <TrendingUp className="h-3 w-3 mr-1" />+{dashboardStats.todayRides.growth}% from yesterday
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gray-900/50 border-gray-800">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-400">Total Drivers</CardTitle>
//               <Users className="h-4 w-4 text-green-400" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-white">{dashboardStats.totalDrivers.count}</div>
//               <div className="text-xs text-gray-400 mt-1">+{dashboardStats.totalDrivers.weekly} this week</div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gray-900/50 border-gray-800">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-400">Today's Income</CardTitle>
//               <DollarSign className="h-4 w-4 text-green-400" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-white">₹{dashboardStats.todayIncome.amount.toLocaleString()}</div>
//               <div className="flex items-center text-xs text-green-400 mt-1">
//                 <TrendingUp className="h-3 w-3 mr-1" />+{dashboardStats.todayIncome.growth}% from yesterday
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gray-900/50 border-gray-800">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-400">Completed Rides</CardTitle>
//               <CheckCircle className="h-4 w-4 text-green-400" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-white">{dashboardStats.completedRides.count}</div>
//               <div className="text-xs text-green-400 mt-1">{dashboardStats.completedRides.rate}% success rate</div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gray-900/50 border-gray-800">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-400">Cancelled Rides</CardTitle>
//               <XCircle className="h-4 w-4 text-red-400" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-white">{dashboardStats.cancelledRides.count}</div>
//               <div className="text-xs text-red-400 mt-1">{dashboardStats.cancelledRides.rate}% cancellation rate</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Activities */}
//         <Card className="bg-gray-900/50 border-gray-800">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle className="text-white text-xl">Recent Activities</CardTitle>
//               <div className="flex space-x-2">
//                 {["All", "Ride", "Food", "Courier"].map((filter) => (
//                   <Button
//                     key={filter}
//                     variant={activeFilter === filter ? "default" : "outline"}
//                     size="sm"
//                     onClick={() => setActiveFilter(filter)}
//                     className={
//                       activeFilter === filter
//                         ? "bg-green-600 hover:bg-green-700 text-white border-green-600"
//                         : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
//                     }
//                   >
//                     {filter}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {filteredActivities.map((activity) => (
//                 <div
//                   key={activity.id}
//                   className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <Badge
//                       variant="outline"
//                       className={`
//                         ${activity.type === "Ride" ? "border-blue-500 text-blue-400 bg-blue-500/10" : ""}
//                         ${activity.type === "Food" ? "border-orange-500 text-orange-400 bg-orange-500/10" : ""}
//                         ${activity.type === "Courier" ? "border-purple-500 text-purple-400 bg-purple-500/10" : ""}
//                       `}
//                     >
//                       {activity.type}
//                     </Badge>
//                     <div>
//                       <p className="text-white font-medium">{activity.user}</p>
//                       <p className="text-gray-400 text-sm">{activity.time}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <p className="text-white font-semibold">₹{activity.amount}</p>
//                     <Badge
//                       className={`
//                         ${activity.status === "Completed" ? "bg-green-600 text-white" : ""}
//                         ${activity.status === "In-progress" ? "bg-yellow-600 text-white" : ""}
//                         ${activity.status === "Pending" ? "bg-gray-600 text-white" : ""}
//                       `}
//                     >
//                       {activity.status}
//                     </Badge>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Car,
  Users,
  MapPin,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-sm md:text-base text-gray-400 mt-1">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            <Activity className="h-4 w-4 mr-2" />
            Live View
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <TrendingUp className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Vehicles</CardTitle>
            <Car className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,247</div>
            <p className="text-xs text-gray-400">
              <span className="text-green-500">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">8,432</div>
            <p className="text-xs text-gray-400">
              <span className="text-green-500">+5.2%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Live Tracking</CardTitle>
            <MapPin className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">892</div>
            <p className="text-xs text-gray-400">Vehicles currently active</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹2,45,678</div>
            <p className="text-xs text-gray-400">
              <span className="text-green-500">+8.1%</span> from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Activities</CardTitle>
            <CardDescription className="text-gray-400">Latest updates from your fleet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                icon: CheckCircle,
                text: "Vehicle DL-01-AB-1234 completed route",
                time: "2 min ago",
                status: "success",
              },
              {
                icon: AlertTriangle,
                text: "Complaint received for booking #12345",
                time: "5 min ago",
                status: "warning",
              },
              { icon: Car, text: "New vehicle DL-02-CD-5678 added to fleet", time: "10 min ago", status: "info" },
              { icon: XCircle, text: "Vehicle DL-03-EF-9012 reported breakdown", time: "15 min ago", status: "error" },
              { icon: Users, text: "50 new user registrations today", time: "1 hour ago", status: "success" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors duration-200"
              >
                <activity.icon
                  className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                    activity.status === "success"
                      ? "text-green-500"
                      : activity.status === "warning"
                        ? "text-yellow-500"
                        : activity.status === "error"
                          ? "text-red-500"
                          : "text-blue-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{activity.text}</p>
                  <p className="text-xs text-gray-400 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-4 md:space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Fleet Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Active</span>
                  <span className="text-green-500">892 (71.6%)</span>
                </div>
                <Progress value={71.6} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Maintenance</span>
                  <span className="text-yellow-500">234 (18.8%)</span>
                </div>
                <Progress value={18.8} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Offline</span>
                  <span className="text-red-500">121 (9.7%)</span>
                </div>
                <Progress value={9.7} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 p-2 rounded bg-red-900/20 border border-red-800">
                <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-red-400 truncate">3 vehicles need immediate attention</p>
                </div>
                <Badge variant="destructive" className="text-xs">
                  High
                </Badge>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded bg-yellow-900/20 border border-yellow-800">
                <Clock className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-yellow-400 truncate">12 pending complaints</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Medium
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
