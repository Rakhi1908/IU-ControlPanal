"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, User, Search, AlertCircle, CheckCircle, DollarSign, Phone, Mail } from "lucide-react"

const complaints = [
  {
    id: 1,
    customer: "John Doe",
    platform: "Uber",
    issue: "Driver was rude and took longer route",
    date: "2024-01-15 14:30",
    messageCount: 5,
    status: "Investigating",
    refundStatus: "Pending",
    priority: "High",
    amount: 250,
    messages: [
      {
        sender: "John Doe",
        message: "The driver was very rude and took a longer route than necessary.",
        time: "14:30",
      },
      {
        sender: "Support",
        message: "We apologize for the inconvenience. We are looking into this matter.",
        time: "14:45",
      },
      { sender: "John Doe", message: "I want a full refund for this trip.", time: "15:00" },
      {
        sender: "Support",
        message: "We have initiated the refund process. It will be processed within 3-5 business days.",
        time: "15:15",
      },
      { sender: "John Doe", message: "Thank you for the quick response.", time: "15:20" },
    ],
  },
  {
    id: 2,
    customer: "Sarah Khan",
    platform: "Swiggy",
    issue: "Food delivered cold and incomplete order",
    date: "2024-01-15 19:45",
    messageCount: 3,
    status: "Resolved",
    refundStatus: "Completed",
    priority: "Medium",
    amount: 180,
    messages: [
      { sender: "Sarah Khan", message: "My food was delivered cold and one item was missing.", time: "19:45" },
      {
        sender: "Support",
        message: "We sincerely apologize. We will process a full refund immediately.",
        time: "19:50",
      },
      { sender: "Sarah Khan", message: "Thank you for resolving this quickly.", time: "20:00" },
    ],
  },
  {
    id: 3,
    customer: "Mike Wilson",
    platform: "Porter",
    issue: "Package damaged during delivery",
    date: "2024-01-14 11:20",
    messageCount: 7,
    status: "Pending",
    refundStatus: "Not Applicable",
    priority: "High",
    amount: 120,
    messages: [
      {
        sender: "Mike Wilson",
        message: "My package was damaged during delivery. The box was completely crushed.",
        time: "11:20",
      },
      {
        sender: "Support",
        message: "We are sorry to hear about the damage. Can you please share photos of the damaged package?",
        time: "11:30",
      },
      { sender: "Mike Wilson", message: "I have attached the photos. This is unacceptable service.", time: "11:45" },
    ],
  },
  {
    id: 4,
    customer: "Priya Sharma",
    platform: "Uber",
    issue: "Overcharged for the trip",
    date: "2024-01-14 16:15",
    messageCount: 4,
    status: "Refunded",
    refundStatus: "Completed",
    priority: "Low",
    amount: 320,
    messages: [
      { sender: "Priya Sharma", message: "I was charged ₹320 for a trip that should have cost ₹200.", time: "16:15" },
      { sender: "Support", message: "Let us review your trip details and fare calculation.", time: "16:30" },
      { sender: "Support", message: "You are correct. We have processed a refund of ₹120.", time: "17:00" },
      { sender: "Priya Sharma", message: "Thank you for the refund.", time: "17:15" },
    ],
  },
]

