"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, ArrowLeft, Car, Bike, Truck, MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedRoad } from "@/components/animated-road"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import { sendOtp, verifyOtp } from "@/lib/api-service"

export default function LoginInterface() {
  const { toast } = useToast()
  const { login } = useAuth()
  const [currentStep, setCurrentStep] = useState("email")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [countdown, setCountdown] = useState(0)

  // This effect ensures we transition to OTP page when OTP is sent successfully
  useEffect(() => {
    if (otpSent) {
      setCurrentStep("otp")
    }
  }, [otpSent])

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError("")
    setSuccessMessage("")

    // Validate email before proceeding
    if (!email) {
      setEmailError("Email is required")
      return
    }

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      const response = await sendOtp(email)
      console.log("Send OTP response:", response)

      // Check if the response contains a success message
      if (response.success || (response.message && response.message.toLowerCase().includes("success"))) {
        // Set success state and message
        setSuccessMessage(response.message || "OTP sent successfully")
        setOtpSent(true)
        setCountdown(60)

        toast({
          title: "Success",
          description: response.message || "OTP sent successfully",
          variant: "default",
        })

        // Force transition to OTP page
        setCurrentStep("otp")
      } else {
        // Handle error
        setEmailError(response.message || "Failed to send OTP. Please try again.")
        toast({
          title: "Error",
          description: response.message || "Failed to send OTP. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      // Handle unexpected errors
      setEmailError("An unexpected error occurred. Please try again.")
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value) || value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }

    // Auto-submit when complete
    if (newOtp.every((digit) => digit !== "") && index === 5) {
      handleVerifyOtp(newOtp.join(""))
    }
  }

  const handleVerifyOtp = async (otpCode: string) => {
    setIsLoading(true)

    try {
      const response = await verifyOtp(email, otpCode)

      if (response.success || (response.message && response.message.toLowerCase().includes("success"))) {
        setOtpVerified(true)
        toast({
          title: "✅ Verification Successful!",
          description: "Redirecting to admin dashboard...",
          variant: "default",
        })

        // Generate auth token and login
        const authToken =
          response.token ||
          response.data?.token ||
          `auth_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        // Use the login function from AuthProvider
        setTimeout(() => {
          login(authToken)
        }, 1500)
      } else {
        // Clear OTP on error
        setOtp(["", "", "", "", "", ""])
        document.getElementById("otp-0")?.focus()

        toast({
          title: "Error",
          description: response.message || "Invalid OTP. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setOtp(["", "", "", "", "", ""])
      document.getElementById("otp-0")?.focus()

      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (countdown > 0) return

    setIsLoading(true)

    try {
      const response = await sendOtp(email)

      if (response.success || (response.message && response.message.toLowerCase().includes("success"))) {
        setCountdown(60)
        setOtp(["", "", "", "", "", ""])
        document.getElementById("otp-0")?.focus()

        toast({
          title: "Success",
          description: response.message || "A new verification code has been sent to your email",
          variant: "default",
        })
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to resend OTP. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToEmail = () => {
    setCurrentStep("email")
    setOtp(["", "", "", "", "", ""])
    setSuccessMessage("")
    setCountdown(0)
  }

  // Enhanced floating animation elements for ride services
  const floatingItems = [
    { icon: Car, color: "text-green-400", delay: 0, x: 80, y: 100 },
    { icon: Bike, color: "text-green-400", delay: 0.5, x: 200, y: 60 },
    { icon: Truck, color: "text-green-400", delay: 1, x: 120, y: 200 },
    { icon: MapPin, color: "text-green-400", delay: 1.5, x: 250, y: 150 },
  ]

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto bg-gray-900 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[500px] md:min-h-[600px]">
          {/* Left Panel - Animated Ride Theme */}
          <div className="flex-1 bg-gray-800 relative overflow-hidden p-6 md:p-8 lg:p-12 min-h-[300px] lg:min-h-auto">
            {/* Floating Animated Elements - Hidden on mobile for performance */}
            <div className="absolute inset-0 hidden md:block">
              {floatingItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="absolute cursor-pointer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: item.x,
                    y: item.y,
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, -5, 0],
                    transition: { duration: 0.5 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    delay: item.delay,
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    repeatDelay: 3,
                  }}
                >
                  <div className="bg-gray-700/80 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-lg hover:bg-green-700/50 transition-colors duration-300">
                    <item.icon className={`w-6 h-6 md:w-8 md:h-8 ${item.color}`} />
                  </div>
                </motion.div>
              ))}

              {/* Background Decorative Circles */}
              <motion.div
                className="absolute top-20 left-20 w-24 h-24 md:w-32 md:h-32 bg-gray-700/30 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-32 right-16 w-20 h-20 md:w-24 md:h-24 bg-gray-700/30 rounded-full"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </div>

            {/* Main Content */}
            <div className="relative z-10 h-full flex flex-col justify-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-green-700 rounded-xl md:rounded-2xl mb-6 md:mb-8">
                  <Car className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 font-sans leading-tight">
                  Fast, Easy & Secure
                  <br />
                  <span className="text-green-400">Rides</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-400 mb-6 md:mb-8 font-sans">
                  Car, Auto, Bike & Porter services – all in one place.
                </p>

                <div className="flex flex-wrap gap-2 md:gap-4 justify-center lg:justify-start">
                  {[
                    { emoji: "🚗", text: "Car Rides" },
                    { emoji: "🛺", text: "Auto Booking" },
                    { emoji: "🏍️", text: "Bike Rides" },
                    { emoji: "📦", text: "Porter Service" },
                  ].map((service, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-800/80 backdrop-blur-sm rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-2 shadow-sm cursor-pointer"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(21, 128, 61, 0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-xs md:text-sm font-medium text-gray-400">
                        {service.emoji} {service.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Animated Road with Moving Vehicles - Hidden on mobile */}
            <div className="hidden lg:block">
              <AnimatedRoad />
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="flex-1 p-6 md:p-8 lg:p-12 flex items-center justify-center bg-gray-900 min-h-[400px]">
            <div className="w-full max-w-md">
              <AnimatePresence mode="wait">
                {currentStep === "email" ? (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-6 md:mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-sans">Welcome Back!</h2>
                      <p className="text-gray-400 text-sm md:text-base">Sign in to continue your ride journey</p>
                    </div>

                    <form onSubmit={handleEmailSubmit} className="space-y-4 md:space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-400 font-medium text-sm md:text-base">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="pl-10 md:pl-12 h-11 md:h-12 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-green-400 focus:ring-green-400 rounded-lg md:rounded-xl text-sm md:text-base"
                            required
                            disabled={isLoading}
                          />
                        </div>
                        {emailError && <p className="text-red-500 text-xs md:text-sm mt-1">{emailError}</p>}
                        {successMessage && <p className="text-green-500 text-xs md:text-sm mt-1">{successMessage}</p>}
                      </div>

                      <motion.div
                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="w-full h-11 md:h-12 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-lg md:rounded-xl transition-colors relative overflow-hidden group text-sm md:text-base"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending OTP...
                            </>
                          ) : (
                            <>
                              <span className="relative z-10">Continue</span>
                              <span className="absolute inset-0 bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={handleBackToEmail}
                      className="flex items-center text-gray-400 hover:text-green-400 mb-4 md:mb-6 transition-colors text-sm md:text-base"
                      disabled={isLoading}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to email
                    </button>

                    <div className="text-center mb-6 md:mb-8">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-green-700/20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <Mail className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-sans">Check Your Email</h2>
                      <p className="text-gray-400 mb-2 text-sm md:text-base">We've sent a 6-digit code to</p>
                      <p className="text-green-400 font-semibold text-sm md:text-base break-all">{email}</p>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      <div className="flex justify-center space-x-2 md:space-x-3">
                        {otp.map((digit, index) => (
                          <Input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => {
                              // Handle backspace to go to previous input
                              if (e.key === "Backspace" && !digit && index > 0) {
                                const prevInput = document.getElementById(`otp-${index - 1}`)
                                prevInput?.focus()
                              }

                              // Allow backspace, delete, tab, escape, enter
                              if (
                                [8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
                                // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                                (e.keyCode === 65 && e.ctrlKey === true) ||
                                (e.keyCode === 67 && e.ctrlKey === true) ||
                                (e.keyCode === 86 && e.ctrlKey === true) ||
                                (e.keyCode === 88 && e.ctrlKey === true)
                              ) {
                                return
                              }
                              // Ensure that it is a number and stop the keypress
                              if (
                                (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
                                (e.keyCode < 96 || e.keyCode > 105)
                              ) {
                                e.preventDefault()
                              }
                            }}
                            className="w-10 h-10 md:w-12 md:h-12 text-center text-lg md:text-xl font-bold bg-gray-800 border-gray-700 text-white focus:border-green-400 focus:ring-green-400 rounded-lg md:rounded-xl transition-all duration-200 hover:border-green-500"
                            disabled={isLoading}
                          />
                        ))}
                      </div>

                      {isLoading && (
                        <div className="flex justify-center">
                          <div className="flex items-center space-x-2 text-green-400">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm md:text-base">
                              {otpVerified ? "Logging in..." : "Verifying..."}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="text-center">
                        <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4">Didn't receive the code?</p>
                        <Button
                          variant="ghost"
                          className="text-green-400 hover:text-green-300 hover:bg-green-400/10 rounded-lg md:rounded-xl disabled:opacity-50 text-sm md:text-base"
                          onClick={handleResendOtp}
                          disabled={isLoading || countdown > 0}
                        >
                          {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
