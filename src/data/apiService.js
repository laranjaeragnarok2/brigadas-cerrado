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
 * 5. Consulta Satélites INPE (BDQueimadas API Gratuita)
 */
export async function fetchINPEFocos() {
  try {
    const response = await fetch('https://queimadas.dgi.inpe.br/api/focos/?bioma=Cerrado&limite=50');
    if (!response.ok) throw new Error('Falha ao conectar à API do INPE');
    const focos = await response.json();
    return {
      focosAtivosCount: focos.length || 14,
      focosLista: focos
    };
  } catch (error) {
    return {
      focosAtivosCount: estatisticasGlobais.focosAtivos,
      focosLista: []
    };
  }
}
