import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  LabelList,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { motion } from "framer-motion";

// Define TypeScript interfaces
interface UserStats {
  booksRead: number;
  annualGoal: number;
  pagesRead: number;
  averageRating: number;
  dailyStreak: number;
  avgPagesPerMinute: number;
  longestBook: {
    title: string;
    pages: number;
    author: string;
  };
  completedBooks?: number;
  currentlyReading?: number;
  toRead?: number;
  totalBooks?: number;
  favoriteGenre?: string;
  mostActiveMonth?: string;
  readingTime?: string;
}

interface MonthlyData {
  month: string;
  pages: number;
}

interface GenreData {
  name: string;
  value: number;
}

interface GenreStatsData {
  subject: string;
  A: number;
  fullMark: number;
}

interface TopAuthor {
  name: string;
  books: number;
  thumbnail: string;
}

interface TopRatedBook {
  title: string;
  author: string;
  rating: number;
  cover: string;
}

interface HeatmapData {
  day: number;
  intensity: number;
}

// Mock data for the dashboard
const userStats: UserStats = {
  booksRead: 12,
  annualGoal: 20,
  pagesRead: 2450,
  averageRating: 4.2,
  dailyStreak: 15,
  avgPagesPerMinute: 0.8,
  longestBook: {
    title: "The Name of the Wind",
    pages: 662,
    author: "Patrick Rothfuss",
  },
  completedBooks: 12,
  currentlyReading: 3,
  toRead: 8,
  totalBooks: 23,
  favoriteGenre: "Fantasy",
  mostActiveMonth: "May",
  readingTime: "2h 30m",
};

const monthlyData: MonthlyData[] = [
  { month: "Jan", pages: 240 },
  { month: "Feb", pages: 180 },
  { month: "Mar", pages: 320 },
  { month: "Apr", pages: 280 },
  { month: "May", pages: 420 },
  { month: "Jun", pages: 380 },
];

const genreData: GenreData[] = [
  { name: "Fantasy", value: 40 },
  { name: "Sci-Fi", value: 30 },
  { name: "Mystery", value: 15 },
  { name: "Biography", value: 10 },
  { name: "History", value: 5 },
];

// Data for the radar chart - Genre Statistics
const genreStatsData: GenreStatsData[] = [
  { subject: "Fantasy", A: 40, fullMark: 100 },
  { subject: "Sci-Fi", A: 30, fullMark: 100 },
  { subject: "Mystery", A: 15, fullMark: 100 },
  { subject: "Biography", A: 10, fullMark: 100 },
  { subject: "History", A: 5, fullMark: 100 },
];

const topRatedBooks: TopRatedBook[] = [
  {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    rating: 5,
    cover: "https://placehold.co/60x90",
  },
  {
    title: "Mistborn: The Final Empire",
    author: "Brandon Sanderson",
    rating: 5,
    cover: "https://placehold.co/60x90",
  },
  {
    title: "The Way of Kings",
    author: "Brandon Sanderson",
    rating: 4.5,
    cover: "https://placehold.co/60x90",
  },
  {
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    rating: 4.5,
    cover: "https://placehold.co/60x90",
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    rating: 4,
    cover: "https://placehold.co/60x90",
  },
];

const topAuthors: TopAuthor[] = [
  {
    name: "Brandon Sanderson",
    books: 5,
    thumbnail: "https://placehold.co/40x40",
  },
  { name: "Neil Gaiman", books: 4, thumbnail: "https://placehold.co/40x40" },
  {
    name: "Terry Pratchett",
    books: 3,
    thumbnail: "https://placehold.co/40x40",
  },
];

const COLORS = ["#e50914", "#EC4899", "#3B82F6", "#10B981", "#F59E0B"]; // Netflix red and other colors

const CustomBarLabel: React.FC<any> = (props) => {
  const { x, y, width, value } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 10}
      fill="white"
      textAnchor="middle"
      fontSize={12}
      fontWeight="bold">
      {value}
    </text>
  );
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#222222] p-4 border border-[#808080] rounded-lg shadow-lg">
        <p className="text-netflix-light-gray font-bold">{label}</p>
        <p className="text-netflix-accent">{payload[0].value} pages</p>
      </div>
    );
  }
  return null;
};

