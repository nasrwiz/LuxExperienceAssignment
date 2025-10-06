/**
 * prepared by Nasr Ullah on October 01, 2025
 */
import { test, expect } from '@playwright/test';
import { testConfig } from '../src/utils/config';

test.describe('Test Case 1: Basic Website Test', () => {
  test('should load the FashionHub website successfully', async ({ page }) => {
    // Navigate to the FashionHub website
    await page.goto(testConfig.baseUrl);
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Check if the page title contains expected text
    const title = await page.title();
    expect(title).toBeTruthy();
    
    console.log(`Page title: ${title}`);
  });

  test('should have working navigation', async ({ page }) => {
    // Navigate to the main page
    await page.goto(testConfig.baseUrl);
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check if navigation elements are present
    const navigation = page.locator('nav, .nav, .navigation, header');
    await expect(navigation.first()).toBeVisible();
    
    console.log('Navigation elements found and visible');
  });
});