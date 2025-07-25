import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dumbbell,
  UtensilsCrossed,
  ShoppingCart,
  TrendingUp,
  Home,
  Menu,
  User,
  Settings,
  Bell,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Treino",
    href: "/treino",
    icon: Dumbbell,
  },
  {
    title: "Dieta",
    href: "/dieta",
    icon: UtensilsCrossed,
  },
  {
    title: "Compras",
    href: "/compras",
    icon: ShoppingCart,
  },
  {
    title: "Progresso",
    href: "/progresso",
    icon: TrendingUp,
  },
];

interface MobileNavProps {
  userName?: string;
}

export function MobileNav({ userName }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 px-2 py-4 border-b">
            <Dumbbell className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">FitPlan</span>
          </div>

          <nav className="flex-1 py-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="border-t pt-4 space-y-2">
            <div className="flex items-center gap-3 px-3 py-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">
                {userName || "Usuário"}
              </span>
            </div>
            <div className="flex gap-2 px-3">
              <Button variant="ghost" size="sm" className="flex-1">
                <Bell className="h-4 w-4 mr-2" />
                Notificações
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 