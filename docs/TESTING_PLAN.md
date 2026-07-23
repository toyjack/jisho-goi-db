# jisho-goi-db 测试策略与计划

> 制定日期：2026-07-23
> 从 [IMPROVEMENT_PLAN.md](./IMPROVEMENT_PLAN.md) 的 P4 拆分而来，独立维护测试相关的现状、计划与讨论。

## 现状

- 测试基础设施（Vitest + Testing Library + jsdom）已就绪，但仅有 1 个测试文件（`components/common/TextInput.test.tsx`），几乎未被使用。
- 完全没有端到端（E2E）测试，无法验证跨页面的真实用户流程。
- 没有 CI，唯一的质量门禁是 Vercel 构建本身。

## 测试哲学：配合 vibe coding 的取舍

这个项目主要以 vibe coding 方式开发——靠自然语言描述意图，AI 生成/修改大段代码，人不逐行审查实现。这决定了测试策略要围绕**行为契约**而不是**实现细节**展开，具体取舍见 `CLAUDE.md` 的 "Testing Policy for AI-Assisted Changes" 一节，核心是四条：

1. **不要求事前写测试，但要求事后能自证**：改完代码后必须能跑出一条可执行的验证（测试通过的输出），而不是口头描述"应该没问题"。
2. **鉴权与写入类代码是硬底线**：`lib/nextauth-options.ts`、任何 `role === "ADMIN"` 校验、`app/jiruisho-chushaku/create/actions.ts` 这类代码改动前必须有测试兜底，因为坏了是静默的、后果重。
3. **E2E 优先于单元测试回答"还能不能用"**：9 个数据库模块共享同一套交互模式，重构共享组件时最容易悄悄弄坏某一个模块，而这种问题只有真实跑一遍页面才能发现。
4. **低风险区域不必强求覆盖**：结果排序细节、样式细节等，测试投入产出比低，优先级让位给上面三条。

---

## 单元测试补充计划

按风险收益比排序，建议依次补充：

- [ ] **`lib/nextauth-options.ts`**：认证核心逻辑，目前完全没有测试保护。
- [ ] **`app/api/users/route.ts`**：配合已完成的权限修复（见 IMPROVEMENT_PLAN.md P0 历史记录），补充鉴权相关的测试用例（未登录/普通用户/管理员三种角色的行为）。
- [ ] **`app/jiruisho-chushaku/create/actions.ts`**：全项目唯一的写入型 Server Action，目前无任何测试保护，风险最高。
- [ ] **`db/*.ts` 查询函数层**：逐步为核心数据库模块的查询函数补充单元测试，尤其是模糊搜索、分页等公共逻辑。
- [ ] **`app/api/**/route.ts`**：现存 API 路由目前无一有测试，建议按模块优先级逐步补齐基础的请求/响应测试。

---

## Playwright 端到端测试引入计划

现状：项目完全没有端到端测试，Vitest 覆盖的是组件/函数级别的单元测试，无法验证"用户实际能否完成搜索、登录、查看详情"这类跨页面的真实流程。9 个数据库模块共享同一套"表单搜索 → 结果列表 → 详情页"交互模式（见 CLAUDE.md 中的 Search and Results Pattern），一旦抽出通用组件（IMPROVEMENT_PLAN.md P3 的重构项），最容易在此过程中悄悄破坏某个模块的搜索行为——这正是 E2E 测试要守住的底线，而不是单元测试能覆盖的范围。

### 阶段一：搭建基础设施

