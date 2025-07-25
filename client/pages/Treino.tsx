import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MobileNav } from "@/components/ui/mobile-nav";
import {
  Dumbbell,
  Play,
  Pause,
  RotateCcw,
  Timer,
  Zap,
  Target,
  TrendingUp,
  CheckCircle2,
  Circle,
  ArrowLeft,
  Calendar,
  Clock,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Exercise {
  id: string;
  name: string;
  muscle: string;
  sets: number;
  reps: string;
  weight: string;
  rest: string;
  instructions: string[];
  tips: string;
  video?: string;
  completed: boolean;
}

interface WorkoutDay {
  id: string;
  name: string;
  day: string;
  duration: string;
  difficulty: string;
  focus: string[];
  exercises: Exercise[];
  completed: boolean;
}

export default function Treino() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [currentExercise, setCurrentExercise] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const workoutPlan: WorkoutDay[] = [
    {
      id: "day1",
      name: "Peito e Tríceps",
      day: "Segunda-feira",
      duration: "45-60 min",
      difficulty: "Intermediário",
      focus: ["Peito", "Tríceps", "Ombros"],
      completed: true,
      exercises: [
        {
          id: "ex1",
          name: "Supino Reto com Halteres",
          muscle: "Peitoral",
          sets: 4,
          reps: "8-12",
          weight: "15kg cada",
          rest: "60-90s",
          instructions: [
            "Deite no banco com os halteres nas mãos",
            "Abaixe os halteres controladamente até o peito",
            "Empurre de volta à posição inicial",
            "Mantenha os ombros estáveis",
          ],
          tips: "Foque na contração do peito e não arqueie demais as costas",
          completed: true,
        },
        {
          id: "ex2",
          name: "Crucifixo Inclinado",
          muscle: "Peitoral Superior",
          sets: 3,
          reps: "10-15",
          weight: "12kg cada",
          rest: "45-60s",
          instructions: [
            "Deite no banco inclinado (30-45°)",
            "Abra os braços em movimento de arco",
            "Sinta o alongamento no peito",
            "Retorne controladamente",
          ],
          tips: "Mantenha uma leve flexão nos cotovelos durante todo movimento",
          completed: true,
        },
        {
          id: "ex3",
          name: "Flexão de Braço",
          muscle: "Peitoral/Tríceps",
          sets: 3,
          reps: "Máximo",
          weight: "Peso corporal",
          rest: "45s",
          instructions: [
            "Posição de prancha com mãos afastadas",
            "Desça até o peito quase tocar o chão",
            "Empurre de volta",
            "Mantenha o core contraído",
          ],
          tips: "Se muito difícil, apoie os joelhos no chão",
          completed: false,
        },
        {
          id: "ex4",
          name: "Tríceps Testa com Halteres",
          muscle: "Tríceps",
          sets: 4,
          reps: "10-12",
          weight: "8kg cada",
          rest: "60s",
          instructions: [
            "Deite no banco com halteres acima do peito",
            "Flexione apenas os cotovelos",
            "Desça em direção à testa",
            "Estenda de volta",
          ],
          tips: "Mantenha os cotovelos fixos, movimento só no antebraço",
          completed: false,
        },
        {
          id: "ex5",
          name: "Mergulho em Paralelas",
          muscle: "Tríceps/Peito Inferior",
          sets: 3,
          reps: "8-15",
          weight: "Peso corporal",
          rest: "60s",
          instructions: [
            "Apoie-se nas paralelas",
            "Desça flexionando os cotovelos",
            "Empurre de volta à posição inicial",
            "Incline-se ligeiramente para frente",
          ],
          tips: "Se muito difícil, use uma cadeira ou apoio nos pés",
          completed: false,
        },
      ],
    },
    {
      id: "day2",
      name: "Costas e Bíceps",
      day: "Terça-feira",
      duration: "45-60 min",
      difficulty: "Intermediário",
      focus: ["Costas", "Bíceps", "Posterior"],
      completed: false,
      exercises: [
        {
          id: "ex6",
          name: "Remada Curvada com Halteres",
          muscle: "Latíssimo/Romboides",
          sets: 4,
          reps: "8-12",
          weight: "15kg cada",
          rest: "60-90s",
          instructions: [
            "Incline o tronco para frente",
            "Puxe os halteres em direção ao abdome",
            "Aperte as escápulas",
            "Controle a descida",
          ],
          tips: "Mantenha a coluna neutra e foque em puxar com as costas",
          completed: false,
        },
      ],
    },
  ];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleExerciseComplete = (dayId: string, exerciseId: string) => {
    // In a real app, this would update the backend
    console.log(`Toggle exercise ${exerciseId} in day ${dayId}`);
  };

  const startRestTimer = (restTime: string) => {
    const seconds = parseInt(restTime.replace(/\D/g, ""));
    setTimer(0);
    setIsTimerRunning(true);
    setTimeout(() => {
      setIsTimerRunning(false);
    }, seconds * 1000);
  };

  const currentWorkout = workoutPlan[0]; // Today's workout

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <MobileNav userName="Usuário" />
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary md:hidden"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                to="/dashboard"
                className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <div className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <span className="text-base md:text-lg font-semibold">Meu Treino</span>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <Badge variant="outline" className="hidden sm:flex text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                Semana {selectedWeek}
              </Badge>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <User className="h-4 w-4 mr-2" />
                Perfil
              </Button>
              <Button variant="outline" size="sm" className="md:hidden">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Workout Overview */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{currentWorkout.name}</h1>
              <p className="text-muted-foreground">
                {currentWorkout.day} • {currentWorkout.duration}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <Badge variant="secondary">{currentWorkout.difficulty}</Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                {currentWorkout.focus.join(", ")}
              </Badge>
            </div>
          </div>

          {/* Progress */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progresso do treino</span>
                <span className="text-sm text-muted-foreground">
                  {currentWorkout.exercises.filter((ex) => ex.completed).length}{" "}
                  de {currentWorkout.exercises.length} exercícios
                </span>
              </div>
              <Progress
                value={
                  (currentWorkout.exercises.filter((ex) => ex.completed)
                    .length /
                    currentWorkout.exercises.length) *
                  100
                }
                className="mb-4"
              />

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {currentWorkout.exercises.length}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Exercícios
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {currentWorkout.duration}
                  </div>
                  <div className="text-xs text-muted-foreground">Duração</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {currentWorkout.exercises.reduce(
                      (acc, ex) => acc + ex.sets,
                      0,
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Séries Total
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main Content - Exercise List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5" />
                  Exercícios de Hoje
                </CardTitle>
                <CardDescription>
                  Siga a ordem dos exercícios para melhores resultados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {currentWorkout.exercises.map((exercise, index) => (
                    <AccordionItem key={exercise.id} value={exercise.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3 w-full">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0 h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExerciseComplete(
                                currentWorkout.id,
                                exercise.id,
                              );
                            }}
                          >
                            {exercise.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground" />
                            )}
                          </Button>
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {index + 1}. {exercise.name}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {exercise.muscle}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {exercise.sets} séries • {exercise.reps} reps •{" "}
                              {exercise.weight}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-4 space-y-4">
                          {/* Exercise details */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Séries:</span>
                              <div className="text-lg font-bold text-primary">
                                {exercise.sets}
                              </div>
                            </div>
                            <div>
                              <span className="font-medium">Repetições:</span>
                              <div className="text-lg font-bold text-primary">
                                {exercise.reps}
                              </div>
                            </div>
                            <div>
                              <span className="font-medium">Peso:</span>
                              <div className="text-lg font-bold text-primary">
                                {exercise.weight}
                              </div>
                            </div>
                            <div>
                              <span className="font-medium">Descanso:</span>
                              <div className="text-lg font-bold text-primary">
                                {exercise.rest}
                              </div>
                            </div>
                          </div>

                          {/* Instructions */}
                          <div>
                            <h4 className="font-medium mb-2">Como executar:</h4>
                            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                              {exercise.instructions.map((instruction, i) => (
                                <li key={i}>{instruction}</li>
                              ))}
                            </ol>
                          </div>

                          {/* Tips */}
                          <div className="bg-secondary/20 p-3 rounded-lg">
                            <div className="flex items-start gap-2">
                              <Zap className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="font-medium text-sm">Dica:</div>
                                <div className="text-sm text-muted-foreground">
                                  {exercise.tips}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div className="flex gap-2 pt-2">
                            <Button
                              variant={
                                exercise.completed ? "outline" : "default"
                              }
                              size="sm"
                              onClick={() =>
                                toggleExerciseComplete(
                                  currentWorkout.id,
                                  exercise.id,
                                )
                              }
                            >
                              {exercise.completed
                                ? "Concluído"
                                : "Marcar como feito"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => startRestTimer(exercise.rest)}
                            >
                              <Timer className="h-4 w-4 mr-2" />
                              Iniciar descanso
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 md:space-y-6">
            {/* Rest Timer */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Timer className="h-5 w-5" />
                  Timer de Descanso
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold mb-4">
                  {formatTime(timer)}
                </div>
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                  >
                    {isTimerRunning ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTimer(0);
                      setIsTimerRunning(false);
                    }}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* This Week's Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Treinos da Semana</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {workoutPlan.map((day, index) => (
                  <div
                    key={day.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm">{day.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {day.day}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {day.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : index === 0 ? (
                        <Badge variant="default" className="text-xs">
                          Hoje
                        </Badge>
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Motivation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Motivação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl mb-2">💪</div>
                  <div className="font-medium text-sm">Você está indo bem!</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Cada série te deixa mais próximo do seu objetivo.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
