# Tsj-Wakun（新撰字鏡和訓データベース）開発計画 — 劉担当分

> 制定日期：2026-08-28（2026-08-28 追加：数据源架构变更调研）
> 依据来源：`docs/references/chat_log_20260522.md`（5/22（金）10:00-12:00 打合せ記録，出席：池田・劉・藤本）
> 范围：仅梳理会议记录中【劉】负责的条目，以及【Excelの列とインターフェースの改訂】中实际需要由劉实现的界面/检索改动。池田、藤本负责的数据整理工作只作为"依赖前提"列出，不属于本计划的执行范围。本次追加的架构变更部分范围同样限定为 jisho-goi-db 这一侧的数据访问层，不含 `hdicviewer-rebuild` 仓库内的开发任务。

## 如何使用本文档

- 每完成一项，在对应条目前打勾 `[x]`，并附一行完成日期/提交哈希。
- 分组按"能否立即开工"排列：P0 无外部依赖可以马上做；P1 需要先确认字段规格或等待池田/藤本数据到位；P2 依赖 HDIC 等外部系统信息。
- 涉及 Supabase 表结构变更的条目，改完后需要跑 `bun run supabase:gen` 重新生成 `lib/supabase/types.ts`。
- 每完成一批改动，跑一次 `tests/e2e/database-modules.spec.ts` 里的 `TsjWakun` 契约用例（`resultsPath: "/tsj-wakun/results"`），确认搜索/结果页没有被字段改名或结构调整破坏——这是本项目测试策略里"可运行验证"的落地方式，不是可选项。

## 现状速览（代码调研，非会议内容）

- 模块文件：`app/tsj-wakun/page.tsx`（表单壳）、`app/tsj-wakun/TsjWakunForm.tsx`（4 个文本框：见出し语/读み/万叶假名/享和本见出し，全部走 `ilike` 模糊匹配）、`app/tsj-wakun/results/page.tsx`（结果表格，7 列）、`app/tsj-wakun/[wakunId]/page.tsx`（详情页，用一个 `fieldLabels` 字典 + `Object.entries(data)` 按数据库列的原始顺序渲染全部字段）。
- 数据访问层：`db/tsj_wakun.ts`，直接用 Supabase client 查询 `tsj_wakun` 表（未走 Prisma，这是 Tsj-Wakun 模块本来就与其余 8 个模块技术栈不同的地方）。
- 当前 `tsj_wakun` 表列（`lib/supabase/types.ts:417-470`）：`sj_w_id`、`entry_text`、`entry_type`、`reading_kana_kanji`、`reading_historical_kana`、`def_manyogana`、`kyowa_entry_text`、`kyowa_loc`、`kyowa_manyogana`、`nikkoku_example_check`、`nikkoku_id`、`remarks`、`rinsen_loc`、`tsj_id`、`zhang_page`。**目前没有**独立的品词、种别（`entry_type` 是否等同会议里的"种别"待确认）、和訓仮名字数、汉字数这几列。
- 仓库内没有找到任何异体字对应表或旧字体/新字体转换逻辑——这是全新基础设施，不是现有代码的修改。
- Racvyoxv 模块的日国链接（`app/racvyoxv/[id]/page.tsx`）是直接读数据库里预先算好的 `nikkoku*_url` 列；Tsj-Wakun 只有 `nikkoku_id`，没有对应的 URL 列，所以"日国 ID → URL"这步必须在应用层现算，而不是照抄 Racvyoxv 的做法。

---

## 架构变更：数据源从 Supabase 迁移到 hdicviewer-rebuild API

用户决定：Tsj-Wakun 不再直接查 Supabase，改为通过 API 调用 `https://github.com/toyjack/hdicviewer-rebuild`（用户本人的仓库，Bun workspace monorepo：`apps/api` 是 Hono 写的公开 API，`packages/domain`/`packages/database` 是领域逻辑与 SQL-first 数据层）。已确认范围**仅限 jisho-goi-db 这一侧的数据访问层改造**；`hdicviewer-rebuild` 那边的开发工作不在本计划内，作为外部依赖跟踪。

