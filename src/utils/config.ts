/**
 * prepared by Nasr Ullah on October 05, 2025
 */
import { config } from 'dotenv';

// Load environment variables
config();

export interface TestConfig {
  baseUrl: string;
  username: string;
  password: string;
  githubRepo: string;
  githubApiUrl: string;
  outputDir: string;
  csvOutputFile: string;
}

export function getConfig(): TestConfig {
  const env = process.env.ENV || 'production';
  
  let baseUrl: string;
  switch (env) {
    case 'local':
      baseUrl = process.env.BASE_URL_LOCAL || 'http://localhost:4000/fashionhub/';
      break;
    case 'staging':
      baseUrl = process.env.BASE_URL_STAGING || 'https://staging-env/fashionhub/';
      break;
    case 'production':
    default:
      baseUrl = process.env.BASE_URL_PRODUCTION || 'https://pocketaces2.github.io/fashionhub/';
      break;
  }

  return {
    baseUrl,
    username: process.env.TEST_USERNAME || 'demouser',
    password: process.env.TEST_PASSWORD || 'fashion123',
    githubRepo: process.env.GITHUB_REPO || 'appwrite/appwrite',
    githubApiUrl: process.env.GITHUB_API_URL || 'https://api.github.com/repos',
    outputDir: process.env.OUTPUT_DIR || './test-results',
    csvOutputFile: process.env.CSV_OUTPUT_FILE || './test-results/pull-requests.csv'
  };
}

export const testConfig = getConfig();