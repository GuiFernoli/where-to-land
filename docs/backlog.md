# Backlog / Decisões adiadas

> Complemento do [plano de implementação](plans/2026-07-06-where-to-land-mvp.md)
> (fonte da verdade das tasks — progresso marcado nos checkboxes de lá).
> Aqui vive só o que está FORA do plano: adiamentos, dívidas pequenas e
> aprendizados paralelos. Item resolvido sai da lista.

## Estado atual

- **Task 1.2 (formatCAD) — CONCLUÍDA** via PR #1 (mergeado, branch deletada).
  Ciclo TDD completo: Red → Green → Refactor.
- **Próxima: Task 1.3** (purchasing power — cálculo central + ranking), em nova
  feature branch.
- Fluxo de trabalho: feature branch + Pull Request por task (adotado na 1.2).

## Itens v2 / roadmap

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