**2026-08-28 首次调研时**，该 API 只有 `krm`（类聚名义抄）一个可查数据集，新撰字鏡数据不存在。**2026-08-28 补充调研（同日晚些时候）**：本地开发 API 已启动（`http://127.0.0.1:8787`，规范见 `/api/v1/openapi.json`），实测确认 **`tsj`（新撰字鏡）数据集已经是 `available` 状态**，可以真实查询——下面是基于实际请求响应的调研结论，不再是推测。正式服务器地址部署后由用户另行告知，目前 `.env` 里 `HDIC_API_BASE_URL` 先占位指向本地地址。

### API 契约（已用本地服务器实测确认）

公开无需登录/API Key，统一 envelope `{ data, meta: { apiVersion: "v1", datasetVersions }, links, page? }`，错误走 RFC7807 `application/problem+json`，响应带 ETag。7 个端点：`/datasets`、`/datasets/{id}`、`/datasets/{id}/versions`、`/datasets/{id}/versions/{versionId}`、`/datasets/{id}/records/{recordId}`、`/datasets/{id}/versions/{versionId}/records/{recordId}`、`/search`。

`tsj` 数据集详情（`GET /datasets/tsj`）：`title.ja` = "新撰字鏡"，`capabilities: { records: true, search: true, navigation: true }`，`license.status: "verified"`（CC BY-SA 4.0，来源 `shikeda/HDIC`），`attribution` 同样是池田証寿——确认与会议记录、KRM 数据集背后是同一个 HDIC 项目。

**`GET /search` 已经原生支持 TSJ 专属筛选参数**，这一点直接影响 P1 的下拉框需求，实测参数：
- `dataset=tsj`、`q`、`match=exact|prefix|contains`、`field=all|headword|definition|reading`
- `entryType`：`single-character` / `variant` / `compound` / `unknown` —— 对应会议要求的「種別」下拉框（単字/異体字/熟語），英文枚举需要做一层中文/日文标签映射，多了一个 `unknown`
- `charCount`：整数 —— 对应「漢字数」
- `kanaCount`：整数 —— 对应「和訓仮名字数」
- `posCategory`：`noun`/`verb`/`adjective`/`adjectival-verb`/`adverb`/`interjection`/`prefix`/`phrase`/`unknown`/`not-applicable`/`misreading`/`unassigned` —— 对应「品詞」，会议给的选项（名詞/動詞/形容詞/形容動詞/副詞/感動詞/接頭辞/連語系/なし）需要跟这套英文枚举做映射，`連語`及其变体大概率对应 `phrase`，`なし`对应 `not-applicable` 或 `unassigned`（哪个待确认）

### 记录结构：与现有 Supabase 表模型不对等（重要，影响详情页路由与结果分页语义）

`GET /datasets/tsj/records/:recordId` 返回的最小单元是**条目记录**（字符级，`recordId` 形如 `s0104a602a`，来自 `TSJ_entries.tsv`/`TSJ_definitions.tsv`），其中 `content.wakunParts[]` 是嵌套数组，装 0～N 条和訓记录（来自 `TSJ_wakun.tsv`）。而现有 `tsj_wakun` 表 / Tsj-Wakun 模块的模型是**每行一条和訓记录**（`sj_w_id` 直接是主键，`/tsj-wakun/[wakunId]` 按它直查单条）。这两种模型不对等，产生两个需要产品侧拍板的设计决策：

