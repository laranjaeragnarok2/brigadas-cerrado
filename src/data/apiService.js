// Serviço de Integração de Dados em Tempo Real (APIs & Supabase)
import { brigadasMock, estatisticasGlobais } from './mockData';

// Configurações de Variáveis de Ambiente (configure no arquivo .env)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const WEBHOOK_VOLUNTARIADO_URL = import.meta.env.VITE_WEBHOOK_URL || '';

/**
 * 1. Busca Focos de Queimadas do Satélite INPE em Tempo Real (API Gratuita)
 */
export async function fetchINPEFocos() {
  try {
    const response = await fetch('https://queimadas.dgi.inpe.br/api/focos/?bioma=Cerrado&limite=50');
    if (!response.ok) throw new Error('Erro na requisição ao INPE');
    
    const focos = await response.json();
    return {
      focosAtivosCount: focos.length || 14,
      focosLista: focos
    };
  } catch (error) {
    console.warn("Usando fallback de estatísticas locais:", error);
    return {
      focosAtivosCount: estatisticasGlobais.focosAtivos,
      focosLista: []
    };
  }
}

/**
 * 2. Busca Coleção de Brigadas do Supabase / Banco Real
 */
export async function fetchBrigadas() {
  // Se houver chave do Supabase configurada, busca do banco real
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/brigadas?select=*`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      if (!response.ok) throw new Error('Erro ao buscar brigadas no Supabase');
      const data = await response.json();
      return data.length > 0 ? data : brigadasMock;
    } catch (err) {
      console.warn("Erro no Supabase, usando dados locais:", err);
      return brigadasMock;
    }
  }
  
  // Se não houver chave configurada, usa os dados simulados
  return brigadasMock;
}

/**
 * 3. Envia Inscrição de Voluntário via Webhook (Make / Zapier / n8n)
 */
export async function sendVolunteerForm(formData) {
  if (WEBHOOK_VOLUNTARIADO_URL) {
    const response = await fetch(WEBHOOK_VOLUNTARIADO_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
        origem: 'Plataforma Brigadas do Cerrado'
      })
    });
    return response.ok;
  }

  // Simulação de envio com sucesso se não houver URL no .env
  return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
}
