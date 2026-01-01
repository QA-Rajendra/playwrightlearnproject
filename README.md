import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    console.log('🌐 Open Login Page');
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  // TC1: Required Field Validations
  test('TC1 – Validate Required field messages ⚠️', async ({ page }) => {
    await test.step('🖱️ Click Login without entering credentials', async () => {
      await page.getByRole('button', { name: 'Login' }).click();
      console.log('Clicked login button with empty fields');
    });

    await test.step('⚠️ Check Required messages', async () => {
      const requiredErrors = page.locator('.oxd-input-field-error-message');
      console.log('Expected Required error count: 2');
      console.log('Actual count:', await requiredErrors.count());

      await expect.soft(requiredErrors).toHaveCount(2);
      await expect.soft(requiredErrors.first()).toHaveText('Required');
      await expect.soft(requiredErrors.nth(1)).toHaveText('Required');

      console.log('✅ Required field validation completed');
    });
  });

  // TC2: Invalid Credentials
  test('TC2 – Invalid login ❌', async ({ page }) => {
    await test.step('✏️ Enter invalid credentials', async () => {
      await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
      await page.getByRole('textbox', { name: 'Password' }).fill('wrongpass');
      await page.getByRole('button', { name: 'Login' }).click();
      console.log('Attempted login with invalid credentials');
    });

    await test.step('❌ Validate Invalid credentials message', async () => {
      const alertMessage = page.getByRole('alert');
      const actualText = await alertMessage.textContent();
      console.log('Expected: Invalid credentials');
      console.log('Actual:', actualText);

      await expect.soft(alertMessage).toBeVisible();
      await expect.soft(alertMessage).toHaveText('Invalid credentials');

      console.log('✅ Invalid credentials assertion executed');
    });

    await test.step('🔒 Verify still on login page', async () => {
      await expect(page).toHaveURL(/auth\/login/);
    });
  });

  // TC3: Successful Login
  test('TC3 – Successful login ✅', async ({ page }) => {
    await test.step('✏️ Enter valid credentials', async () => {
      await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
      await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
      await page.getByRole('button', { name: 'Login' }).click();
      console.log('Attempted login with valid credentials');
    });

    await test.step('✅ Verify Dashboard loaded', async () => {
      const dashboardHeader = page.locator('h6:has-text("Dashboard")');
      await expect(dashboardHeader).toBeVisible();
      console.log('Dashboard is visible – login successful');
    });

    await test.step('🔒 Verify URL contains /dashboard', async () => {
      await expect(page).toHaveURL(/dashboard/);
    });
  });

});