1. **结果列表分页语义会变**：`/search` 的游标分页是按"命中的条目记录数"分页，不是按"命中的和訓行数"分页。要在结果页展示成"一行一条和訓"，需要 jisho-goi-db 把每条命中的条目结果展开成其 `wakunParts[]`（可能 0/1/多条），那么"当前页显示 N 件"就不再等于"游标分页的 limit"，两者会脱节。
2. **详情页没有直接按 wakunId 查询的端点**：只能按父条目 `recordId` 查（`GET /datasets/tsj/records/:recordId`），拿到后从返回的 `wakunParts[]` 里筛出目标 `wakunId` 那一条。也就是说 `/tsj-wakun/[wakunId]` 这条路由要么改成按 `recordId` 查询、`wakunId` 降级为页面内筛选/锚点用途，要么继续对外暴露 `wakunId` 但内部维护一份 `wakunId → recordId` 的映射（多一次查询或多一份索引）。这个改动会影响已经发布出去的详情页 URL 结构，需要用户决定怎么处理。

### 字段映射（`wakunParts[]` → 现有 Supabase `tsj_wakun` 列）

已用真实数据核对（`sj_w00014`/`sj_w00015`，父记录 `s0106a503b`）：

| 现有 Supabase 列 | 新 API `wakunParts[]` 字段 | 备注 |
|---|---|---|
| `sj_w_id` | `wakunId` | 一致 |
| `entry_text` | `entryText` | 一致 |
| `entry_type` | `entryType`（英文枚举）/ `entryTypeRaw`（原始日文，如"単字"） | 两个都有，UI 展示建议用 `entryTypeRaw` |
| `reading_kana_kanji` | `readingKanaKanji` | 一致 |
| `reading_historical_kana` | `readingHistoricalKana` | 一致 |
| `def_manyogana` | `definitionManyogana` | 一致 |
| `kyowa_entry_text` | `kyowaEntryText` | 一致 |
| `kyowa_manyogana` | `kyowaManyogana` | 一致 |
| `kyowa_loc` | `kyowaLocation` | 一致 |
| `rinsen_loc` | `rinsenLocation` | 一致；注意父记录 `content.positions[]`（字符级）里也各自带一个 `rinsenLocation`，跟 wakunPart 自己的这个字段不是同一层级，展示时不要弄混 |
| `zhang_page` | `zhangPage` | 一致 |
| `nikkoku_id` | `nikkokuId` | 一致 |
| `remarks` | `remarks` | 一致 |
| `nikkoku_example_check` | `nikkokuStatusRaw`（如 `"listed"`）/ `nikkokuStatusCategory`（如 `"listed-only"`） | 只看到一种取值，还需要多拉几条样本确认区分"天治本/享和本"两种状态的完整枚举，P1 那条"日国用例展示逻辑"的阻塞点缩小到"枚举全集是什么"，不再是"格式完全未知" |
| `tsj_id`（会议要求删除展示的"倭訓栞ID"） | ⚠️ 新 API 也有一个叫 `tsjId` 的字段，但含义完全不同——它是父条目的 `recordId`（如 `s0106a503b`），不是旧表里"倭訓栞ID"的意思。迁移时**不要**把新 API 的 `tsjId` 当成旧 `tsj_id` 的替代来复用，删除展示的决定依然按会议记录执行，只是不要指望这个字段名对应旧字段 |
| （无） | `charCount`/`charCountRaw`、`kanaCharCount`/`kanaCharCountRaw`、`partOfSpeechRaw`/`partOfSpeechCategory` | **新增字段**，正好对应 P1 那 4 个下拉框里的「漢字数」「和訓仮名字数」「品詞」——原计划以为要等池田/藤本发数据、改 Supabase 表结构，现在切到新 API 后这些字段已经现成存在，不用再等 |

`packages/domain/src/variant-relations/` 那套异体字关系包，`/search` 和 `/datasets/tsj/records/:id` 两个端点均未见暴露。用户已确认需求形态是搜索面板上的一个"异体字检索开关"，并会去 `hdicviewer-rebuild` 加对应的搜索参数；jisho-goi-db 这边在参数落地前不实现（含 UI 开关本身），详见下方 P0 条目。

### 对现有计划各条目的影响（更新）

