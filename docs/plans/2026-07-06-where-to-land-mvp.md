# Where to Land — Plano de Implementação (MVP v1)

> **Método:** TDD em passos pequenos. Cada tarefa: entender o conceito → ver o
> teste (alvo) → implementar até passar → revisar → commitar. O teste é a
> especificação; commits pequenos e frequentes.

**Goal:** Publicar um web app que ranqueia cidades canadenses por poder de
compra real (salário do cargo − custo de vida) para um profissional tech, com
atalho para vagas via deep-link.

**Architecture:** Next.js App Router, dados em JSON estático versionado, lógica
de cálculo em funções puras testáveis, UI em componentes pequenos (Server por
padrão, Client só onde há interação). Sem banco no v1.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Recharts,
Vitest + React Testing Library, deploy Vercel.

## Global Constraints

- Linguagem do código e da UI: **inglês** (mercado canadense). Autoria
  `@author Guilherme`.
- TypeScript em modo estrito. Sem `any` implícito.
- Responsividade Mobile → 4K, sem hardcode de um único breakpoint.
- Acessibilidade WCAG AA (semântica, foco visível, contraste, labels).
- Moeda formatada em CAD.
- Commits pequenos e frequentes, sem trailers, header sem acento.

---

## Mapa de arquivos (onde cada coisa vive)

```
where-to-land/
  app/
    layout.tsx            # shell da página (RSC)
    page.tsx              # Home / Comparador
    city/[id]/page.tsx    # Detalhe da cidade
  components/
    RoleSelector.tsx      # client component (estado do cargo selecionado)
    CityRanking.tsx       # lista/ranking (server)
    PurchasingPowerChart.tsx  # gráfico Recharts (client)
    JobsLink.tsx          # botão deep-link de vagas
  lib/
    types.ts              # City, Role, tipos do domínio
    purchasingPower.ts    # cálculo central (função pura)
    format.ts             # formatação de moeda CAD
    jobsLink.ts           # gerador de URL de vagas
  data/
    cities.json           # dataset curado
    roles.json            # cargos + salários
  lib/__tests__/          # testes das funções puras
  components/__tests__/    # testes de componente
```

Regra de decomposição: funções puras em `lib/` (fáceis de testar isoladamente),
UI em `components/` pequenos e de responsabilidade única, dados em `data/`.

---

## FASE 0 — Fundação (montar o projeto do zero)

Nenhuma dessas tarefas tem teste automatizado; a validação é rodar e ver
funcionar. É a base reusável em todo projeto futuro.

### Task 0.1 — Scaffold do Next.js

**Conceito:** `create-next-app` gera a estrutura do App Router. Entender o
que é `app/`, `layout.tsx`, `page.tsx` e por que Next separa Server e
Client Components.

- [x] Rodar o scaffold na pasta atual (App Router, TS, Tailwind, ESLint).
- [x] Rodar `npm run dev` e abrir `localhost:3000` — ver a página inicial.
- [x] Ler e entender `app/layout.tsx` e `app/page.tsx` linha a linha.
- [x] Limpar o boilerplate da home (deixar um `<h1>Where to Land</h1>`).
- [x] Commit: `chore: scaffold next.js app with typescript and tailwind`.

**Done when:** `npm run dev` sobe e mostra sua home limpa.

### Task 0.2 — Ferramenta de teste (Vitest + RTL)

**Conceito:** por que testar funções puras e componentes; a diferença entre
teste unitário (lógica) e teste de componente (renderização/interação).

- [x] Instalar Vitest e config mínima. — *RTL adiada de propósito pra Fase 2
      (instala quando for testar componente). Commit real: `chore: set up vitest`.*
- [x] Escrever um teste-bobo (`1 + 1 === 2`) só pra ver o runner funcionando.
- [x] Rodar `npm test` e ver verde.
- [x] Commit: `chore: set up vitest and react testing library`.

**Done when:** `npm test` roda e passa o teste-bobo.

---

## FASE 1 — Domínio e lógica (TDD em funções puras — o coração)

Aqui é o melhor lugar pra aprender TS + testes, porque são funções puras sem
UI. Ordem TDD: teste primeiro, implementar até passar.

### Task 1.1 — Tipos do domínio

**Files:** Create `lib/types.ts`

**Conceito:** `interface`/`type` no TS descrevem o formato dos dados. Modelar
os tipos antes trava o contrato que todo o resto usa.

- [x] Definir `City` (id, name, province, costs: {rent, food, transport,
      utilities}, costIndex) e `Role` (id, title, salaryByCity: Record<cityId,
      number>).
- [x] Commit: `feat: add domain types for city and role`.

**Produces:** tipos `City`, `Role` usados por todo o resto.

### Task 1.2 — Formatação de moeda (CAD)

**Files:** Create `lib/format.ts`, `lib/__tests__/format.test.ts`

**Interfaces — Produces:** `formatCAD(value: number): string`

- [x] **Teste (alvo):**

```ts
import { formatCAD } from "../format";

describe("formatCAD", () => {
  it("formats a number as CAD currency", () => {
    expect(formatCAD(3500)).toBe("$3,500.00");
  });
  it("handles zero", () => {
    expect(formatCAD(0)).toBe("$0.00");
  });
});
```

- [x] Rodar o teste e ver **falhar** (função não existe).
- [x] Implementar `formatCAD` pra passar (dica: `Intl.NumberFormat` com
      locale `en-CA`).
- [x] Rodar e ver verde. Commit: `feat: add CAD currency formatter`.

### Task 1.3 — Cálculo de poder de compra

**Files:** Create `lib/purchasingPower.ts`, `lib/__tests__/purchasingPower.test.ts`

