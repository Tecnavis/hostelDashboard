"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Filter,
  MoreHorizontal,
  PaperclipIcon,
  Search,
  Send,
  Trash2,
  User,
} from "lucide-react"

import { Sidebar } from "@/components/Sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function OwnerMessages() {
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState("")

  const conversations = [
    {
      id: 1,
      user: {
        name: "Admin Support",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Admin",
      },
      lastMessage: "We've approved your new hostel listing. It's now live on the platform.",
      time: "10:30 AM",
      unread: true,
      messages: [
        {
          id: 1,
          sender: "Admin Support",
          content: "Hi there! We've reviewed your new hostel listing for 'Mountain View Lodge'.",
          time: "10:25 AM",
          isOwn: false,
        },
        {
          id: 2,
          sender: "Admin Support",
          content: "I'm happy to inform you that it has been approved and is now live on the platform.",
          time: "10:26 AM",
          isOwn: false,
        },
        {
          id: 3,
          sender: "You",
          content: "That's great news! Thank you for the quick review process.",
          time: "10:30 AM",
          isOwn: true,
        },
      ],
    },
    {
      id: 2,
      user: {
        name: "Emma Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Guest",
      },
      lastMessage: "Is breakfast included in the booking?",
      time: "Yesterday",
      unread: false,
      messages: [
        {
          id: 1,
          sender: "Emma Johnson",
          content: "Hello, I have a booking at your Downtown Backpackers hostel next week.",
          time: "Yesterday, 3:45 PM",
          isOwn: false,
        },
        {
          id: 2,
          sender: "Emma Johnson",
          content: "I was wondering if breakfast is included in the booking?",
          time: "Yesterday, 3:46 PM",
          isOwn: false,
        },
        {
          id: 3,
          sender: "You",
          content:
            "Hi Emma, yes, breakfast is included with your booking. It's served from 7:00 AM to 10:00 AM in the common area.",
          time: "Yesterday, 4:00 PM",
          isOwn: true,
        },
        {
          id: 4,
          sender: "Emma Johnson",
          content: "Great, thank you for the information!",
          time: "Yesterday, 4:05 PM",
          isOwn: false,
        },
      ],
    },
    {
      id: 3,
      user: {
        name: "Technical Support",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Admin",
      },
      lastMessage: "Your issue with the booking calendar has been resolved.",
      time: "Yesterday",
      unread: false,
      messages: [
        {
          id: 1,
          sender: "You",
          content:
            "I'm having an issue with the booking calendar. Some dates are showing as unavailable when they should be available.",
          time: "Yesterday, 11:20 AM",
          isOwn: true,
        },
        {
          id: 2,
          sender: "Technical Support",
          content: "Thank you for reporting this issue. We'll look into it right away and get back to you.",
          time: "Yesterday, 11:45 AM",
          isOwn: false,
        },
        {
          id: 3,
          sender: "Technical Support",
          content:
            "We've identified the problem and fixed it. The booking calendar should now be showing the correct availability. Please let us know if you encounter any further issues.",
          time: "Yesterday, 2:30 PM",
          isOwn: false,
        },
      ],
    },
    {
      id: 4,
      user: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Guest",
      },
      lastMessage: "Do you have parking available at the hostel?",
      time: "2 days ago",
      unread: false,
      messages: [
        {
          id: 1,
          sender: "Michael Brown",
          content: "Hi, I'm planning to stay at your Sunset Beach Hostel next month. Do you have parking available?",
          time: "2 days ago, 9:15 AM",
          isOwn: false,
        },
        {
          id: 2,
          sender: "You",
          content:
            "Hello Michael, yes, we do have limited parking available for guests. It's first-come, first-served, but there's also street parking nearby if our lot is full.",
          time: "2 days ago, 9:30 AM",
          isOwn: true,
        },
      ],
    },
    {
      id: 5,
      user: {
        name: "Billing Support",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Admin",
      },
      lastMessage: "Your payment method has been updated successfully.",
      time: "3 days ago",
      unread: false,
      messages: [
        {
          id: 1,
          sender: "You",
          content: "I need to update my payment method for receiving booking payments.",
          time: "3 days ago, 2:10 PM",
          isOwn: true,
        },
        {
          id: 2,
          sender: "Billing Support",
          content:
            "Hi there, I'd be happy to help you update your payment method. Please provide the new payment details securely through the Settings > Billing section of your dashboard.",
          time: "3 days ago, 2:25 PM",
          isOwn: false,
        },
        {
          id: 3,
          sender: "You",
          content: "I've updated the information in the dashboard. Can you confirm it's been processed?",
          time: "3 days ago, 3:00 PM",
          isOwn: true,
        },
        {
          id: 4,
          sender: "Billing Support",
          content:
            "I can confirm that your payment method has been updated successfully. All future payouts will be sent to the new account.",
          time: "3 days ago, 3:15 PM",
          isOwn: false,
        },
      ],
    },
  ]

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    // In a real app, you would send this to an API
    setNewMessage("")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="owner" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Messages</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Show all" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Messages</SelectItem>
                    <SelectItem value="unread">Unread Only</SelectItem>
                    <SelectItem value="admin">Admin Support</SelectItem>
                    <SelectItem value="guests">Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <Card className="lg:col-span-1 overflow-hidden flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Conversations</CardTitle>
                    <Badge variant="outline" className="font-normal">
                      1 unread
                    </Badge>
                  </div>
                  <div className="relative mt-2">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search messages..." className="pl-8" />
                  </div>
                </CardHeader>
                <CardContent className="p-0 flex-1 overflow-y-auto">
                  <Tabs defaultValue="all" className="px-4 pt-2">
                    <TabsList className="w-full">
                      <TabsTrigger value="all" className="flex-1">
                        All
                      </TabsTrigger>
                      <TabsTrigger value="admin" className="flex-1">
                        Admin
                      </TabsTrigger>
                      <TabsTrigger value="guests" className="flex-1">
                        Guests
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="mt-4 space-y-1">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition-colors ${
                          selectedConversation?.id === conversation.id ? "bg-gray-100" : ""
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {conversation.unread && (
                            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-orange-600"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{conversation.user.name}</div>
                            <div className="text-xs text-gray-500">{conversation.time}</div>
                          </div>
                          <div className="text-sm text-gray-500 truncate">{conversation.lastMessage}</div>
                          <div className="text-xs text-gray-400">{conversation.user.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 overflow-hidden flex flex-col">
                {selectedConversation ? (
                  <>
                    <CardHeader className="pb-2 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={selectedConversation.user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{selectedConversation.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{selectedConversation.user.name}</CardTitle>
                            <CardDescription>{selectedConversation.user.role}</CardDescription>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Mark as Unread</DropdownMenuItem>
                            <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Conversation
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 overflow-y-auto">
                      <div className="p-4 space-y-4">
                        {selectedConversation.messages.map((message) => (
                          <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                message.isOwn
                                  ? "bg-orange-600 text-white rounded-br-none"
                                  : "bg-gray-100 text-gray-800 rounded-bl-none"
                              }`}
                            >
                              <div className="text-sm">{message.content}</div>
                              <div
                                className={`text-xs mt-1 flex items-center gap-1 ${
                                  message.isOwn ? "text-orange-200" : "text-gray-500"
                                }`}
                              >
                                <Clock className="h-3 w-3" />
                                {message.time}
                                {message.isOwn && <Check className="h-3 w-3 ml-1" />}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Type your message..."
                          className="min-h-[80px]"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="icon" className="h-10 w-10">
                            <PaperclipIcon className="h-5 w-5" />
                          </Button>
                          <Button
                            size="icon"
                            className="h-10 w-10 bg-orange-600 hover:bg-orange-700"
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                          >
                            <Send className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <User className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No conversation selected</h3>
                    <p className="text-gray-500 max-w-md">
                      Select a conversation from the list to view messages or start a new conversation.
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Support Tickets</CardTitle>
                  <CardDescription>Your active support requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Ticket ID</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Subject</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Created</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Last Updated</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            id: "T-1234",
                            subject: "Issue with room availability calendar",
                            status: "In Progress",
                            created: "May 8, 2025",
                            updated: "May 9, 2025",
                          },
                          {
                            id: "T-1235",
                            subject: "Request for additional amenities",
                            status: "Open",
                            created: "May 10, 2025",
                            updated: "May 10, 2025",
                          },
                          {
                            id: "T-1236",
                            subject: "Payment processing delay",
                            status: "Resolved",
                            created: "May 5, 2025",
                            updated: "May 7, 2025",
                          },
                        ].map((ticket, index) => (
                          <tr key={ticket.id} className="border-b">
                            <td className="py-3 px-4 font-medium">{ticket.id}</td>
                            <td className="py-3 px-4">{ticket.subject}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant={
                                  ticket.status === "Open"
                                    ? "outline"
                                    : ticket.status === "In Progress"
                                      ? "success"
                                      : "default"
                                }
                                className={
                                  ticket.status === "Open"
                                    ? "border-orange-200 text-orange-600"
                                    : ticket.status === "In Progress"
                                      ? ""
                                      : "bg-gray-500"
                                }
                              >
                                {ticket.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">{ticket.created}</td>
                            <td className="py-3 px-4">{ticket.updated}</td>
                            <td className="py-3 px-4">
                              <Button variant="outline" size="sm" className="gap-1">
                                View
                                <ArrowUpRight className="h-3 w-3" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