| 条目 | 影响 |
|---|---|
| 字段重命名 / 详情页字段顺序 | 不受影响，UI 层改动与数据源无关，可按原计划推进；字段名对照见上表 |
| 日国 ID → URL 化 | 不受影响，`nikkokuId` 字段一致存在，只要拿到 URL 拼接规则即可 |
| 读み检索忽略浊音 | 仍建议暂缓：`/search` 目前没看到浊音正规化相关参数，实现方式待确认（是否已在服务端做了模糊匹配、还是需要作为需求提给上游），建议先用本地 API 实测几个浊音对照词确认现状，而不是照抄 Supabase 时代"建生成列"的方案 |
| 异体字检索开关 | 已完成：上游加了 `characterMode` 参数，jisho-goi-db 已接入 checkbox + 客户端透传，待完整数据集重新发布后验证实际效果 |
| **品词/种别/字数下拉框** | **好消息，从"P1 待数据"升级为"可执行"**：`/search` 已原生支持 `entryType`/`charCount`/`kanaCount`/`posCategory` 四个筛选参数，不用再等池田/藤本发新列、不用改 Supabase 表结构了，直接对接新 API 参数即可 |
| 日国用例展示逻辑 | 阻塞点缩小：字段存在（`nikkokuStatusRaw`/`nikkokuStatusCategory`），但只见过一种取值，需要多拉样本确认天治本/享和本两种状态各自的枚举值 |
| 池田数据同步流程 | 确认改变：新撰字鏡数据已经落地在 `hdicviewer-rebuild` 一侧（来源文件 `TSJ_entries.tsv`/`TSJ_definitions.tsv`/`TSJ_wakun.tsv`/`TSJ_ndl.tsv`），池田数据更新流程大概率已经变成上游 `apps/jobs` 的职责，不再是 jisho-goi-db 这边要管的事，这条可以直接标记为"不在本计划范围" |

### 现在能做 / 现在不能做

- **现在能做**：新增 `lib/hdic-api/client.ts` 封装 `search(datasetId, params)`、`getRecord(datasetId, recordId)`，直接针对 `tsj` 数据集联调（不用再拿 `krm` 练手）；`.env` 已加 `HDIC_API_BASE_URL=http://127.0.0.1:8787` 占位，正式地址等用户部署后告知再替换。
- **仍然不能定案的**：结果列表分页语义、详情页路由从 `wakunId` 换成 `recordId` 这两个设计决策还没有拍板（见上方"记录结构"一节），建议先跟用户对齐这两点，再动手改 `db/tsj_wakun.ts` 和相关页面，避免返工。
- **建议动作**：抓紧确认正式 API 服务器地址和上面两个设计决策，其余字段级工作（品词/种别/字数筛选、字段重命名、URL 化）现在就可以对着本地 API 并行开工。

---

## D0 — 设计决策（已拍板，2026-08-28）

- [x] **详情页路由：改为按 `recordId` 寻址**——用户决定"按照实用角度"，即不强求保留 `wakunId` 直查的旧形态，改用 API 原生支持的 `recordId`。`/tsj-wakun/[wakunId]` 路由改成 `/tsj-wakun/[recordId]`，一个条目下有多条 `wakunParts` 时在同一详情页内全部列出（不是每条和訓单独一页）；已发布的旧 `wakunId` 形态链接不做兼容处理。
- [x] **结果列表分页语义：跟随 API 原生模型**——用户决定"配合 API"，即结果页按命中的条目（`recordId`）分页，不强行在客户端展开成"一行一条和訓"再分页。一条命中条目里可能对应多条 `wakunParts`，结果表格里同一行/同一卡片下可以列出该条目所有匹配到的和訓行。

两条决策已定，`db/tsj_wakun.ts` 和 `app/tsj-wakun/**` 的实际改造可以按这个方向动手，不用再等。

## P0 — 可以立即开工（不依赖 D0，也不依赖新数据）

- [x] **封装 hdicviewer-rebuild API 客户端（2026-08-28 完成）**
  - 位置：`lib/hdic-api/client.ts`——`searchHdic(params)`、`getHdicRecord<T>(datasetId, recordId)`，封装 envelope/`HdicApiError`（RFC7807）/3秒超时（`AbortController`）
  - base URL 从 `HDIC_API_BASE_URL` 环境变量读取（`.env` 里指向本地 `http://127.0.0.1:8787`，正式地址等用户告知后替换）