**Interfaces — Consumes:** `City`, `Role`.
**Produces:** `monthlyCostOfLiving(city: City): number`,
`purchasingPower(city: City, role: Role): number`,
`rankCities(cities: City[], role: Role): City[]`

- [ ] **Teste (alvo):** cobre soma de custos, poder de compra
      (salário mensal − custo) e ordenação decrescente, com números concretos.
- [ ] Rodar e ver falhar.
- [ ] Implementar as três funções. Conceito: função pura, imutabilidade
      (`rankCities` não muta o array de entrada — usa cópia antes de ordenar).
- [ ] Verde. Commit: `feat: add purchasing power calculation and ranking`.

### Task 1.4 — Gerador de deep-link de vagas

**Files:** Create `lib/jobsLink.ts`, `lib/__tests__/jobsLink.test.ts`

**Interfaces — Produces:** `jobsUrl(role: Role, city: City): string`

- [ ] **Teste (alvo):** monta a URL do Job Bank/LinkedIn com `keywords` e
      `location` corretamente encodados (ex.: espaço vira `%20`).
- [ ] Rodar e ver falhar.
- [ ] Implementar usando `URL` + `URLSearchParams` (mais seguro que
      concatenar string). Verde. Commit:
      `feat: add jobs deep-link generator`.

### Task 1.5 — Dataset curado

**Files:** Create `data/cities.json`, `data/roles.json`

**Conceito:** modelar dados reais respeitando os tipos; anotar a data/fonte de
referência (credibilidade). ~6 cidades, 1-2 cargos.

- [ ] Preencher os JSONs (anotar fontes; o formato deve bater com os tipos).
      Sem código de app aqui — é dado.
- [ ] Commit: `feat: add curated cost-of-living and salary dataset`.

---

## FASE 2 — Interface (componentes pequenos)

### Task 2.1 — CityRanking (Server Component)

**Files:** Create `components/CityRanking.tsx`, `components/__tests__/CityRanking.test.tsx`

**Conceito:** Server Component (renderiza no servidor, sem JS no cliente),
props tipadas, listar dados. Recebe cidades já ranqueadas + role.

- [ ] **Teste (alvo):** renderiza N cidades na ordem do ranking, mostra poder
      de compra formatado.
- [ ] Falhar → implementar o componente → verde.
- [ ] Commit: `feat: add city ranking list component`.

### Task 2.2 — RoleSelector (Client Component)

**Files:** Create `components/RoleSelector.tsx`, teste correspondente

**Conceito:** `"use client"`, estado com `useState`, evento `onChange`,
elevar estado (lifting state) pra Home decidir o ranking.

- [ ] **Teste (alvo):** trocar o cargo dispara callback com o novo role id.
- [ ] Falhar → implementar → verde. Commit:
      `feat: add role selector`.

### Task 2.3 — Home/Comparador junta tudo

**Files:** Modify `app/page.tsx`

**Conceito:** compor os pedaços; onde o estado do cargo vive; passar
`rankCities(...)` pro `CityRanking`.

- [ ] Montar a página conectando RoleSelector + CityRanking.
- [ ] Validar no browser: trocar cargo reordena a lista.
- [ ] Commit: `feat: wire up home comparator page`.

### Task 2.4 — PurchasingPowerChart (Recharts)

**Files:** Create `components/PurchasingPowerChart.tsx`

**Conceito:** biblioteca de gráfico como client component; mapear dados →
props do gráfico; responsividade com `ResponsiveContainer`.

- [ ] Instalar Recharts.
- [ ] Implementar um gráfico de barras de poder de compra por cidade.
- [ ] Validar visual + responsivo. Commit: `feat: add purchasing power chart`.

### Task 2.5 — Detalhe da cidade + JobsLink

**Files:** Create `app/city/[id]/page.tsx`, `components/JobsLink.tsx`

**Conceito:** rota dinâmica (`[id]`), breakdown de custos, botão que abre o
deep-link (`jobsUrl`) em nova aba.

- [ ] **Teste (alvo)** do `JobsLink`: renderiza `<a>` com `href` correto,
      `target="_blank"`, `rel="noopener noreferrer"`.
- [ ] Falhar → implementar JobsLink e a página de detalhe → verde.
- [ ] Commit: `feat: add city detail page with jobs deep-link`.

---

## FASE 3 — Polimento e publicação

### Task 3.1 — Responsividade + acessibilidade

**Conceito:** testar em várias larguras (DevTools), foco visível, contraste,
`aria-*` onde faltar, navegação por teclado.

- [ ] Passar o app inteiro Mobile → 4K, apontando e aplicando ajustes.
- [ ] Commit: `style: responsive and accessibility polish`.

### Task 3.2 — README (voltado a recrutador)

**Files:** Create `README.md` (inglês)

**Conceito:** README de portfólio: o problema, a decisão que resolve, print/gif,
stack, como rodar, decisões de arquitetura. É o que o recrutador lê primeiro.

- [ ] Escrever o rascunho; revisar inglês e estrutura antes de publicar.
- [ ] Commit: `docs: add project readme`.

### Task 3.3 — Deploy na Vercel

**Conceito:** conectar repo → Vercel, build de produção, URL pública HTTPS.

- [ ] Criar repo no GitHub (público), push.
- [ ] Conectar na Vercel, deploy, testar a URL pública.
- [ ] Adicionar o link do deploy no README. Commit: `docs: add live demo link`.

**Done when:** app no ar, acessível por URL pública, no teu GitHub.

---

## Ordem de dependência

Fase 0 → 1 → 2 → 3, em sequência. Dentro da Fase 1, os tipos (1.1) vêm antes;
o resto pode em qualquer ordem. A Fase 2 depende de toda a Fase 1. Deploy por
último.
