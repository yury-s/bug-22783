import { test, expect } from '@playwright/test';

test('label directives for self+label', async ({ page }) => {
  await page.context().routeFromHAR('test.har', { update: true });
  await page.goto('http://localhost:3000/options.html');
  page.on('request', request => {
    console.log('Request: ' + request.method() + ' ' + request.url());
  });
  page.on('requestfinished', request => {
    console.log('Finished: ' + request.method() + ' ' + request.url());
  });
  page.on('requestfailed', request => {
    console.log('Failed: ' + request.method() + ' ' + request.url());
  });
  await page.getByText('Send OPTIONS request').click();
});