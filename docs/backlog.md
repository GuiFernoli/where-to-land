# Backlog / Decisões adiadas

> Complemento do [plano de implementação](plans/2026-07-06-where-to-land-mvp.md)
> (fonte da verdade das tasks — progresso marcado nos checkboxes de lá).
> Aqui vive só o que está FORA do plano: adiamentos, dívidas pequenas e
> aprendizados paralelos. Item resolvido sai da lista.

## Estado atual

- **Task 1.3 (purchasing power) — CONCLUÍDA via PR #1** (mergeado, branch
  deletada). TDD completo; o teste de imutabilidade pegou mutação real do `sort`.
- **Próxima: Task 1.4** (gerador de deep-link de vagas — `lib/jobsLink.ts`,
  `URL` + `URLSearchParams`), em nova feature branch + PR.
- Decisão de domínio (1.3): `salaryByCity` é salário ANUAL bruto em CAD;
  `purchasingPower` divide por 12. Aproximação de imposto adiada (spec §6
  permite) — item na seção v2 abaixo.

## Itens v2 / roadmap

- **Estimativa de salário líquido** — v1 usa salário bruto ÷ 12 (documentado
  como aproximação); v2 pode aplicar aproximação de imposto por província
  (spec §6 prevê o refino).
- **i18n fr-CA** — formato de moeda francês (`3 500,00 $`) + UI bilíngue.
  Decisão consciente de manter `en-CA` fixo no v1 (spec §11 adia i18n).
  Citar como roadmap no README (Task 3.2) — mostra consciência do mercado
  bilíngue canadense.

## Dívidas técnicas pequenas

- `@types/node` está `^20`; alinhar pra `^22` quando conveniente (Node do
  projeto é 22 via `.nvmrc`).
- Prettier: avaliar configurar formatação automática (hoje formatação é manual).

## Aprendizados agendados (fora do fluxo do app)

- Ler um relatório do `npm audit` junto — aula de como interpretar
  vulnerabilidade (severidade, exploitabilidade, dev vs produção).
- Git avançado just-in-time: `--amend`, `revert`, `stash`, `rebase -i`,
  `cherry-pick`, `reset` — cada um quando surgir caso real.
- SSH keys pro GitHub (alternativa ao HTTPS atual do `gh`).
- WSL como projeto de aprendizado separado, pós-MVP (não migrar este projeto).

## Lembretes de decisões já tomadas

- RTL (React Testing Library) só entra na Fase 2 (Task 2.1) — adiada na 0.2.
- README de portfólio é a Task 3.2 (incluir roadmap v2 acima).
- `npm audit fix --force` NÃO rodar — avaliar vulnerabilidades caso a caso.
