import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dumbbell, 
  UtensilsCrossed, 
  ShoppingCart, 
  TrendingUp, 
  Calendar,
  Clock,
  Target,
  Award,
  Bell,
  Settings,
  User,
  ArrowRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface UserProfile {
  name: string;
  bodyType: string;
  currentWeight: string;
  targetWeight: string;
  goal: string;
  timeframe: string;
  budget: string;
}

interface DashboardStats {
  daysCompleted: number;
  totalDays: number;
  workoutsCompleted: number;
  weeklyGoal: number;
  weightProgress: number;
  nextMilestone: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    daysCompleted: 23,
    totalDays: 90,
    workoutsCompleted: 8,
    weeklyGoal: 4,
    weightProgress: 2.3,
    nextMilestone: "65kg"
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      // If no profile, redirect to onboarding
      navigate('/onboarding');
    }
  }, [navigate]);

  const getMotivationalMessage = () => {
    const messages = [
      "Você está indo muito bem! Continue assim! 💪",
      "Cada treino te deixa mais próximo do seu objetivo! 🎯",
      "Sua dedicação está fazendo a diferença! ⭐",
      "Resultados incríveis vêm com consistência! 🚀"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getProgressPercentage = () => {
    if (!profile) return 0;
    const current = parseFloat(profile.currentWeight);
    const target = parseFloat(profile.targetWeight);
    const progress = stats.weightProgress;
    
    if (profile.goal === 'ganhar-peso') {
      return (progress / (target - current)) * 100;
    } else {
      return (progress / Math.abs(target - current)) * 100;
    }
  };

  const upcomingWorkouts = [
    { day: "Hoje", type: "Peito e Tríceps", time: "18:00", completed: false },
    { day: "Amanhã", type: "Costas e Bíceps", time: "18:00", completed: false },
    { day: "Sexta", type: "Pernas e Glúteos", time: "18:00", completed: false }
  ];

  const todayMeals = [
    { meal: "Café da manhã", calories: 450, completed: true },
    { meal: "Lanche manhã", calories: 200, completed: true },
    { meal: "Almoço", calories: 650, completed: false },
    { meal: "Lanche tarde", calories: 300, completed: false },
    { meal: "Jantar", calories: 550, completed: false }
  ];

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Carregando seu plano personalizado...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Dumbbell className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">FitPlan</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium text-primary">Dashboard</Link>
              <Link to="/treino" className="text-sm font-medium hover:text-primary transition-colors">Treino</Link>
              <Link to="/dieta" className="text-sm font-medium hover:text-primary transition-colors">Dieta</Link>
              <Link to="/compras" className="text-sm font-medium hover:text-primary transition-colors">Compras</Link>
              <Link to="/progresso" className="text-sm font-medium hover:text-primary transition-colors">Progresso</Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                {profile.name.split(' ')[0]}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Olá, {profile.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">{getMotivationalMessage()}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(getProgressPercentage())}%</div>
              <p className="text-xs text-muted-foreground">
                {stats.daysCompleted} de {stats.totalDays} dias
              </p>
              <Progress value={getProgressPercentage()} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Treinos Semana</CardTitle>
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.workoutsCompleted}/{stats.weeklyGoal}</div>
              <p className="text-xs text-muted-foreground">
                Meta semanal
              </p>
              <Progress value={(stats.workoutsCompleted / stats.weeklyGoal) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peso Atual</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(parseFloat(profile.currentWeight) + stats.weightProgress).toFixed(1)}kg
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.weightProgress > 0 ? '+' : ''}{stats.weightProgress}kg este mês
              </p>
              <div className="flex items-center text-xs text-primary mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Meta: {profile.targetWeight}kg
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximo Marco</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.nextMilestone}</div>
              <p className="text-xs text-muted-foreground">
                Em aproximadamente 2 semanas
              </p>
              <Badge variant="secondary" className="mt-2 text-xs">
                Quase lá!
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acesso Rápido</CardTitle>
                <CardDescription>
                  Suas principais ferramentas do dia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/treino">
                    <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                      <Dumbbell className="h-8 w-8" />
                      <span>Meu Treino</span>
                    </Button>
                  </Link>
                  <Link to="/dieta">
                    <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                      <UtensilsCrossed className="h-8 w-8" />
                      <span>Minha Dieta</span>
                    </Button>
                  </Link>
                  <Link to="/compras">
                    <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                      <ShoppingCart className="h-8 w-8" />
                      <span>Lista de Compras</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Today's Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Plano de Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="treino" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="treino">Treino</TabsTrigger>
                    <TabsTrigger value="dieta">Refeições</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="treino" className="space-y-4">
                    <div className="space-y-3">
                      {upcomingWorkouts.slice(0, 1).map((workout, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <div>
                              <div className="font-medium">{workout.type}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <Clock className="h-3 w-3" />
                                {workout.time}
                              </div>
                            </div>
                          </div>
                          <Button size="sm">
                            Iniciar
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="dieta" className="space-y-4">
                    <div className="space-y-3">
                      {todayMeals.map((meal, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${meal.completed ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
                            <div>
                              <div className="font-medium">{meal.meal}</div>
                              <div className="text-sm text-muted-foreground">{meal.calories} kcal</div>
                            </div>
                          </div>
                          <Badge variant={meal.completed ? "default" : "outline"}>
                            {meal.completed ? "✓" : "Pendente"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Progress & Upcoming */}
          <div className="space-y-6">
            {/* This Week */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Esta Semana</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingWorkouts.map((workout, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium">{workout.day}</div>
                      <div className="text-muted-foreground">{workout.type}</div>
                    </div>
                    <div className="text-muted-foreground">{workout.time}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievement */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Conquista Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <div className="font-medium">1 Mês Consistente!</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Você completou 1 mês seguindo seu plano
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dica do Dia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="mb-2">💡 <strong>Hidratação é fundamental!</strong></p>
                  <p className="text-muted-foreground">
                    Beba pelo menos 2-3 litros de água por dia para otimizar seus resultados.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
