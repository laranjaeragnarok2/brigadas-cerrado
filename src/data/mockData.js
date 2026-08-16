export const estatisticasGlobais = {
  focosAtivos: 24,
  hectaresProtegidos: "128.500 ha",
  brigadasAtivas: 42,
  voluntariosCadastrados: 518,
  ultimaAtualizacao: "Checagem de Campo + Satélite INPE/BDQueimadas"
};

export const focosSatéliteGoiás = [
  // Chapada dos Veadeiros & Norte Goiano
  { id: 'sat_1', type: 'danger', title: 'Foco Ativo - GO-237 km 14', location: 'Alto Paraíso de Goiás, GO', coords: '-14.1311, -47.5218', confirmations: 18, description: 'Satélite VIIRS detectou anomalia térmica em área de cerrado denso.' },
  { id: 'sat_2', type: 'danger', title: 'Incêndio em Encosta', location: 'Cavalcante (Quilombo Kalunga), GO', coords: '-13.7964, -47.4583', confirmations: 14, description: 'Foco ativo próximo à comunidade Vão de Almas.' },
  { id: 'sat_3', type: 'warning', title: 'Fumaça em Pastagem', location: 'Teresina de Goiás, GO', coords: '-13.7781, -47.2614', confirmations: 7, description: 'Coluna de fumaça em área de pastagem seca.' },
  { id: 'sat_4', type: 'danger', title: 'Foco de Calor em Mata Ciliar', location: 'Minaçu, GO', coords: '-13.5328, -48.2203', confirmations: 11, description: 'Sensor MODIS registrou alta temperatura no leito do rio.' },
  { id: 'sat_5', type: 'warning', title: 'Queimada Agrícola Não Autorizada', location: 'Porangatu, GO', coords: '-13.4411, -49.1486', confirmations: 5, description: 'Foco isolado na zona rural norte.' },
  { id: 'sat_6', type: 'danger', title: 'Foco Ativo - Vão dos Moleques', location: 'Colinas do Sul, GO', coords: '-14.1508, -48.0772', confirmations: 11, description: 'Avanço de chamas rumo ao reservatório de Serra da Mesa.' },

  // Nordeste Goiano & Mambaí
  { id: 'sat_7', type: 'danger', title: 'Foco em Veredas', location: 'Mambaí, GO', coords: '-14.4842, -46.1114', confirmations: 16, description: 'Incêndio em área de veredas e buritizais.' },
  { id: 'sat_8', type: 'warning', title: 'Coluna de Fumaça em Caverna', location: 'Alvorada do Norte, GO', coords: '-14.4811, -46.4952', confirmations: 6, description: 'Fumaça detectada na serra de calcário.' },
  { id: 'sat_9', type: 'danger', title: 'Foco Ativo na Fronteira com a Bahia', location: 'Posse, GO', coords: '-14.0931, -46.3694', confirmations: 10, description: 'Foco persistente em vegetação típica de cerrado baiano.' },
  { id: 'sat_10', type: 'warning', title: 'Fogo em Pastagem', location: 'Flores de Goiás, GO', coords: '-14.4491, -47.0522', confirmations: 4, description: 'Queima controlada que escapou para reserva legal.' },

  // Centro / Pirenópolis / Entorno DF
  { id: 'sat_11', type: 'danger', title: 'Incêndio em Parque Estadual', location: 'Pirenópolis (Pyreneus), GO', coords: '-15.8504, -48.9583', confirmations: 22, description: 'Foco de grandes proporções no topo da serra dos Pyreneus.' },
  { id: 'sat_12', type: 'warning', title: 'Coluna de Fumaça na BR-070', location: 'Corumbá de Goiás, GO', coords: '-15.7642, -48.8092', confirmations: 9, description: 'Fumaça comprometendo a visibilidade da rodovia.' },
  { id: 'sat_13', type: 'danger', title: 'Foco de Calor em Reserva', location: 'Formosa, GO', coords: '-15.5372, -47.3344', confirmations: 13, description: 'Foco próximo à Lagoa Feia e Salto do Itiquira.' },
  { id: 'sat_14', type: 'warning', title: 'Queimada em Área Agrícola', location: 'Cristalina, GO', coords: '-16.7686, -47.6136', confirmations: 8, description: 'Ponto quente detectado em área irrigada.' },
  { id: 'sat_15', type: 'danger', title: 'Foco Próximo ao DF', location: 'Luziânia, GO', coords: '-16.2528, -47.9500', confirmations: 11, description: 'Alerta de fumaça na divisa com o Distrito Federal.' },
  { id: 'sat_16', type: 'warning', title: 'Fogo em Capoeira', location: 'Padre Bernardo, GO', coords: '-15.1631, -48.2831', confirmations: 5, description: 'Foco inicial perto do Rio Maranhão.' },

  // Sudoeste & Sul de Goiás
  { id: 'sat_17', type: 'danger', title: 'Incêndio no Perímetro do Parque', location: 'Mineiros (Parque das Emas), GO', coords: '-17.5683, -52.5511', confirmations: 19, description: 'Fogo avançando com vento forte no Parque Nacional das Emas.' },
  { id: 'sat_18', type: 'danger', title: 'Foco de Calor em Palhada', location: 'Rio Verde, GO', coords: '-17.7922, -50.9189', confirmations: 15, description: 'Foco em lavoura de milho colhida.' },
  { id: 'sat_19', type: 'warning', title: 'Fumaça em Margem de Rodovia', location: 'Jataí, GO', coords: '-17.8814, -51.7144', confirmations: 7, description: 'Fogo de acostamento avançando para reserva legal.' },
  { id: 'sat_20', type: 'danger', title: 'Incêndio em Serra de Caldas', location: 'Caldas Novas, GO', coords: '-17.7441, -48.6258', confirmations: 14, description: 'Foco no Parque Estadual da Serra de Caldas Novas.' },
  { id: 'sat_21', type: 'warning', title: 'Foco em Matagal', location: 'Morrinhos, GO', coords: '-17.7314, -49.0994', confirmations: 6, description: 'Fumaça branca avistada perto da BR-153.' },

  // Oeste & Vale do Araguaia
  { id: 'sat_22', type: 'danger', title: 'Foco na Borda da Floresta', location: 'Aruanã (Rio Araguaia), GO', coords: '-14.9131, -51.0831', confirmations: 12, description: 'Foco de calor em mata de galeria às margens do Araguaia.' },
  { id: 'sat_23', type: 'warning', title: 'Fumaça em Área de Vereda', location: 'Goiás Velho, GO', coords: '-15.9339, -50.1408', confirmations: 8, description: 'Alerta preventivo na serra de Jaraguá/Goiás.' },
  { id: 'sat_24', type: 'danger', title: 'Foco Ativo de Alta Intensidade', location: 'São Luís de Montes Belos, GO', coords: '-16.5253, -50.3708', confirmations: 10, description: 'Satélite confirmou foco de alta radiação térmica.' }
];


