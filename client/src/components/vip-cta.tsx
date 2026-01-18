import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap, Star, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { SiTelegram } from "react-icons/si";

const VIP_LINK = "https://t.me/Mrjarome_bot?start=VIP";

export function VipButton({ size = "default", className = "" }: { size?: "sm" | "default" | "lg"; className?: string }) {
  return (
    <Button
      asChild
      size={size}
      className={`bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg ${className}`}
      data-testid="button-vip-cta"
    >
      <a href={VIP_LINK} target="_blank" rel="noopener noreferrer">
        <Crown className="h-4 w-4 mr-2" />
        Join VIP
      </a>
    </Button>
  );
}

export function VipBanner() {
  return (
    <Card className="relative overflow-hidden border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-orange-500/10">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl" />
      <CardContent className="p-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 shrink-0">
            <Crown className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg">Upgrade to VIP</h3>
              <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30">
                <Sparkles className="h-3 w-3 mr-1" />
                Exclusive
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              Get realtime trading signals, 1-on-1 mentorship, and exclusive content!
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white font-bold shadow-lg w-full md:w-auto"
            data-testid="button-vip-banner"
          >
            <a href={VIP_LINK} target="_blank" rel="noopener noreferrer">
              <SiTelegram className="h-5 w-5 mr-2" />
              Message on Telegram
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function VipFloatingButton() {
  return (
    <a
      href={VIP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white font-bold py-3 px-5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 animate-pulse hover:animate-none"
      data-testid="button-vip-floating"
    >
      <Crown className="h-5 w-5" />
      <span className="hidden sm:inline">Join VIP</span>
      <SiTelegram className="h-5 w-5" />
    </a>
  );
}

export function VipSidebarCard() {
  return (
    <div className="mx-2 mb-2 p-3 rounded-lg bg-gradient-to-br from-yellow-500/20 via-amber-500/10 to-orange-500/20 border border-yellow-500/30">
      <div className="flex items-center gap-2 mb-2">
        <Crown className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
        <span className="font-semibold text-sm text-yellow-700 dark:text-yellow-400">VIP Access</span>
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        Trading signals, 1-on-1 mentorship & exclusive content
      </p>
      <Button
        asChild
        size="sm"
        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-xs font-semibold"
        data-testid="button-vip-sidebar"
      >
        <a href={VIP_LINK} target="_blank" rel="noopener noreferrer">
          <SiTelegram className="h-3 w-3 mr-1" />
          Message Now
        </a>
      </Button>
    </div>
  );
}

export function VipCoursePromo() {
  return (
    <Card className="border-2 border-yellow-500/40 bg-gradient-to-br from-yellow-500/5 to-orange-500/5">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 shrink-0">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
              Want to learn faster?
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              VIP members get direct mentorship, 24/7 Q&A support, and realtime trading signals!
            </p>
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold"
              data-testid="button-vip-course"
            >
              <a href={VIP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat with me
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