- [x] **检索面板 / 结果栏字段重命名（2026-08-28 完成）**
  - `TsjWakunForm.tsx`、`results/page.tsx`、`[recordId]/page.tsx` 已按会议记录改名，「倭訓栞ID」已删除展示，「臨川本所在」已移到「享和本所在」正上方（详情页用显式 `wakunPartFieldOrder` 数组渲染，不再用 `Object.entries`）
  - D0 已落地：路由从 `[wakunId]` 重命名为 `[recordId]`（`git mv`），按 `recordId` 拉取条目详情后渲染其 `wakunParts[]`（一条条目下有多条和訓时全部列出）

- [x] **品词/种别/字数下拉框（2026-08-28 完成，含真实数据验证）**
  - `TsjWakunForm.tsx` 新增「種別」「品詞」两个下拉框（复用 `components/common/Select.tsx`）+「漢字数」「和訓仮名字数」两个文本输入（未做成下拉框——真实数据里这两个字段是任意整数，没有先验的有限选项集，做成下拉框需要先枚举数据里实际出现的字数分布，目前用数字输入更贴近实际情况，见 `TsjWakunForm.tsx` 里的说明）
  - `posCategory` 的中日文映射是 best-effort（`TsjWakunForm.tsx` 里有代码注释说明），已用本地 API 实测 `entry_type=variant`、`pos_category=noun` 两个筛选参数确实生效（分别把"一"的 headword 命中从5条筛到3条、把"あ"的 reading 命中筛出23条），但"連語"细分（名詞句/動詞句/定義文）和"なし"具体对应 `not-applicable` 还是 `unassigned` 未做进一步验证

- [x] **日国 ID → lib / personal 版 URL 化（2026-08-28 完成，含真实数据验证）**
  - 位置：`app/tsj-wakun/[recordId]/page.tsx`
  - URL 规则（用户提供）：个人版 `https://japanknowledge.com/psnl/{nikkokuId}`，图书馆版 `https://japanknowledge.com/library/{nikkokuId}`
  - **实测发现**：`nikkokuId` 字段除了真实 ID 和空字符串外，还会是字面量 `"N/A"`（表示无 ID）——已在代码里排除这个哨兵值，否则会拼出 `.../psnl/N/A` 这种坏链接
  - 还没做的验证：挑一条真实 `nikkokuId` 实际打开这两个 URL，确认真的能访问到对应词条（目前只是把用户给的规则原样拼接，没有验证目标网站那边接不接受这个路径格式）

- [x] **异体字检索开关（2026-08-28 完成）**
  - 上游已加好参数：`/search` 新增 `characterMode`（`literal`/`variants`，仅 TSJ），实测确认打开后 API 响应 `meta` 会多出 `variantRelationSetVersion`/`variantIndexRuleVersion`，证明真的走了 `variant-relations` 那套 Unihan 异体字扩展逻辑，不是死参数
  - 已接入：`lib/hdic-api/client.ts` 的 `HdicSearchParams` 加了 `characterMode`；`TsjWakunForm.tsx` 加了「異体字も検索（旧字体・新字体等）」checkbox（`variant_search`）；`db/tsj_wakun.ts` 里 `variant_search === "true"` 时透传 `characterMode: "variants"`，否则 `"literal"`
  - **还没做的验证**：当前本地 API 的 TSJ 数据集 active 版本临时只有 1 条记录（`/api/v1/datasets/tsj/versions` 显示，之前测试用的 20017 条版本已经不是 active 的了），没法做打开/关闭开关的真实效果对比，等完整数据集重新发布后再验证

- [ ] **读み检索：忽略浊音有无（暂缓，待确认现状）**
  - 建议先用本地 API 实测几个浊音对照词确认 `/search` 服务端是否已经做了正规化，再决定要不要作为需求提给上游，不要照抄 Supabase 时代"建生成列"的方案

