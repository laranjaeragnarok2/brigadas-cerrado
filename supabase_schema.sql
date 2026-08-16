-- =================================================================
-- SCRIPT DE CRIAÇÃO DAS TABELAS NO SUPABASE - CERRADOVIGIL
-- Copie e cole este código no SQL Editor do seu projeto Supabase:
-- https://supabase.com/dashboard/project/myhsdbspfmhkuueaonav/sql
-- =================================================================

-- 1. TABELA DE BRIGADAS COMUNITÁRIAS
CREATE TABLE IF NOT EXISTS public.brigadas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  municipio TEXT NOT NULL,
  estado TEXT DEFAULT 'GO',
  status_cor TEXT DEFAULT 'danger', -- 'danger', 'warning', 'info', 'success'
  status_texto TEXT DEFAULT 'Active Fire',
  tags_necessidade TEXT[] DEFAULT '{}',
  meta_arrecadada NUMERIC DEFAULT 0,
  meta_total NUMERIC DEFAULT 0,
  pix_chave TEXT,
  pix_recebedor TEXT,
  inpe_verified BOOLEAN DEFAULT true,
  descricao TEXT,
  imagem TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABELA DE RELATOS DE FOGO (WAZE DO CERRADO)
CREATE TABLE IF NOT EXISTS public.relatos_fogo (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  tipo TEXT DEFAULT 'danger', -- 'danger' (Fogo), 'warning' (Fumaça), 'success' (Rescaldo)
  localizacao TEXT NOT NULL,
  coordenadas TEXT NOT NULL,
  descricao TEXT,
  confirmacoes INT DEFAULT 1,
  foto TEXT,
  whatsapp TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABELA DE CADASTRO DE VOLUNTÁRIOS
CREATE TABLE IF NOT EXISTS public.voluntarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  cidade TEXT NOT NULL,
  disponibilidade TEXT,
  habilidades TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. HABILITAR PERMISSÕES PÚBLICAS (ANON KEY READ & INSERT)
ALTER TABLE public.brigadas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relatos_fogo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voluntarios ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE ACESSO PARA BRIGADAS (LEITURA PÚBLICA)
CREATE POLICY "Permitir leitura publica de brigadas" ON public.brigadas FOR SELECT USING (true);

-- POLÍTICAS DE ACESSO PARA RELATOS DE FOGO (LEITURA E INSERÇÃO PÚBLICA)
CREATE POLICY "Permitir insercao publica de relatos" ON public.relatos_fogo FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura publica de relatos" ON public.relatos_fogo FOR SELECT USING (true);

-- POLÍTICAS DE ACESSO PARA VOLUNTÁRIOS (INSERÇÃO PÚBLICA)
CREATE POLICY "Permitir insercao publica de voluntarios" ON public.voluntarios FOR INSERT WITH CHECK (true);
