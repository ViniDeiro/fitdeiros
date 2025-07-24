import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Activity,
  Target,
  DollarSign,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface UserProfile {
  name: string;
  age: string;
  gender: string;
  bodyType: string;
  currentWeight: string;
  targetWeight: string;
  goal: string;
  budget: string;
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: "",
    gender: "",
    bodyType: "",
    currentWeight: "",
    targetWeight: "",
    goal: "",
    budget: "",
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateProfile = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem("userProfile", JSON.stringify(profile));
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return profile.name && profile.age && profile.gender;
      case 2:
        return (
          profile.bodyType && profile.currentWeight && profile.targetWeight
        );
      case 3:
        return profile.goal;
      case 4:
        return profile.budget;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <User className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Vamos começar!</h2>
              <p className="text-muted-foreground">
                Conte-nos um pouco sobre você
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Como você se chama?</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={profile.name}
                  onChange={(e) => updateProfile("name", e.target.value)}
                  className="text-center"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Qual sua idade?</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={profile.age}
                  onChange={(e) => updateProfile("age", e.target.value)}
                  className="text-center"
                />
              </div>

              <div className="space-y-4">
                <Label>Gênero</Label>
                <RadioGroup
                  value={profile.gender}
                  onValueChange={(value) => updateProfile("gender", value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="masculino" id="masculino" />
                    <Label
                      htmlFor="masculino"
                      className="cursor-pointer font-medium"
                    >
                      Masculino
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="feminino" id="feminino" />
                    <Label
                      htmlFor="feminino"
                      className="cursor-pointer font-medium"
                    >
                      Feminino
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <Activity className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Seu biotipo</h2>
              <p className="text-muted-foreground">
                Isso nos ajuda a personalizar seu plano
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Qual é o seu biotipo?</Label>
                <RadioGroup
                  value={profile.bodyType}
                  onValueChange={(value) => updateProfile("bodyType", value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="ectomorfo" id="ectomorfo" />
                    <Label
                      htmlFor="ectomorfo"
                      className="cursor-pointer flex-1"
                    >
                      <div className="font-medium">Ectomorfo</div>
                      <div className="text-sm text-muted-foreground">
                        Magro, dificuldade para ganhar peso
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="mesomorfo" id="mesomorfo" />
                    <Label
                      htmlFor="mesomorfo"
                      className="cursor-pointer flex-1"
                    >
                      <div className="font-medium">Mesomorfo</div>
                      <div className="text-sm text-muted-foreground">
                        Atlético, músculos definidos
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="endomorfo" id="endomorfo" />
                    <Label
                      htmlFor="endomorfo"
                      className="cursor-pointer flex-1"
                    >
                      <div className="font-medium">Endomorfo</div>
                      <div className="text-sm text-muted-foreground">
                        Facilidade para ganhar peso
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentWeight">Peso atual (kg)</Label>
                  <Input
                    id="currentWeight"
                    type="number"
                    placeholder="70"
                    value={profile.currentWeight}
                    onChange={(e) =>
                      updateProfile("currentWeight", e.target.value)
                    }
                    className="text-center"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetWeight">Peso desejado (kg)</Label>
                  <Input
                    id="targetWeight"
                    type="number"
                    placeholder="75"
                    value={profile.targetWeight}
                    onChange={(e) =>
                      updateProfile("targetWeight", e.target.value)
                    }
                    className="text-center"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <Target className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Seu objetivo</h2>
              <p className="text-muted-foreground">O que você quer alcançar?</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <RadioGroup
                  value={profile.goal}
                  onValueChange={(value) => updateProfile("goal", value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="ganhar-peso" id="ganhar-peso" />
                    <Label
                      htmlFor="ganhar-peso"
                      className="cursor-pointer flex-1"
                    >
                      <div className="font-medium">💪 Ganhar peso</div>
                      <div className="text-sm text-muted-foreground">
                        Aumentar massa muscular
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="perder-peso" id="perder-peso" />
                    <Label
                      htmlFor="perder-peso"
                      className="cursor-pointer flex-1"
                    >
                      <div className="font-medium">🔥 Perder peso</div>
                      <div className="text-sm text-muted-foreground">
                        Queimar gordura
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="tonificar" id="tonificar" />
                    <Label
                      htmlFor="tonificar"
                      className="cursor-pointer flex-1"
                    >
                      <div className="font-medium">✨ Tonificar</div>
                      <div className="text-sm text-muted-foreground">
                        Definir músculos
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="manutencao" id="manutencao" />
                    <Label
                      htmlFor="manutencao"
                      className="cursor-pointer flex-1"
                    >
                      <div className="font-medium">⚖️ Manter peso</div>
                      <div className="text-sm text-muted-foreground">
                        Peso atual está bom
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <DollarSign className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Orçamento mensal</h2>
              <p className="text-muted-foreground">
                Para alimentação e suplementos
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <RadioGroup
                  value={profile.budget}
                  onValueChange={(value) => updateProfile("budget", value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="200" id="budget-200" />
                    <Label
                      htmlFor="budget-200"
                      className="cursor-pointer flex-1"
                    >
                      <div className="font-medium">Até R$ 200</div>
                      <div className="text-sm text-muted-foreground">
                        Básico essencial
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="300" id="budget-300" />
                    <Label
                      htmlFor="budget-300"
                      className="cursor-pointer flex-1"
                    >
                      <div className="font-medium">R$ 200 - R$ 300</div>
                      <div className="text-sm text-muted-foreground">
                        Boa variedade
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="500" id="budget-500" />
                    <Label
                      htmlFor="budget-500"
                      className="cursor-pointer flex-1"
                    >
                      <div className="font-medium">R$ 300 - R$ 500</div>
                      <div className="text-sm text-muted-foreground">
                        Mais opções
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="800" id="budget-800" />
                    <Label
                      htmlFor="budget-800"
                      className="cursor-pointer flex-1"
                    >
                      <div className="font-medium">R$ 500+</div>
                      <div className="text-sm text-muted-foreground">
                        Sem limitações
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <p className="text-sm text-center text-muted-foreground">
                  💡 Nosso algoritmo criará um plano otimizado para seu
                  or��amento
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex flex-col">
      {/* Header */}
      <div className="p-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Etapa {currentStep} de {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <div className="mb-12">{renderStep()}</div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2 px-8"
            >
              {currentStep === totalSteps ? "🚀 Criar Plano" : "Próximo"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
