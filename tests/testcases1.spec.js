import { test, expect } from '@playwright/test';

test('has title1', async ({ page }) => {
  expect(12).toBe(12);
});

test('has title2', async ({ page }) => {
  expect(10).toBe(10);
});

test('has title3', async ({ page }) => {
  expect(120).toBe(120);
});

test('has title4', async ({ page }) => {
  expect("rajendra patil").toContain("rajendra");
  expect(true).toBeTruthy();
});

test('has title5', async ({ page }) => {
  expect("rajendra patil".includes("patil")).toBeTruthy();

});
test('has title6', async ({ page }) => {

  expect(false).toBeTruthy();
});