- [x] **安装并初始化 Playwright**：`bun add -D @playwright/test`、`bunx playwright install chromium`，`playwright.config.ts` 已生成，`webServer` 配置自动拉起 `bun run dev`。完成于 2026-07-23。
- [x] **确定测试专用环境与数据（阶段性决策）**：当前 `.env` 的 `DATABASE_URL` 就是生产数据库（`POSTGRES_*` 系列变量名显示是 Vercel Postgres 集成，非独立开发库），没有可重置的测试库。决策（2026-07-23）：**暂不新建独立测试数据库**，先只做只读契约测试——挑选真实存在、稳定不太会被删改的词条作为 `knownQuery` 断言基准，只验证 GET 类的搜索/详情流程；**注册、`jiruisho-chushaku` 创建/编辑等写入类场景的 E2E 暂缓**，等到确实需要覆盖这些路径（比如即将重构相关代码）时再搭建独立测试库（候选：Supabase 免费实例或本地 Postgres + seed 脚本），到时更新本条为方案 A。
- [ ] **补充测试专用账号**：需要至少一个 `USER`、一个 `ADMIN` 角色的测试账号（seed 脚本或 Prisma seed），用于覆盖权限相关场景（如已修复的 `/api/users` 权限校验、`/admin` 路由保护）。**同样受上面的决策影响而暂缓**——`/admin` 中间件拦截这个层面的契约（未登录 → 重定向）已经在 `smoke.spec.ts` 里覆盖，不需要真实测试账号；但"USER 角色被拒绝 / ADMIN 角色能访问"这类需要真实登录状态的用例，要等测试账号或独立测试库就绪后再补。
- [x] **将 `test:e2e` 脚本加入 `package.json`**：`"test:e2e": "playwright test"` 已加入，`.gitignore` 已排除 Playwright 的 `test-results/`、`playwright-report/`、`blob-report/` 产物目录。完成于 2026-07-23。
- [x] **最小冒烟测试跑通**：`tests/e2e/smoke.spec.ts` 验证首页可加载、未登录访问 `/admin` 被正确拦截，2 个测试均通过。完成于 2026-07-23。

### 数据库模块契约测试模板

9 个数据库模块结构一致但各自的字段/URL 参数不同（比如 `Jiruisho` 用 `entry`/`gokei_search`，`Racvyoxv` 用 `entry`/`bu`/`onyomi`）。与其为每个模块单独写一套测试用例，不如把"契约"提炼成一份数据表，写**一套参数化测试**跑遍所有模块——新增模块或改动共享组件后，只需要在表里加一行/跑一遍全表，而不需要逐个模块交代要测什么。

契约本身只断言"结构性行为"，不断言具体业务数据（业务数据会变，结构不该变）：

```ts
// tests/e2e/database-modules.contract.ts
export interface ModuleContract {
  name: string;
  searchPath: string;         // 如 "/jiruisho"
  resultsPath: string;        // 如 "/jiruisho/results"
  // 一个已知在测试库中至少能命中 1 条结果的查询条件
  knownQuery: Record<string, string>;
  // 结果列表中每一行/每条结果的选择器（用于定位"至少有一条结果"）
  resultItemSelector: string;
  // 点击第一条结果后，详情页里必须非空的字段选择器
  detailFieldSelectors: string[];
}

export const moduleContracts: ModuleContract[] = [
  {
    name: "Jiruisho",
    searchPath: "/jiruisho",
    resultsPath: "/jiruisho/results",
    knownQuery: { entry: "阿" },
    resultItemSelector: "[data-testid='result-row']",
    detailFieldSelectors: ["[data-testid='detail-entry']", "[data-testid='detail-definition']"],
  },
  {
    name: "Racvyoxv",
    searchPath: "/racvyoxv",
    resultsPath: "/racvyoxv/results",
    knownQuery: { entry: "阿" },
    resultItemSelector: "[data-testid='result-row']",
    detailFieldSelectors: ["[data-testid='detail-entry']"],
  },
  // ...其余模块依次补充
];
```

```ts
// tests/e2e/database-modules.spec.ts
import { test, expect } from "@playwright/test";
import { moduleContracts } from "./database-modules.contract";

for (const contract of moduleContracts) {
  test.describe(`${contract.name} 模块契约`, () => {
    test("表单搜索 → 结果列表 → 详情页字段非空", async ({ page }) => {
      const query = new URLSearchParams(contract.knownQuery).toString();
      await page.goto(`${contract.resultsPath}?${query}`);

      const results = page.locator(contract.resultItemSelector);
      await expect(results.first()).toBeVisible();

      await results.first().click();

      for (const selector of contract.detailFieldSelectors) {
        await expect(page.locator(selector)).not.toBeEmpty();
      }
    });

    test("无匹配结果时显示空状态提示，而不是报错/白屏", async ({ page }) => {
      const query = new URLSearchParams({ entry: "__不存在的查询__" }).toString();
      await page.goto(`${contract.resultsPath}?${query}`);
      await expect(page.locator("body")).not.toContainText("Error");
      // 具体的空状态文案由各模块决定，这里只保证页面没有崩溃
    });
  });
}
```

