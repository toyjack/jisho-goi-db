import { test, expect } from "@playwright/test";
import { moduleContracts } from "./database-modules.contract";

for (const contract of moduleContracts) {
  test.describe(`${contract.name} モジュール契約`, () => {
    test("検索結果一覧に少なくとも1件表示され、詳細ページに主要項目が表示される", async ({
      page,
    }) => {
      const query = new URLSearchParams(contract.knownQuery).toString();
      await page.goto(`${contract.resultsPath}?${query}`);

      const firstLink = page.locator(contract.resultRowLinkSelector).first();
      await expect(firstLink).toBeVisible();

      await firstLink.click();

      await expect(page.getByText(contract.detailLabelText).first()).toBeVisible();
    });

    test("該当なしの検索条件でもエラーにならず結果0件が表示される", async ({
      page,
    }) => {
      const query = new URLSearchParams({
        [contract.noResultQueryField]: "存在しないはずの見出し語__e2e__",
      }).toString();
      await page.goto(`${contract.resultsPath}?${query}`);

      await expect(page.locator(contract.resultRowLinkSelector)).toHaveCount(0);
      await expect(page.locator("body")).not.toContainText("Error");
    });
  });
}
