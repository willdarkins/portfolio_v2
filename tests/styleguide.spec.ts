import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/* Every section heading on /styleguide; one per token group and component. */
const SECTIONS = [
  "Color tokens",
  "Type scale",
  "Spacing scale",
  "Masthead",
  "Nav",
  "Hero split",
  "Buttons",
  "Lane labels",
  "Lane cards",
  "Section heading",
  "Work items",
  "Path strip",
  "Newsletter cards",
  "Subscribe band",
  "Now strip",
  "Footer",
  "Ink layer",
];

test.describe("/styleguide", () => {
  const errors: string[] = [];

  test.beforeEach(async ({ page }) => {
    errors.length = 0;
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));
  });

  test("responds 200 and is noindex, nofollow", async ({ page }) => {
    const response = await page.goto("/styleguide");
    expect(response?.status()).toBe(200);
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveCount(1);
    const content = await robots.getAttribute("content");
    expect(content).toContain("noindex");
    expect(content).toContain("nofollow");
  });

  test("shows every section", async ({ page }) => {
    await page.goto("/styleguide");
    await expect(page.getByRole("heading", { level: 1, name: "Styleguide" })).toBeVisible();
    for (const name of SECTIONS) {
      const section = page.getByRole("region", { name, exact: true });
      await expect(section, `section "${name}"`).toBeVisible();
    }
  });

  test("logs no console errors", async ({ page }) => {
    await page.goto("/styleguide");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test("has no axe violations (WCAG 2.0/2.1/2.2 A + AA)", async ({ page }) => {
    await page.goto("/styleguide");
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    const summary = results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      targets: v.nodes.map((n) => n.target.join(" ")),
    }));
    expect(summary).toEqual([]);
  });
});
