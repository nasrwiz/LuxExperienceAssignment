/**
 * prepared by Nasr Ullah on October 03, 2025
 */
import { test, expect } from '@playwright/test';
import { testConfig } from '../src/utils/config';

test.describe('Test Case 3: Login Functionality Verification', () => {
  test('should successfully log in with valid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto(`${testConfig.baseUrl}login.html`);
    
    // Wait for the login form to be visible
    await page.waitForSelector('form', { timeout: 10000 });
    
    // Fill in the login credentials from environment variables
    console.log(`Using credentials - Username: ${testConfig.username}`);
    await page.fill('input[name="username"], input[type="text"]', testConfig.username);
    await page.fill('input[name="password"], input[type="password"]', testConfig.password);
    
    // Take a screenshot before login for debugging
    await page.screenshot({ path: 'test-results/before-login.png' });
    
    // Submit the login form
    await page.click('button[type="submit"], input[type="submit"]');
    
    // Wait for navigation or success message
    await page.waitForTimeout(2000);
    
    // Take a screenshot after login attempt
    await page.screenshot({ path: 'test-results/after-login.png' });
    
    // Check for successful login indicators
    const currentUrl = page.url();
    console.log(`Current URL after login: ${currentUrl}`);
    
    // Look for success indicators
    const successIndicators = [
      'Welcome',
      'Dashboard',
      'Profile',
      'Logout',
      'Success'
    ];
    
    let loginSuccessful = false;
    for (const indicator of successIndicators) {
      const element = page.locator(`text=${indicator}`).first();
      if (await element.isVisible().catch(() => false)) {
        console.log(`Found success indicator: ${indicator}`);
        loginSuccessful = true;
        break;
      }
    }
    
    // Check if URL changed (indicating successful login)
    if (currentUrl !== `${testConfig.baseUrl}login.html`) {
      console.log('URL changed after login, indicating successful authentication');
      loginSuccessful = true;
    }
    
    // Assert login was successful
    expect(loginSuccessful).toBe(true);
  });

  test('should handle invalid credentials appropriately', async ({ page }) => {
    // Navigate to the login page
    await page.goto(`${testConfig.baseUrl}login.html`);
    
    // Wait for the login form to be visible
    await page.waitForSelector('form', { timeout: 10000 });
    
    // Fill in invalid credentials
    await page.fill('input[name="username"], input[type="text"]', 'invaliduser');
    await page.fill('input[name="password"], input[type="password"]', 'invalidpass');
    
    // Submit the login form
    await page.click('button[type="submit"], input[type="submit"]');
    
    // Wait for error message or form to remain
    await page.waitForTimeout(2000);
    
    // Check for error indicators
    const errorIndicators = [
      'Invalid',
      'Error',
      'Failed',
      'Incorrect',
      'Wrong'
    ];
    
    let errorFound = false;
    for (const indicator of errorIndicators) {
      const element = page.locator(`text=${indicator}`).first();
      if (await element.isVisible().catch(() => false)) {
        console.log(`Found error indicator: ${indicator}`);
        errorFound = true;
        break;
      }
    }
    
    // Check if still on login page (indicating failed login)
    const currentUrl = page.url();
    const stillOnLoginPage = currentUrl.includes('login');
    
    console.log(`Still on login page: ${stillOnLoginPage}`);
    console.log(`Error message found: ${errorFound}`);
    
    // At least one of these should be true for invalid credentials
    expect(errorFound || stillOnLoginPage).toBe(true);
  });

  test('should verify login form elements are present', async ({ page }) => {
    // Navigate to the login page
    await page.goto(`${testConfig.baseUrl}login.html`);
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check for username field
    const usernameField = page.locator('input[name="username"], input[type="text"]').first();
    await expect(usernameField).toBeVisible();
    
    // Check for password field
    const passwordField = page.locator('input[name="password"], input[type="password"]').first();
    await expect(passwordField).toBeVisible();
    
    // Check for submit button
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
    await expect(submitButton).toBeVisible();
    
    // Verify form is functional
    await usernameField.fill('test');
    await passwordField.fill('test');
    
    // Check that fields accept input
    const usernameValue = await usernameField.inputValue();
    const passwordValue = await passwordField.inputValue();
    
    expect(usernameValue).toBe('test');
    expect(passwordValue).toBe('test');
  });
});
