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
    nome: "Geral do Moinho",
    municipio: "Cavalcante, GO",
    estado: "GO",
    status_cor: "danger",
    status_texto: "Active Fire",
    tags_necessidade: ["Abafadores", "Fuel", "Food"],
    pix_chave: "pix.moinho@brigadasdocerrado.org.br",
    pix_recebedor: "Associação Brigada Geral do Moinho",
    inpe_verified: true,
    descricao: "Currently battling a front near the state park border. Urgent need for field supplies and...",
    imagem: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b2",
    nome: "Guardiões do Kalunga",
    municipio: "Teresina de Goiás, GO",
    estado: "GO",
    status_cor: "warning",
    status_texto: "High Risk Area",
    tags_necessidade: ["Vehicle Repair", "Boots"],
    meta_arrecadada: 2500,
    meta_total: 3000,
    pix_chave: "09.432.188/0001-92",
    pix_recebedor: "Associação Quilombola Kalunga",
    inpe_verified: true,
    descricao: "Conducting preventive patrols and firebreak maintenance in highly vulnerable zones.",
    imagem: "https://images.unsplash.com/photo-1574689231351-85ce0d692811?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b3",
    nome: "Brigada Aliança",
    municipio: "Alto Paraíso, GO",
    estado: "GO",
    status_cor: "info",
    status_texto: "Monitoring",
    tags_necessidade: ["Radios", "First Aid"],
    pix_chave: "alianca.brigada@pix.org.br",
    pix_recebedor: "Coletivo Brigada Aliança",
    inpe_verified: false,
    pending_verif: true,
    descricao: "Focusing on education and community preparation before the peak dry season.",
    imagem: "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b4",
    nome: "Brigada Sertão das Nascentes",
    municipio: "Mambaí / Buritinópolis, GO",
    estado: "GO",
    status_cor: "success",
    status_texto: "Safe Zone",
    tags_necessidade: ["EPI", "Cartilhas"],
    pix_chave: "mambai.brigada@cerradovivo.org.br",
    pix_recebedor: "Brigada Voluntária de Mambaí",
    inpe_verified: true,
    descricao: "Perímetro sob controle. Realizando mutirão de manejo integrado do fogo.",
    imagem: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80"
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
