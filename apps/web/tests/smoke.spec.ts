import { test, expect } from '@playwright/test';

test.describe('JLC Carpentry Website Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');

    // Check that the page loads and has the expected title
    await expect(page).toHaveTitle(/JLC Carpentry/);

    // Check that main content is visible
    await expect(page.locator('body')).toBeVisible();
  });

  test('page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that page loads on mobile viewport
    await expect(page.locator('body')).toBeVisible();

    // Ensure no horizontal overflow
    const bodyWidth = await page.locator('body').boundingBox();
    expect(bodyWidth?.width).toBeLessThanOrEqual(375);
  });
});
