import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Dumbbell, UtensilsCrossed, ShoppingCart, Clock, Target, TrendingUp, Star, ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Dumbbell className="h-8 w-8 text-primary" />,
      title: "Treinos Personalizados",
      description: "Planos de treino específicos para seu biotipo e objetivos, com progressão inteligente para alcançar seus resultados."
    },
    {
      icon: <UtensilsCrossed className="h-8 w-8 text-primary" />,
      title: "Dieta Personalizada",
      description: "Cardápios únicos baseados no seu orçamento, preferências e necessidades nutricionais específicas."
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-primary" />,
      title: "Lista de Compras",
      description: "Listas automáticas com todos os alimentos e suplementos necessários, otimizadas para seu orçamento."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Cronograma Realista",
      description: "Estimativa precisa de quando você alcançará seus objetivos, com marcos intermediários."
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Metas Específicas",
      description: "Definição clara de objetivos baseados em seu biotipo, peso atual e peso desejado."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Acompanhamento",
      description: "Monitoramento do progresso com ajustes automáticos na dieta e treino conforme necessário."
    }
  ];

  const plans = [
    {
      name: "Básico",
      price: "R$ 29",
      period: "/mês",
      description: "Perfeito para começar sua jornada",
      features: [
        "Plano de treino personalizado",
        "Dieta básica personalizada",
        "Lista de compras semanal",
        "Suporte por chat"
      ],
      popular: false
    },
    {
      name: "Completo",
      price: "R$ 59",
      period: "/mês",
      description: "O mais popular entre nossos usuários",
      features: [
        "Tudo do plano Básico",
        "Receitas detalhadas",
        "Variações de refeições",
        "Ajustes mensais automáticos",
        "Cronograma de progresso",
        "Suporte prioritário"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "R$ 99",
      period: "/mês",
      description: "Para resultados máximos",
      features: [
        "Tudo do plano Completo",
        "Consultoria 1:1 mensal",
        "Ajustes em tempo real",
        "Análise de bioimpedância",
        "Planos de suplementação",
        "Acesso antecipado a novidades"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Ectomorfa • 65kg → 70kg",
      content: "Em 6 meses consegui ganhar os 5kg que sempre sonhei! O plano foi perfeito para meu orçamento de R$ 400 mensais.",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Endomorfo • 95kg → 80kg",
      content: "Perdi 15kg de forma saudável e sustentável. As receitas são incríveis e nunca fico enjoado da comida.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Mesomorfa • Definição",
      content: "O treino personalizado me ajudou a definir o corpo que sempre quis. Resultados visíveis em 3 meses!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">FitPlan</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Recursos</a>
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Preços</a>
              <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Depoimentos</a>
              <Button variant="outline" size="sm">Entrar</Button>
              <Button size="sm">Começar Agora</Button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a href="#features" className="block text-sm font-medium hover:text-primary transition-colors">Recursos</a>
              <a href="#pricing" className="block text-sm font-medium hover:text-primary transition-colors">Preços</a>
              <a href="#testimonials" className="block text-sm font-medium hover:text-primary transition-colors">Depoimentos</a>
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="outline" size="sm">Entrar</Button>
                <Button size="sm">Começar Agora</Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              IA Personalizada para Seus Objetivos
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Seu Treino e Dieta
              <span className="text-primary block">Personalizados por IA</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Alcance seus objetivos com planos únicos baseados no seu biotipo, orçamento e metas. 
              De ectomorfo para 70kg ou qualquer objetivo que tenha.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/onboarding">
                <Button size="lg" className="text-lg px-8 w-full sm:w-auto">
                  Criar Meu Plano
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Ver Como Funciona
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              ✓ Sem compromisso • ✓ Primeira semana grátis • ✓ Resultados garantidos
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Tudo que Você Precisa em Um Só Lugar
            </h2>
            <p className="text-xl text-muted-foreground">
              Nossa plataforma usa inteligência artificial para criar o plano perfeito para você,
              considerando todos os aspectos da sua jornada fitness.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-muted-foreground">
              Em apenas 3 passos simples, você terá seu plano completo personalizado
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Conte Sobre Você</h3>
              <p className="text-muted-foreground">Biotipo, peso atual, peso desejado e orçamento para alimentação</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">IA Cria Seu Plano</h3>
              <p className="text-muted-foreground">Treino personalizado, dieta com receitas e lista de compras otimizada</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Alcance Seus Objetivos</h3>
              <p className="text-muted-foreground">Siga o plano e acompanhe seu progresso com ajustes automáticos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Escolha Seu Plano
            </h2>
            <p className="text-xl text-muted-foreground">
              Planos flexíveis para todos os perfis e orçamentos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    {plan.price}
                    <span className="text-base font-normal text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/onboarding">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.popular ? "Começar Agora" : "Escolher Plano"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Histórias de Sucesso
            </h2>
            <p className="text-xl text-muted-foreground">
              Veja como nossos usuários transformaram suas vidas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Pronto para Transformar Seu Corpo?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Comece hoje mesmo com seu plano personalizado. Primeira semana totalmente grátis.
          </p>
          <Link to="/onboarding">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Criar Meu Plano Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm mt-4 opacity-75">
            Sem cartão de crédito • Sem compromisso • Cancele a qualquer momento
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">FitPlan</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Plataforma de IA que cria treinos e dietas personalizadas para seus objetivos específicos.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 mt-8 text-center text-muted-foreground">
            <p>&copy; 2024 FitPlan. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
