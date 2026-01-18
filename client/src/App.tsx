import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { VipFloatingButton } from "@/components/vip-cta";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CoursePage from "@/pages/course";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/course/:id" component={CoursePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <SidebarInset className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="flex items-center gap-2">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
                    FOMO Trading Learning Hub
                  </span>
                </div>
                <ThemeToggle />
              </header>
              <main className="flex-1 overflow-auto">
                <Router />
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
        <Toaster />
        <VipFloatingButton />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
