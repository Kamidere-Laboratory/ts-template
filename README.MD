## Kamide.re Laboratory ESM Typescript template
<small>KLETT</small>

1. Change name in `package.json`.
2. Copy `.env.template` to `.env` and setup.
3. Copy `secret.json.template` to `secret.json` and setup.
4. Run `pnpm update -L` to update all dependencies to latest.
5. Build image `pnpm d:build:dev`.
6. Start api via `pnpm d:up:dev`.
---
Features<small> I think 🤔</small>:
- Use of `ts-node/esm` give advantage of skiping whole transcompilation process without sacrificing type errors <small>little disadvantage with old modules, but who cares?</small>.
- DI/IoC via Awilix with domain separation (your developers will love it 😈)
- Pino logger (ultra fast json logger) and Preaty-Pino to make your logs cute as f*** for debuging :P
- pnpm for reducing precious disk space<small>(to store more anime)</small> also it's pretty fast, not gonna lie.
- Splits config into two files `.env` and `secret.json`. <small> Is not confusing at all, trust me :D</small>
- All imports from your code need to be ended with `.js`
- Eslint and Prettier to keep your code from looking like garbage.
