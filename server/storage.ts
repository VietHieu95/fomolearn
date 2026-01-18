import { type User, type InsertUser, type Course, type Lesson } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllCourses(): Promise<Course[]>;
  getCourseById(id: string): Promise<Course | undefined>;
}

const coursesData: Course[] = [
  {
    id: "phantom-course",
    title: "Phantom Course",
    status: "updating",
    progress: 90,
    icon: "lock",
    description: "Master the art of phantom trading with advanced SMC concepts",
    lessons: [
      { id: "p0", title: "Welcome - Course Introduction", duration: "4:48", videoUrl: "https://www.youtube.com/embed/f-wuXxdyBRw" },
      { id: "p1", title: "1.0 Zone Creation - Mapping Framework Theory", duration: "18:30", videoUrl: "https://www.youtube.com/embed/aT92mRJGks4" },
      { id: "p2", title: "1.1 Zone Creation - Mapping Framework Application", duration: "22:32", videoUrl: "https://www.youtube.com/embed/pUXv9KsnswY" },
      { id: "p3", title: "2.0 Continuation & Reversal Model Theory", duration: "20:15", videoUrl: "https://www.youtube.com/embed/1HkH28P1dpg" },
      { id: "p4", title: "2.1 Continuation & Reversal Model Application", duration: "25:40", videoUrl: "https://www.youtube.com/embed/87sUp68nUQA" },
      { id: "p5", title: "3.0 Return to Zone Consideration Theory", duration: "16:20", videoUrl: "https://www.youtube.com/embed/eELCzvVzJ8w" },
      { id: "p6", title: "3.1 Return to Zone Considerations Application", duration: "19:45", videoUrl: "https://www.youtube.com/embed/9eMvo5eyBTQ" },
      { id: "p7", title: "4.0 Fractal Supply & Demand Refinements Theory", duration: "23:10", videoUrl: "https://www.youtube.com/embed/6PdV4_U08v8" },
    ],
  },
  {
    id: "hustle-trading-fx",
    title: "Hustle Trading FX",
    status: "updating",
    progress: 80,
    icon: "book",
    description: "Complete FX trading course from beginner to advanced",
    lessons: [
      { id: "h1", title: "Getting Started with Forex", duration: "18:20" },
      { id: "h2", title: "Currency Pairs Explained", duration: "24:15" },
      { id: "h3", title: "Technical Analysis Foundations", duration: "35:40" },
      { id: "h4", title: "Risk Management", duration: "29:50" },
    ],
  },
  {
    id: "vertex-investing",
    title: "Vertex Investing Course",
    status: "full",
    icon: "target",
    description: "Professional investing strategies for consistent profits",
    lessons: [
      { id: "v1", title: "Investment Philosophy", duration: "20:00" },
      { id: "v2", title: "Portfolio Construction", duration: "28:30" },
      { id: "v3", title: "Market Analysis", duration: "32:15" },
      { id: "v4", title: "Position Sizing", duration: "25:45" },
      { id: "v5", title: "Trade Execution", duration: "19:20" },
    ],
  },
  {
    id: "flipping-markets",
    title: "Flipping Markets",
    status: "full",
    icon: "play",
    description: "Learn to flip markets with price action mastery",
    lessons: [
      { id: "f1", title: "Price Action Fundamentals", duration: "26:10" },
      { id: "f2", title: "Candlestick Patterns", duration: "33:45" },
      { id: "f3", title: "Support & Resistance", duration: "29:00" },
      { id: "f4", title: "Trend Trading", duration: "31:20" },
    ],
  },
  {
    id: "precision-markets",
    title: "Precision Markets",
    status: "full",
    icon: "play",
    description: "Precise entry and exit strategies for maximum profits",
    lessons: [
      { id: "pm1", title: "Precision Entry Techniques", duration: "27:30" },
      { id: "pm2", title: "Stop Loss Placement", duration: "22:15" },
      { id: "pm3", title: "Take Profit Strategies", duration: "25:40" },
      { id: "pm4", title: "Trade Management", duration: "30:00" },
    ],
  },
  {
    id: "pipfactory-academy",
    title: "PipFactory Academy",
    status: "updating",
    icon: "play",
    description: "Factory-style approach to consistent pip gains",
    lessons: [
      { id: "pf1", title: "Pip Factory Introduction", duration: "16:45" },
      { id: "pf2", title: "Session Trading", duration: "28:30" },
      { id: "pf3", title: "Multi-Timeframe Analysis", duration: "34:20" },
    ],
  },
  {
    id: "vvs-academy",
    title: "VVS Academy",
    status: "updating",
    progress: 50,
    icon: "play",
    description: "VVS methodology for smart money trading",
    lessons: [
      { id: "vvs1", title: "VVS Concepts Overview", duration: "21:00" },
      { id: "vvs2", title: "Smart Money Techniques", duration: "29:45" },
    ],
  },
  {
    id: "fx-simplified",
    title: "FX Simplified",
    status: "updating",
    progress: 90,
    icon: "play",
    description: "Simplified approach to forex trading success",
    lessons: [
      { id: "fxs1", title: "Simplifying Forex", duration: "18:30" },
      { id: "fxs2", title: "Key Levels", duration: "24:00" },
      { id: "fxs3", title: "Entry Confirmations", duration: "27:15" },
      { id: "fxs4", title: "Psychology of Trading", duration: "22:40" },
    ],
  },
  {
    id: "traqfx-course",
    title: "TraqFX Course",
    status: "full",
    icon: "play",
    description: "TraqFX complete trading system",
    lessons: [
      { id: "traq1", title: "TraqFX System Introduction", duration: "19:20" },
      { id: "traq2", title: "Chart Setups", duration: "26:30" },
      { id: "traq3", title: "Trade Execution", duration: "31:00" },
      { id: "traq4", title: "Backtesting Methods", duration: "28:15" },
    ],
  },
  {
    id: "mentfx-mentorship",
    title: "MENTFX Private Mentorship",
    status: "full",
    icon: "play",
    description: "Private mentorship program for serious traders",
    lessons: [
      { id: "ment1", title: "Mentorship Overview", duration: "15:00" },
      { id: "ment2", title: "Advanced Price Action", duration: "38:20" },
      { id: "ment3", title: "Live Trading Sessions", duration: "45:00" },
      { id: "ment4", title: "Q&A and Reviews", duration: "32:10" },
    ],
  },
  {
    id: "wwa-bootcamp",
    title: "WWA Boot Camp",
    status: "full",
    icon: "play",
    description: "Intensive bootcamp for accelerated learning",
    lessons: [
      { id: "wwa1", title: "Bootcamp Day 1", duration: "55:00" },
      { id: "wwa2", title: "Bootcamp Day 2", duration: "48:30" },
      { id: "wwa3", title: "Bootcamp Day 3", duration: "52:15" },
    ],
  },
  {
    id: "high-liquidity-zone",
    title: "High Liquidity Zone FX",
    status: "updating",
    icon: "play",
    description: "Trading high liquidity zones for optimal entries",
    lessons: [
      { id: "hlz1", title: "Understanding Liquidity", duration: "24:30" },
      { id: "hlz2", title: "Zone Identification", duration: "28:45" },
    ],
  },
  {
    id: "eye-opening-fx",
    title: "Eye-Opening FX",
    status: "updating",
    progress: 70,
    icon: "play",
    description: "Eye-opening insights into forex markets",
    lessons: [
      { id: "eof1", title: "Market Revelations", duration: "26:00" },
      { id: "eof2", title: "Hidden Patterns", duration: "31:20" },
      { id: "eof3", title: "Institutional Trading", duration: "29:45" },
    ],
  },
  {
    id: "fractal-markets",
    title: "Fractal Markets",
    status: "full",
    icon: "play",
    description: "Fractal theory applied to market trading",
    lessons: [
      { id: "fm1", title: "Fractal Theory Basics", duration: "22:15" },
      { id: "fm2", title: "Identifying Fractals", duration: "27:30" },
      { id: "fm3", title: "Fractal Trading Strategies", duration: "33:00" },
    ],
  },
  {
    id: "supply-demand-course",
    title: "The Ultimate Supply and Demand Course",
    status: "full",
    icon: "play",
    description: "Complete guide to supply and demand trading",
    lessons: [
      { id: "sd1", title: "Supply & Demand Basics", duration: "25:00" },
      { id: "sd2", title: "Zone Drawing", duration: "28:30" },
      { id: "sd3", title: "Trade Entries", duration: "31:15" },
      { id: "sd4", title: "Advanced Concepts", duration: "35:40" },
    ],
  },
  {
    id: "order-flow-trading",
    title: "Order Flow Trading Course",
    status: "full",
    icon: "play",
    description: "Master order flow for precision trading",
    lessons: [
      { id: "of1", title: "Order Flow Introduction", duration: "20:00" },
      { id: "of2", title: "Reading Order Flow", duration: "32:45" },
      { id: "of3", title: "Volume Profile", duration: "29:20" },
      { id: "of4", title: "Delta Analysis", duration: "34:10" },
    ],
  },
];

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private courses: Map<string, Course>;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    
    coursesData.forEach((course) => {
      this.courses.set(course.id, course);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourseById(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }
}

export const storage = new MemStorage();
