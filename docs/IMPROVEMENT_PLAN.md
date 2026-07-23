# jisho-goi-db 项目改善计划

> 制定日期：2026-07-23
> 本文档基于对代码库结构、依赖配置、测试覆盖、安全性、数据库 schema、Git 历史与 CI/CD 现状的全面调研整理而成，用于指导后续的迭代与重构工作。

## 如何使用本文档

- 每完成一项，在对应条目前打勾 `[x]`，并在末尾附一行完成日期/提交哈希，方便追溯。
- 优先级分组按"紧急且重要"到"长期技术债"排列，但同组内条目之间没有强制顺序，可按实际排期调整。
- 涉及数据库 schema、鉴权、依赖大版本升级的改动，务必先在本地/预览环境验证，再合并到 `main`。

---

## 新发现的高优先级 bug（测试驱动发现）

- [ ] **`Bunmei`（BunmeiSetsuyoshu）模块搜索功能已损坏**：`prisma/schema.prisma` 中 `bunmei_id` 字段声明为非空 `String @unique`，但生产数据库中至少存在一条 `bunmei_id` 为 `null` 的记录。只要一次 `bunmeibonFindMany` 查询命中这条记录，Prisma 就会抛 `PrismaClientKnownRequestError`（`Error converting field "bunmei_id" of expected non-nullable type "String", found incompatible value of "null"`），导致 `/bunmei/results` 页面 500，实质上让整个模块的搜索功能不可用。由 2026-07-23 新增的 E2E 契约测试（`tests/e2e/database-modules.spec.ts` 中 `Bunmei` 用例）发现并保持为预期失败状态，作为回归提醒。修复需要先确认这条脏数据的来源（是否可以直接补一个值，或该记录本身就该删除），再决定是清数据还是把 schema 字段改为可空。
- [x] **本地 `.env` 缺少 Supabase 公开环境变量，`Tsj-Wakun` 模块在本地开发环境完全不可用**：`lib/supabase/server.ts` 依赖 `NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`，本地 `.env` 中两者曾均未配置，导致 `bun run dev` 下访问 `/tsj-wakun/results` 或任意详情页都会抛 `Your project's URL and Key are required to create a Supabase client!` 的运行时异常。由 2026-07-23 扩展契约测试到 `TsjWakun` 模块时发现（`tests/e2e/database-modules.spec.ts`），已由用户补充 `.env` 后解决，`TsjWakun` 契约测试验证通过。

## P1：构建与工程基础设施

- [x] **包管理器从 pnpm 切换到 bun**：删除 `.npmrc`/`pnpm-lock.yaml`，新增 `bun.lock`，`package.json` 的 `pnpm.onlyBuiltDependencies` 改为 bun 的 `trustedDependencies`，`CLAUDE.md` 命令说明同步更新。完成于 2026-07-23（`2cb047d`）。
- [ ] **补齐 CI 流水线**：新增 `.github/workflows/ci.yml`，在每次 PR 上至少跑 `bun run lint`、`tsc --noEmit`、`bun run test:run`、`bun run build`。当前唯一的质量门禁是 Vercel 构建本身，最近一次提交（`57584dd`）就是事后修复 Vercel 构建失败，说明确有必要前置检查。
- [ ] **引入 pre-commit 钩子**：使用 husky + lint-staged，在提交前自动跑 lint 与格式化，降低把明显问题带入仓库的概率。
- [ ] **版本化部署配置**：目前没有根目录 `vercel.json`，部署配置完全依赖 Vercel 控制台手动设置。建议将关键构建/环境配置显式写入 `vercel.json` 并纳入版本控制，便于排查与迁移。确认 Vercel 已正确识别 `bun.lock` 并使用 bun 完成安装/构建。
- [ ] **补充 `.env.example`**：仓库中只有真实的 `.env`，没有安全的模板文件。参照 CLAUDE.md 中列出的环境变量清单，创建 `.env.example`（含变量名、简要说明，不含真实值），方便新协作者搭建本地环境。
- [ ] **升级过时的 `tsconfig.json` target**：`target: "es5"` 是 create-next-app 早期模板遗留配置，与 Next 14 App Router 面向现代浏览器的定位不符，建议升级到 `es2017` 或更高。

## P2：历史遗留清理（技术债）

- [ ] **处理 `Racvyoxv` / `Racvyoxv-dev` 重复目录**：两者结构、组件几乎完全重复（`RacvyoxvForm.tsx` 同名，`[id]/page.tsx` 105 行 vs 265 行）。需要确认 `-dev` 版本是否为未完成的实验分支，评估后要么合并有价值的改动到正式版本并删除 `-dev` 目录，要么明确其定位并重命名。
  - 进展（2026-07-23，`03f914f`）：已修复 `-dev` 版本 `layout.tsx` 中 `RacvyoxvForm` 缺少 `Suspense` 边界导致的构建报错（该表单比正式版多了从 URL 参数回填默认值的逻辑，用到了 `useSearchParams()`）。这只是让 build 能通过的临时修复，两个目录是否合并/删除的根本问题仍未处理。
