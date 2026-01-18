import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/course-card";
import { coursesData } from "@/lib/courses-data";
import { Sparkles, TrendingUp, BookOpen, Users } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  const fullCourses = coursesData.filter((c) => c.status === "full");
  const updatingCourses = coursesData.filter((c) => c.status === "updating");
  const totalLessons = coursesData.reduce((acc, c) => acc + c.lessons.length, 0);

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary/90 to-orange-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            <Sparkles className="h-3 w-3 mr-1" />
            Free Learning Hub
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-welcome-title">
            Welcome to FOMO Trading
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mb-6" data-testid="text-welcome-description">
            Explore our comprehensive collection of trading courses. From Smart Money Concepts 
            to Price Action, master the skills you need to become a successful trader.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <BookOpen className="h-4 w-4" />
              <span>{coursesData.length} Courses</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <TrendingUp className="h-4 w-4" />
              <span>{totalLessons} Lessons</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <Users className="h-4 w-4" />
              <span>No Payment Required</span>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent" />
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">New content every week!</p>
              <p className="text-sm text-muted-foreground">
                Video recaps, lessons, TradingView charts, case studies and more. 
                No payment required. No ads. Just pure learning.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold" data-testid="text-section-updating">
            Currently Updating
          </h2>
          <Badge variant="secondary">{updatingCourses.length} courses</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {updatingCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => setLocation(`/course/${course.id}`)}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold" data-testid="text-section-complete">
            Complete Courses
          </h2>
          <Badge variant="default">{fullCourses.length} courses</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fullCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => setLocation(`/course/${course.id}`)}
            />
          ))}
        </div>
      </section>

      <footer className="text-center py-8 border-t border-border">
        <p className="text-muted-foreground text-sm italic">
          "Be kind, Work hard, Stay Humble"
        </p>
        <p className="text-muted-foreground/70 text-xs mt-2">
          FOMO Trading Learning Hub
        </p>
      </footer>
    </div>
  );
}
