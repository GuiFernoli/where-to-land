# Where to Land — Design v1

**Data:** 2026-07-06
**Status:** aprovado (design v1)
**Autor:** Guilherme

> Documento interno de design. A interface do app e o README são em inglês
> (público-alvo: mercado tech canadense/internacional). Este spec fica em PT-BR
> por ser material de planejamento pessoal.

---

## 1. Contexto e objetivo

Projeto de portfólio pessoal para posicionamento no mercado tech canadense
(stack alvo JS/TS/React/Node, foco front-end / UI-UX). Objetivo: um projeto
real, publicado e polido, que demonstre excelência de front-end e sustente a
narrativa de "full-stack pleno" — construído a partir de uma dor que o autor
está vivendo (imigração/decisão de para onde ir no Canadá).

## 2. Produto em uma frase

Web app que ajuda um profissional de tecnologia a decidir **em qual cidade
canadense morar**, ranqueando cidades por **poder de compra real** (salário
esperado no cargo menos custo de vida local), e fechando o loop com um atalho
para vagas naquela cidade.

## 3. Decisão central que o produto resolve

Não é "qual cidade é mais barata", e sim "onde eu *sobra mais dinheiro* dado o
meu cargo". Duas cidades com salários parecidos podem ter poder de compra muito
diferente depois do custo de vida — é essa diferença que o app expõe.

## 4. Stack técnica

- **Framework:** Next.js (App Router) — o framework React mais requisitado em
  vagas canadenses; Server Components / Route Handlers permitem evoluir para
  full-stack no mesmo repo sem backend separado.
- **Linguagem:** TypeScript (requisito de mercado, não diferencial).
- **Estilo:** Tailwind CSS.
- **Gráficos:** Recharts.
- **Dados:** dataset curado em JSON versionado no repo (sem banco no v1).
- **Deploy:** Vercel (público, HTTPS, um único alvo).
- **Testes:** Vitest + React Testing Library.

## 5. Modelo de dados (JSON curado)

Fontes públicas (Numbeo, Statistics Canada, levels.fyi), com **data de
referência anotada** em cada dataset — transparência sobre a origem do dado é
ponto de credibilidade.

- `cities[]`: `id`, `name`, `province`, custos mensais por categoria
  (`rent`, `food`, `transport`, `utilities`), `costIndex` geral.
- `roles[]`: cargo tech (ex.: Front-End Developer, Full-Stack Developer) com
  salário médio por cidade — ou salário nacional base + fator regional.
- Escopo v1: ~6-8 cidades, 1-2 cargos.

## 6. Cálculo central

```
poderDeCompra(cidade, cargo) =
    salarioLiquidoEstimadoMensal(cidade, cargo) − custoVidaMensal(cidade)
```

O ranking de cidades é ordenado por esse valor. Formatação de moeda em CAD.
A estimativa de salário líquido pode partir de uma aproximação simples de
imposto no v1 (documentada como aproximação), refinável no futuro.

## 7. Telas e componentes

1. **Home / Comparador**
   - Seleção de cargo.
   - Ranking de cidades com barra de poder de compra.
   - Gráfico Recharts em destaque (barras ou scatter custo × salário).
2. **Detalhe da cidade**
   - Breakdown de custos por categoria + salário.
   - Botão **"Ver vagas de [cargo] em [cidade]"** → deep-link para Job Bank /
     LinkedIn / Indeed com `keywords` e `location` na URL. Sem API, sem
     manutenção, nunca quebra em demo.

## 8. Qualidade transversal (não negociável)

- **Responsividade Mobile → 4K**, sem hardcode baseado em um único breakpoint.
- **Acessibilidade WCAG AA** — no Canadá acessibilidade é exigência legal
  (AODA); aqui vira diferencial de contratação, não enfeite.
- **Clean code**: componentes pequenos e de responsabilidade única, cálculos
  isolados e testáveis, sem números mágicos.

## 9. Estratégia de testes

- **Unit:** cálculo de poder de compra e formatação de moeda (Vitest).
- **Component:** comparador renderiza e reordena ao trocar de cargo
  (React Testing Library).
- **Deep-link:** gerador monta a URL correta por cidade + cargo.

## 10. Modo de execução (aprendizado)

Este é um projeto de aprendizado além de portfólio. O objetivo não é só o app
pronto, mas dominar a stack (Next.js/TS/React/Tailwind) a ponto de explicar
cada decisão em entrevista técnica. Portanto:

- Sem atalhos em scaffolding e configuração — a fundação se aprende uma vez e
  se reusa em todo projeto.
- Passos pequenos: entender o conceito antes, executar o menor passo, revisar
  depois. Sem parede de setup de uma vez.
- Preferência por TDD: escrever o teste antes força entender o comportamento
  esperado antes de codar.

## 11. Fora do escopo do v1 (adiado de propósito para v2+)

- Contas de usuário e salvar cenários.
- Integração com API real de vagas (v1 usa deep-link).
- Mais de ~6-8 cidades e filtros avançados.
- Internacionalização (i18n).
- Banco de dados (e ferramentas como DataGrip só passam a fazer sentido aqui).

A arquitetura do v1 não impede nenhuma dessas evoluções.
