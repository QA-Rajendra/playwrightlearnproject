import { test, expect } from '@playwright/test';

test('Multiple assertions in one test', async ({ page }) => {

  // Number assertion
  expect(10).toBe(10);

  // String assertion
  expect("rajendra patil").toContain("rajendra");

  // Boolean assertion
  expect(true).toBeTruthy();

  // Array assertion
  expect([1, 2, 3]).toHaveLength(3);

  // Object assertion
  expect({ role: "admin", active: true }).toMatchObject({ role: "admin" });

});