export const brigadasMock = [
  {
    id: "b1",
    nome: "Geral do Moinho",
    municipio: "Cavalcante, GO (Chapada)",
    estado: "GO",
    status_cor: "danger",
    status_texto: "Active Fire",
    tags_necessidade: ["Abafadores", "Fuel", "Food"],
    pix_chave: "pix.moinho@brigadasdocerrado.org.br",
    pix_recebedor: "Associação Brigada Geral do Moinho",
    inpe_verified: true,
    descricao: "Atuando no combate a focos de encosta nas divisas do Parque Nacional da Chapada dos Veadeiros.",
    imagem: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b2",
    nome: "Guardiões do Kalunga",
    municipio: "Teresina de Goiás, GO (Quilombo)",
    estado: "GO",
    status_cor: "warning",
    status_texto: "High Risk Area",
    tags_necessidade: ["Vehicle Repair", "Boots"],
    meta_arrecadada: 2500,
    meta_total: 3000,
    pix_chave: "09.432.188/0001-92",
    pix_recebedor: "Associação Quilombola Kalunga",
    inpe_verified: true,
    descricao: "Rondas preventivas e manutenção de aceiros no Vão de Almas e Vão dos Moleques.",
    imagem: "https://images.unsplash.com/photo-1574689231351-85ce0d692811?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b3",
    nome: "Brigada Aliança",
    municipio: "Alto Paraíso de Goiás, GO",
    estado: "GO",
    status_cor: "info",
    status_texto: "Monitoring",
    tags_necessidade: ["Radios", "First Aid"],
    pix_chave: "alianca.brigada@pix.org.br",
    pix_recebedor: "Coletivo Brigada Aliança",
    inpe_verified: false,
    pending_verif: true,
    descricao: "Educação ambiental comunitária e apoio logístico de combate no entorno dos Saltos do Rio Preto.",
    imagem: "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b4",
    nome: "Guardiões dos Pyreneus",
    municipio: "Pirenópolis, GO (Centro Goiano)",
    estado: "GO",
    status_cor: "warning",
    status_texto: "High Risk Area",
    tags_necessidade: ["Sopadores", "Rádios HT"],
    meta_arrecadada: 1800,
    meta_total: 2500,
    pix_chave: "pyreneus.brigada@pix.org.br",
    pix_recebedor: "Coletivo Ambientalista de Pirenópolis",
    inpe_verified: true,
    descricao: "Monitorando focos de calor na área do Parque Estadual dos Pyreneus e divisas com fazendas.",
    imagem: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b5",
    nome: "Brigada Parque das Emas",
    municipio: "Mineiros, GO (Sudoeste)",
    estado: "GO",
    status_cor: "danger",
    status_texto: "Active Fire",
    tags_necessidade: ["Bombas Costais", "EPI"],
    pix_chave: "emas.brigada@pix.org.br",
    pix_recebedor: "Associação Brigadistas de Mineiros",
    inpe_verified: true,
    descricao: "Vento forte e baixa umidade no perímetro do Parque Nacional das Emas com aceiros em andamento.",
    imagem: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b6",
    nome: "Brigada Sertão das Nascentes",
    municipio: "Mambaí, GO (Nordeste)",
    estado: "GO",
    status_cor: "success",
    status_texto: "Safe Zone",
    tags_necessidade: ["Cartilhas", "Ferramentas"],
    pix_chave: "mambai.brigada@cerradovivo.org.br",
    pix_recebedor: "Brigada Voluntária de Mambaí",
    inpe_verified: true,
    descricao: "Perímetro sob controle. Realizando mutirão de manejo integrado do fogo na região das veredas.",
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
