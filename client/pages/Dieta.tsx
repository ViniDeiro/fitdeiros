import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  UtensilsCrossed,
  Clock,
  Flame,
  Scale,
  ArrowLeft,
  Calendar,
  User,
  ChefHat,
  ShoppingCart,
  CheckCircle2,
  Circle,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  foods: string[];
  recipe?: {
    ingredients: string[];
    instructions: string[];
    prepTime: string;
    difficulty: string;
  };
  completed: boolean;
}

interface DayPlan {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  meals: Meal[];
}

export default function Dieta() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const weekPlan: DayPlan[] = [
    {
      date: "Hoje - Segunda",
      totalCalories: 2800,
      totalProtein: 150,
      totalCarbs: 350,
      totalFats: 93,
      meals: [
        {
          id: "breakfast",
          name: "Café da Manhã",
          time: "07:00",
          calories: 520,
          protein: 25,
          carbs: 65,
          fats: 18,
          foods: [
            "2 fatias de pão integral",
            "2 ovos mexidos",
            "1 banana",
            "200ml de leite",
          ],
          completed: true,
          recipe: {
            ingredients: [
              "2 fatias de pão integral",
              "2 ovos",
              "1 banana média",
              "200ml de leite desnatado",
              "1 colher de chá de azeite",
            ],
            instructions: [
              "Aqueça uma frigideira com azeite",
              "Bata os ovos e faça mexidos",
              "Torre levemente o pão integral",
              "Corte a banana em fatias",
              "Monte o prato e sirva com o leite",
            ],
            prepTime: "10 min",
            difficulty: "Fácil",
          },
        },
        {
          id: "morning-snack",
          name: "Lanche da Manhã",
          time: "10:00",
          calories: 180,
          protein: 8,
          carbs: 15,
          fats: 10,
          foods: ["1 iogurte grego", "1 colher de granola"],
          completed: true,
          recipe: {
            ingredients: [
              "150g de iogurte grego natural",
              "1 colher de sopa de granola caseira",
            ],
            instructions: [
              "Coloque o iogurte em uma tigela",
              "Adicione a granola por cima",
              "Misture bem e consuma",
            ],
            prepTime: "2 min",
            difficulty: "Muito fácil",
          },
        },
        {
          id: "lunch",
          name: "Almoço",
          time: "12:30",
          calories: 750,
          protein: 45,
          carbs: 80,
          fats: 25,
          foods: [
            "150g de frango grelhado",
            "1 xícara de arroz integral",
            "Salada verde",
            "1 colher de azeite",
          ],
          completed: false,
          recipe: {
            ingredients: [
              "150g de peito de frango",
              "1 xícara de arroz integral cozido",
              "Folhas verdes variadas",
              "1 tomate",
              "1 colher de sopa de azeite",
              "Sal e temperos a gosto",
            ],
            instructions: [
              "Tempere o frango com sal e ervas",
              "Grelhe o frango por 6-8 minutos cada lado",
              "Cozinhe o arroz integral",
              "Prepare a salada com folhas e tomate",
              "Tempere a salada com azeite",
              "Monte o prato e sirva",
            ],
            prepTime: "25 min",
            difficulty: "Médio",
          },
        },
        {
          id: "afternoon-snack",
          name: "Lanche da Tarde",
          time: "15:30",
          calories: 350,
          protein: 30,
          carbs: 35,
          fats: 12,
          foods: ["Shake de whey protein", "1 banana", "Aveia"],
          completed: false,
          recipe: {
            ingredients: [
              "1 scoop de whey protein",
              "1 banana",
              "2 colheres de sopa de aveia",
              "200ml de água gelada",
              "Gelo a gosto",
            ],
            instructions: [
              "Adicione todos os ingredientes no liquidificador",
              "Bata por 1 minuto até ficar homogêneo",
              "Adicione gelo se desejar",
              "Sirva imediatamente",
            ],
            prepTime: "3 min",
            difficulty: "Muito fácil",
          },
        },
        {
          id: "dinner",
          name: "Jantar",
          time: "19:00",
          calories: 650,
          protein: 35,
          carbs: 45,
          fats: 28,
          foods: ["120g de salmão", "Batata doce assada", "Brócolis no vapor"],
          completed: false,
          recipe: {
            ingredients: [
              "120g de filé de salmão",
              "1 batata doce média",
              "1 xícara de brócolis",
              "Azeite, sal e limão",
            ],
            instructions: [
              "Asse a batata doce no forno por 25 min",
              "Tempere o salmão com sal e limão",
              "Grelhe o salmão por 4 min cada lado",
              "Cozinhe o brócolis no vapor por 5 min",
              "Monte o prato e finalize com azeite",
            ],
            prepTime: "30 min",
            difficulty: "Médio",
          },
        },
        {
          id: "evening-snack",
          name: "Ceia",
          time: "21:30",
          calories: 250,
          protein: 20,
          carbs: 8,
          fats: 15,
          foods: ["Cottage cheese", "Oleaginosas"],
          completed: false,
          recipe: {
            ingredients: [
              "100g de cottage cheese",
              "10 amêndoas",
              "Canela em pó",
            ],
            instructions: [
              "Coloque o cottage em uma tigela",
              "Adicione as amêndoas",
              "Polvilhe canela a gosto",
              "Misture e consuma",
            ],
            prepTime: "2 min",
            difficulty: "Muito fácil",
          },
        },
      ],
    },
  ];

  const currentDay = weekPlan[selectedDay];
  const completedMeals = currentDay.meals.filter(
    (meal) => meal.completed,
  ).length;
  const progressPercentage = (completedMeals / currentDay.meals.length) * 100;

  const toggleMealComplete = (mealId: string) => {
    // In a real app, this would update the backend
    console.log(`Toggle meal ${mealId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:block">Dashboard</span>
              </Link>
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">Minha Dieta</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/compras">
                <Button variant="outline" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Lista de Compras
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Perfil
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Diet Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Plano Nutricional Personalizado
          </h1>
          <p className="text-muted-foreground mb-6">
            Baseado no seu biotipo e objetivo de ganhar peso saudavelmente
          </p>

          {/* Daily Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Progresso do Dia</p>
                    <p className="text-2xl font-bold">
                      {Math.round(progressPercentage)}%
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {completedMeals} de {currentDay.meals.length} refeições
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Calorias</p>
                    <p className="text-2xl font-bold">
                      {currentDay.totalCalories}
                    </p>
                  </div>
                  <Flame className="h-8 w-8 text-orange-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">kcal/dia</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Proteína</p>
                    <p className="text-2xl font-bold">
                      {currentDay.totalProtein}g
                    </p>
                  </div>
                  <Scale className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  para ganho muscular
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Carboidrato</p>
                    <p className="text-2xl font-bold">
                      {currentDay.totalCarbs}g
                    </p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">C</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">energia</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Gordura</p>
                    <p className="text-2xl font-bold">
                      {currentDay.totalFats}g
                    </p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">hormônios</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Meals List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5" />
              {currentDay.date}
            </CardTitle>
            <CardDescription>
              Siga sua dieta personalizada para atingir seus objetivos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentDay.meals.map((meal) => (
                <Card
                  key={meal.id}
                  className={`transition-colors ${meal.completed ? "bg-green-50 border-green-200" : ""}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-6 w-6 mt-1"
                          onClick={() => toggleMealComplete(meal.id)}
                        >
                          {meal.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </Button>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">
                              {meal.name}
                            </h3>
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <Clock className="h-3 w-3" />
                              {meal.time}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                Calorias:
                              </span>
                              <div className="font-medium">
                                {meal.calories} kcal
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Proteína:
                              </span>
                              <div className="font-medium">{meal.protein}g</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Carboidrato:
                              </span>
                              <div className="font-medium">{meal.carbs}g</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Gordura:
                              </span>
                              <div className="font-medium">{meal.fats}g</div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <p className="text-sm text-muted-foreground mb-1">
                              Alimentos:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {meal.foods.map((food, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {food}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {meal.recipe && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2"
                              >
                                <ChefHat className="h-4 w-4" />
                                Receita
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <ChefHat className="h-5 w-5" />
                                  {meal.name} - Receita
                                </DialogTitle>
                                <DialogDescription>
                                  Como preparar sua refeição
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium">
                                      Tempo de preparo:
                                    </span>
                                    <div>{meal.recipe.prepTime}</div>
                                  </div>
                                  <div>
                                    <span className="font-medium">
                                      Dificuldade:
                                    </span>
                                    <div>{meal.recipe.difficulty}</div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">
                                    Ingredientes:
                                  </h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm">
                                    {meal.recipe.ingredients.map(
                                      (ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                      ),
                                    )}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">
                                    Modo de preparo:
                                  </h4>
                                  <ol className="list-decimal list-inside space-y-2 text-sm">
                                    {meal.recipe.instructions.map(
                                      (instruction, index) => (
                                        <li key={index}>{instruction}</li>
                                      ),
                                    )}
                                  </ol>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg">
                                  <div className="flex items-start gap-2">
                                    <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <div className="font-medium text-sm text-blue-900">
                                        Valor nutricional:
                                      </div>
                                      <div className="text-sm text-blue-700">
                                        {meal.calories} kcal • {meal.protein}g
                                        proteína • {meal.carbs}g carboidrato •{" "}
                                        {meal.fats}g gordura
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}

                        <Button
                          variant={meal.completed ? "outline" : "default"}
                          size="sm"
                          onClick={() => toggleMealComplete(meal.id)}
                        >
                          {meal.completed ? "Feito" : "Marcar"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">
              💡 Dicas para o Seu Sucesso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">🥤 Hidratação</h4>
                <p className="text-muted-foreground">
                  Beba pelo menos 3L de água por dia para otimizar o ganho de
                  massa muscular.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">⏰ Timing</h4>
                <p className="text-muted-foreground">
                  Consuma proteína a cada 3-4 horas para manter a síntese
                  proteica ativa.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">🍎 Variações</h4>
                <p className="text-muted-foreground">
                  Você pode substituir alimentos por equivalentes nutricionais
                  similares.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">📱 Acompanhamento</h4>
                <p className="text-muted-foreground">
                  Marque suas refeições para acompanhar seu progresso diário.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
