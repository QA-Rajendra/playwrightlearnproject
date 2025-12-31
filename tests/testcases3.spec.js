import { test, expect } from '@playwright/test';

test('OrangeHRM Login - multiple assertions', async ({ page }) => {

  // Navigate to login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Viewport size check
  const viewport = page.viewportSize();
  console.log('Viewport Width:', viewport?.width);
  console.log('Viewport Height:', viewport?.height);

  // Page assertions
  await expect(page).toHaveTitle(/OrangeHRM/);
  await expect(page).toHaveURL(/login/);

  // Locators
  const username = page.locator('input[name="username"]');
  const password = page.locator('input[name="password"]');
  const loginBtn = page.locator('button[type="submit"]');

  // UI assertions
  await expect(username).toBeVisible();
  await expect(password).toBeVisible();
  await expect(password).toBeEnabled();
  await expect(loginBtn).toBeVisible();

  // Actions
  await username.fill('Admin');
  await password.fill('admin123');
  await loginBtn.click();

  // Dashboard assertions
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('h6')).toContainText('Dashboard');

  // Basic assertions
  expect(12).toBe(12);
  expect("rajendra patil").toContain("rajendra");
  expect(true).toBeTruthy();
});
