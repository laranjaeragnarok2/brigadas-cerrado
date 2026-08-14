# Brigadas do Cerrado Vivo

**Plataforma Comunitária de Mapeamento, Alerta e Apoio às Brigadas Voluntárias do Cerrado Goiano**

Plataforma Web PWA de alta performance projetada com abordagem Mobile-First para apoio logístico, doações diretas via PIX sem intermediários, alertas de focos de incêndio em tempo real estilo Waze e suporte a funcionamento offline em áreas isoladas.

---

## 📌 Principais Recursos

- **Alertas de Fogo e Fumaça em Tempo Real (Estilo Waze):** Mapeamento colaborativo com suporte a GPS e confirmação presencial de moradores e brigadistas.
- **Doações Diretas via PIX:** Apoio financeiro direto para contas oficiais de brigadas comunitárias da Chapada dos Veadeiros, Cavalcante, Vão de Almas, Pirenópolis e Mambaí.
- **Suporte Offline (PWA / Service Worker):** Telefones de emergência (193 Corpo de Bombeiros, Prevfogo 0800, ICMBio) e protocolos de segurança acessíveis mesmo sem sinal de celular.
- **Formação e Voluntariado Remoto:** Inscrições para suporte em GIS, comunicação, design e logística de combate.
- **Triangulação de Dados (INPE + Campo):** Algoritmo de cruzamento entre satélites de alta resolução e relatos de campo.

---

## 🛠️ Tecnologias Utilizadas

- **Core:** React 19 + Vite 6
- **Estilização:** CSS Vanilla com Design Tokens (Estética Goiana Orgânica)
- **Ícones:** Lucide React (SVG limpos e responsivos)
- **PWA:** Service Worker + Web App Manifest
- **Deploy:** GitHub Pages (`npm run deploy`) & Suporte a Docker / Coolify

---

## 🚀 Como Rodar Localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/SEU_USUARIO/brigadas-cerrado.git

# 2. Entrar na pasta do projeto
cd brigadas-cerrado

# 3. Instalar as dependências
npm install

# 4. Iniciar o servidor de desenvolvimento
npm run dev
```

Abra o navegador em `http://localhost:5173`.

---

## 📄 Publicação no GitHub Pages

```bash
# Gerar a build e publicar no GitHub Pages com 1 comando
npm run deploy
```

---

## 📋 Metadados do Repositório Git (Sugestão para o GitHub)

- **Repository Name:** `brigadas-cerrado`
- **Short Description:** `Plataforma comunitária de mapeamento, alerta de queimadas e apoio direto às brigadas voluntárias do bioma Cerrado em Goiás.`
- **Topics/Tags:** `cerrado`, `brigadas-voluntarias`, `goias`, `pwa`, `react`, `vite`, `fire-monitoring`, `inpe`, `waze-cerrado`
