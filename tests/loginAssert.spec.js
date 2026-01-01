import { test, expect } from '@playwright/test';

test('Login validation – soft assertions with console logs 😃', async ({ page }) => {

  console.log('🌐 STEP 1: Open Login Page');
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await test.step('🖱️ Click Login without entering credentials', async () => {
    console.log('👉 Clicking Login button');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  await test.step('⚠️ Validate Required field messages', async () => {
    const requiredErrors = page.locator('.oxd-input-field-error-message');

    console.log('🔹 Expected Required error count: 2');
    console.log('🔹 Actual Required error count:', await requiredErrors.count());

    await expect.soft(requiredErrors).toHaveCount(2);
    await expect.soft(requiredErrors.first()).toHaveText('Required');
    await expect.soft(requiredErrors.nth(1)).toHaveText('Required');

    console.log('✅ Required field assertions executed');
  });

  await test.step('✏️ Enter invalid login credentials', async () => {
    console.log('📝 Entering Username');
    await page.getByRole('textbox', { name: 'Username' }).fill('admin');

    console.log('📝 Entering Password');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin1234');

    console.log('🖱️ Clicking Login with invalid credentials');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  await test.step('❌ Validate Invalid credentials message', async () => {
    const alertMessage = page.getByRole('alert');

    const actualText = await alertMessage.textContent();
    console.log('🔹 Expected error message: Invalid credentials');
    console.log('🔹 Actual error message:', actualText);

    await expect.soft(alertMessage).toBeVisible();
    await expect.soft(alertMessage).toHaveText('Invalid credentials');

    console.log('✅ Invalid credentials assertion executed');
  });

  await test.step('🔒 Final hard assertion – verify still on login page', async () => {
    console.log('🔹 Verifying URL contains /auth/login');
    await expect(page).toHaveURL(/auth\/login/);
  });

  console.log('🎉 TEST COMPLETED');
});
