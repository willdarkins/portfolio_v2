import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/* Named landmarks on the homepage, in canvas order (the hero is checked by its h1). */
const SECTIONS = ["What I Do", "Selected Work", "How I got here", "From the Newsletter", "Now"];

const WORK_SLUGS = [
  "snyk-renovate-triage-agent",
  "dpia-framework",
  "risk-register-audits",
  "looker-owned-automated",
];

// remove in PR 2B: /work and /about don't exist yet, so next/link's prefetches of
// them 404. Chromium logs each as "Failed to load resource … 404", and the router
// never finishes reading those responses, so "networkidle" never fires. Until the
// routes exist: allow only those 404s, and settle on load + both prefetch responses.
const PENDING_ROUTES = /^http:\/\/localhost:3000\/(work|about)(\/[^?]*)?\?_rsc=/;

// remove in PR 2B: go back to page.goto("/") + waitForLoadState("networkidle").
async function gotoAndSettle(page: Page) {
  await Promise.all([
    page.waitForResponse((r) => /\/work\?_rsc=/.test(r.url())),
    page.waitForResponse((r) => /\/about\?_rsc=/.test(r.url())),
    page.goto("/"),
  ]);
  await page.waitForLoadState("load");
}

test.describe("/ (homepage)", () => {
  const errors: string[] = [];

  test.beforeEach(async ({ page }) => {
    errors.length = 0;
    page.on("console", (msg) => {
      if (msg.type() !== "error") return;
      // remove in PR 2B: skip the 404 resource errors for /work and /about* (see above).
      const url = msg.location().url;
      if (msg.text().includes("status of 404") && PENDING_ROUTES.test(url)) return;
      errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));
  });

  test("responds 200 and is noindex, nofollow", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveCount(1);
    const content = await robots.getAttribute("content");
    expect(content).toContain("noindex");
    expect(content).toContain("nofollow");
  });

  test("shows the shell and every section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: /I connect the systems that should talk/ }),
    ).toBeVisible();
    for (const name of SECTIONS) {
      await expect(page.getByRole("region", { name, exact: true }), `section "${name}"`).toBeVisible();
    }
  });

  test("lists 4 case studies with outcome lines and 3 newsletter cards", async ({ page }) => {
    await page.goto("/");
    const work = page.getByRole("region", { name: "Selected Work", exact: true }).getByRole("listitem");
    await expect(work).toHaveCount(4);
    for (const [i, slug] of WORK_SLUGS.entries()) {
      const item = work.nth(i);
      await expect(item.getByRole("link")).toHaveAttribute("href", `/work/${slug}`);
      await expect(item).toContainText("Outcome:");
    }
    const newsletter = page.getByRole("region", { name: "From the Newsletter", exact: true });
    await expect(newsletter.getByRole("heading", { level: 3 })).toHaveCount(4); // 3 cards + subscribe band
    await expect(newsletter.getByRole("form", { name: "Get the newsletter" })).toBeVisible();
  });

  test("has the primary nav links", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    await expect(nav.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/work");
    await expect(nav.getByRole("link", { name: /Newsletter.*external link/ })).toBeVisible();
    await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  });

  test("first Tab focuses the skip link, which targets #main", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await expect(skip).toHaveAttribute("href", "#main");
    await expect(page.locator("main#main")).toHaveCount(1);
  });

  test("logs no console errors", async ({ page }) => {
    await gotoAndSettle(page);
    expect(errors).toEqual([]);
  });

  test("has no axe violations (WCAG 2.0/2.1/2.2 A + AA)", async ({ page }) => {
    await gotoAndSettle(page);
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
