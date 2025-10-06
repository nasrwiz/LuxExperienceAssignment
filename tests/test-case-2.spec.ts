/**
 * prepared by Nasr Ullah on October 02, 2025
 */
import { test, expect } from '@playwright/test';
import { testConfig } from '../src/utils/config';

test.describe('Test Case 2: Link Status Code Validation', () => {
  test('should verify all links return 200 or 30x status codes', async ({ page }) => {
    // Navigate to the FashionHub website
    await page.goto(testConfig.baseUrl);
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Get all links on the page
    const links = await page.locator('a[href]').all();
    const linkResults: { url: string; status: number; success: boolean }[] = [];
    
    console.log(`Found ${links.length} links to check`);
    
    // Check each link individually
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (!href) continue;
      
      // Convert relative URLs to absolute URLs
      let absoluteUrl: string;
      if (href.startsWith('http')) {
        absoluteUrl = href;
      } else if (href.startsWith('/')) {
        const base = new URL(testConfig.baseUrl);
        absoluteUrl = `${base.protocol}//${base.host}${href}`;
      } else {
        absoluteUrl = new URL(href, testConfig.baseUrl).toString();
      }
      
      try {
        const response = await page.request.get(absoluteUrl);
        const status = response.status();
        const success = status >= 200 && status < 400;
        
        linkResults.push({ url: absoluteUrl, status, success });
        
        console.log(`${success ? '✓' : '✗'} ${absoluteUrl} - Status: ${status}`);
      } catch (error) {
        linkResults.push({ url: absoluteUrl, status: 0, success: false });
        console.log(`✗ ${absoluteUrl} - Error: ${error}`);
      }
    }
    
    // Log summary
    const successfulLinks = linkResults.filter(r => r.success);
    const failedLinks = linkResults.filter(r => !r.success);
    
    console.log(`\nLink Check Summary:`);
    console.log(`Total links: ${linkResults.length}`);
    console.log(`Successful links: ${successfulLinks.length}`);
    console.log(`Failed links: ${failedLinks.length}`);
    console.log(`Success rate: ${((successfulLinks.length / linkResults.length) * 100).toFixed(2)}%`);
    
    // Assert that no links return 40x status codes
    const fourHundredErrors = linkResults.filter(r => r.status >= 400);
    expect(fourHundredErrors.length).toBe(0);
    
    // Assert that all links return 200 or 30x status codes
    linkResults.forEach(linkResult => {
      expect(linkResult.status).toBeGreaterThanOrEqual(200);
      expect(linkResult.status).toBeLessThan(400);
    });
  });

  test('should verify specific page links work correctly', async ({ page }) => {
    // Navigate to the main page first
    await page.goto(testConfig.baseUrl);
    
    // Get all links
    const links = await page.locator('a[href]').all();
    const linkUrls: string[] = [];
    
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href) {
        // Convert relative URLs to absolute URLs
        const absoluteUrl = href.startsWith('http') ? href : new URL(href, testConfig.baseUrl).toString();
        linkUrls.push(absoluteUrl);
      }
    }
    
    console.log(`Found ${linkUrls.length} links to check`);
    
    // Check each link individually
    const results: { url: string; status: number; success: boolean }[] = [];
    
    for (const url of linkUrls) {
      try {
        const response = await page.request.get(url);
        const status = response.status();
        const success = status >= 200 && status < 400;
        
        results.push({ url, status, success });
        
        console.log(`${success ? '✓' : '✗'} ${url} - ${status}`);
      } catch (error) {
        results.push({ url, status: 0, success: false });
        console.log(`✗ ${url} - Error: ${error}`);
      }
    }
    
    // Assert all links are successful
    const failedResults = results.filter(r => !r.success);
    expect(failedResults.length).toBe(0);
  });
});
