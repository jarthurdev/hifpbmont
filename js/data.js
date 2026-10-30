/**
 * HIFPB Monteiro — Sistema de Consulta de Horários Acadêmicos
 * Base de Dados Institucional e Fictícia do Campus Monteiro
 * Semestre Letivo: 2026.2
 */

const ACADEMIC_DATA = {
  meta: {
    institution: "Instituto Federal de Educação, Ciência e Tecnologia da Paraíba",
    systemName: "HIFPB Monteiro — Horário Acadêmico",
    campus: "Campus Monteiro",
    semester: "2026.2",
    lastUpdate: "28 de Outubro de 2026 às 15:45",
    version: "2.4.0-publicado",
    disclaimer: "Este é um projeto acadêmico demonstrativo para o IFPB Campus Monteiro. Os dados e horários são fictícios para simulação de consulta."
  },

  weekDays: [
    { id: 1, name: "Segunda-feira", short: "Seg", abbrev: "SEG" },
    { id: 2, name: "Terça-feira", short: "Ter", abbrev: "TER" },
    { id: 3, name: "Quarta-feira", short: "Qua", abbrev: "QUA" },
    { id: 4, name: "Quinta-feira", short: "Qui", abbrev: "QUI" },
    { id: 5, name: "Sexta-feira", short: "Sex", abbrev: "SEX" },
    { id: 6, name: "Sábado", short: "Sáb", abbrev: "SÁB" }
  ],

  shifts: [
    {
      id: "matutino",
      name: "Matutino",
      slots: [
        { id: "M1", index: 0, label: "1º Horário", time: "07:00 - 07:50", start: "07:00", end: "07:50" },
        { id: "M2", index: 1, label: "2º Horário", time: "07:50 - 08:40", start: "07:50", end: "08:40" },
        { id: "M3", index: 2, label: "3º Horário", time: "08:55 - 09:45", start: "08:55", end: "09:45" },
        { id: "M4", index: 3, label: "4º Horário", time: "09:45 - 10:35", start: "09:45", end: "10:35" },
        { id: "M5", index: 4, label: "5º Horário", time: "10:45 - 11:35", start: "10:45", end: "11:35" },
        { id: "M6", index: 5, label: "6º Horário", time: "11:35 - 12:25", start: "11:35", end: "12:25" }
      ]
    },
    {
      id: "vespertino",
      name: "Vespertino",
      slots: [
        { id: "V1", index: 0, label: "1º Horário", time: "13:00 - 13:50", start: "13:00", end: "13:50" },
        { id: "V2", index: 1, label: "2º Horário", time: "13:50 - 14:40", start: "13:50", end: "14:40" },
        { id: "V3", index: 2, label: "3º Horário", time: "14:55 - 15:45", start: "14:55", end: "15:45" },
        { id: "V4", index: 3, label: "4º Horário", time: "15:45 - 16:35", start: "15:45", end: "16:35" },
        { id: "V5", index: 4, label: "5º Horário", time: "16:45 - 17:35", start: "16:45", end: "17:35" },
        { id: "V6", index: 5, label: "6º Horário", time: "17:35 - 18:25", start: "17:35", end: "18:25" }
      ]
    },
    {
      id: "noturno",
      name: "Noturno",
      slots: [
        { id: "N1", index: 0, label: "1º Horário", time: "18:40 - 19:30", start: "18:40", end: "19:30" },
        { id: "N2", index: 1, label: "2º Horário", time: "19:30 - 20:20", start: "19:30", end: "20:20" },
        { id: "N3", index: 2, label: "3º Horário", time: "20:30 - 21:20", start: "20:30", end: "21:20" },
        { id: "N4", index: 3, label: "4º Horário", time: "21:20 - 22:10", start: "21:20", end: "22:10" }
      ]
    }
  ],

  courses: [
    {
      id: "ads",
      code: "TADS",
      name: "Análise e Desenvolvimento de Sistemas",
      level: "Graduação Tecnológica",
      duration: "3 anos (6 períodos)",
      shiftDefault: "Matutino / Noturno",
      description: "Formação de profissionais capacitados para projetar, desenvolver, testar e implantar soluções computacionais modernas e sistemas web."
    },
    {
      id: "tce",
      code: "TTCE",
      name: "Tecnologia em Construção de Edifícios",
      level: "Graduação Tecnológica",
      duration: "3 anos (6 períodos)",
      shiftDefault: "Vespertino",
      description: "Capacitação voltada para o gerenciamento de obras, tecnologia de materiais de construção, sustentabilidade e processos construtivos."
    },
    {
      id: "mat",
      code: "LMAT",
      name: "Licenciatura em Matemática",
      level: "Graduação Licenciatura",
      duration: "4 anos (8 períodos)",
      shiftDefault: "Noturno",
      description: "Preparação de docentes com sólida formação matemática e pedagógica para o ensino básico, técnico e tecnológico."
    }
  ],

  classes: [
    {
      id: "ads-2026-1",
      code: "ADS 2026.1",
      name: "ADS 2026.1 — 2º Período",
      courseId: "ads",
      period: "2º Período",
      shift: "matutino",
      totalStudents: 38,
      roomMain: "lab-01"
    },
    {
      id: "ads-2025-1",
      code: "ADS 2025.1",
      name: "ADS 2025.1 — 4º Período",
      courseId: "ads",
      period: "4º Período",
      shift: "matutino",
      totalStudents: 34,
      roomMain: "lab-02"
    },
    {
      id: "ads-2024-1",
      code: "ADS 2024.1",
      name: "ADS 2024.1 — 6º Período",
      courseId: "ads",
      period: "6º Período",
      shift: "noturno",
      totalStudents: 30,
      roomMain: "sala-01"
    },
    {
      id: "tce-2025-1",
      code: "TCE 2025.1",
      name: "TCE 2025.1 — 3º Período",
      courseId: "tce",
      period: "3º Período",
      shift: "vespertino",
      totalStudents: 32,
      roomMain: "sala-02"
    },
    {
      id: "mat-2025-1",
      code: "MAT 2025.1",
      name: "MAT 2025.1 — 3º Período",
      courseId: "mat",
      period: "3º Período",
      shift: "noturno",
      totalStudents: 28,
      roomMain: "sala-03"
    }
  ],

  teachers: [
    {
      id: "prof-joao-carlos",
      name: "João Carlos da Silva",
      title: "Mestre em Ciência da Computação",
      department: "Unidade Acadêmica de Informática",
      email: "joao.silva@ifpb.edu.br",
      areas: ["Banco de Dados", "Sistemas Operacionais", "Engenharia de Software"]
    },
    {
      id: "prof-maria-eduarda",
      name: "Maria Eduarda Oliveira",
      title: "Doutora em Engenharia de Produção e Software",
      department: "Unidade Acadêmica de Informática e Gestão",
      email: "maria.oliveira@ifpb.edu.br",
      areas: ["Engenharia de Software", "Gestão de Projetos", "Qualidade de Software"]
    },
    {
      id: "prof-pedro-henrique",
      name: "Pedro Henrique Santos",
      title: "Mestre em Modelagem Matemática e Computacional",
      department: "Unidade Acadêmica de Matemática e Ciências Exatas",
      email: "pedro.santos@ifpb.edu.br",
      areas: ["Matemática Aplicada", "Algoritmos", "Estrutura de Dados"]
    },
    {
      id: "prof-ana-beatriz",
      name: "Ana Beatriz Costa",
      title: "Mestra em Informática Aplicada",
      department: "Unidade Acadêmica de Informática",
      email: "ana.costa@ifpb.edu.br",
      areas: ["Programação Web", "Estrutura de Dados", "Desenvolvimento Frontend"]
    },
    {
      id: "prof-carlos-eduardo",
      name: "Carlos Eduardo Lima",
      title: "Mestre em Engenharia Civil",
      department: "Unidade Acadêmica de Construção Civil",
      email: "carlos.lima@ifpb.edu.br",
      areas: ["Resistência dos Materiais", "Edificações e Instalações"]
    },
    {
      id: "prof-juliana-mendes",
      name: "Juliana Mendes Rocha",
      title: "Doutora em Educação Matemática",
      department: "Unidade Acadêmica de Matemática",
      email: "juliana.rocha@ifpb.edu.br",
      areas: ["Cálculo Diferencial e Integral", "Geometria Analítica", "Didática"]
    }
  ],

  rooms: [
    {
      id: "lab-01",
      code: "Lab 01",
      name: "Laboratório de Informática 01",
      type: "Laboratório de Informática",
      building: "Bloco Acadêmico A - 1º Andar",
      capacity: 36,
      equipment: "36 Computadores i7, Projetor Interativo, Ar-condicionado, Quadro Branco"
    },
    {
      id: "lab-02",
      code: "Lab 02",
      name: "Laboratório de Informática 02",
      type: "Laboratório de Informática",
      building: "Bloco Acadêmico A - 1º Andar",
      capacity: 36,
      equipment: "36 Computadores i7, Projetor Interativo, Lousa Digital, Ar-condicionado"
    },
    {
      id: "sala-01",
      code: "Sala 01",
      name: "Sala 01",
      type: "Sala de Aula Convencional",
      building: "Bloco Central - Térreo",
      capacity: 45,
      equipment: "Carteiras Ergonômicas, Projetor Multimídia, Climatização"
    },
    {
      id: "sala-02",
      code: "Sala 02",
      name: "Sala 02",
      type: "Sala de Aula Convencional",
      building: "Bloco Central - Térreo",
      capacity: 45,
      equipment: "Carteiras Universitárias, Projetor Multimídia, Climatização"
    },
    {
      id: "sala-03",
      code: "Sala 03",
      name: "Sala 03",
      type: "Sala de Aula Convencional",
      building: "Bloco Central - 1º Andar",
      capacity: 40,
      equipment: "Carteiras Universitárias, Projetor Multimídia, Climatização"
    }
  ],

  disciplines: [
    { id: "disc-prog-web", name: "Programação Web", ch: "80h", tag: "web" },
    { id: "disc-banco-dados", name: "Banco de Dados", ch: "80h", tag: "dados" },
    { id: "disc-eng-soft", name: "Engenharia de Software", ch: "60h", tag: "eng" },
    { id: "disc-est-dados", name: "Estrutura de Dados", ch: "80h", tag: "prog" },
    { id: "disc-algoritmos", name: "Algoritmos e Lógica", ch: "80h", tag: "prog" },
    { id: "disc-mat-aplicada", name: "Matemática Aplicada", ch: "60h", tag: "exatas" },
    { id: "disc-so", name: "Sistemas Operacionais", ch: "60h", tag: "infra" },
    { id: "disc-redes", name: "Redes de Computadores", ch: "60h", tag: "infra" },
    { id: "disc-calc-1", name: "Cálculo Diferencial e Integral I", ch: "80h", tag: "exatas" },
    { id: "disc-geom-analitica", name: "Geometria Analítica e Vetores", ch: "60h", tag: "exatas" },
    { id: "disc-res-materiais", name: "Resistência dos Materiais", ch: "80h", tag: "edif" },
    { id: "disc-tec-construcao", name: "Tecnologia das Construções", ch: "80h", tag: "edif" }
  ],

  /**
   * Horários Acadêmicos Consolidados (Aulas)
   * 
   * Estrutura de cada aula:
   * - day: 1 a 6 (1 = Seg, 2 = Ter, 3 = Qua, 4 = Qui, 5 = Sex, 6 = Sáb)
   * - shift: 'matutino' | 'vespertino' | 'noturno'
   * - slotStart: id do horário de início ('M1', 'M3', 'V1', 'N1', etc.)
   * - slotSpan: quantidade de horários consecutivos (geralmente 2 horários)
   * - startTime: horário visual de início
   * - endTime: horário visual de término
   * - disciplineId / disciplineName
   * - courseId
   * - classId (turma)
   * - teacherId
   * - roomId
   * - theme: paleta de cor temática consistente
   */
  schedules: [
    // -------------------------------------------------------------
    // ADS 2025.1 (4º Período - Matutino)
    // -------------------------------------------------------------
    // Segunda-feira
    {
      id: "sch-01",
      day: 1,
      shift: "matutino",
      slotStart: "M1",
      slotSpan: 2,
      startTime: "07:00",
      endTime: "08:40",
      disciplineId: "disc-prog-web",
      disciplineName: "Programação Web",
      courseId: "ads",
      classId: "ads-2025-1",
      teacherId: "prof-ana-beatriz",
      roomId: "lab-01",
      theme: "emerald",
      obs: "Prática em laboratório com frameworks JavaScript e APIs."
    },
    {
      id: "sch-02",
      day: 1,
      shift: "matutino",
      slotStart: "M3",
      slotSpan: 2,
      startTime: "08:55",
      endTime: "10:35",
      disciplineId: "disc-banco-dados",
      disciplineName: "Banco de Dados",
      courseId: "ads",
      classId: "ads-2025-1",
      teacherId: "prof-joao-carlos",
      roomId: "lab-01",
      theme: "cyan",
      obs: "Modelagem relacional e consultas avançadas em SQL."
    },

    // Terça-feira
    {
      id: "sch-03",
      day: 2,
      shift: "matutino",
      slotStart: "M1",
      slotSpan: 2,
      startTime: "07:00",
      endTime: "08:40",
      disciplineId: "disc-eng-soft",
      disciplineName: "Engenharia de Software",
      courseId: "ads",
      classId: "ads-2025-1",
      teacherId: "prof-maria-eduarda",
      roomId: "sala-01",
      theme: "indigo",
      obs: "Metodologias ágeis, Scrum e documentação de requisitos."
    },
    {
      id: "sch-04",
      day: 2,
      shift: "matutino",
      slotStart: "M3",
      slotSpan: 2,
      startTime: "08:55",
      endTime: "10:35",
      disciplineId: "disc-so",
      disciplineName: "Sistemas Operacionais",
      courseId: "ads",
      classId: "ads-2025-1",
      teacherId: "prof-joao-carlos",
      roomId: "lab-02",
      theme: "slate",
      obs: "Gerenciamento de memória, processos e comandos Linux."
    },

    // Quarta-feira
    {
      id: "sch-05",
      day: 3,
      shift: "matutino",
      slotStart: "M1",
      slotSpan: 2,
      startTime: "07:00",
      endTime: "08:40",
      disciplineId: "disc-prog-web",
      disciplineName: "Programação Web",
      courseId: "ads",
      classId: "ads-2025-1",
      teacherId: "prof-ana-beatriz",
      roomId: "lab-01",
      theme: "emerald",
      obs: "Construção de interfaces responsivas e acessibilidade."
    },
    {
      id: "sch-06",
      day: 3,
      shift: "matutino",
      slotStart: "M3",
      slotSpan: 2,
      startTime: "08:55",
      endTime: "10:35",
      disciplineId: "disc-est-dados",
      disciplineName: "Estrutura de Dados",
      courseId: "ads",
      classId: "ads-2025-1",
      teacherId: "prof-ana-beatriz",
      roomId: "lab-01",
      theme: "amber",
      obs: "Listas, pilhas, filas, árvores binárias e análise de complexidade."
    },

    // Quinta-feira
    {
      id: "sch-07",
      day: 4,
      shift: "matutino",
      slotStart: "M1",
      slotSpan: 2,
      startTime: "07:00",
      endTime: "08:40",
      disciplineId: "disc-banco-dados",
      disciplineName: "Banco de Dados",
      courseId: "ads",
      classId: "ads-2025-1",
      teacherId: "prof-joao-carlos",
      roomId: "lab-02",
      theme: "cyan",
      obs: "Stored procedures, triggers e normalização de bancos de dados."
    },
    {
      id: "sch-08",
      day: 4,
      shift: "matutino",
      slotStart: "M3",
      slotSpan: 2,
      startTime: "08:55",
      endTime: "10:35",
      disciplineId: "disc-eng-soft",
      disciplineName: "Engenharia de Software",
      courseId: "ads",
      classId: "ads-2025-1",
      teacherId: "prof-maria-eduarda",
      roomId: "sala-01",
      theme: "indigo",
      obs: "Diagramas UML, arquitetura de software e testes de integração."
    },

    // Sexta-feira
    {
      id: "sch-09",
      day: 5,
      shift: "matutino",
      slotStart: "M1",
      slotSpan: 2,
      startTime: "07:00",
      endTime: "08:40",
      disciplineId: "disc-est-dados",
      disciplineName: "Estrutura de Dados",
      courseId: "ads",
      classId: "ads-2025-1",
      teacherId: "prof-ana-beatriz",
      roomId: "lab-01",
      theme: "amber",
      obs: "Algoritmos de ordenação e busca em grafos."
    },
    {
      id: "sch-10",
      day: 5,
      shift: "matutino",
      slotStart: "M3",
      slotSpan: 2,
      startTime: "08:55",
      endTime: "10:35",
      disciplineId: "disc-mat-aplicada",
      disciplineName: "Matemática Aplicada",
      courseId: "ads",
      classId: "ads-2025-1",
      teacherId: "prof-pedro-henrique",
      roomId: "sala-01",
      theme: "purple",
      obs: "Lógica proposicional, teoria dos conjuntos e álgebra booleana."
    },

    // Sábado (Atividades de Extensão / Projetos Práticos)
    {
      id: "sch-11",
      day: 6,
      shift: "matutino",
      slotStart: "M1",
      slotSpan: 2,
      startTime: "07:50",
      endTime: "09:45",
      disciplineId: "disc-eng-soft",
      disciplineName: "Engenharia de Software (Projetos)",
      courseId: "ads",
      classId: "ads-2025-1",
      teacherId: "prof-maria-eduarda",
      roomId: "lab-01",
      theme: "indigo",
      obs: "Laboratório de Fábrica de Software e Projetos de Extensão."
    },

    // -------------------------------------------------------------
    // ADS 2026.1 (2º Período - Matutino)
    // -------------------------------------------------------------
    // Segunda-feira
    {
      id: "sch-12",
      day: 1,
      shift: "matutino",
      slotStart: "M3",
      slotSpan: 2,
      startTime: "08:55",
      endTime: "10:35",
      disciplineId: "disc-algoritmos",
      disciplineName: "Algoritmos e Lógica",
      courseId: "ads",
      classId: "ads-2026-1",
      teacherId: "prof-pedro-henrique",
      roomId: "lab-02",
      theme: "teal",
      obs: "Introdução a estruturas condicionais e de repetição."
    },
    {
      id: "sch-13",
      day: 1,
      shift: "matutino",
      slotStart: "M5",
      slotSpan: 2,
      startTime: "10:45",
      endTime: "12:25",
      disciplineId: "disc-mat-aplicada",
      disciplineName: "Matemática Aplicada",
      courseId: "ads",
      classId: "ads-2026-1",
      teacherId: "prof-pedro-henrique",
      roomId: "sala-02",
      theme: "purple",
      obs: "Matrizes, sistemas lineares e aplicações em computação."
    },

    // Terça-feira
    {
      id: "sch-14",
      day: 2,
      shift: "matutino",
      slotStart: "M1",
      slotSpan: 2,
      startTime: "07:00",
      endTime: "08:40",
      disciplineId: "disc-algoritmos",
      disciplineName: "Algoritmos e Lógica",
      courseId: "ads",
      classId: "ads-2026-1",
      teacherId: "prof-pedro-henrique",
      roomId: "lab-01",
      theme: "teal",
      obs: "Funções, procedimentos e modularização em C / Python."
    },

    // Quarta-feira
    {
      id: "sch-15",
      day: 3,
      shift: "matutino",
      slotStart: "M3",
      slotSpan: 2,
      startTime: "08:55",
      endTime: "10:35",
      disciplineId: "disc-so",
      disciplineName: "Sistemas Operacionais",
      courseId: "ads",
      classId: "ads-2026-1",
      teacherId: "prof-joao-carlos",
      roomId: "lab-02",
      theme: "slate",
      obs: "Arquitetura de computadores e conceitos fundamentais de SO."
    },

    // Quinta-feira
    {
      id: "sch-16",
      day: 4,
      shift: "matutino",
      slotStart: "M1",
      slotSpan: 2,
      startTime: "07:00",
      endTime: "08:40",
      disciplineId: "disc-prog-web",
      disciplineName: "Programação Web Básica",
      courseId: "ads",
      classId: "ads-2026-1",
      teacherId: "prof-ana-beatriz",
      roomId: "lab-01",
      theme: "emerald",
      obs: "Fundamentos de HTML5, CSS3 semântico e estilização moderna."
    },

    // Sexta-feira
    {
      id: "sch-17",
      day: 5,
      shift: "matutino",
      slotStart: "M3",
      slotSpan: 2,
      startTime: "08:55",
      endTime: "10:35",
      disciplineId: "disc-mat-aplicada",
      disciplineName: "Matemática Aplicada",
      courseId: "ads",
      classId: "ads-2026-1",
      teacherId: "prof-pedro-henrique",
      roomId: "sala-02",
      theme: "purple",
      obs: "Aritmética computacional e fundamentos de criptografia."
    },

    // -------------------------------------------------------------
    // ADS 2024.1 (6º Período - Noturno)
    // -------------------------------------------------------------
    // Segunda-feira
    {
      id: "sch-18",
      day: 1,
      shift: "noturno",
      slotStart: "N1",
      slotSpan: 2,
      startTime: "18:40",
      endTime: "20:20",
      disciplineId: "disc-eng-soft",
      disciplineName: "Engenharia de Software Avançada",
      courseId: "ads",
      classId: "ads-2024-1",
      teacherId: "prof-maria-eduarda",
      roomId: "sala-01",
      theme: "indigo",
      obs: "DevOps, CI/CD, microsserviços e padrões de projeto GOF."
    },
    {
      id: "sch-19",
      day: 1,
      shift: "noturno",
      slotStart: "N3",
      slotSpan: 2,
      startTime: "20:30",
      endTime: "22:10",
      disciplineId: "disc-banco-dados",
      disciplineName: "Banco de Dados NoSQL",
      courseId: "ads",
      classId: "ads-2024-1",
      teacherId: "prof-joao-carlos",
      roomId: "lab-01",
      theme: "cyan",
      obs: "Bancos orientados a documentos, chave-valor e Big Data."
    },

    // Terça-feira
    {
      id: "sch-20",
      day: 2,
      shift: "noturno",
      slotStart: "N1",
      slotSpan: 2,
      startTime: "18:40",
      endTime: "20:20",
      disciplineId: "disc-prog-web",
      disciplineName: "Programação Web Avançada",
      courseId: "ads",
      classId: "ads-2024-1",
      teacherId: "prof-ana-beatriz",
      roomId: "lab-01",
      theme: "emerald",
      obs: "Aplicações Full Stack, segurança em APIs REST e GraphQL."
    },

    // Quarta-feira
    {
      id: "sch-21",
      day: 3,
      shift: "noturno",
      slotStart: "N1",
      slotSpan: 2,
      startTime: "18:40",
      endTime: "20:20",
      disciplineId: "disc-so",
      disciplineName: "Sistemas Distribuídos",
      courseId: "ads",
      classId: "ads-2024-1",
      teacherId: "prof-joao-carlos",
      roomId: "lab-02",
      theme: "slate",
      obs: "Comunicação entre processos, RPC, tolerância a falhas e Cloud."
    },

    // Quinta-feira
    {
      id: "sch-22",
      day: 4,
      shift: "noturno",
      slotStart: "N1",
      slotSpan: 2,
      startTime: "18:40",
      endTime: "20:20",
      disciplineId: "disc-eng-soft",
      disciplineName: "Trabalho de Conclusão de Curso (TCC)",
      courseId: "ads",
      classId: "ads-2024-1",
      teacherId: "prof-maria-eduarda",
      roomId: "sala-01",
      theme: "indigo",
      obs: "Orientação e acompanhamento de projetos finais de curso."
    },

    // -------------------------------------------------------------
    // TCE 2025.1 (3º Período - Vespertino)
    // -------------------------------------------------------------
    // Segunda-feira
    {
      id: "sch-23",
      day: 1,
      shift: "vespertino",
      slotStart: "V1",
      slotSpan: 2,
      startTime: "13:00",
      endTime: "14:40",
      disciplineId: "disc-res-materiais",
      disciplineName: "Resistência dos Materiais",
      courseId: "tce",
      classId: "tce-2025-1",
      teacherId: "prof-carlos-eduardo",
      roomId: "sala-02",
      theme: "rose",
      obs: "Tensões, deformações, torção e flexão em vigas estruturais."
    },
    {
      id: "sch-24",
      day: 1,
      shift: "vespertino",
      slotStart: "V3",
      slotSpan: 2,
      startTime: "14:55",
      endTime: "16:35",
      disciplineId: "disc-tec-construcao",
      disciplineName: "Tecnologia das Construções",
      courseId: "tce",
      classId: "tce-2025-1",
      teacherId: "prof-carlos-eduardo",
      roomId: "sala-02",
      theme: "orange",
      obs: "Fundações rasas e profundas, alvenarias e sistemas de vedação."
    },

    // Terça-feira
    {
      id: "sch-25",
      day: 2,
      shift: "vespertino",
      slotStart: "V1",
      slotSpan: 2,
      startTime: "13:00",
      endTime: "14:40",
      disciplineId: "disc-mat-aplicada",
      disciplineName: "Matemática Aplicada à Engenharia",
      courseId: "tce",
      classId: "tce-2025-1",
      teacherId: "prof-pedro-henrique",
      roomId: "sala-02",
      theme: "purple",
      obs: "Trigonometria, estática e equilíbrio de corpos rígidos."
    },

    // Quarta-feira
    {
      id: "sch-26",
      day: 3,
      shift: "vespertino",
      slotStart: "V3",
      slotSpan: 2,
      startTime: "14:55",
      endTime: "16:35",
      disciplineId: "disc-res-materiais",
      disciplineName: "Resistência dos Materiais (Lab)",
      courseId: "tce",
      classId: "tce-2025-1",
      teacherId: "prof-carlos-eduardo",
      roomId: "sala-03",
      theme: "rose",
      obs: "Ensaios mecânicos de tração, compressão e cizalhamento."
    },

    // Quinta-feira
    {
      id: "sch-27",
      day: 4,
      shift: "vespertino",
      slotStart: "V1",
      slotSpan: 2,
      startTime: "13:00",
      endTime: "14:40",
      disciplineId: "disc-tec-construcao",
      disciplineName: "Tecnologia das Construções II",
      courseId: "tce",
      classId: "tce-2025-1",
      teacherId: "prof-carlos-eduardo",
      roomId: "sala-02",
      theme: "orange",
      obs: "Revestimentos cerâmicos, argamassas e instalações hidrossanitárias."
    },

    // Sexta-feira
    {
      id: "sch-28",
      day: 5,
      shift: "vespertino",
      slotStart: "V1",
      slotSpan: 2,
      startTime: "13:00",
      endTime: "14:40",
      disciplineId: "disc-eng-soft",
      disciplineName: "Gestão de Obras e Projetos",
      courseId: "tce",
      classId: "tce-2025-1",
      teacherId: "prof-maria-eduarda",
      roomId: "sala-02",
      theme: "indigo",
      obs: "Orçamentação, cronogramas físico-financeiros e software BIM."
    },

    // -------------------------------------------------------------
    // MAT 2025.1 (3º Período - Noturno)
    // -------------------------------------------------------------
    // Segunda-feira
    {
      id: "sch-29",
      day: 1,
      shift: "noturno",
      slotStart: "N1",
      slotSpan: 2,
      startTime: "18:40",
      endTime: "20:20",
      disciplineId: "disc-calc-1",
      disciplineName: "Cálculo Diferencial e Integral I",
      courseId: "mat",
      classId: "mat-2025-1",
      teacherId: "prof-juliana-mendes",
      roomId: "sala-03",
      theme: "blue",
      obs: "Limites, continuidade, derivadas de funções e regras de derivação."
    },

    // Terça-feira
    {
      id: "sch-30",
      day: 2,
      shift: "noturno",
      slotStart: "N1",
      slotSpan: 2,
      startTime: "18:40",
      endTime: "20:20",
      disciplineId: "disc-geom-analitica",
      disciplineName: "Geometria Analítica e Vetores",
      courseId: "mat",
      classId: "mat-2025-1",
      teacherId: "prof-juliana-mendes",
      roomId: "sala-03",
      theme: "violet",
      obs: "Operações com vetores, equações da reta, plano e cônicas."
    },
    {
      id: "sch-31",
      day: 2,
      shift: "noturno",
      slotStart: "N3",
      slotSpan: 2,
      startTime: "20:30",
      endTime: "22:10",
      disciplineId: "disc-mat-aplicada",
      disciplineName: "Matemática Aplicada",
      courseId: "mat",
      classId: "mat-2025-1",
      teacherId: "prof-pedro-henrique",
      roomId: "sala-03",
      theme: "purple",
      obs: "Modelos matemáticos em ciências naturais e exatas."
    },

    // Quarta-feira
    {
      id: "sch-32",
      day: 3,
      shift: "noturno",
      slotStart: "N1",
      slotSpan: 2,
      startTime: "18:40",
      endTime: "20:20",
      disciplineId: "disc-calc-1",
      disciplineName: "Cálculo Diferencial e Integral I",
      courseId: "mat",
      classId: "mat-2025-1",
      teacherId: "prof-juliana-mendes",
      roomId: "sala-03",
      theme: "blue",
      obs: "Aplicações de derivadas: taxas de variação, máximos e mínimos."
    },

    // Quinta-feira
    {
      id: "sch-33",
      day: 4,
      shift: "noturno",
      slotStart: "N1",
      slotSpan: 2,
      startTime: "18:40",
      endTime: "20:20",
      disciplineId: "disc-algoritmos",
      disciplineName: "Algoritmos Computacionais para Matemática",
      courseId: "mat",
      classId: "mat-2025-1",
      teacherId: "prof-pedro-henrique",
      roomId: "lab-02",
      theme: "teal",
      obs: "Implementação de métodos numéricos e cálculos com Python."
    },

    // Sexta-feira
    {
      id: "sch-34",
      day: 5,
      shift: "noturno",
      slotStart: "N1",
      slotSpan: 2,
      startTime: "18:40",
      endTime: "20:20",
      disciplineId: "disc-geom-analitica",
      disciplineName: "Geometria Analítica e Vetores",
      courseId: "mat",
      classId: "mat-2025-1",
      teacherId: "prof-juliana-mendes",
      roomId: "sala-03",
      theme: "violet",
      obs: "Superfícies quádricas e transformações lineares no espaço."
    }
  ]
};