export default function ComplaintManagement() {
  const [activeTab, setActiveTab] = useState("All")
  const [selectedComplaint, setSelectedComplaint] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesTab = activeTab === "All" || complaint.status === activeTab
    const matchesSearch =
      complaint.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.platform.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-600"
      case "Investigating":
        return "bg-yellow-600"
      case "Pending":
        return "bg-red-600"
      case "Refunded":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-400"
      case "Medium":
        return "text-yellow-400"
      case "Low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Uber":
        return "bg-black text-white"
      case "Swiggy":
        return "bg-orange-600 text-white"
      case "Porter":
        return "bg-blue-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Complaint Management</h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">Manage customer complaints across all platforms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Complaints List */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="text-white text-xl sm:text-2xl">Customer Complaints</CardTitle>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4 w-full">
                <ScrollArea className="w-full whitespace-nowrap pb-2">
                  <TabsList className="bg-gray-800 border-gray-700 h-auto flex-wrap justify-start">
                    <TabsTrigger value="All" className="data-[state=active]:bg-green-600 px-3 py-1 text-sm">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="Pending" className="data-[state=active]:bg-green-600 px-3 py-1 text-sm">
                      Pending
                    </TabsTrigger>
                    <TabsTrigger value="Investigating" className="data-[state=active]:bg-green-600 px-3 py-1 text-sm">
                      Investigating
                    </TabsTrigger>
                    <TabsTrigger value="Resolved" className="data-[state=active]:bg-green-600 px-3 py-1 text-sm">
                      Resolved
                    </TabsTrigger>
                    <TabsTrigger value="Refunded" className="data-[state=active]:bg-green-600 px-3 py-1 text-sm">
                      Refunded
                    </TabsTrigger>
                  </TabsList>
                </ScrollArea>
              </Tabs>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-280px)] lg:h-[600px] pr-2"> {/* Adjusted height for mobile */}
                <div className="space-y-4">
                  {filteredComplaints.length > 0 ? (
                    filteredComplaints.map((complaint) => (
                      <div
                        key={complaint.id}
                        className={`p-3 sm:p-4 bg-gray-800 rounded-lg border-2 cursor-pointer transition-colors ${
                          selectedComplaint === complaint.id
                            ? "border-green-500"
                            : "border-transparent hover:border-gray-700"
                        }`}
                        onClick={() => setSelectedComplaint(complaint.id)}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 sm:gap-0">
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-medium text-base sm:text-lg">{complaint.customer}</h3>
                              <div className="flex items-center flex-wrap gap-x-2 mt-1">
                                <Badge className={`${getPlatformColor(complaint.platform)} text-xs sm:text-sm`}>{complaint.platform}</Badge>
                                <span className={`text-xs sm:text-sm ${getPriorityColor(complaint.priority)}`}>
                                  {complaint.priority} Priority
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <Badge className={`${getStatusColor(complaint.status)} text-white mb-1 text-xs sm:text-sm`}>
                              {complaint.status}
                            </Badge>
                            <p className="text-gray-400 text-xs">{complaint.date}</p>
                          </div>
                        </div>

                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{complaint.issue}</p>

                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-400 text-xs sm:text-sm">{complaint.messageCount} messages</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-400 text-xs sm:text-sm">₹{complaint.amount}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                complaint.refundStatus === "Completed"
                                  ? "border-green-500 text-green-400"
                                  : complaint.refundStatus === "Pending"
                                    ? "border-yellow-500 text-yellow-400"
                                    : "border-gray-500 text-gray-400"
                              }`}
                            >
                              {complaint.refundStatus}
                            </Badge>
                            {complaint.status === "Investigating" && (
                              <Badge className="bg-green-600 text-white text-xs">Live Support</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">No complaints found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Complaint Detail Panel */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">
                {selectedComplaint ? "Complaint Details" : "Select a Complaint"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedComplaint ? (
                <div className="space-y-4">
                  {(() => {
                    const complaint = complaints.find((c) => c.id === selectedComplaint)
                    if (!complaint) return null

                    return (
                      <>
                        {/* Customer Info */}
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <h4 className="text-white font-medium mb-2 text-base sm:text-lg">Customer Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Name:</span>
                              <span className="text-white">{complaint.customer}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Platform:</span>
                              <Badge className={getPlatformColor(complaint.platform)}>{complaint.platform}</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Amount:</span>
                              <span className="text-white">₹{complaint.amount}</span>
                            </div>
                          </div>
                        </div>

                        {/* Issue Summary */}
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <h4 className="text-white font-medium mb-2 text-base sm:text-lg">Issue Summary</h4>
                          <p className="text-gray-300 text-sm">{complaint.issue}</p>
                        </div>

                        {/* Chat History */}
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <h4 className="text-white font-medium mb-2 text-base sm:text-lg">Chat History</h4>
                          <ScrollArea className="h-48 sm:h-64 pr-2">
                            <div className="space-y-3">
                              {complaint.messages.map((message, index) => (
                                <div
                                  key={index}
                                  className={`p-2 rounded text-sm ${
                                    message.sender === "Support"
                                      ? "bg-green-600/20 border-l-2 border-green-500"
                                      : "bg-gray-700"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-white">{message.sender}</span>
                                    <span className="text-xs text-gray-400">{message.time}</span>
                                  </div>
                                  <p className="text-gray-300">{message.message}</p>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-gray-400 hover:bg-gray-800 text-xs sm:text-sm"
                            >
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-gray-400 hover:bg-gray-800 text-xs sm:text-sm"
                            >
                              <Mail className="h-3 w-3 mr-1" />
                              Email
                            </Button>
                          </div>
                          {complaint.status !== "Resolved" && complaint.status !== "Refunded" && (
                            <Button
                              variant="outline"
                              className="w-full border-yellow-600 text-yellow-400 hover:bg-yellow-600/10 text-sm sm:text-base"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Resolved
                            </Button>
                          )}
                        </div>
                      </>
                    )
                  })()}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Select a complaint to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> {/* Adjusted to 2 columns on mobile */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-white">{complaints.length}</p>
              <p className="text-gray-400 text-xs sm:text-sm">Total Complaints</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-red-400">
                {complaints.filter((c) => c.status === "Pending").length}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-green-400">
                {complaints.filter((c) => c.status === "Resolved" || c.status === "Refunded").length}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">Resolved</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-400">
                {complaints.filter((c) => c.refundStatus === "Completed").length}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">Refunded</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}