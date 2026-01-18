import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lock, BookOpen, Target, Play, Folder, Flame } from "lucide-react";
import type { Course } from "@shared/schema";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  lock: Lock,
  book: BookOpen,
  target: Target,
  play: Play,
  folder: Folder,
  fire: Flame,
};

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  const Icon = iconMap[course.icon] || Play;
  
  const statusConfig = {
    full: { label: "Full", variant: "default" as const },
    updating: { label: `Updating: ${course.progress || 0}%`, variant: "secondary" as const },
    coming_soon: { label: "Coming Soon", variant: "outline" as const },
  };
  
  const status = statusConfig[course.status];

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover-elevate active-elevate-2 overflow-visible"
      onClick={onClick}
      data-testid={`card-course-${course.id}`}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-base font-semibold leading-tight">
            {course.title}
          </CardTitle>
        </div>
        <Badge variant={status.variant} className="shrink-0">
          {status.label}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">
          {course.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{course.lessons.length} lessons</span>
          {course.status === "updating" && course.progress && (
            <div className="flex items-center gap-2 flex-1 ml-4">
              <Progress value={course.progress} className="h-1.5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