**这个模板需要的前置条件**（属于阶段一的一部分）：
- [ ] 给结果列表行、详情页关键字段补充 `data-testid`（目前组件里没有稳定的测试钩子，靠文本/class 选择器会因为样式重构而碎）。
- [ ] 确定每个模块在测试库中一条稳定存在的 `knownQuery`（seed 数据的一部分，不能依赖生产库的真实条目，否则数据变了测试就跟着碎）。

新增数据库模块或修改共享搜索/结果组件后，运行 `bunx playwright test database-modules` 即可一次性验证全部模块的最小契约是否还成立，不需要人工逐个点一遍。

### 阶段二：核心场景覆盖（按风险排序）

- [ ] **认证流程**：注册（`app/auth/register`）→ 登录（`/api/auth/signin`）→ 登出的完整闭环；覆盖密码不一致、邮箱已注册等失败路径。这是唯一涉及真实写入且历史上有死代码/重复入口问题的区域，值得作为第一批用例。**暂缓**——受"确定测试专用环境与数据"决策影响，写入类场景要等独立测试库就绪后再补。
- [x] **权限边界（部分完成）**：未登录访问 `/admin` 被中间件拦截跳转已在 `tests/e2e/smoke.spec.ts` 验证通过。`USER`/`ADMIN` 角色的差异化访问需要真实登录状态，同样受测试账号缺失影响暂缓。
- [x] **搜索与结果流程（`Jiruisho`、`Racvyoxv` 已完成，2026-07-23）**：`tests/e2e/database-modules.contract.ts` + `database-modules.spec.ts` 落地了参数化契约测试，用空字符串 `contains` 匹配保证"至少命中一条结果"且不依赖具体业务数据，覆盖了搜索命中→详情页字段展示→无结果不崩溃三个断言点，对当前生产数据库直接可跑（只读，不涉及写入）。`Tsj-Wakun`（唯一 Supabase 直连模块）尚未加入契约表，其余模块也待逐步补充。
- [ ] **`Jiruisho-Chushaku` 的创建/编辑流程**：这是全项目唯一的写入型 Server Action（`app/jiruisho-chushaku/create/actions.ts`），单元测试清单中已标记为风险最高项，E2E 层面应补充"创建一条注释 → 编辑 → 保存后内容正确回显"的完整用户旅程。
- [ ] **IIIF 图像查看器基本可用性**：`Gyokuhentaizen`、`KWRS` 等依赖 OpenSeadragon 的模块，至少验证图像查看器容器能正常挂载、不抛控制台错误（不需要断言具体像素渲染，OpenSeadragon 的 canvas 渲染细节不适合做精确断言）。

### 阶段三：纳入日常流程

- [ ] **接入 CI**：在 CI workflow 中新增一个独立 job 跑 `bunx playwright test`（浏览器下载、启动测试库等步骤耗时较长，建议与 lint/单元测试任务并行执行而非串行阻塞）。
- [ ] **失败可观测性**：启用 Playwright 的 trace/截图/视频 on-failure 产物上传（CI artifact），避免"CI 红了但不知道哪一步失败"的排查成本。
- [ ] **文档化运行方式**：在 `CLAUDE.md` 补充 `bun run test:e2e` 的运行说明与测试账号/测试库获取方式，方便后续协作者本地复现。

> 建议顺序：先完成阶段一的基础设施与测试数据方案（这是最容易被低估、返工成本最高的部分），再从认证与权限场景开始积累用例，最后逐步扩展到各数据库模块，不必追求一次性覆盖全部 9 个模块。
