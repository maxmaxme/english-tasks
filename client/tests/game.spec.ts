import { expect, test } from '@playwright/test';

test.describe.parallel('Navigation', () => {
  test('Open & close game rules', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    const firstGame = page.locator('data-test-id=GamesListItem').first();
    await expect(firstGame).toBeVisible();
    await firstGame.click();

    await Promise.all([
      expect(page.locator('data-test-id=GameHints')).toBeVisible(),
      expect(page.locator('data-test-id=GameStartButton')).toBeVisible(),
      expect(firstGame).not.toBeVisible(),
    ]);

    await page.locator('data-test-id=GameRulesBackButton').click();
    await expect(firstGame).toBeVisible();
  });

  test('Start game & exit from game', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    const firstGame = page.locator('data-test-id=GamesListItem').first();
    await expect(firstGame).toBeVisible();
    await firstGame.click();

    await page.locator('data-test-id=GameStartButton').click();
    await page.locator('data-test-id=GameBackButton').click();
    await expect(page.locator('data-test-id=GameStartButton')).toBeVisible();

    await page.locator('data-test-id=GameRulesBackButton').click();
    await expect(firstGame).toBeVisible();
  });
});
