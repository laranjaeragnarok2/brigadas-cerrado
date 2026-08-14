export const estatisticasGlobais = {
  focosAtivos: 14,
  hectaresProtegidos: "128.500 ha",
  brigadasAtivas: 42,
  voluntariosCadastrados: 518,
  ultimaAtualizacao: "Checagem de Campo + Satélite INPE/BDQueimadas"
};

export const brigadasMock = [
  {
    id: "b1",
    nome: "Brigada Voluntária da Chapada dos Veadeiros",
    municipio: "Alto Paraíso de Goiás - GO",
    estado: "GO",
    status_cor: "danger",
    status_texto: "Combate na Serra",
    tags_necessidade: ["Abafadores de Couro", "Mochilas Costais 20L", "Marmitas & Água", "Gasolina para 4x4"],
    pix_chave: "pix.chapada@brigadasdocerrado.org.br",
    pix_recebedor: "Associação Brigada Voluntária da Chapada",
    atendimentos_2026: 32,
    descricao: "Tropa de solo em combate direto no setor norte do Parque Nacional. 18 brigadistas comunitários atuando na serra com aceiros negros.",
    imagem: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b2",
    nome: "Brigada Comunitária Kalunga do Vão de Almas",
    municipio: "Cavalcante - GO (Território Quilombola)",
    estado: "GO",
    status_cor: "danger",
    status_texto: "Fogo no Vão",
    tags_necessidade: ["Bombas Costais", "Botas de Couro de Solo", "Lanternas de Cabeça", "Kits de Primeiros Socorros"],
    pix_chave: "09.432.188/0001-92",
    pix_recebedor: "Associação Quilombola Vão de Almas (AQVA)",
    atendimentos_2026: 41,
    descricao: "Fogo de encosta avançando em área de difícil acesso nos vales do Vão de Almas. Transporte feito a cavalo e a pé por trilhas íngremes.",
    imagem: "https://images.unsplash.com/photo-1574689231351-85ce0d692811?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b3",
    nome: "Brigada Guardiões dos Pyreneus",
    municipio: "Pirenópolis - GO",
    estado: "GO",
    status_cor: "warning",
    status_texto: "Alerta na Serra",
    tags_necessidade: ["Sopadores a Gasolina", "Rádios HT de Comunicação", "Manutenção de Veículos"],
    pix_chave: "pyreneus.brigada@pix.org.br",
    pix_recebedor: "Coletivo Ambientalista de Pirenópolis",
    atendimentos_2026: 18,
    descricao: "Monitorando focos de calor na área do Parque Estadual dos Pyreneus. Aceiros preventivos concluídos nas divisas com propriedades rurais.",
    imagem: "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b4",
    nome: "Brigada Sertão das Nascentes",
    municipio: "Mambaí / Buritinópolis - GO",
    estado: "GO",
    status_cor: "success",
    status_texto: "Área Monitorada",
    tags_necessidade: ["Equipamentos de Proteção (EPI)", "Cartilhas para Escolas"],
    pix_chave: "mambai.brigada@cerradovivo.org.br",
    pix_recebedor: "Brigada Voluntária de Mambaí",
    atendimentos_2026: 12,
    descricao: "Perímetro sob controle. Realizando mutirão de manejo integrado do fogo com pequenos produtores da região das veredas.",
    imagem: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b5",
    nome: "Brigada Parque Nacional das Emas",
    municipio: "Mineiros - GO",
    estado: "GO",
    status_cor: "warning",
    status_texto: "Alerta de Estiagem",
    tags_necessidade: ["Combustível", "Máscaras PFF3 com Filtro", "Óleo para Motosserra"],
    pix_chave: "emas.brigada@pix.org.br",
    pix_recebedor: "Associação Brigadistas de Mineiros",
    atendimentos_2026: 22,
    descricao: "Vento forte e umidade do ar em 11%. Ronda constante no perímetro do Parque das Emas para conter focos de faísca.",
    imagem: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80"
  }
];

export const cursosMock = [
  {
    id: "c1",
    titulo: "Oficina Comunitária de Manejo Integrado do Fogo (MIF) & Aceiros",
    orgao: "Prevfogo/IBAMA & Brigada Chapada",
    vagas: "35 vagas comunitárias",
    prazo: "Inscrições até 25 de Agosto",
    modalidade: "Prática em Campo (Sítios & Comunidades)",
    local: "Alto Paraíso de Goiás / Cavalcante - GO",
    status: "Inscrições Abertas",
    requisitos: "Moradores locais, agricultores familiares, brigadistas voluntários e guias da Chapada."
  },
  {
    id: "c2",
    titulo: "Formação de Voluntários Remotos: Mapeamento de Fogo & Apoio Logístico",
    orgao: "Rede Cerrado Vivo Tech",
    vagas: "100 vagas",
    prazo: "Fluxo Contínuo",
    modalidade: "Online / Encontros Virtuais",
    local: "100% Remoto",
    status: "Inscrições Abertas",
    requisitos: "Desejo de apoiar o Cerrado! Conhecimento em planilhas, redes sociais, mapas ou comunicação."
  },
  {
    id: "c3",
    titulo: "Curso de Formação de Brigadistas de Incêndios Florestais (Nível 1)",
    orgao: "Corpo de Bombeiros / ICMBio",
    vagas: "25 vagas",
    prazo: "Em Breve (Setembro/2026)",
    modalidade: "Teórico-Prático Intensivo",
    local: "Pirenópolis - GO",
    status: "Em Breve",
    requisitos: "Maior de 18 anos, bom preparo físico e disponibilidade para combates em terreno irregular."
  }
];

export const emergenciaMock = [
  {
    id: "e1",
    nome: "Corpo de Bombeiros Militar de Goiás (CBMGO)",
    numero: "193",
    descricao: "Emergência direta para incêndios florestais e resgate de pessoas e animais.",
    tipo: "Estadual / Emergência 24h"
  },
  {
    id: "e2",
    nome: "Prevfogo / IBAMA (Central de Emergência Fogo)",
    numero: "0800 61 8080",
    descricao: "Linha direta federal para coordenação de aeronaves e brigadas de grande porte.",
    tipo: "Federal"
  },
  {
    id: "e3",
    nome: "ICMBio - Coordenação Parque Chapada dos Veadeiros",
    numero: "(62) 3446-1159",
    descricao: "Alertas de focos dentro e no entorno do Parque Nacional.",
    tipo: "Unidade de Conservação"
  },
  {
    id: "e4",
    nome: "Defesa Civil de Goiás",
    numero: "199",
    descricao: "Apoio a comunidades afetadas por fumaça densa e secagem de nascentes.",
    tipo: "Estadual"
  },
  {
    id: "e5",
    nome: "WhatsApp de Apoio às Brigadas Voluntárias",
    numero: "(62) 99876-5432",
    descricao: "Coordenação de doações de marmitas, combustível para veículos 4x4 e equipamentos.",
    tipo: "Rede Voluntária Goiana"
  }
];