## P1 — 阻塞点已缩小，待样本数据确认

- [ ] **「日国用例」展示逻辑改造**
  - 位置：`[recordId]/page.tsx`（对应字段 `nikkokuStatusRaw`/`nikkokuStatusCategory`），目前直接显示原始值，代码里有注释说明原因
  - **2026-08-28 实测新发现**：实际取值比之前设想的更丰富——见过 `"listed"`、`"no entry"`、`"✓ゆづ"`（✓+一段读音假名，不是✓+版本名）、空字符串。会议要求的「✓天治本」「✓享和本」这种按版本区分的展示方式，跟实测到的"✓+读音"格式对不上，说明之前"猜测是天治本/享和本两态"的假设本身可能就是错的，需要重新跟池田确认这个字段到底想表达什么，而不只是"再多拉几条样本"

## P2 — 依赖外部系统信息，需先对齐

- [x] **HDIC 新撰字鏡链接（2026-08-28 完成）**
  - 用户确认：目标是 HDIC 自家 viewer，`sj2id` 就是条目级 `recordId`，URL 为 `https://viewer.hdic.jp/tsj2/{recordId}`
  - 已在 `[recordId]/page.tsx` 详情页顶部加"HDICビューアで見る"链接
  - 还没做的验证：这个 URL 目前也是原样拼接、没有实际打开验证过 `viewer.hdic.jp` 那边真的认这个路径格式
  - `content.navigationResources[]` 里另外还带了 NDL/NIJL 的原始扫描页链接，作为备选/补充，不是本条目标

- [ ] **公开页菜单设计 + 可搜索字段（所在、文字数等）的整体信息架构评审**
  - 建议放在 D0 两个设计决策、P0 的下拉框/URL 化落地之后统一走一次评审

---

## 进度小结（2026-08-28）

D0 两个设计决策、P0 全部六项（客户端封装、字段重命名、品词/种别/字数下拉框、日国 URL 化、异体字检索开关、读み检索忽略浊音待确认外的其余项）、P2 的 HDIC 链接都已经实装完成，`db/tsj_wakun.ts`/`app/tsj-wakun/**` 已经从 Supabase 切到 hdicviewer-rebuild API（本地开发地址）。

**剩余工作**：
1. "读み检索忽略浊音"还没实测现状，待确认。
2. P1"日国用例展示逻辑"实测发现取值格式（`✓+読み`）跟会议要求的"✓天治本/✓享和本"对不上，需要重新跟池田确认这个字段的真实含义，不只是"多拉样本"。
3. 日国 URL、HDIC viewer URL 目前都是按用户给的规则直接拼接，还没有真的打开验证过对方网站接不接受这个路径格式——建议找时间抽几条真实 ID 手动点开确认一下。
4. [x] 2026-08-29：完整数据集已重新发布并激活（`GET /datasets/tsj/versions` 显示 `recordCount: 20017`，`isActive: true`），异体字检索开关已用真实数据做过效果对比确认生效——同样搜享和本见出し「乱」，`variant_search` 关闭时 1 行、开启时 9 行，二者结果不同，说明服务端确实在做异体字展开。
5. "信息架构评审"排最后，依赖前面几项落地后才有实际内容可评。
6. [x] 2026-08-29：正式 API 服务器地址已收到（`https://hdic-app.kojisho.com`），`.env` 里 `HDIC_API_BASE_URL` 已替换（`.env` 不入库，需要各自环境手动同步这一行）。
7. [x] `tests/e2e/database-modules.contract.ts` 里 `TsjWakun` 的 `knownQuery` 是 `{ entry_text: "一" }`（新 API 的 `/search` 要求 `q` 必填，不能再用空字符串"全件ヒット"的旧技巧）——2026-08-29：已针对 20017 条记录的正式 active 版本重新跑过，`bun run test:run` + 全部 8 模块 16 个 Playwright 契约测试均通过。
