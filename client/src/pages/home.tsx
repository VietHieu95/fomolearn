import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/course-card";
import { VipBanner, VipButton } from "@/components/vip-cta";
import { coursesData } from "@/lib/courses-data";
import { Sparkles, TrendingUp, BookOpen, Crown, ArrowRight } from "lucide-react";
import { SiTelegram } from "react-icons/si";

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
          <div className="flex flex-wrap gap-4 text-sm mb-6">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <BookOpen className="h-4 w-4" />
              <span>{coursesData.length} Courses</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <TrendingUp className="h-4 w-4" />
              <span>{totalLessons} Lessons</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <Crown className="h-4 w-4" />
              <span>100% Free</span>
            </div>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 hover:from-yellow-500 hover:via-yellow-600 hover:to-amber-600 text-black font-bold shadow-xl"
            data-testid="button-hero-vip"
          >
            <a href="https://t.me/Mrjarome_bot?start=VIP" target="_blank" rel="noopener noreferrer">
              <SiTelegram className="h-5 w-5 mr-2" />
              Join VIP Now
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent" />
      </div>

      <VipBanner />

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

      <Card className="border-2 border-dashed border-yellow-500/50 bg-gradient-to-r from-yellow-500/5 via-transparent to-orange-500/5">
        <CardContent className="p-8 text-center">
          <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Ready to level up?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join VIP for 1-on-1 mentorship, realtime trading signals, and 24/7 support from FOMO Trading team
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white font-bold shadow-lg"
            data-testid="button-footer-vip"
          >
            <a href="https://t.me/Mrjarome_bot?start=VIP" target="_blank" rel="noopener noreferrer">
              <SiTelegram className="h-5 w-5 mr-2" />
              Message on Telegram to Join VIP
            </a>
          </Button>
        </CardContent>
      </Card>

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
