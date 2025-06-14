"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Phone, MessageSquare, Navigation, Users, Activity, Globe } from "lucide-react"

const liveDrivers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    vehicle: "Honda City - DL-01-AB-1234",
    location: { lat: 28.6139, lng: 77.209, address: "Connaught Place, Delhi" },
    passenger: "John Doe",
    tripId: "TR001",
    eta: "8 mins",
    status: "En Route",
    phone: "+91-9876543210",
  },
  {
    id: 2,
    name: "Amit Singh",
    vehicle: "Royal Enfield - DL-02-CD-5678",
    location: { lat: 28.5355, lng: 77.391, address: "Sector 18, Noida" },
    passenger: "Sarah Khan",
    tripId: "FD002",
    eta: "12 mins",
    status: "Pickup",
    phone: "+91-9876543211",
  },
  {
    id: 3,
    name: "Suresh Yadav",
    vehicle: "Tata Ace - DL-03-EF-9012",
    location: { lat: 28.4595, lng: 77.0266, address: "Gurgaon Sector 29" },
    passenger: "Mike Wilson",
    tripId: "CR003",
    eta: "15 mins",
    status: "Delivery",
    phone: "+91-9876543212",
  },
  {
    id: 4,
    name: "Priya Sharma",
    vehicle: "Maruti Swift - DL-04-GH-3456",
    location: { lat: 28.7041, lng: 77.1025, address: "Rohini, Delhi" },
    passenger: "Ahmed Ali",
    tripId: "TR004",
    eta: "5 mins",
    status: "Drop Off",
    phone: "+91-9876543213",
  },
  {
    id: 5,
    name: "Vikash Gupta",
    vehicle: "Honda Activa - DL-05-IJ-7890",
    location: { lat: 28.6692, lng: 77.4538, address: "Laxmi Nagar, Delhi" },
    passenger: "Priya Patel",
    tripId: "FD005",
    eta: "20 mins",
    status: "En Route",
    phone: "+91-9876543214",
  },
]

const trackingStats = {
  activeTrips: 127,
  totalDrivers: 342,
  averageETA: "12 mins",
  coverageArea: "450 km²",
}

export default function LiveTracking() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Route":
        return "bg-blue-600"
      case "Pickup":
        return "bg-yellow-600"
      case "Delivery":
        return "bg-purple-600"
      case "Drop Off":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Live Tracking Dashboard</h1>
          <p className="text-gray-400 mt-1">Real-time monitoring of all active drivers and trips</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Last Updated</p>
          <p className="text-lg font-mono text-green-400">{currentTime.toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            title: "Active Trips",
            value: trackingStats.activeTrips,
            icon: <Activity className="h-4 w-4 text-green-400" />,
            desc: "Live tracking enabled",
          },
          {
            title: "Total Drivers",
            value: trackingStats.totalDrivers,
            icon: <Users className="h-4 w-4 text-green-400" />,
            desc: "Online and available",
          },
          {
            title: "Average ETA",
            value: trackingStats.averageETA,
            icon: <Clock className="h-4 w-4 text-green-400" />,
            desc: "Across all trips",
          },
          {
            title: "Coverage Area",
            value: trackingStats.coverageArea,
            icon: <Globe className="h-4 w-4 text-green-400" />,
            desc: "Service coverage",
          },
        ].map((stat, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.desc}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map Placeholder */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Live Map View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20"></div>
            <div className="text-center z-10">
              <MapPin className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <p className="text-white text-lg font-medium">Interactive Map</p>
              <p className="text-gray-400">Real-time driver locations and routes</p>
              <Button className="mt-4 bg-green-600 hover:bg-green-700">
                <Navigation className="h-4 w-4 mr-2" />
                View Full Map
              </Button>
            </div>
            <div className="absolute top-20 left-20 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-32 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-24 left-40 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
        </CardContent>
      </Card>

      {/* Live Driver Status */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Live Driver Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {liveDrivers.map((driver) => (
              <div
                key={driver.id}
                className={`p-4 bg-gray-800 rounded-lg border-2 transition-colors cursor-pointer ${
                  selectedDriver === driver.id ? "border-green-500" : "border-transparent hover:border-gray-700"
                }`}
                onClick={() => setSelectedDriver(selectedDriver === driver.id ? null : driver.id)}
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {driver.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{driver.name}</h3>
                      <p className="text-gray-400 text-sm">{driver.vehicle}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={`${getStatusColor(driver.status)} text-white`}>{driver.status}</Badge>
                    <div className="text-right">
                      <p className="text-white font-medium">ETA: {driver.eta}</p>
                      <p className="text-gray-400 text-sm">Trip: {driver.tripId}</p>
                    </div>
                  </div>
                </div>

                {selectedDriver === driver.id && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Trip Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400">Passenger:</span>
                            <span className="text-white">{driver.passenger}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400">Location:</span>
                            <span className="text-white">{driver.location.address}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Actions</h4>
                        <div className="flex space-x-2">
                          {[
                            { icon: Phone, label: "Call" },
                            { icon: MessageSquare, label: "Chat" },
                            { icon: Navigation, label: "Track", primary: true },
                          ].map(({ icon: Icon, label, primary }, index) => (
                            <Button
                              key={index}
                              size="sm"
                              className={`p-2 sm:px-4 sm:py-2 rounded-full sm:rounded-md ${
                                primary
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "border border-gray-700 text-gray-400 hover:bg-gray-700"
                              }`}
                            >
                              <Icon className="h-4 w-4 sm:mr-1" />
                              <span className="hidden sm:inline">{label}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
