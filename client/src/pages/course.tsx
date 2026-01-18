import { useParams, useLocation, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  BookOpen, 
  CheckCircle2,
  Lock,
  Target,
  Folder
} from "lucide-react";
import { coursesData } from "@/lib/courses-data";
import { useState } from "react";
import type { Lesson } from "@shared/schema";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  lock: Lock,
  book: BookOpen,
  target: Target,
  play: Play,
  folder: Folder,
};

export default function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const course = coursesData.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground/40 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Course Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The course you're looking for doesn't exist.
        </p>
        <Button onClick={() => setLocation("/")} data-testid="button-back-home">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  const Icon = iconMap[course.icon] || Play;
  const statusConfig = {
    full: { label: "Complete Course", variant: "default" as const },
    updating: { label: `Updating: ${course.progress || 0}%`, variant: "secondary" as const },
    coming_soon: { label: "Coming Soon", variant: "outline" as const },
  };
  const status = statusConfig[course.status];

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
  };

  const progressPercent = (completedLessons.size / course.lessons.length) * 100;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2" data-testid="text-course-title">
                      {course.title}
                    </CardTitle>
                    <p className="text-muted-foreground" data-testid="text-course-description">
                      {course.description}
                    </p>
                  </div>
                </div>
                <Badge variant={status.variant} className="shrink-0">
                  {status.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.lessons.length} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {course.lessons.reduce((acc, l) => {
                      if (!l.duration) return acc;
                      const [mins] = l.duration.split(":");
                      return acc + parseInt(mins || "0");
                    }, 0)} min total
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{completedLessons.size} completed</span>
                </div>
              </div>
              
              {completedLessons.size > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Your Progress</span>
                    <span className="font-medium">{Math.round(progressPercent)}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {selectedLesson && (
            <Card data-testid="card-lesson-viewer">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Play className="h-5 w-5 text-primary" />
                  {selectedLesson.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-primary/50 mx-auto mb-2" />
                    <p className="text-muted-foreground">Video Player</p>
                    <p className="text-sm text-muted-foreground/70">
                      Duration: {selectedLesson.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    variant={completedLessons.has(selectedLesson.id) ? "secondary" : "default"}
                    onClick={() => toggleLessonComplete(selectedLesson.id)}
                    data-testid="button-mark-complete"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    {completedLessons.has(selectedLesson.id) ? "Completed" : "Mark Complete"}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedLesson(null)}
                    data-testid="button-close-lesson"
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Lessons</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {course.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`w-full text-left p-4 hover-elevate active-elevate-2 transition-colors flex items-center gap-3 ${
                      selectedLesson?.id === lesson.id ? "bg-accent" : ""
                    }`}
                    data-testid={`button-lesson-${lesson.id}`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 text-sm font-medium ${
                      completedLessons.has(lesson.id)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {completedLessons.has(lesson.id) ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        completedLessons.has(lesson.id) ? "text-muted-foreground" : ""
                      }`}>
                        {lesson.title}
                      </p>
                      {lesson.duration && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="h-3 w-3" />
                          {lesson.duration}
                        </p>
                      )}
                    </div>
                    <Play className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
