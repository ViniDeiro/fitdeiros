import { Link, useLocation } from "react-router-dom";
import {
  Dumbbell,
  UtensilsCrossed,
  ShoppingCart,
  TrendingUp,
  Home,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  {
    title: "Home",
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

export function BottomNav() {
  const location = useLocation();
  const isMobile = useIsMobile();

  // Don't show on landing page or onboarding
  if (!isMobile || location.pathname === "/" || location.pathname === "/onboarding") {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <nav className="flex items-center justify-around py-2 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors min-w-0 flex-1 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${isActive ? "fill-current" : ""}`} />
              <span className="text-xs font-medium truncate">
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 