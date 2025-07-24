import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ShoppingCart, 
  DollarSign, 
  Package, 
  TrendingDown,
  ArrowLeft,
  User,
  CheckCircle2,
  MapPin,
  Clock,
  Lightbulb,
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  price: number;
  importance: 'essential' | 'recommended' | 'optional';
  checked: boolean;
  alternatives?: {
    name: string;
    price: number;
    savings: number;
  }[];
}

interface Store {
  name: string;
  distance: string;
  estimatedTotal: number;
  savings: number;
  items: string[];
}

export default function Compras() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [budget] = useState(300); // From user profile
  const [showAlternatives, setShowAlternatives] = useState(false);

  const shoppingList: ShoppingItem[] = [
    {
      id: "1",
      name: "Peito de Frango (1kg)",
      category: "Proteínas",
      quantity: "2 pacotes",
      price: 24.90,
      importance: "essential",
      checked: false,
      alternatives: [
        { name: "Peito de Frango Congelado", price: 18.90, savings: 6.00 },
        { name: "Coxa e Sobrecoxa sem pele", price: 16.90, savings: 8.00 }
      ]
    },
    {
      id: "2",
      name: "Ovos (dúzia)",
      category: "Proteínas",
      quantity: "3 dúzias",
      price: 18.00,
      importance: "essential",
      checked: true,
      alternatives: [
        { name: "Ovos de granja", price: 15.90, savings: 2.10 }
      ]
    },
    {
      id: "3",
      name: "Arroz Integral (1kg)",
      category: "Carboidratos",
      quantity: "2 pacotes",
      price: 12.80,
      importance: "essential",
      checked: false,
      alternatives: [
        { name: "Arroz Integral a granel", price: 9.80, savings: 3.00 }
      ]
    },
    {
      id: "4",
      name: "Batata Doce",
      category: "Carboidratos",
      quantity: "2kg",
      price: 8.90,
      importance: "essential",
      checked: false
    },
    {
      id: "5",
      name: "Banana Prata",
      category: "Frutas",
      quantity: "2kg",
      price: 7.80,
      importance: "essential",
      checked: false
    },
    {
      id: "6",
      name: "Whey Protein (900g)",
      category: "Suplementos",
      quantity: "1 pote",
      price: 89.90,
      importance: "recommended",
      checked: false,
      alternatives: [
        { name: "Whey Protein Nacional", price: 65.90, savings: 24.00 },
        { name: "Albumina", price: 35.90, savings: 54.00 }
      ]
    },
    {
      id: "7",
      name: "Azeite Extra Virgem",
      category: "Gorduras",
      quantity: "500ml",
      price: 16.90,
      importance: "essential",
      checked: false
    },
    {
      id: "8",
      name: "Leite Desnatado",
      category: "Laticínios",
      quantity: "2 litros",
      price: 9.80,
      importance: "recommended",
      checked: false,
      alternatives: [
        { name: "Leite em pó desnatado", price: 7.50, savings: 2.30 }
      ]
    },
    {
      id: "9",
      name: "Iogurte Grego",
      category: "Laticínios",
      quantity: "4 potes",
      price: 19.60,
      importance: "recommended",
      checked: false
    },
    {
      id: "10",
      name: "Salmão (filé)",
      category: "Proteínas",
      quantity: "500g",
      price: 32.90,
      importance: "optional",
      checked: false,
      alternatives: [
        { name: "Sardinha fresca", price: 18.90, savings: 14.00 },
        { name: "Atum em lata", price: 12.90, savings: 20.00 }
      ]
    },
    {
      id: "11",
      name: "Brócolis",
      category: "Vegetais",
      quantity: "1kg",
      price: 8.50,
      importance: "recommended",
      checked: false
    },
    {
      id: "12",
      name: "Aveia em Flocos",
      category: "Carboidratos",
      quantity: "500g",
      price: 5.90,
      importance: "essential",
      checked: false
    }
  ];

  const stores: Store[] = [
    {
      name: "Supermercado Extra",
      distance: "1.2 km",
      estimatedTotal: 255.90,
      savings: 15.50,
      items: ["Proteínas", "Carboidratos", "Laticínios"]
    },
    {
      name: "Atacadão",
      distance: "3.5 km",
      estimatedTotal: 231.40,
      savings: 40.00,
      items: ["Todos os itens", "Melhores preços"]
    },
    {
      name: "Hortifruti São José",
      distance: "0.8 km",
      estimatedTotal: 45.20,
      savings: 8.30,
      items: ["Frutas", "Vegetais", "Produtos frescos"]
    }
  ];

  const totalPrice = shoppingList.reduce((sum, item) => sum + item.price, 0);
  const checkedPrice = shoppingList
    .filter(item => item.checked)
    .reduce((sum, item) => sum + item.price, 0);
  const budgetUsed = (totalPrice / budget) * 100;
  const remainingBudget = budget - totalPrice;

  const categorizedItems = shoppingList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);

  const toggleItem = (itemId: string) => {
    // In a real app, this would update the backend
    console.log(`Toggle item ${itemId}`);
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'essential': return 'bg-red-100 text-red-800 border-red-200';
      case 'recommended': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'optional': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImportanceLabel = (importance: string) => {
    switch (importance) {
      case 'essential': return 'Essencial';
      case 'recommended': return 'Recomendado';
      case 'optional': return 'Opcional';
      default: return 'Opcional';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:block">Dashboard</span>
              </Link>
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">Lista de Compras</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant={remainingBudget >= 0 ? "default" : "destructive"}>
                R$ {remainingBudget >= 0 ? remainingBudget.toFixed(2) : Math.abs(remainingBudget).toFixed(2)} 
                {remainingBudget >= 0 ? ' disponível' : ' acima do orçamento'}
              </Badge>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Perfil
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Budget Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Lista Semanal Otimizada</h1>
          <p className="text-muted-foreground mb-6">
            Baseada na sua dieta personalizada e orçamento de R$ {budget.toFixed(2)}/mês
          </p>
          
          {/* Budget Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Total da Lista</p>
                    <p className="text-2xl font-bold">R$ {totalPrice.toFixed(2)}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                </div>
                <Progress value={budgetUsed} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {budgetUsed.toFixed(1)}% do orçamento
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Já Comprado</p>
                    <p className="text-2xl font-bold">R$ {checkedPrice.toFixed(2)}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {shoppingList.filter(i => i.checked).length} itens marcados
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Economia Possível</p>
                    <p className="text-2xl font-bold text-green-600">R$ 47.70</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Com substituições inteligentes
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Restante</p>
                    <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      R$ {Math.abs(remainingBudget).toFixed(2)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {remainingBudget >= 0 ? 'Dentro do orçamento' : 'Acima do orçamento'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - Shopping List */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">Lista de Compras</TabsTrigger>
                <TabsTrigger value="stores">Onde Comprar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="space-y-6">
                {/* List Controls */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Semana {selectedWeek}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAlternatives(!showAlternatives)}
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    {showAlternatives ? 'Ocultar' : 'Ver'} Alternativas
                  </Button>
                </div>

                {/* Shopping Items by Category */}
                {Object.entries(categorizedItems).map(([category, items]) => (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        {category}
                      </CardTitle>
                      <CardDescription>
                        {items.length} itens • R$ {items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.id} className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3 flex-1">
                                <Checkbox
                                  checked={item.checked}
                                  onCheckedChange={() => toggleItem(item.id)}
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`font-medium ${item.checked ? 'line-through text-muted-foreground' : ''}`}>
                                      {item.name}
                                    </span>
                                    <Badge variant="outline" className={getImportanceColor(item.importance)}>
                                      {getImportanceLabel(item.importance)}
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {item.quantity} • R$ {item.price.toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Alternatives */}
                            {showAlternatives && item.alternatives && (
                              <div className="ml-6 space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">💡 Alternativas mais baratas:</p>
                                {item.alternatives.map((alt, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg text-sm">
                                    <span>{alt.name}</span>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">R$ {alt.price.toFixed(2)}</span>
                                      <Badge variant="outline" className="bg-green-100 text-green-800">
                                        -R$ {alt.savings.toFixed(2)}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="stores" className="space-y-4">
                <h2 className="text-xl font-semibold">Melhores Lugares para Comprar</h2>
                {stores.map((store, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{store.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {store.distance}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {index === 0 ? '8h às 22h' : index === 1 ? '7h às 23h' : '6h às 20h'}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">R$ {store.estimatedTotal.toFixed(2)}</div>
                          <div className="text-sm text-green-600">
                            Economia: R$ {store.savings.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {store.items.map((item, i) => (
                          <Badge key={i} variant="secondary">{item}</Badge>
                        ))}
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        Ver Direções
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget Alert */}
            {budgetUsed > 90 && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900">Atenção ao Orçamento</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Você está próximo do limite. Considere as alternativas para economizar.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">💰 Dicas de Economia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium">Compre no atacado</h4>
                  <p className="text-muted-foreground">Itens não perecíveis saem mais baratos em quantidade.</p>
                </div>
                <div>
                  <h4 className="font-medium">Compare preços</h4>
                  <p className="text-muted-foreground">Use apps como Mercado Livre ou iFood para comparar.</p>
                </div>
                <div>
                  <h4 className="font-medium">Substitutos inteligentes</h4>
                  <p className="text-muted-foreground">Ovo e frango podem substituir carnes mais caras.</p>
                </div>
              </CardContent>
            </Card>

            {/* Meal Prep Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📦 Meal Prep</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium">Domingo de preparo</h4>
                  <p className="text-muted-foreground">Prepare proteínas e carboidratos para a semana.</p>
                </div>
                <div>
                  <h4 className="font-medium">Congele porções</h4>
                  <p className="text-muted-foreground">Divida em marmitas individuais e congele.</p>
                </div>
                <div>
                  <h4 className="font-medium">Lista de urgência</h4>
                  <p className="text-muted-foreground">Sempre tenha ovos, arroz e frango de reserva.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
