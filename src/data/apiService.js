// Módulo de Conexão com Supabase e APIs do INPE
import { brigadasMock, cursosMock, estatisticasGlobais } from './mockData';

// Variáveis do Supabase lidas do arquivo .env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

/**
 * Helper para requisições REST ao Supabase sem precisar de dependências pesadas
 */
async function supabaseFetch(endpoint, options = {}) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;

  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  const defaultHeaders = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.warn(`[Supabase] Erro ao consultar ${endpoint}:`, err);
    return null;
  }
}

/**
 * 1. Busca Brigadas Mapeadas (Tabela "brigadas")
 */
export async function fetchBrigadas() {
  const data = await supabaseFetch('brigadas?select=*');
  if (data && data.length > 0) return data;
  return brigadasMock; // Fallback para dados locais se tabela estiver vazia
}

/**
 * 2. Busca Cursos e Editais (Tabela "cursos")
 */
export async function fetchCursos() {
  const data = await supabaseFetch('cursos?select=*');
  if (data && data.length > 0) return data;
  return cursosMock;
}

/**
 * 3. Busca Relatos de Fogo do Waze Cerrado (Tabela "relatos_fogo")
 */
export async function fetchRelatosFogo() {
  const data = await supabaseFetch('relatos_fogo?select=*&order=created_at.desc');
  return data;
}

/**
 * 4. Insere Novo Relato de Fogo (Waze Cerrado) no Supabase
 */
export async function saveRelatoFogo(relato) {
  return await supabaseFetch('relatos_fogo', {
    method: 'POST',
    body: JSON.stringify({
      titulo: relato.title,
      tipo: relato.type,
      localizacao: relato.location,
      coordenadas: relato.coords,
      descricao: relato.description,
      confirmacoes: relato.confirmations || 1
    })
  });
}

/**
 * 5. Salva novo cadastro de Voluntário no Supabase (Tabela "voluntarios")
 */
export async function saveVoluntario(voluntario) {
  return await supabaseFetch('voluntarios', {
    method: 'POST',
    body: JSON.stringify({
      nome: voluntario.nome,
      email: voluntario.email,
      whatsapp: voluntario.whatsapp,
      cidade: voluntario.cidade,
      disponibilidade: voluntario.disponibilidade,
      habilidades: voluntario.habilidades
    })
  });
}

/**
 * 6. Consulta Estatísticas Globais Dinâmicas do Banco
 */
export async function fetchEstatisticas() {
  try {
    const relatos = await fetchRelatosFogo();
    const brigadas = await fetchBrigadas();
    
    const focosContagem = (relatos && relatos.length > 0) ? relatos.length : estatisticasGlobais.focosAtivos;
    const brigadasContagem = (brigadas && brigadas.length > 0) ? brigadas.length : estatisticasGlobais.brigadasAtivas;

    return {
      focosAtivos: focosContagem,
      hectaresProtegidos: estatisticasGlobais.hectaresProtegidos,
      brigadasAtivas: brigadasContagem
    };
  } catch (err) {
    return estatisticasGlobais;
  }
}

