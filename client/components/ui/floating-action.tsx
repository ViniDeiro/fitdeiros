import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Dumbbell, 
  UtensilsCrossed, 
  ShoppingCart,
  Calendar
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function FloatingAction() {
  const location = useLocation();
  const isMobile = useIsMobile();

  // Don't show on landing page or onboarding
  if (!isMobile || location.pathname === "/" || location.pathname === "/onboarding") {
    return null;
  }

  const quickActions = [
    {
      label: "Iniciar Treino",
      href: "/treino",
      icon: Dumbbell,
    },
    {
      label: "Ver Refeições",
      href: "/dieta", 
      icon: UtensilsCrossed,
    },
    {
      label: "Lista de Compras",
      href: "/compras",
      icon: ShoppingCart,
    },
    {
      label: "Agendar Treino",
      href: "/agendamento",
      icon: Calendar,
    },
  ];

  return (
    <div className="fixed bottom-20 right-4 z-50 md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="end" className="w-56">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <DropdownMenuItem key={action.href} asChild>
                <Link 
                  to={action.href}
                  className="flex items-center gap-3 px-3 py-3"
                >
                  <Icon className="h-4 w-4" />
                  <span>{action.label}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 