'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpenIcon,
  CalendarIcon,
  GraduationCapIcon,
  ClipboardListIcon,
  MessageCircleIcon,
  SettingsIcon,
  PlusIcon,
  FilterIcon,
  ChevronDownIcon,
  SearchIcon,
  BellIcon,
  FileTextIcon,
  TrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  UserIcon,
  StarIcon,
  BarChartIcon,
  SunIcon,
  MoonIcon
} from "lucide-react"

const sidebarItems = [
  { icon: UserIcon, label: 'Dashboard' },
  { icon: BookOpenIcon, label: 'Courses' },
  { icon: CalendarIcon, label: 'Schedule' },
  { icon: GraduationCapIcon, label: 'Grades' },
  { icon: ClipboardListIcon, label: 'Assignments' },
  { icon: MessageCircleIcon, label: 'Messages' },
]

const courses = [
  { id: 1, title: "Advanced Mathematics", code: "MATH301", progress: 75, nextClass: "Today, 2:00 PM", color: "blue" },
  { id: 2, title: "Data Structures", code: "CS202", progress: 60, nextClass: "Tomorrow, 10:00 AM", color: "green" },
  { id: 3, title: "World History", code: "HIST101", progress: 40, nextClass: "Wednesday, 1:00 PM", color: "yellow" },
  { id: 4, title: "Quantum Physics", code: "PHYS401", progress: 55, nextClass: "Thursday, 11:00 AM", color: "purple" },
  { id: 5, title: "Creative Writing", code: "ENG202", progress: 80, nextClass: "Friday, 3:00 PM", color: "pink" },
  { id: 6, title: "Environmental Science", code: "ENV301", progress: 70, nextClass: "Monday, 9:00 AM", color: "teal" },
]

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <TooltipProvider>
      <div className={`flex h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden transition-colors duration-300`} style={{ fontFamily: 'SF Pro Display, Inter, sans-serif' }}>
        {/* Sidebar with Inner Shadow */}
        <motion.aside 
          className={`w-20 ${isDarkMode ? 'bg-[#111]' : 'bg-white'} flex flex-col items-center py-8 space-y-10 transition-colors duration-300 shadow-[inset_-1px_0_0_rgba(255,255,255,0.1)]`}
          initial={{ x: -80 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div 
            className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            S
          </motion.div>
          {sidebarItems.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger>
                <motion.button 
                  className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200 ${activeTab === item.label ? 'text-blue-500' : ''}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveTab(item.label)}
                >
                  <item.icon className="w-6 h-6" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          <Tooltip>
            <TooltipTrigger>
              <motion.button
                className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
              >
                {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Toggle Theme</p>
            </TooltipContent>
          </Tooltip>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header with Blur Effect */}
          <header className={`h-16 px-8 flex items-center justify-between transition-colors duration-300 sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-70 ${isDarkMode ? 'bg-black/70 border-gray-800' : 'bg-white/70 border-gray-200'} border-b`}>
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">Student Dashboard</h1>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <SearchIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} w-4 h-4`} />
                <Input
                  type="text"
                  placeholder="Search..."
                  className={`${isDarkMode ? 'bg-[#111] text-white' : 'bg-white text-gray-900'} border-none rounded-full pl-10 pr-4 py-1 w-48 text-sm focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon" className="relative">
                    <BellIcon className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
              <Avatar className={`w-8 h-8 ring-2 ring-blue-500 ring-offset-2 ${isDarkMode ? 'ring-offset-black' : 'ring-offset-gray-50'}`}>
                <AvatarImage src="/placeholder-avatar.jpg" alt="Student" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Dashboard Content */}
          <ScrollArea className="flex-1">
            <div className="max-w-6xl mx-auto px-8 py-10 space-y-10">
              {/* Welcome Message with Motivational Quote */}
              <div className="text-3xl font-bold flex justify-between items-center">
                <span>Hello, <span className="text-blue-600">John</span></span>
                <div className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} italic`}>"Education is the passport to the future."</div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <InnovativeStatsCard
                  title="GPA"
                  value="3.8"
                  icon={<GraduationCapIcon className="w-6 h-6 text-blue-600" />}
                  trend="up"
                  trendValue="5%"
                  isDarkMode={isDarkMode}
                />
                <InnovativeStatsCard
                  title="Courses"
                  value="6"
                  icon={<BookOpenIcon className="w-6 h-6 text-green-600" />}
                  isDarkMode={isDarkMode}
                />
                <InnovativeStatsCard
                  title="Assignments"
                  value="8"
                  icon={<ClipboardListIcon className="w-6 h-6 text-yellow-600" />}
                  trend="down"
                  trendValue="2"
                  isDarkMode={isDarkMode}
                />
                <InnovativeStatsCard
                  title="Overall Progress"
                  value="72%"
                  icon={<TrendingUpIcon className="w-6 h-6 text-purple-600" />}
                  showProgress
                  isDarkMode={isDarkMode}
                />
              </div>

              {/* Courses Section */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Courses</h2>
                  <Button variant="outline" size="sm" className={`rounded-full ${isDarkMode ? 'text-white border-gray-700 hover:bg-gray-800' : 'text-gray-900 border-gray-300 hover:bg-gray-100'}`}>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Course
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <InnovativeCourseCard key={course.id} {...course} isDarkMode={isDarkMode} />
                  ))}
                </div>
              </div>

              {/* Upcoming Assignments and Calendar */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className={`${isDarkMode ? 'bg-white/[0.02]' : 'bg-white'} border ${isDarkMode ? 'border-white/10' : 'border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
                  <CardHeader>
                    <CardTitle className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Upcoming Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <InnovativeAssignmentItem
                        course="Advanced Mathematics"
                        title="Problem Set 3"
                        dueDate="2023-05-15"
                        status="pending"
                        isDarkMode={isDarkMode}
                      />
                      <InnovativeAssignmentItem
                        course="Data Structures"
                        title="Binary Tree Implementation"
                        dueDate="2023-05-18"
                        status="in-progress"
                        isDarkMode={isDarkMode}
                      />
                      <InnovativeAssignmentItem
                        course="World History"
                        title="Essay on Industrial Revolution"
                        dueDate="2023-05-20"
                        status="not-started"
                        isDarkMode={isDarkMode}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card className={`${isDarkMode ? 'bg-white/[0.02]' : 'bg-white'} border ${isDarkMode ? 'border-white/10' : 'border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
                  <CardHeader>
                    <CardTitle className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Weekly Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="text-center">
                          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{day}</div>
                          <div className={`mt-2 w-10 h-10 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {Math.floor(Math.random() * 31) + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Academic Performance Chart */}
              <Card className={`${isDarkMode ? 'bg-white/[0.02]' : 'bg-white'} border ${isDarkMode ? 'border-white/10' : 'border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
                <CardHeader>
                  <CardTitle className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Academic Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="grades" className="w-full">
                    <TabsList className={`grid w-full grid-cols-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-1`}>
                      <TabsTrigger value="grades" className={`${isDarkMode ? 'text-white' : 'text-gray-900'} data-[state=active]:bg-blue-500 rounded-md transition-all`}>Grades</TabsTrigger>
                      <TabsTrigger value="attendance" className={`${isDarkMode ? 'text-white' : 'text-gray-900'} data-[state=active]:bg-blue-500 rounded-md transition-all`}>Attendance</TabsTrigger>
                    </TabsList>
                    <TabsContent value="grades" className="mt-4">
                      <div className="h-64 flex items-end justify-between">
                        {courses.map((course) => (
                          <div key={course.id} className="w-1/6 flex flex-col items-center">
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{course.code}</div>
                            <div 
                              className={`w-full bg-${course.color}-500 rounded-t-lg`} 
                              style={{height: `${course.progress}%`}}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="attendance" className="mt-4">
                      <div className="h-64 flex items-end justify-between">
                        {courses.map((course) => (
                          <div key={course.id} className="w-1/6 flex flex-col items-center">
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{course.code}</div>
                            <div 
                              className="w-full bg-green-500 rounded-t-lg" 
                              style={{height: `${Math.floor(Math.random() * 40) + 60}%`}}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
      </div>
    </TooltipProvider>
  )
}

function InnovativeStatsCard({ title, value, icon, trend, trendValue, showProgress, isDarkMode }) {
  return (
    <Card className={`${isDarkMode ? 'bg-white/[0.02]' : 'bg-white'} border ${isDarkMode ? 'border-white/10' : 'border-gray-200'} shadow-md overflow-hidden rounded-2xl transition-colors duration-300`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          {icon}
          {trend && (
            <div className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </div>
          )}
        </div>
        <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</div>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
        {showProgress && (
          <div className="mt-4">
            <Progress value={72} className="h-1" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function InnovativeCourseCard({ title, code, progress, nextClass, color, isDarkMode }) {
  return (
    <Card className={`${isDarkMode ? 'bg-white/[0.02]' : 'bg-white'} border ${isDarkMode ? 'border-white/10' : 'border-gray-200'} shadow-md overflow-hidden rounded-2xl relative transition-colors duration-300`}>
      <div className={`absolute top-0 left-0 w-1 h-full bg-${color}-500`}></div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{code}</p>
          </div>
          <div className="text-2xl font-bold text-blue-600">{progress}%</div>
        </div>
        <Progress value={progress} className="h-1 mb-4" />
        <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <ClockIcon className="w-4 h-4 mr-2" />
          {nextClass}
        </div>
      </CardContent>
    </Card>
  )
}

function InnovativeAssignmentItem({ course, title, dueDate, status, isDarkMode }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return isDarkMode ? 'text-yellow-500' : 'text-yellow-600'
      case 'in-progress': return isDarkMode ? 'text-blue-500' : 'text-blue-600'
      case 'not-started': return isDarkMode ? 'text-red-500' : 'text-red-600'
      default: return isDarkMode ? 'text-gray-400' : 'text-gray-600'
    }
  }

  return (
    <div className={`flex items-center justify-between p-4 ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'} rounded-xl transition-colors duration-300 border ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
      <div>
        <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{course}</p>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{dueDate}</span>
        <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
      </div>
    </div>
  )
}