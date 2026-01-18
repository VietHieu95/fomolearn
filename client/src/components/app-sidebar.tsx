import { useLocation, Link } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  BookOpen, 
  Lock, 
  Target, 
  Play, 
  Folder, 
  GraduationCap
} from "lucide-react";
import { coursesData } from "@/lib/courses-data";
import { VipSidebarCard } from "@/components/vip-cta";
import logoImage from "@assets/IMG_4796_3_1768710539336.JPG";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  lock: Lock,
  book: BookOpen,
  target: Target,
  play: Play,
  folder: Folder,
};

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-3">
          <img 
            src={logoImage} 
            alt="FOMO Trading" 
            className="h-12 w-12 rounded-lg object-cover"
            data-testid="img-logo"
          />
          <div>
            <h1 className="font-bold text-lg text-sidebar-foreground">FOMO Trading</h1>
            <p className="text-xs text-sidebar-foreground/70">Learning Hub</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-full">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location === "/"}
                    data-testid="link-home"
                  >
                    <Link href="/">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 px-4">
              <GraduationCap className="h-4 w-4" />
              <span>The Library</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {coursesData.map((course) => {
                  const Icon = iconMap[course.icon] || Play;
                  const isActive = location === `/course/${course.id}`;
                  return (
                    <SidebarMenuItem key={course.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        data-testid={`link-course-${course.id}`}
                      >
                        <Link href={`/course/${course.id}`}>
                          <Icon className="h-4 w-4" />
                          <span className="flex-1 truncate">{course.title}</span>
                          {course.status === "updating" && course.progress && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {course.progress}%
                            </Badge>
                          )}
                          {course.status === "full" && (
                            <Badge variant="default" className="ml-auto text-xs">
                              Full
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border pt-2">
        <VipSidebarCard />
      </SidebarFooter>
    </Sidebar>
  );
}
