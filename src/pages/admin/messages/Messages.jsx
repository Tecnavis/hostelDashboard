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

export default function AdminMessages() {
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState("")

  const conversations = [
    {
      id: 1,
      user: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Hostel Owner",
      },
      lastMessage: "I need help with adding a new room type to my hostel.",
      time: "10:30 AM",
      unread: true,
      messages: [
        {
          id: 1,
          sender: "John Smith",
          content: "Hello, I need help with adding a new room type to my hostel.",
          time: "10:25 AM",
          isOwn: false,
        },
        {
          id: 2,
          sender: "John Smith",
          content: "I can't seem to find the option in the dashboard.",
          time: "10:26 AM",
          isOwn: false,
        },
        {
          id: 3,
          sender: "Admin",
          content:
            "Hi John, I'd be happy to help you with that. You can add a new room type by going to your hostel settings and clicking on 'Room Types' in the sidebar.",
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
      lastMessage: "I'd like to modify my booking for next week.",
      time: "Yesterday",
      unread: false,
      messages: [
        {
          id: 1,
          sender: "Emma Johnson",
          content: "Hello, I'd like to modify my booking for next week.",
          time: "Yesterday, 3:45 PM",
          isOwn: false,
        },
        {
          id: 2,
          sender: "Emma Johnson",
          content: "I need to change the dates from May 15-18 to May 16-19.",
          time: "Yesterday, 3:46 PM",
          isOwn: false,
        },
        {
          id: 3,
          sender: "Admin",
          content:
            "Hi Emma, I'll check the availability for those dates. Could you please provide your booking reference number?",
          time: "Yesterday, 4:00 PM",
          isOwn: true,
        },
        {
          id: 4,
          sender: "Emma Johnson",
          content: "Sure, it's B-1235.",
          time: "Yesterday, 4:05 PM",
          isOwn: false,
        },
      ],
    },
    {
      id: 3,
      user: {
        name: "Lisa Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Hostel Owner",
      },
      lastMessage: "When will the new booking system update be released?",
      time: "Yesterday",
      unread: false,
      messages: [
        {
          id: 1,
          sender: "Lisa Chen",
          content: "When will the new booking system update be released?",
          time: "Yesterday, 11:20 AM",
          isOwn: false,
        },
        {
          id: 2,
          sender: "Admin",
          content:
            "Hi Lisa, we're planning to release the new booking system update next week. It will include several improvements to the calendar interface and booking management.",
          time: "Yesterday, 11:45 AM",
          isOwn: true,
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
      lastMessage: "Is breakfast included in my booking?",
      time: "2 days ago",
      unread: false,
      messages: [
        {
          id: 1,
          sender: "Michael Brown",
          content: "Is breakfast included in my booking at Sunset Hostel?",
          time: "2 days ago, 9:15 AM",
          isOwn: false,
        },
        {
          id: 2,
          sender: "Admin",
          content:
            "Hi Michael, I'll need to check with the hostel. Could you please provide your booking reference number?",
          time: "2 days ago, 9:30 AM",
          isOwn: true,
        },
      ],
    },
    {
      id: 5,
      user: {
        name: "Robert Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Hostel Owner",
      },
      lastMessage: "I need to update my hostel's payment information.",
      time: "3 days ago",
      unread: false,
      messages: [
        {
          id: 1,
          sender: "Robert Johnson",
          content: "I need to update my hostel's payment information.",
          time: "3 days ago, 2:10 PM",
          isOwn: false,
        },
        {
          id: 2,
          sender: "Admin",
          content:
            "Hi Robert, you can update your payment information in the Settings > Billing section of your dashboard. Let me know if you need any assistance with that.",
          time: "3 days ago, 2:25 PM",
          isOwn: true,
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
      <Sidebar role="admin" />

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
                    <SelectItem value="owners">Hostel Owners</SelectItem>
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
                      <TabsTrigger value="owners" className="flex-1">
                        Owners
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
                            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-rose-600"></span>
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
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Unread</DropdownMenuItem>
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
                                  ? "bg-rose-600 text-white rounded-br-none"
                                  : "bg-gray-100 text-gray-800 rounded-bl-none"
                              }`}
                            >
                              <div className="text-sm">{message.content}</div>
                              <div
                                className={`text-xs mt-1 flex items-center gap-1 ${
                                  message.isOwn ? "text-rose-200" : "text-gray-500"
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
                            className="h-10 w-10 bg-rose-600 hover:bg-rose-700"
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
                  <CardTitle>Recent Support Tickets</CardTitle>
                  <CardDescription>Unresolved support requests from users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Ticket ID</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">User</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Subject</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Created</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            id: "T-1234",
                            user: "John Smith",
                            subject: "Payment issue with booking",
                            status: "Open",
                            created: "May 10, 2025",
                          },
                          {
                            id: "T-1235",
                            user: "Lisa Chen",
                            subject: "Cannot update hostel photos",
                            status: "In Progress",
                            created: "May 9, 2025",
                          },
                          {
                            id: "T-1236",
                            user: "Emma Johnson",
                            subject: "Refund request for cancelled booking",
                            status: "Open",
                            created: "May 8, 2025",
                          },
                          {
                            id: "T-1237",
                            user: "Michael Brown",
                            subject: "Room type not showing correctly",
                            status: "In Progress",
                            created: "May 7, 2025",
                          },
                        ].map((ticket, index) => (
                          <tr key={ticket.id} className="border-b">
                            <td className="py-3 px-4 font-medium">{ticket.id}</td>
                            <td className="py-3 px-4">{ticket.user}</td>
                            <td className="py-3 px-4">{ticket.subject}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant={ticket.status === "Open" ? "outline" : "success"}
                                className={ticket.status === "Open" ? "border-rose-200 text-rose-600" : ""}
                              >
                                {ticket.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">{ticket.created}</td>
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