// Objeto de Acesso Rápido e Helpers
const DataService = {
  getMeta: () => ACADEMIC_DATA.meta,
  getWeekDays: () => ACADEMIC_DATA.weekDays,
  getShifts: () => ACADEMIC_DATA.shifts,
  getCourses: () => ACADEMIC_DATA.courses,
  getClasses: () => ACADEMIC_DATA.classes,
  getTeachers: () => ACADEMIC_DATA.teachers,
  getRooms: () => ACADEMIC_DATA.rooms,
  getDisciplines: () => ACADEMIC_DATA.disciplines,
  getAllSchedules: () => ACADEMIC_DATA.schedules,

  // Buscas por ID
  getCourseById: (id) => ACADEMIC_DATA.courses.find(c => c.id === id),
  getClassById: (id) => ACADEMIC_DATA.classes.find(c => c.id === id),
  getTeacherById: (id) => ACADEMIC_DATA.teachers.find(t => t.id === id),
  getRoomById: (id) => ACADEMIC_DATA.rooms.find(r => r.id === id),
  getDisciplineById: (id) => ACADEMIC_DATA.disciplines.find(d => d.id === id),

  // Consulta por Categoria Principal
  getByCategory: (category, id) => {
    switch (category) {
      case "turma":
        return ACADEMIC_DATA.schedules.filter(s => s.classId === id);
      case "curso":
        return ACADEMIC_DATA.schedules.filter(s => s.courseId === id);
      case "professor":
        return ACADEMIC_DATA.schedules.filter(s => s.teacherId === id);
      case "ambiente":
        return ACADEMIC_DATA.schedules.filter(s => s.roomId === id);
      default:
        return [];
    }
  },

  // Retorna entidade com seus metadados para exibição no cabeçalho dos resultados
  getEntityInfo: (category, id) => {
    if (category === "turma") {
      const cls = DataService.getClassById(id);
      if (!cls) return null;
      const course = DataService.getCourseById(cls.courseId);
      const room = DataService.getRoomById(cls.roomMain);
      return {
        title: cls.name,
        subtitle: `${course ? course.name : ''} • Turno: ${cls.shift.charAt(0).toUpperCase() + cls.shift.slice(1)}`,
        badge: cls.period,
        details: [
          { label: "Curso", value: course ? course.name : "—" },
          { label: "Turno Principal", value: cls.shift.charAt(0).toUpperCase() + cls.shift.slice(1) },
          { label: "Estudantes", value: `${cls.totalStudents} matriculados` },
          { label: "Ambiente Principal", value: room ? room.name : "—" }
        ],
        raw: cls
      };
    }
    if (category === "curso") {
      const crs = DataService.getCourseById(id);
      if (!crs) return null;
      const classes = ACADEMIC_DATA.classes.filter(c => c.courseId === id);
      return {
        title: crs.name,
        subtitle: `${crs.level} • Cód: ${crs.code} • ${crs.duration}`,
        badge: crs.code,
        details: [
          { label: "Modalidade", value: crs.level },
          { label: "Duração", value: crs.duration },
          { label: "Turno(s)", value: crs.shiftDefault },
          { label: "Turmas Ativas", value: `${classes.length} turmas cadastradas` }
        ],
        raw: crs
      };
    }
    if (category === "professor") {
      const prof = DataService.getTeacherById(id);
      if (!prof) return null;
      return {
        title: prof.name,
        subtitle: `${prof.title} • ${prof.department}`,
        badge: "Docente",
        details: [
          { label: "Titulação", value: prof.title },
          { label: "Departamento", value: prof.department },
          { label: "E-mail Acadêmico", value: prof.email },
          { label: "Áreas", value: prof.areas.join(", ") }
        ],
        raw: prof
      };
    }
    if (category === "ambiente") {
      const room = DataService.getRoomById(id);
      if (!room) return null;
      return {
        title: room.name,
        subtitle: `${room.type} • ${room.building}`,
        badge: room.code,
        details: [
          { label: "Tipo", value: room.type },
          { label: "Localização", value: room.building },
          { label: "Capacidade", value: `${room.capacity} pessoas` },
          { label: "Recursos", value: room.equipment }
        ],
        raw: room
      };
    }
    return null;
  }
};
