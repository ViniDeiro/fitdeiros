import prisma from './lib/database';
import { hashPassword } from './lib/auth';

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar exercícios base
  const exercises = [
    // Peito
    {
      name: 'Supino Reto com Halteres',
      muscle: 'Peitoral',
      category: 'Peito',
      equipment: ['Halteres', 'Banco'],
      instructions: [
        'Deite no banco com os halteres nas mãos',
        'Abaixe os halteres controladamente até o peito',
        'Empurre de volta à posição inicial',
        'Mantenha os ombros estáveis'
      ],
      tips: 'Foque na contração do peito e não arqueie demais as costas',
      difficulty: 'intermediate'
    },
    {
      name: 'Crucifixo Inclinado',
      muscle: 'Peitoral Superior',
      category: 'Peito',
      equipment: ['Halteres', 'Banco Inclinado'],
      instructions: [
        'Deite no banco inclinado (30-45°)',
        'Abra os braços em movimento de arco',
        'Sinta o alongamento no peito',
        'Retorne controladamente'
      ],
      tips: 'Mantenha uma leve flexão nos cotovelos durante todo movimento',
      difficulty: 'intermediate'
    },
    {
      name: 'Flexão de Braço',
      muscle: 'Peitoral/Tríceps',
      category: 'Peito',
      equipment: ['Peso Corporal'],
      instructions: [
        'Posição de prancha com mãos afastadas',
        'Desça até o peito quase tocar o chão',
        'Empurre de volta',
        'Mantenha o core contraído'
      ],
      tips: 'Se muito difícil, apoie os joelhos no chão',
      difficulty: 'beginner'
    },
    // Tríceps
    {
      name: 'Tríceps Testa com Halteres',
      muscle: 'Tríceps',
      category: 'Braços',
      equipment: ['Halteres', 'Banco'],
      instructions: [
        'Deite no banco com halteres acima do peito',
        'Flexione apenas os cotovelos',
        'Desça em direção à testa',
        'Estenda de volta'
      ],
      tips: 'Mantenha os cotovelos fixos, movimento só no antebraço',
      difficulty: 'intermediate'
    },
    {
      name: 'Mergulho em Paralelas',
      muscle: 'Tríceps/Peito Inferior',
      category: 'Braços',
      equipment: ['Paralelas', 'Peso Corporal'],
      instructions: [
        'Apoie-se nas paralelas',
        'Desça flexionando os cotovelos',
        'Empurre de volta à posição inicial',
        'Incline-se ligeiramente para frente'
      ],
      tips: 'Se muito difícil, use uma cadeira ou apoio nos pés',
      difficulty: 'intermediate'
    },
    // Costas
    {
      name: 'Remada Curvada com Halteres',
      muscle: 'Latíssimo/Romboides',
      category: 'Costas',
      equipment: ['Halteres'],
      instructions: [
        'Incline o tronco para frente',
        'Puxe os halteres em direção ao abdome',
        'Aperte as escápulas',
        'Controle a descida'
      ],
      tips: 'Mantenha a coluna neutra e foque em puxar com as costas',
      difficulty: 'intermediate'
    },
    {
      name: 'Puxada Alta',
      muscle: 'Latíssimo',
      category: 'Costas',
      equipment: ['Polia', 'Barra'],
      instructions: [
        'Sente-se na máquina com as coxas fixas',
        'Segure a barra com pegada larga',
        'Puxe em direção ao peito',
        'Controle a subida'
      ],
      tips: 'Não balance o corpo, use apenas os músculos das costas',
      difficulty: 'intermediate'
    },
    // Bíceps
    {
      name: 'Rosca Direta com Halteres',
      muscle: 'Bíceps',
      category: 'Braços',
      equipment: ['Halteres'],
      instructions: [
        'Fique em pé com halteres nas mãos',
        'Mantenha os cotovelos fixos ao lado do corpo',
        'Flexione os braços levando os halteres ao peito',
        'Desça controladamente'
      ],
      tips: 'Evite balançar o corpo, foque no movimento do bíceps',
      difficulty: 'beginner'
    },
    // Pernas
    {
      name: 'Agachamento Livre',
      muscle: 'Quadríceps/Glúteos',
      category: 'Pernas',
      equipment: ['Peso Corporal'],
      instructions: [
        'Fique em pé com pés afastados na largura dos ombros',
        'Desça como se fosse sentar numa cadeira',
        'Mantenha o peso nos calcanhares',
        'Suba empurrando o chão'
      ],
      tips: 'Mantenha o peito erguido e joelhos alinhados com os pés',
      difficulty: 'beginner'
    },
    {
      name: 'Leg Press 45°',
      muscle: 'Quadríceps/Glúteos',
      category: 'Pernas',
      equipment: ['Leg Press'],
      instructions: [
        'Sente-se no aparelho com as costas apoiadas',
        'Posicione os pés na plataforma',
        'Desça até formar 90° nos joelhos',
        'Empurre de volta sem travar totalmente'
      ],
      tips: 'Não desça demais para não sobrecarregar os joelhos',
      difficulty: 'intermediate'
    },
    {
      name: 'Stiff com Halteres',
      muscle: 'Posterior da Coxa/Glúteos',
      category: 'Pernas',
      equipment: ['Halteres'],
      instructions: [
        'Fique em pé com halteres na frente das coxas',
        'Desça os halteres deslizando pelas pernas',
        'Mantenha as pernas semi-flexionadas',
        'Sinta o alongamento na parte de trás das coxas'
      ],
      tips: 'Movimento deve vir do quadril, não da coluna',
      difficulty: 'intermediate'
    },
    // Ombros
    {
      name: 'Desenvolvimento com Halteres',
      muscle: 'Deltoides',
      category: 'Ombros',
      equipment: ['Halteres', 'Banco'],
      instructions: [
        'Sente-se com halteres na altura dos ombros',
        'Empurre os halteres para cima',
        'Não trave totalmente os cotovelos',
        'Desça controladamente'
      ],
      tips: 'Mantenha o core contraído para proteger a lombar',
      difficulty: 'intermediate'
    },
    {
      name: 'Elevação Lateral',
      muscle: 'Deltoides Médio',
      category: 'Ombros',
      equipment: ['Halteres'],
      instructions: [
        'Fique em pé com halteres ao lado do corpo',
        'Eleve os braços lateralmente até a altura dos ombros',
        'Pause no topo do movimento',
        'Desça controladamente'
      ],
      tips: 'Use peso moderado e foque na técnica',
      difficulty: 'intermediate'
    }
  ];

  console.log('📝 Criando exercícios...');
  for (const exerciseData of exercises) {
    await prisma.exercise.upsert({
      where: { name: exerciseData.name },
      update: {},
      create: exerciseData
    });
  }

  // Criar usuário de demonstração
  const demoUserEmail = 'demo@fitplan.com';
  const demoUserPassword = await hashPassword('123456');

  console.log('👤 Criando usuário de demonstração...');
  const demoUser = await prisma.user.upsert({
    where: { email: demoUserEmail },
    update: {},
    create: {
      name: 'Usuário Demo',
      email: demoUserEmail,
      password: demoUserPassword,
    },
  });

  // Criar perfil para o usuário demo
  console.log('📊 Criando perfil do usuário demo...');
  await prisma.userProfile.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      bodyType: 'ectomorfo',
      currentWeight: 62.0,
      targetWeight: 70.0,
      height: 1.75,
      age: 25,
      gender: 'masculino',
      goal: 'ganhar-peso',
      timeframe: '6 meses',
      budget: 400.0,
      activityLevel: 'leve',
      preferences: {
        allergies: [],
        dislikes: ['camarão'],
        vegetarian: false,
        vegan: false
      }
    },
  });

  // Criar plano de treino demo
  console.log('💪 Criando plano de treino demo...');
  
  // Verificar se já existe um plano para este usuário
  let workoutPlan = await prisma.workoutPlan.findFirst({
    where: { 
      userId: demoUser.id,
      name: 'Plano Ganho de Massa - Iniciante'
    }
  });

  if (!workoutPlan) {
    workoutPlan = await prisma.workoutPlan.create({
      data: {
        userId: demoUser.id,
        name: 'Plano Ganho de Massa - Iniciante',
        description: 'Plano focado em ganho de massa muscular para ectomorfos iniciantes',
        duration: '8 semanas',
        difficulty: 'beginner',
        isActive: true,
      },
    });
  }

  // Criar treinos da semana
  const workouts = [
    {
      name: 'Peito e Tríceps',
      day: 'Segunda-feira',
      dayOfWeek: 1,
      duration: '45-60 min',
      muscleGroups: ['Peito', 'Tríceps'],
      exercises: [
        { exerciseName: 'Supino Reto com Halteres', sets: 4, reps: '8-12', weight: '15kg cada', restTime: '60-90s', order: 1 },
        { exerciseName: 'Crucifixo Inclinado', sets: 3, reps: '10-15', weight: '12kg cada', restTime: '45-60s', order: 2 },
        { exerciseName: 'Flexão de Braço', sets: 3, reps: 'Máximo', weight: 'Peso corporal', restTime: '45s', order: 3 },
        { exerciseName: 'Tríceps Testa com Halteres', sets: 4, reps: '10-12', weight: '8kg cada', restTime: '60s', order: 4 },
        { exerciseName: 'Mergulho em Paralelas', sets: 3, reps: '8-15', weight: 'Peso corporal', restTime: '60s', order: 5 }
      ]
    },
    {
      name: 'Costas e Bíceps',
      day: 'Terça-feira',
      dayOfWeek: 2,
      duration: '45-60 min',
      muscleGroups: ['Costas', 'Bíceps'],
      exercises: [
        { exerciseName: 'Remada Curvada com Halteres', sets: 4, reps: '8-12', weight: '15kg cada', restTime: '60-90s', order: 1 },
        { exerciseName: 'Puxada Alta', sets: 4, reps: '10-12', weight: '40kg', restTime: '60s', order: 2 },
        { exerciseName: 'Rosca Direta com Halteres', sets: 3, reps: '10-15', weight: '10kg cada', restTime: '45s', order: 3 }
      ]
    },
    {
      name: 'Pernas e Glúteos',
      day: 'Quinta-feira',
      dayOfWeek: 4,
      duration: '50-70 min',
      muscleGroups: ['Pernas', 'Glúteos'],
      exercises: [
        { exerciseName: 'Agachamento Livre', sets: 4, reps: '12-15', weight: 'Peso corporal', restTime: '60-90s', order: 1 },
        { exerciseName: 'Leg Press 45°', sets: 4, reps: '15-20', weight: '60kg', restTime: '60s', order: 2 },
        { exerciseName: 'Stiff com Halteres', sets: 3, reps: '12-15', weight: '12kg cada', restTime: '45s', order: 3 }
      ]
    },
    {
      name: 'Ombros e Braços',
      day: 'Sexta-feira',
      dayOfWeek: 5,
      duration: '40-50 min',
      muscleGroups: ['Ombros', 'Braços'],
      exercises: [
        { exerciseName: 'Desenvolvimento com Halteres', sets: 4, reps: '8-12', weight: '12kg cada', restTime: '60s', order: 1 },
        { exerciseName: 'Elevação Lateral', sets: 3, reps: '12-15', weight: '6kg cada', restTime: '45s', order: 2 },
        { exerciseName: 'Rosca Direta com Halteres', sets: 3, reps: '10-12', weight: '10kg cada', restTime: '45s', order: 3 }
      ]
    }
  ];

  console.log('🏋️ Criando treinos da semana...');
  for (const workoutData of workouts) {
    const workout = await prisma.workout.create({
      data: {
        workoutPlanId: workoutPlan.id,
        name: workoutData.name,
        day: workoutData.day,
        dayOfWeek: workoutData.dayOfWeek,
        duration: workoutData.duration,
        muscleGroups: workoutData.muscleGroups,
      },
    });

    // Adicionar exercícios ao treino
    for (const exerciseData of workoutData.exercises) {
      const exercise = await prisma.exercise.findFirst({
        where: { name: exerciseData.exerciseName }
      });

      if (exercise) {
        await prisma.workoutExercise.create({
          data: {
            workoutId: workout.id,
            exerciseId: exercise.id,
            sets: exerciseData.sets,
            reps: exerciseData.reps,
            weight: exerciseData.weight,
            restTime: exerciseData.restTime,
            order: exerciseData.order,
          },
        });
      }
    }
  }

  console.log('✅ Seed concluído com sucesso!');
  console.log(`📧 Usuário demo: ${demoUserEmail}`);
  console.log(`🔑 Senha demo: 123456`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 