- [ ] **清理 `prisma/dev.db`**：仓库中残留的 SQLite 文件，与当前 Postgres/Supabase 架构无关，属于清理遗漏，确认无用后删除并加入 `.gitignore`。
- [ ] **合并 `content/` 与 `contents/` 两个内容目录**：职责重叠（`content/{articles,manuals,news}` vs `contents/pages`）容易让贡献者困惑，建议统一到一个目录并更新所有引用路径。
- [ ] **重建 Prisma 迁移历史**：`prisma/migrations/0_init/migration.sql` 是原始 MySQL 语法（反引号表名、`ENUM`、`utf8mb4` 字符集），但 `schema.prisma` 当前声明 `provider = "postgresql"`，初始迁移在新 Postgres 环境下大概率无法直接重放。建议基于当前线上 Postgres/Supabase 的真实 schema 重新生成一份干净的初始迁移（`prisma migrate diff` / `db pull` 后 baseline），并在文档中记录这次迁移历史的来龙去脉。
- [ ] **评估 `relationMode = "prisma"` 是否还需要保留**：该设置最初是为了兼容 MySQL/PlanetScale 时代，模拟外键约束而非使用数据库原生约束。现在主库已是 Postgres/Supabase，原生外键约束在一致性和性能上通常更优，建议评估切换回 `foreignKeys` 模式的可行性。
- [ ] **统一 `KWRS` 模块命名**：路由与组件中大量使用 `Kwrs*` 命名，但对应的 Prisma 模型实际是 `Wamyouruijyusho`（和名類聚抄），命名不一致会显著增加新人理解成本。建议要么统一改为模型的真实名称，要么在模块内添加清晰的命名映射说明。

## P3：代码质量与架构改善

- [ ] **抽象通用的"搜索表单 + 结果列表"组件**：9 个数据库模块的 `page.tsx`（表单）/`results/page.tsx`/`[id]/page.tsx` 结构高度一致但各自独立实现，存在大量复制粘贴（如 `racvyoxv/results/page.tsx` 与 `racvyoxv-dev/results/page.tsx` 几乎相同）。已有一个通用结果表格组件的雏形，建议推广到全部模块，统一表单渲染、分页、排序等逻辑。
- [ ] **补充数据库查询索引**：`BunmeiSetsuyoshu`、`Gyokuhentaizen`、`Jiruisho`、`Racvyoxv` 等模型的常用模糊搜索字段（`entry`、`definition`、`bu` 等）目前没有索引，随着数据量增长会成为全表扫描瓶颈。Postgres 下可考虑为这些字段配合 `pg_trgm` 扩展建 GIN 索引以优化 `contains` 查询。
- [ ] **收紧 ESLint 规则**：当前 `.eslintrc.json` 仅启用 `next/core-web-vitals` + `no-unused-vars: warn`，`prettier`/`import/recommended` 等规则被注释掉。建议逐步启用更严格的规则集，并处理现存的约 11 处 `: any` 类型薄弱点（集中在各模块 results 页面的查询参数拼装逻辑）。
- [ ] **清理长期存在的 TODO**：认证相关代码中有多处遗留 TODO（`lib/nextauth-options.ts` 三处、`app/kwrs/KwrsForm.tsx` 初始值缺失等），建议集中排查一次，逐条确认是否仍然相关，能修的修，不再需要的移除注释。
- [ ] **补充 RLS 策略文档**：Prisma schema 中近半模型带有 Supabase introspection 自动生成的 RLS 提示注释，但具体策略定义在 Supabase 侧维护、schema 中不可见。建议在文档中集中记录各表的 RLS 策略来源与规则，避免团队后续修改 schema 时遗漏 RLS 影响。

## P4：测试覆盖建设

单元测试补充计划与 Playwright 端到端测试引入计划已拆分至独立文档：[TESTING_PLAN.md](./TESTING_PLAN.md)。

## 长期方向（不属于本轮排期，但值得关注）

- **Next.js / React 大版本升级评估**：Next 14 已有明确的升级路径（15/16），React 18→19 也已发生在实际安装的依赖中；建议做一次专项评估，明确升级窗口与需要配合改动的范围（ESLint 9 flat config、Server Actions 行为变化等）。
- **技术栈统一评估**：`Tsj-Wakun` 模块完全脱离 Prisma、直接使用 Supabase client，与其余 8 个模块的技术栈不一致。长期看是否要将更多模块迁移到 Supabase，或者反过来统一收敛到一套数据访问层，需要一次架构层面的决策。

---

## 优先级说明

| 优先级 | 说明 | 建议时间窗口 |
|--------|------|--------------|
| P0（已全部完成，2026-07-23） | 安全漏洞、可能导致构建失败或数据错误的问题 | 尽快，1 周内 |
| P1 | 工程基础设施缺失，影响长期开发效率与质量把关 | 2-4 周内 |
| P2 | 历史遗留的重复/过时代码与配置 | 视排期，1-2 个月内 |
| P3 | 代码质量与架构层面的改善，非紧急但影响可维护性 | 持续迭代 |
| P4 | 测试覆盖建设 | 与日常开发并行推进，每次改动顺带补充 |
