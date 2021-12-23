import { expect, test } from '@playwright/test';

test.describe.parallel('Rule Navigation', () => {
  test('Open & close rule', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    const firstRule = page.locator('data-test-id=RulesListItem').first();
    await expect(firstRule).toBeVisible();
    await firstRule.click();

    await Promise.all([
      expect(page.locator('data-test-id=RulesItemContent')).toBeVisible(),
      expect(page.locator('data-test-id=RulesItemBackButton')).toBeVisible(),
      expect(firstRule).not.toBeVisible(),
    ]);

    await page.locator('data-test-id=RulesItemBackButton').click();
    await expect(firstRule).toBeVisible();
  });
});