const ReadingStats: React.FC = () => {
  // State for tracking hovered heatmap box
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);

  // Calculate percentage for circular progress bar
  const percentage = Math.round(
    (userStats.booksRead / userStats.annualGoal) * 100
  );

  // Generate heatmap data for last 30 days
  const generateHeatmapData = (): HeatmapData[] => {
    const data: HeatmapData[] = [];
    for (let i = 29; i >= 0; i--) {
      const intensity = Math.floor(Math.random() * 4); // 0-3 intensity levels
      data.push({
        day: i,
        intensity,
      });
    }
    return data;
  };

  // Initialize heatmap data only once when component mounts
  useEffect(() => {
    setHeatmapData(generateHeatmapData());
  }, []);

  // Handle mouse movement for tooltip positioning
  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  // Data for radial bar chart
  const radialData = [
    {
      name: "Progress",
      value:
        userStats.booksRead > userStats.annualGoal
          ? 100
          : (userStats.booksRead / userStats.annualGoal) * 100,
      fill: "#e50914",
    },
  ];

  return (
    <div className="min-h-screen bg-netflix-dark text-white p-4 md:p-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-netflix-accent to-[#ff4d4d] bg-clip-text text-transparent">
            Reading Statistics
          </h1>
          <p className="text-netflix-light-gray text-xl">
            Track your reading journey and achievements
          </p>
        </header>

        {/* Yearly Progress Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#181818] to-[#222222] rounded-2xl p-8 mb-8 border border-[#808080]/30 shadow-2xl shadow-netflix-accent/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex-1 mb-6 md:mb-0">
              <h2 className="text-3xl font-black mb-6 text-netflix-accent">
                Yearly Progress
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-[#222222] to-[#2a2a2a] p-6 rounded-xl border border-[#808080]/40 shadow-xl hover:shadow-netflix-accent/20 transition-all duration-300 transform hover:-translate-y-1">
                  <p className="text-netflix-light-gray text-base mb-2 font-bold">
                    Pages Read This Year
                  </p>
                  <p className="text-4xl font-black text-netflix-accent">
                    {userStats.pagesRead.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-[#222222] to-[#2a2a2a] p-6 rounded-xl border border-[#808080]/40 shadow-xl hover:shadow-netflix-accent/20 transition-all duration-300 transform hover:-translate-y-1">
                  <p className="text-netflix-light-gray text-base mb-2 font-bold">
                    Average Rating
                  </p>
                  <p className="text-4xl font-black text-netflix-accent">
                    {userStats.averageRating}/5
                  </p>
                </div>
                <div className="bg-gradient-to-br from-[#222222] to-[#2a2a2a] p-6 rounded-xl border border-[#808080]/40 shadow-xl hover:shadow-netflix-accent/20 transition-all duration-300 transform hover:-translate-y-1">
                  <p className="text-netflix-light-gray text-base mb-2 font-bold">
                    Current Streak
                  </p>
                  <p className="text-4xl font-black text-netflix-accent">
                    {userStats.dailyStreak} days
                  </p>
                </div>
              </div>

              {/* Goal exceeded suggestion */}
              {userStats.booksRead > userStats.annualGoal && (
                <div className="mt-6 p-4 bg-gradient-to-r from-netflix-accent/20 to-[#ff4d4d]/20 rounded-xl border border-netflix-accent/50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <h3 className="font-black text-lg text-netflix-accent">
                        Outstanding Performance!
                      </h3>
                      <p className="text-netflix-light-gray text-sm">
                        You've exceeded your annual goal. Would you like to set
                        a new challenge?
                      </p>
                      <div className="mt-2 flex gap-2">
                        <button className="text-xs bg-netflix-accent hover:bg-[#f40612] text-white px-3 py-1 rounded transition">
                          Increase Goal
                        </button>
                        <button className="text-xs bg-[#222222] hover:bg-[#333333] text-netflix-light-gray px-3 py-1 rounded transition border border-[#808080]/50">
                          Keep Current
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Radial Progress Bar */}
            <div className="relative w-56 h-56 flex items-center justify-center">
              <RadialBarChart
                innerRadius="30%"
                outerRadius="100%"
                responsive
                barSize={10}
                data={radialData}
                width={224}
                height={224}
                startAngle={0}
                endAngle={
                  userStats.booksRead > userStats.annualGoal
                    ? 360
                    : (360 * userStats.booksRead) / userStats.annualGoal
                }
                cy="55%">
                <RadialBar
                  background={{ fill: "#222222" }}
                  dataKey="value"
                  cornerRadius={12}
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-4xl font-black fill-white">
                  {userStats.booksRead}/{userStats.annualGoal}
                </text>
                <text
                  x="50%"
                  y="65%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-lg fill-netflix-light-gray">
                  Books Read
                </text>
              </RadialBarChart>
              {/* Congratulatory message when goal is exceeded */}
              {userStats.booksRead > userStats.annualGoal && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-netflix-accent text-netflix-dark text-center p-2 rounded-lg animate-pulse">
                    <div className="font-black text-sm">🎉 CONGRATS! 🎉</div>
                    <div className="text-xs">Goal Exceeded!</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Activity Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Monthly Velocity Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#181818] to-[#222222] rounded-2xl p-6 border border-[#808080]/30 shadow-2xl hover:shadow-netflix-accent/10 transition-all duration-300">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-netflix-accent">
                <span className="bg-netflix-accent w-4 h-4 rounded-full animate-pulse"></span>
                Monthly Reading Velocity
              </h3>
              <div className="h-80 min-h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#4A5568"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      stroke="#b3b3b3"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis stroke="#b3b3b3" tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="pages"
                      fill="url(#colorGradient)"
                      radius={[8, 8, 0, 0]}
                      animationDuration={800}>
                      <LabelList content={<CustomBarLabel />} />
                    </Bar>
                    <defs>
                      <linearGradient
                        id="colorGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1">
                        <stop
                          offset="5%"
                          stopColor="#e50914"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#e50914"
                          stopOpacity={0.4}
                        />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Genre Distribution Radar Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-[#181818] to-[#222222] rounded-2xl p-6 border border-[#808080]/30 shadow-2xl hover:shadow-netflix-accent/10 transition-all duration-300">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-netflix-accent">
                <span className="bg-netflix-accent w-4 h-4 rounded-full animate-pulse"></span>
                Genre Distribution
              </h3>
              <div className="h-80 min-h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={genreStatsData}>
                    <PolarGrid stroke="#4A5568" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "#b3b3b3", fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={false}
                    />
                    <Radar
                      name="Genre Distribution"
                      dataKey="A"
                      stroke="#e50914"
                      fill="#e50914"
                      fillOpacity={0.4}
                      strokeWidth={2}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#222222",
                        borderColor: "#808080",
                        borderRadius: "0.5rem",
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        color: "white",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Insights Sidebar */}
          <div className="space-y-8">
            {/* Reading Streak Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-[#181818] to-[#222222] rounded-2xl p-6 border border-[#808080]/30 shadow-2xl hover:shadow-netflix-accent/10 transition-all duration-300 group relative">
              <h3 className="text-2xl font-black mb-4 flex items-center gap-3 text-netflix-accent">
                <span className="bg-netflix-accent w-4 h-4 rounded-full animate-pulse"></span>
                Reading Streak
              </h3>
              <div className="text-center mb-6 relative">
                <div className="text-5xl font-black text-netflix-accent mb-1 relative inline-block">
                  {userStats.dailyStreak}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-netflix-accent rounded-full flex items-center justify-center text-xs font-bold text-netflix-dark">
                    🔥
                  </div>
                </div>
                <div className="text-netflix-light-gray text-lg mb-1">
                  consecutive days
                </div>
                <div className="text-netflix-gray text-sm">Last 30 Days</div>
              </div>

              <div className="mt-2">
                <div
                  className="relative border border-[#808080]/30 rounded-lg p-4"
                  onMouseMove={handleMouseMove}>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {heatmapData.map((day, index) => (
                      <div
                        key={index}
                        className="relative inline-block"
                        onMouseEnter={() => setHoveredBox(index)}
                        onMouseLeave={() => setHoveredBox(null)}>
                        <div
                          className={`w-4 h-4 rounded-sm border border-white/20 ${
                            day.intensity === 0
                              ? "bg-[#222222]"
                              : day.intensity === 1
                                ? "bg-[#771111]"
                                : day.intensity === 2
                                  ? "bg-[#ff4d4d]"
                                  : "bg-[#e50914]"
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Tooltip for the specific hovered box - positioned next to cursor */}
                  {hoveredBox !== null && (
                    <div
                      className="fixed bg-[#222222] text-white text-xs p-2 rounded shadow-lg border border-[#808080] z-50 whitespace-nowrap pointer-events-none"
                      style={{
                        left: `${tooltipPosition.x + 10}px`,
                        top: `${tooltipPosition.y - 30}px`,
                      }}>
                      Day {30 - hoveredBox}:{" "}
                      {heatmapData[hoveredBox].intensity > 0
                        ? "Active"
                        : "Inactive"}
                    </div>
                  )}

                  {/* Legend for heatmap colors */}
                  <div className="mt-4 flex justify-center gap-4 text-xs text-netflix-light-gray">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-[#222222]"></div>
                      <span>No Activity</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-[#771111]"></div>
                      <span>Low</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-[#ff4d4d]"></div>
                      <span>Medium</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm bg-[#e50914]"></div>
                      <span>High</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Top Authors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-[#181818] to-[#222222] rounded-2xl p-6 border border-[#808080]/30 shadow-2xl hover:shadow-netflix-accent/10 transition-all duration-300">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-netflix-accent">
                <span className="bg-netflix-accent w-4 h-4 rounded-full animate-pulse"></span>
                Top Authors
              </h3>
              <div className="space-y-5">
                {topAuthors.map((author, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-xl hover:bg-[#2a2a2a] transition-all duration-300 cursor-pointer transform hover:scale-[1.02]">
                    <img
                      src={author.thumbnail}
                      alt={author.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-netflix-accent shadow-lg"
                    />
                    <div>
                      <div className="font-black text-lg">{author.name}</div>
                      <div className="text-netflix-light-gray">
                        {author.books} books read
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reading Speed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-[#181818] to-[#222222] rounded-2xl p-6 border border-[#808080]/30 shadow-2xl hover:shadow-netflix-accent/10 transition-all duration-300">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-netflix-accent">
                <span className="bg-netflix-accent w-4 h-4 rounded-full animate-pulse"></span>
                Reading Speed
              </h3>
              <div className="text-center">
                <div className="text-5xl font-black text-netflix-accent mb-2">
                  {userStats.avgPagesPerMinute.toFixed(2)}
                </div>
                <div className="text-netflix-light-gray text-lg">
                  pages per minute
                </div>
                <div className="mt-3 text-netflix-gray">
                  Based on your reading logs
                </div>
              </div>
            </motion.div>

            {/* Top Rated by You */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-[#181818] to-[#222222] rounded-2xl p-6 border border-[#808080]/30 shadow-2xl hover:shadow-netflix-accent/10 transition-all duration-300">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-netflix-accent">
                <span className="bg-netflix-accent w-4 h-4 rounded-full animate-pulse"></span>
                Top Rated by You
              </h3>
              <div className="space-y-4">
                {topRatedBooks.map((book, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#2a2a2a] transition-all duration-300 cursor-pointer">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-10 h-14 rounded object-cover border border-netflix-accent"
                    />
                    <div className="flex-1">
                      <div className="font-black text-sm">{book.title}</div>
                      <div className="text-netflix-light-gray text-xs">
                        {book.author}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-netflix-accent font-bold mr-1">
                        {book.rating}
                      </span>
                      <span className="text-netflix-light-gray">★</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Longest Book Read */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-br from-[#181818] to-[#222222] rounded-2xl p-6 border border-[#808080]/30 shadow-2xl hover:shadow-netflix-accent/10 transition-all duration-300">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-netflix-accent">
                <span className="bg-netflix-accent w-4 h-4 rounded-full animate-pulse"></span>
                Longest Book Read
              </h3>
              <div className="border-l-6 border-netflix-accent pl-6 py-2 bg-[#222222]/30 rounded-r-lg">
                <div className="font-black text-xl mb-2">
                  {userStats.longestBook.title}
                </div>
                <div className="text-netflix-light-gray mb-3">
                  {userStats.longestBook.author}
                </div>
                <div className="text-netflix-accent text-2xl font-bold">
                  {userStats.longestBook.pages} pages
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReadingStats;
