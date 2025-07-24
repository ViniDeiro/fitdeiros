import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, User, Target, DollarSign, Activity } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface UserProfile {
  name: string;
  age: string;
  gender: string;
  bodyType: string;
  currentWeight: string;
  targetWeight: string;
  height: string;
  activityLevel: string;
  goal: string;
  budget: string;
  timeframe: string;
  restrictions: string;
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
    height: "",
    activityLevel: "",
    goal: "",
    budget: "",
    timeframe: "",
    restrictions: ""
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateProfile = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save profile and navigate to dashboard
      localStorage.setItem('userProfile', JSON.stringify(profile));
      navigate('/dashboard');
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
        return profile.name && profile.age && profile.gender && profile.height;
      case 2:
        return profile.bodyType && profile.currentWeight && profile.targetWeight && profile.activityLevel;
      case 3:
        return profile.goal && profile.timeframe;
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
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Vamos te conhecer melhor</CardTitle>
              <CardDescription>
                Primeiro, conte-nos algumas informações básicas sobre você
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={profile.name}
                  onChange={(e) => updateProfile('name', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={profile.age}
                    onChange={(e) => updateProfile('age', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={profile.height}
                    onChange={(e) => updateProfile('height', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Gênero</Label>
                <RadioGroup
                  value={profile.gender}
                  onValueChange={(value) => updateProfile('gender', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="masculino" id="masculino" />
                    <Label htmlFor="masculino">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feminino" id="feminino" />
                    <Label htmlFor="feminino">Feminino</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <Activity className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Seu perfil físico</CardTitle>
              <CardDescription>
                Essas informações nos ajudam a criar o plano perfeito para você
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Qual é o seu biotipo?</Label>
                <RadioGroup
                  value={profile.bodyType}
                  onValueChange={(value) => updateProfile('bodyType', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ectomorfo" id="ectomorfo" />
                    <Label htmlFor="ectomorfo" className="cursor-pointer">
                      <div>
                        <div className="font-medium">Ectomorfo</div>
                        <div className="text-sm text-muted-foreground">Magro, dificuldade para ganhar peso</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mesomorfo" id="mesomorfo" />
                    <Label htmlFor="mesomorfo" className="cursor-pointer">
                      <div>
                        <div className="font-medium">Mesomorfo</div>
                        <div className="text-sm text-muted-foreground">Atlético, ganha e perde peso facilmente</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="endomorfo" id="endomorfo" />
                    <Label htmlFor="endomorfo" className="cursor-pointer">
                      <div>
                        <div className="font-medium">Endomorfo</div>
                        <div className="text-sm text-muted-foreground">Tendência a acumular gordura, metabolismo lento</div>
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
                    onChange={(e) => updateProfile('currentWeight', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetWeight">Peso desejado (kg)</Label>
                  <Input
                    id="targetWeight"
                    type="number"
                    placeholder="75"
                    value={profile.targetWeight}
                    onChange={(e) => updateProfile('targetWeight', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Nível de atividade física atual</Label>
                <Select value={profile.activityLevel} onValueChange={(value) => updateProfile('activityLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentario">Sedentário (pouco ou nenhum exercício)</SelectItem>
                    <SelectItem value="leve">Leve (1-3 dias por semana)</SelectItem>
                    <SelectItem value="moderado">Moderado (3-5 dias por semana)</SelectItem>
                    <SelectItem value="intenso">Intenso (6-7 dias por semana)</SelectItem>
                    <SelectItem value="muito-intenso">Muito intenso (2x por dia)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Seus objetivos</CardTitle>
              <CardDescription>
                Defina claramente o que você quer alcançar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Qual é o seu objetivo principal?</Label>
                <RadioGroup
                  value={profile.goal}
                  onValueChange={(value) => updateProfile('goal', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ganhar-peso" id="ganhar-peso" />
                    <Label htmlFor="ganhar-peso">Ganhar peso (massa muscular)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="perder-peso" id="perder-peso" />
                    <Label htmlFor="perder-peso">Perder peso (queimar gordura)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tonificar" id="tonificar" />
                    <Label htmlFor="tonificar">Tonificar/Definir músculos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manutencao" id="manutencao" />
                    <Label htmlFor="manutencao">Manter peso atual</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Em quanto tempo quer alcançar o resultado?</Label>
                <Select value={profile.timeframe} onValueChange={(value) => updateProfile('timeframe', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o prazo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-meses">3 meses</SelectItem>
                    <SelectItem value="6-meses">6 meses</SelectItem>
                    <SelectItem value="1-ano">1 ano</SelectItem>
                    <SelectItem value="2-anos">2 anos ou mais</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="restrictions">Restrições alimentares ou problemas de saúde</Label>
                <Textarea
                  id="restrictions"
                  placeholder="Ex: intolerância à lactose, vegetariano, diabetes, etc. (opcional)"
                  value={profile.restrictions}
                  onChange={(e) => updateProfile('restrictions', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Orçamento para alimentação</CardTitle>
              <CardDescription>
                Vamos criar um plano que caiba no seu bolso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Quanto você pode gastar mensalmente com alimentação e suplementos?</Label>
                <RadioGroup
                  value={profile.budget}
                  onValueChange={(value) => updateProfile('budget', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="200" id="budget-200" />
                    <Label htmlFor="budget-200">Até R$ 200</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="300" id="budget-300" />
                    <Label htmlFor="budget-300">R$ 200 - R$ 300</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="500" id="budget-500" />
                    <Label htmlFor="budget-500">R$ 300 - R$ 500</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="800" id="budget-800" />
                    <Label htmlFor="budget-800">R$ 500 - R$ 800</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1000+" id="budget-1000" />
                    <Label htmlFor="budget-1000">Mais de R$ 800</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-secondary/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">O que está incluído:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Todos os alimentos da sua dieta</li>
                  <li>• Suplementos recomendados</li>
                  <li>• Lista de compras otimizada</li>
                  <li>• Opções de substitutos mais baratos</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para home
          </Link>
          <h1 className="text-3xl font-bold mb-2">Configure seu perfil</h1>
          <p className="text-muted-foreground">
            Etapa {currentStep} de {totalSteps} - Vamos criar seu plano personalizado
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="w-full" />
        </div>

        {/* Current Step */}
        <div className="flex justify-center mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between max-w-2xl mx-auto">
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
            className="flex items-center gap-2"
          >
            {currentStep === totalSteps ? "Criar Meu Plano" : "Próximo"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
